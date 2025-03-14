import type { Todo } from '@/types/todo';
import { Button } from '../ui/Button';
import { StatusBudge } from '../ui/StatusBudge';
import styles from './index.module.css';
import { Icon } from '../ui/Icon';

type Props = {
  incompleteTodos: Todo[];
  onClickDelete: (id: string) => void;
  onClickComplete: (id: string) => void;
};

export const IncompleteTodos: React.FC<Props> = ({
  incompleteTodos,
  onClickDelete,
  onClickComplete,
}) => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>未完了のTODO</p>
      {incompleteTodos.length === 0 ? (
        <p className={styles.noTodo}>未完了のTODOはありません。</p>
      ) : (
        <ul className={styles.list}>
          {incompleteTodos.map((todo) => (
            <li key={todo.id}>
              <div className={styles.listRow}>
                <div className={styles.listLeftItem}>
                  <StatusBudge status={todo.status} />
                  <p className="todo-item">{todo.text}</p>
                </div>
                <div className={styles.listRightItem}>
                  <Button
                    type="button"
                    variant="icon"
                    onClick={() => onClickComplete(todo.id)}
                  >
                    <Icon name="edit" color="#3b3b3b" />
                  </Button>
                  <Button
                    type="button"
                    variant="icon"
                    onClick={() => onClickDelete(todo.id)}
                  >
                    <Icon name="trash" />
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
