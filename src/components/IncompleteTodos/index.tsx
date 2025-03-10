import styles from './index.module.css';

type Props = {
  incompleteTodos: string[];
  onClickDelete: (index: number) => void;
  onClickComplete: (index: number) => void;
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
        <ul>
          {incompleteTodos.map((todo, index) => (
            <li key={todo}>
              <div className={styles.listRow}>
                <p className="todo-item">{todo}</p>
                <div>
                  <button
                    type="button"
                    className={styles.button}
                    onClick={() => onClickComplete(index)}
                  >
                    完了
                  </button>
                  <button
                    type="button"
                    className={styles.button}
                    onClick={() => onClickDelete(index)}
                  >
                    削除
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
