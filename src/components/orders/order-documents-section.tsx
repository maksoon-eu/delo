'use client';

import { useRef, type ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { attachOrderReceipt } from '@/actions/documents';
import { FileTextIcon } from '@/components/icons/file-text';
import { UploadIcon } from '@/components/icons/upload';
import { Button } from '@/components/ui/actions/button';
import { ORDER_DOCUMENT_ACCEPT, ORDER_DOCUMENT_MAX_BYTES } from '@/constants/documents';
import { useAsyncAction } from '@/hooks/use-async-action';
import { formatDate } from '@/lib/utils';
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

    toast.success('Чек прикреплён');
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
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-semibold">Чеки по оплатам</h2>
          <p className="text-muted-foreground mt-1 text-xs">PDF до 5 МБ</p>
        </div>
        <input
          ref={inputRef}
          className="hidden"
          type="file"
          accept={ORDER_DOCUMENT_ACCEPT}
          onChange={handleFileChange}
        />
        <Button
          type="button"
          variant="outline"
          Icon={UploadIcon}
          isLoading={isUploading}
          onClick={handleSelectDocument}
        >
          Прикрепить чеки
        </Button>
      </div>

      {documents.length > 0 ? (
        <ul className="mt-4 grid gap-2 md:grid-cols-2 xl:grid-cols-3">
          {documents.map((document) => (
            <li key={document.id}>
              <a
                className="border-border bg-accent/30 hover:bg-accent/50 flex min-h-16 items-center gap-3 rounded-lg border px-3 py-3 transition-colors"
                href={`/api/documents/${document.id}`}
              >
                <FileTextIcon size={18} />
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium">{document.name}</span>
                  <span className="text-muted-foreground block text-xs">
                    {formatDate(document.createdAt)}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <div className="border-border bg-muted/20 mt-4 rounded-lg border border-dashed px-4 py-5">
          <p className="text-muted-foreground text-sm">Прикреплённых чеков пока нет</p>
        </div>
      )}
    </div>
  );
}
