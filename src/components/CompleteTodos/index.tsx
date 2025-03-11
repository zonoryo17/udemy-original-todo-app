import { Button } from '../ui/Button';
import { ConfirmDialog } from '../ui/ConfirmDialog';
import { Icon } from '../ui/Icon';
import styles from './index.module.css';
import { useCompleteTodos } from './useCompleteTodos';

type Props = {
  completeTodos: string[];
  onClickBack: (index: number) => void;
};

export const CompleteTodos: React.FC<Props> = ({
  completeTodos,
  onClickBack,
}) => {
  const { handleConfirm } = useCompleteTodos();

  return (
    <div className={styles.container}>
      <div className={styles.headerWrapper}>
        <p className={styles.title}>完了のTODO</p>
        {completeTodos.length === 0 ? null : (
          <ConfirmDialog
            trigger={
              <button type="button" className={styles.icon}>
                <Icon name="trash" color="#666" size={18} />
              </button>
            }
            title="完了のTODOを全て削除します"
            message="本当に削除してもよろしいですか？"
            confirmLabel="削除"
            theme="danger"
            onConfirm={handleConfirm}
          />
        )}
      </div>
      {completeTodos.length === 0 ? (
        <p className={styles.noTodo}>完了したTODOはありません。</p>
      ) : (
        <ul className={styles.list}>
          {completeTodos.map((todo, index) => (
            <li key={todo}>
              <div className={styles.listRow}>
                <p className="todo-item">{todo}</p>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => onClickBack(index)}
                >
                  戻す
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
