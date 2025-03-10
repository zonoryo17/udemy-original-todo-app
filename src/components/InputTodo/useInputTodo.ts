type Props = {
  onClickAdd: () => void;
};

export const useInputTodo = ({ onClickAdd }: Props) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onClickAdd();
  };

  return {
    handleSubmit,
  };
};
