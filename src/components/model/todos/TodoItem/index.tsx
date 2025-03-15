import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { StatusBudge } from '@/components/ui/StatusBudge';
import styles from './index.module.css';
import type { Todo } from '@/types/todo';
import { EditTodoDialog } from '../EditTodoDialog';

type Props = {
  item: Todo;
  onClickEdit: (id: string) => void;
  onClickSave: (id: string) => void;
  onClickDelete?: (id: string) => void;
};

export const TodoItem: React.FC<Props> = ({
  item,
  onClickEdit,
  onClickSave,
  onClickDelete,
}) => {
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
                onClick={() => onClickEdit(item.id)}
              >
                <Icon name="edit" color="#3b3b3b" />
              </Button>
            }
            body={<p>編集内容</p>}
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
};
