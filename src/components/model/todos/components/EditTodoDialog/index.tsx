import { Button } from '@/components/ui/Button';
import { CloseButton, Dialog, Portal } from '@chakra-ui/react';
import { memo } from 'react';

type Props = {
  trigger: React.ReactNode;
  body: React.ReactNode;
  cancelLabel?: string;
  saveLabel?: string;
  onSave: () => void;
};

export const EditTodoDialog: React.FC<Props> = memo(
  ({
    trigger,
    body,
    cancelLabel = 'キャンセル',
    saveLabel = '保存',
    onSave,
  }) => {
    return (
      <Dialog.Root>
        <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Todo編集画面</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>{body}</Dialog.Body>
              <Dialog.Footer>
                <Dialog.CloseTrigger asChild>
                  <Button variant="cancel">{cancelLabel}</Button>
                </Dialog.CloseTrigger>
                <Dialog.CloseTrigger asChild>
                  <Button onClick={onSave}>{saveLabel}</Button>
                </Dialog.CloseTrigger>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    );
  }
);
