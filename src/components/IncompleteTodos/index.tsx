import { Icon } from '../ui/Icon';
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
    <div className="incomplete-area">
      <div className={styles.headerWrapper}>
        <p className="title">未完了のTODO</p>
        <Icon name="trash" size={32} />
      </div>
      <ul>
        {incompleteTodos.map((todo, index) => (
          <li key={todo}>
            <div className="list-row">
              <p className="todo-item">{todo}</p>
              <button type="button" onClick={() => onClickComplete(index)}>
                完了
              </button>
              <button type="button" onClick={() => onClickDelete(index)}>
                削除
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
