import { Icon } from '../ui/Icon';
import styles from './index.module.css';

type Props = {
  completeTodos: string[];
  onClickBack: (index: number) => void;
};

export const CompleteTodos: React.FC<Props> = ({
  completeTodos,
  onClickBack,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.headerWrapper}>
        <p className={styles.title}>完了のTODO</p>
        {completeTodos.length === 0 ? null : (
          <button type="button" className={styles.icon}>
            <Icon name="trash" color="#666" size={18} />
          </button>
        )}
      </div>
      {completeTodos.length === 0 ? (
        <p className={styles.noTodo}>完了したTODOはありません。</p>
      ) : (
        <ul>
          {completeTodos.map((todo, index) => (
            <li key={todo}>
              <div className={styles.listRow}>
                <p className="todo-item">{todo}</p>
                <button
                  type="button"
                  className={styles.button}
                  onClick={() => onClickBack(index)}
                >
                  戻す
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
