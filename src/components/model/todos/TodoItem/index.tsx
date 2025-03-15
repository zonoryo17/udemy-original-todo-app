import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { StatusBudge } from '@/components/ui/StatusBudge';
import styles from './index.module.css';
import type { Todo } from '@/types/todo';

type Props = {
  item: Todo;
  onClickDelete: (id: string) => void;
  onClickEdit: (id: string) => void;
};

export const TodoItem: React.FC<Props> = ({
  item,
  onClickDelete,
  onClickEdit,
}) => {
  return (
    <li key={item.id}>
      <div className={styles.listRow}>
        <div className={styles.listLeftItem}>
          <StatusBudge status={item.status} />
          <p className="todo-item">{item.text}</p>
        </div>
        <div className={styles.listRightItem}>
          <Button
            type="button"
            variant="icon"
            onClick={() => onClickEdit(item.id)}
          >
            <Icon name="edit" color="#3b3b3b" />
          </Button>
          <Button
            type="button"
            variant="icon"
            onClick={() => onClickDelete(item.id)}
          >
            <Icon name="trash" />
          </Button>
        </div>
      </div>
    </li>
  );
};
