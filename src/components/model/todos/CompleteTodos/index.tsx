import { ConfirmDialog } from '../../../ui/ConfirmDialog';
import { Icon } from '../../../ui/Icon';
import styles from './index.module.css';
import type { Todo } from '@/types/todo';
import { TodoItem } from '../TodoItem';

type Props = {
  completeTodos: Todo[];
  onClickEdit: (id: string) => void;
  onClickSave: (id: string) => void;
  deleteAllTodos: () => void;
};

export const CompleteTodos: React.FC<Props> = ({
  completeTodos,
  onClickEdit,
  onClickSave,
  deleteAllTodos,
}) => {
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
            <TodoItem
              key={todo.id}
              item={todo}
              onClickEdit={onClickEdit}
              onClickSave={onClickSave}
            />
          ))}
        </ul>
      )}
    </div>
  );
};
