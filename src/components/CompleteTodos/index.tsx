type Props = {
  completeTodos: string[];
  onClickBack: (index: number) => void;
};

export const CompleteTodos: React.FC<Props> = ({
  completeTodos,
  onClickBack,
}) => {
  return (
    <div className="complete-area">
      <p className="title">完了のTODO</p>
      <ul>
        {completeTodos.map((todo, index) => (
          <li key={todo}>
            <div className="list-row">
              <p className="todo-item">{todo}</p>
              <button type="button" onClick={() => onClickBack(index)}>
                戻す
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
