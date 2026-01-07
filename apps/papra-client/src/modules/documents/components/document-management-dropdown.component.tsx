import type { DropdownMenuSubTriggerProps } from '@kobalte/core/dropdown-menu';
import type { Component } from 'solid-js';
import type { Document } from '../documents.types';
import { A } from '@solidjs/router';
import { useI18n } from '@/modules/i18n/i18n.provider';
import { Button } from '@/modules/ui/components/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/modules/ui/components/dropdown-menu';
import { useDeleteDocument } from '../documents.composables';
import { useRenameDocumentDialog } from './rename-document-button.component';

export const DocumentManagementDropdown: Component<{ document: Document }> = (props) => {
  const { t } = useI18n();
  const { deleteDocument } = useDeleteDocument();
  const { openRenameDialog } = useRenameDocumentDialog();

  const deleteDoc = () => deleteDocument({
    documentId: props.document.id,
    organizationId: props.document.organizationId,
    documentName: props.document.name,
  });

  return (

    <DropdownMenu>
      <DropdownMenuTrigger
        as={(props: DropdownMenuSubTriggerProps) => (
          <Button variant="ghost" size="icon" {...props}>
            <div class="i-tabler-dots-vertical size-4" />
          </Button>
        )}
      />
      <DropdownMenuContent class="w-48">
        <DropdownMenuItem
          class="cursor-pointer "
          as={A}
          href={`/organizations/${props.document.organizationId}/documents/${props.document.id}`}
        >
          <div class="i-tabler-info-circle size-4 mr-2" />
          <span>{t('documents.actions.details')}</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          class="cursor-pointer"
          onClick={() => openRenameDialog({
            documentId: props.document.id,
            organizationId: props.document.organizationId,
            documentName: props.document.name,
          })}
        >
          <div class="i-tabler-pencil size-4 mr-2" />
          <span>{t('documents.actions.rename')}</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          class="cursor-pointer text-red"
          onClick={() => deleteDoc()}
        >
          <div class="i-tabler-trash size-4 mr-2" />
          <span>{t('documents.actions.delete')}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

  );
};
