'use client';

import { useRef, type ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { attachOrderReceipt } from '@/actions/documents';
import { UploadIcon } from '@/components/icons/upload';
import { OrderDocumentItem } from '@/components/orders/order-document-item';
import { Button } from '@/components/ui/actions/button';
import { ORDER_DOCUMENT_ACCEPT, ORDER_DOCUMENT_MAX_BYTES } from '@/constants/documents';
import { useAsyncAction } from '@/hooks/use-async-action';
import type { OrderDocumentEntry } from '@/types/orders';

type OrderDocumentsSectionProps = {
  orderId: string;
  documents: OrderDocumentEntry[];
};

export function OrderDocumentsSection(props: OrderDocumentsSectionProps) {
  const { orderId, documents } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  async function uploadDocument(file: File) {
    if (file.size > ORDER_DOCUMENT_MAX_BYTES) {
      throw new Error('Документ должен быть не больше 5 МБ');
    }

    const formData = new FormData();
    formData.append('orderId', orderId);
    formData.append('document', file);

    const { error } = await attachOrderReceipt(formData);
    if (error) throw new Error(error);

    toast.success('Документ прикреплён');
    router.refresh();
  }

  const [executeUpload, isUploading] = useAsyncAction(uploadDocument);

  function handleSelectDocument() {
    inputRef.current?.click();
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    void executeUpload(file);
    event.target.value = '';
  }

  return (
    <section>
      <div>
        <h2 className="font-semibold">Файлы и документы</h2>
        <p className="text-muted-foreground mt-1 text-xs">PDF до 5 МБ</p>
      </div>

      <input
        ref={inputRef}
        className="hidden"
        type="file"
        accept={ORDER_DOCUMENT_ACCEPT}
        onChange={handleFileChange}
      />

      <div className="mt-3 flex items-stretch gap-4 overflow-x-auto pb-2">
        <Button
          type="button"
          variant="outline"
          Icon={UploadIcon}
          isLoading={isUploading}
          onClick={handleSelectDocument}
          className="border-primary text-primary bg-card/60 h-18.75 w-50 shrink-0 flex-col gap-1 border-dashed backdrop-blur-md"
        >
          Загрузить файл
        </Button>

        <ul className="contents">
          {documents.map((document) => (
            <OrderDocumentItem key={document.id} document={document} />
          ))}
        </ul>
      </div>
    </section>
  );
}
