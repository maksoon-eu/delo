'use server';

import { randomUUID } from 'crypto';
import { revalidatePath } from 'next/cache';
import { DocumentType } from '@prisma/client';
import { db } from '@/config/db';
import { buildStoredDocumentFileName, sanitizeDocumentFileName } from '@/utils/document-file';
import { deleteS3ObjectByKey, uploadToS3 } from '@/utils/s3';
import { getVerifiedSession } from '@/utils/verification';
import { ORDER_DOCUMENT_ALLOWED_TYPES, ORDER_DOCUMENT_MAX_BYTES } from '@/constants/documents';

export async function attachOrderReceipt(formData: FormData): Promise<{ error?: string }> {
  const verifiedSession = await getVerifiedSession();
  if (!verifiedSession.ok) return { error: verifiedSession.error };
  const { session } = verifiedSession;

  const orderId = formData.get('orderId');
  if (typeof orderId !== 'string' || !orderId) return { error: 'Заказ не найден' };

  const file = formData.get('document');
  if (!(file instanceof File)) return { error: 'Выберите PDF-файл' };

  if (
    !ORDER_DOCUMENT_ALLOWED_TYPES.includes(
      file.type as (typeof ORDER_DOCUMENT_ALLOWED_TYPES)[number]
    )
  ) {
    return { error: 'Загрузите PDF-файл' };
  }

  if (file.size > ORDER_DOCUMENT_MAX_BYTES) {
    return { error: 'Документ должен быть не больше 5 МБ' };
  }

  const order = await db.order.findUnique({
    where: { id: orderId, userId: session.user.id },
    select: { id: true },
  });

  if (!order) return { error: 'Заказ не найден' };

  const safeFilename = sanitizeDocumentFileName(file.name);
  const storedFilename = buildStoredDocumentFileName(randomUUID(), safeFilename);
  const key = `orders/${session.user.id}/${order.id}/documents/${storedFilename}`;
  const body = Buffer.from(await file.arrayBuffer());

  await uploadToS3({ key, body, contentType: file.type });

  try {
    await db.document.create({
      data: {
        orderId: order.id,
        type: DocumentType.INVOICE,
        url: key,
      },
    });
  } catch {
    await deleteS3ObjectByKey(key);
    return { error: 'Не удалось прикрепить документ' };
  }

  revalidatePath(`/orders/${order.id}`);
  return {};
}

export async function deleteOrderDocument(id: string): Promise<{ error?: string }> {
  const verifiedSession = await getVerifiedSession();
  if (!verifiedSession.ok) return { error: verifiedSession.error };
  const { session } = verifiedSession;

  const document = await db.document.findFirst({
    where: { id, order: { userId: session.user.id } },
    select: { id: true, orderId: true, url: true },
  });

  if (!document) return { error: 'Документ не найден' };

  try {
    await db.document.delete({ where: { id: document.id } });
    await deleteS3ObjectByKey(document.url);
  } catch {
    return { error: 'Не удалось удалить документ' };
  }

  revalidatePath(`/orders/${document.orderId}`);
  return {};
}
