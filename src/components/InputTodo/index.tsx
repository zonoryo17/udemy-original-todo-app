import type { ChangeEvent } from 'react';
import { useInputTodo } from './useInputTodo';
import styles from './index.module.css';
import { Button } from '../ui/Button';

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
    <form className={styles.container} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="TODOを入力"
        value={todoText}
        onChange={onChangeTodoText}
        disabled={disabled}
        className={styles.input}
      />
      <Button type="submit" disabled={disabled}>
        追加
      </Button>
    </form>
  );
};
