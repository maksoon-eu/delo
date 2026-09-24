'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { deleteOrderDocument } from '@/actions/documents';
import { DeleteIcon } from '@/shared/components/icons/delete';
import { FileTextIcon } from '@/shared/components/icons/file-text';
import { Button } from '@/shared/components/ui/actions/button';
import { useConfirmation } from '@/shared/components/providers/confirmation/confirmation.hook';
import type { OrderDocumentEntry } from '@/types/orders';
import { formatDate } from '@/shared/utils/format';

type OrderDocumentItemProps = {
  document: OrderDocumentEntry;
};

export function OrderDocumentItem(props: OrderDocumentItemProps) {
  const { document } = props;
  const router = useRouter();
  const confirm = useConfirmation();

  async function deleteDocument() {
    const { error } = await deleteOrderDocument(document.id);
    if (error) throw new Error(error);

    toast.success('Документ удалён');
    router.refresh();
  }

  function handleDeleteClick() {
    confirm({
      title: 'Удалить документ?',
      description: 'Это действие нельзя отменить. Документ будет удалён навсегда.',
      confirmLabel: 'Удалить',
      Icon: DeleteIcon,
      destructive: true,
      action: deleteDocument,
    });
  }

  return (
    <li className="relative w-60 shrink-0">
      <a
        className="surface-shadow border-border bg-surface/60 hover:bg-surface h-18.75 flex items-center gap-3 rounded-xl border p-4 pr-12 backdrop-blur-md transition-colors"
        href={`/api/documents/${document.id}`}
      >
        <FileTextIcon className="text-primary shrink-0" size={20} />
        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold">{document.name}</span>
          <span className="text-muted-foreground mt-1 block text-xs">
            {formatDate(document.createdAt)}
          </span>
        </span>
      </a>

      <Button
        type="button"
        mode="icon"
        variant="ghost"
        Icon={DeleteIcon}
        tooltip="Удалить документ"
        className="text-muted-foreground hover:text-destructive absolute right-2 top-2"
        onClick={handleDeleteClick}
      />
    </li>
  );
}
