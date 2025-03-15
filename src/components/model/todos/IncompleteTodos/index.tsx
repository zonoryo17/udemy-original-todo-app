import { TodoItem } from '../TodoItem';
import styles from './index.module.css';
import type { Todo } from '@/types/todo';

type Props = {
  incompleteTodos: Todo[];
  onClickDelete: (id: string) => void;
  onClickEdit: (id: string) => void;
  onClickSave: (id: string) => void;
};

export const IncompleteTodos: React.FC<Props> = ({
  incompleteTodos,
  onClickDelete,
  onClickEdit,
  onClickSave,
}) => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>未完了のTODO</p>
      {incompleteTodos.length === 0 ? (
        <p className={styles.noTodo}>未完了のTODOはありません。</p>
      ) : (
        <ul className={styles.list}>
          {incompleteTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              item={todo}
              onClickDelete={onClickDelete}
              onClickEdit={onClickEdit}
              onClickSave={onClickSave}
            />
          ))}
        </ul>
      )}
    </div>
  );
};
