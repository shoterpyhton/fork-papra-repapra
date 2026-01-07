import type { Document } from './documents.types';
import { createSignal } from 'solid-js';
import { useI18n } from '../i18n/i18n.provider';
import { useConfirmModal } from '../shared/confirm';
import { queryClient } from '../shared/query/query-client';
import { createToast } from '../ui/components/sonner';
import { deleteDocument, restoreDocument } from './documents.services';

export function invalidateOrganizationDocumentsQuery({ organizationId }: { organizationId: string }) {
  return queryClient.invalidateQueries({
    queryKey: ['organizations', organizationId],
  });
}

export function useDeleteDocument() {
  const { t } = useI18n();
  const { confirm } = useConfirmModal();

  return {
    async deleteDocument({ documentId, organizationId, documentName }: { documentId: string; organizationId: string; documentName: string }): Promise<{ hasDeleted: boolean }> {
      const isConfirmed = await confirm({
        title: t('documents.delete.title'),
        message: (
          <>
            {t('documents.delete.confirm')}
            {' '}
            <span class="font-bold">{documentName}</span>
            ?
          </>
        ),
        confirmButton: {
          text: t('documents.delete.confirm-button'),
          variant: 'destructive',
        },
        cancelButton: {
          text: t('common.cancel'),
        },
      });

      if (!isConfirmed) {
        return { hasDeleted: false };
      }

      await deleteDocument({
        documentId,
        organizationId,
      });

      await invalidateOrganizationDocumentsQuery({ organizationId });
      createToast({ type: 'success', message: t('documents.delete.success') });

      return { hasDeleted: true };
    },
  };
}

export function useRestoreDocument() {
  const { t } = useI18n();
  const [getIsRestoring, setIsRestoring] = createSignal(false);

  return {
    getIsRestoring,
    async restore({ document }: { document: Document }) {
      setIsRestoring(true);

      await restoreDocument({
        documentId: document.id,
        organizationId: document.organizationId,
      });

      await invalidateOrganizationDocumentsQuery({ organizationId: document.organizationId });

      createToast({ type: 'success', message: t('documents.restore.success') });
      setIsRestoring(false);
    },
  };
}
