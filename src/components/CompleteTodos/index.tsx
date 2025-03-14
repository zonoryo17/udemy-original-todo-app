import { useTodo } from '@/hooks/useTdoo';
import { ConfirmDialog } from '../ui/ConfirmDialog';
import { Icon } from '../ui/Icon';
import styles from './index.module.css';
import type { Todo } from '@/types/todo';
import { StatusBudge } from '../ui/StatusBudge';

type Props = {
  completeTodos: Todo[];
  onClickBack: (id: string) => void;
};

export const CompleteTodos: React.FC<Props> = ({ completeTodos }) => {
  const { deleteAllTodos } = useTodo();

  return (
    <div className={styles.container}>
      <div className={styles.headerWrapper}>
        <p className={styles.title}>完了のTODO</p>
        {completeTodos.length === 0 ? null : (
          <ConfirmDialog
            trigger={
              <button type="button" className={styles.icon}>
                <Icon name="trash" color="#666" />
              </button>
            }
            title="完了のTODOを全て削除します"
            message="本当に削除してもよろしいですか？"
            confirmLabel="削除"
            theme="danger"
            onConfirm={deleteAllTodos}
          />
        )}
      </div>

      {completeTodos.length === 0 ? (
        <p className={styles.noTodo}>完了したTODOはありません。</p>
      ) : (
        <ul className={styles.list}>
          {completeTodos.map((todo) => (
            <li key={todo.id}>
              <div className={styles.listRow}>
                <StatusBudge status={todo.status} />
                <p className="todo-item">{todo.text}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
