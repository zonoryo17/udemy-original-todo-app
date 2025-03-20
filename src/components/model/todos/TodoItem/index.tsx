import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import styles from './index.module.css';
import type { Todo } from '@/types/todo';
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
};

export const TodoItem: React.FC<Props> = memo(
  ({ item, onClickEdit, onClickSave, onClickDelete, onClickEditCancel }) => {
    return (
      <li key={item.id}>
        <div className={styles.listRow}>
          <div className={styles.listLeftItem}>
            <StatusBudge status={item.status} />
            <p className="todo-item">{item.text}</p>
          </div>
          <div className={styles.listRightItem}>
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
