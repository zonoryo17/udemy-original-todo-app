import { ConfirmDialog } from '../../../ui/ConfirmDialog';
import { Icon } from '../../../ui/Icon';
import styles from './index.module.css';
import type { Todo } from '@/types/todo';
import { TodoItem } from '../TodoItem';
import { memo } from 'react';

type Props = {
  completeTodos: Todo[];
  onClickEdit: (id: Todo) => void;
  onClickSave: (id: string) => void;
  onClickDeleteAllItems: () => void;
  onClickEditCancel: (id: string) => void;
};

export const CompleteTodos: React.FC<Props> = memo(
  ({
    completeTodos,
    onClickEdit,
    onClickSave,
    onClickDeleteAllItems,
    onClickEditCancel,
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
              onConfirm={onClickDeleteAllItems}
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
                onClickEditCancel={onClickEditCancel}
              />
            ))}
          </ul>
        )}
      </div>
    );
  }
);
