import type { ChangeEvent } from 'react';
import { useInputTodo } from './useInputTodo';

const style = {
  backgroundColor: '#c6e5d9',
  width: '400px',
  height: '30px',
  padding: '8px',
  margin: '8px',
  borderRadius: '8px',
};

type Props = {
  todoText: string;
  onChangeTodoText: (e: ChangeEvent<HTMLInputElement>) => void;
  onClickAdd: () => void;
  disabled: boolean;
};

export const InputTodo: React.FC<Props> = ({
  todoText,
  onChangeTodoText,
  onClickAdd,
  disabled,
}) => {
  const { handleSubmit } = useInputTodo({ onClickAdd });

  return (
    <form style={style} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="TODOを入力"
        value={todoText}
        onChange={onChangeTodoText}
        disabled={disabled}
      />
      <button type="submit" disabled={disabled}>
        追加
      </button>
    </form>
  );
};
