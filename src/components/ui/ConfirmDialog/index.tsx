import { CloseButton, Dialog, Portal } from '@chakra-ui/react';
import { Button } from '../Button';

type Props = {
  trigger: React.ReactNode;
  title?: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  theme?: 'primary' | 'danger';
  onConfirm: () => void;
};

export const ConfirmDialog: React.FC<Props> = ({
  trigger,
  title = '確認',
  message = '本当に実行しますか？',
  confirmLabel = '実行',
  cancelLabel = 'キャンセル',
  theme = 'primary',
  onConfirm,
}) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>{message}</Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="secondary">{cancelLabel}</Button>
              </Dialog.ActionTrigger>
              <Dialog.CloseTrigger asChild>
                <Button variant={theme} onClick={onConfirm}>
                  {confirmLabel}
                </Button>
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
};
