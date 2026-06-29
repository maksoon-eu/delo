import { auth } from '@/config/auth';
import { db } from '@/config/db';
import { getDocumentFileName } from '@/utils/document-file';
import { getS3Object } from '@/utils/s3';

type DocumentRouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: DocumentRouteContext) {
  const session = await auth();
  if (!session) return new Response(null, { status: 401 });

  const { id } = await context.params;
  const document = await db.document.findFirst({
    where: {
      id,
      order: { userId: session.user.id },
    },
    select: { url: true },
  });

  if (!document?.url) return new Response(null, { status: 404 });

  try {
    const object = await getS3Object(document.url);
    if (!object.Body) return new Response(null, { status: 404 });

    const downloadName = getDocumentFileName(document.url);
    const headers = new Headers({
      'Content-Type': object.ContentType ?? 'application/pdf',
      'Cache-Control': 'private, max-age=3600',
      'Content-Disposition': `attachment; filename*=UTF-8''${encodeURIComponent(downloadName)}`,
    });

    if (object.ContentLength) {
      headers.set('Content-Length', String(object.ContentLength));
    }

    return new Response(object.Body.transformToWebStream(), { headers });
  } catch {
    return new Response(null, { status: 404 });
  }
}
