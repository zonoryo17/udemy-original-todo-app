import { Button } from '@/components/ui/Button';
import styles from './index.module.css';
import type { Todo } from '@/types/todo';
import { StatusSelectMenu } from '../StatusSelectMenu';

type Props = {
  item: Todo;
  onClickCancel: () => void;
  onClickSave: (id: string) => void;
};

export const EditingTodoItem: React.FC<Props> = ({
  item,
  onClickCancel,
  onClickSave,
}) => {
  return (
    <li key={item.id}>
      <div className={styles.listRow}>
        <div className={styles.listLeftItem}>
          <StatusSelectMenu />
          <p className="todo-item">{item.text}</p>
        </div>
        <div className={styles.listRightItem}>
          <Button type="button" variant="icon" onClick={onClickCancel}>
            キャンセル
          </Button>
          <Button
            type="button"
            variant="icon"
            onClick={() => onClickSave(item.id)}
          >
            保存
          </Button>
        </div>
      </div>
    </li>
  );
};
