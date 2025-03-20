import { memo } from 'react';
import { TodoItem } from '../TodoItem';
import styles from './index.module.css';
import type { Todo } from '@/types/todo';

type Props = {
  incompleteTodos: Todo[];
  onClickDelete: (id: string) => void;
  onClickEdit: (todo: Todo) => void;
  onClickSave: (id: string) => void;
  onClickEditCancel: (id: string) => void;
};

export const IncompleteTodos: React.FC<Props> = memo(
  ({
    incompleteTodos,
    onClickDelete,
    onClickEdit,
    onClickSave,
    onClickEditCancel,
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
                onClickEditCancel={onClickEditCancel}
              />
            ))}
          </ul>
        )}
      </div>
    );
  }
);
