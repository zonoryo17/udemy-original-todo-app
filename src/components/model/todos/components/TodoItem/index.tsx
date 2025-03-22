import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import styles from './index.module.css';
import type { Todo, Status } from '@/types/todo';
import { EditTodoDialog } from '../EditTodoDialog';
import { memo } from 'react';
import { EditingTodoItem } from '../EditingTodoItem';
import { StatusBudge } from '@/components/ui/StatusBudge';

type Props = {
  item: Todo;
  onClickEdit: (id: Todo) => void;
  onClickSave: (id: string) => void;
  onClickDelete?: (id: string) => void;
  onClickEditCancel: (id: string) => void;
  onTextChange?: (id: string, text: string) => void;
  onStatusChange?: (id: string, status: Status) => void;
};

export const TodoItem: React.FC<Props> = memo(
  ({
    item,
    onClickEdit,
    onClickSave,
    onClickDelete,
    onClickEditCancel,
    onTextChange,
    onStatusChange,
  }) => {
    return (
      <li key={item.id}>
        <div className={styles.container}>
          <div className={styles.leftItem}>
            <StatusBudge status={item.status} />
            <p className="todo-item">{item.text}</p>
          </div>
          <div>
            <EditTodoDialog
              trigger={
                <Button
                  type="button"
                  variant="icon"
                  onClick={() => onClickEdit(item)}
                >
                  <Icon name="edit" color="#3b3b3b" />
                </Button>
              }
              body={
                <EditingTodoItem
                  item={item}
                  onClickEditCancel={onClickEditCancel}
                  onTextChange={onTextChange}
                  onStatusChange={onStatusChange}
                />
              }
              onSave={() => onClickSave(item.id)}
            />
            {item.status !== 'done' && (
              <Button
                type="button"
                variant="icon"
                onClick={() => onClickDelete?.(item.id) || undefined}
              >
                <Icon name="trash" />
              </Button>
            )}
          </div>
        </div>
      </li>
    );
  }
);
