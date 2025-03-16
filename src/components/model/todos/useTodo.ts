import type { Todo } from '@/types/todo';
import { type ChangeEvent, useCallback, useState } from 'react';

export const useTodo = () => {
  /**
   * State
   */
  const [todoText, setTodoText] = useState('');
  // TODO: incompleteTodosとcompleteTodosは分けたほうが再レンダリングを抑えられる
  const [todos, setTodos] = useState<Todo[]>([]);

  /**
   * Methods
   */
  const onChangeTodoText = (event: ChangeEvent<HTMLInputElement>) => {
    setTodoText(event.target.value);
  };

  const onClickAdd = useCallback(() => {
    if (todoText.trim() === '') return;

    setTodos((prevTodos) => [
      ...prevTodos,
      {
        id: crypto.randomUUID(),
        text: todoText,
        status: 'todo',
        isEditing: false,
      },
    ]);
    setTodoText('');
  }, [todoText]);

  const onClickEdit = useCallback((id: string) => {
    setTodos((prevTodos) =>
      [...prevTodos].map((todo) =>
        todo.id === id ? { ...todo, isEditing: true } : todo
      )
    );
  }, []);

  const onClickDelete = useCallback(
    (id: string) => {
      const targetIncompleteTodo = todos.find((todo) => todo.id === id);
      if (!targetIncompleteTodo) return;

      const newTodos = [...todos];
      newTodos.splice(todos.indexOf(targetIncompleteTodo), 1);
      setTodos(newTodos);
    },
    [todos]
  );

  const handleClickDeleteAllItems = useCallback(() => {
    const newTodos = todos.filter((todo) => todo.status !== 'done');
    setTodos(newTodos);
  }, [todos]);

  const onClickSave = useCallback(
    (id: string) => {
      const targetTodo = todos.find((todo) => todo.id === id);
      if (!targetTodo) return;

      const newTodos = [...todos, { ...targetTodo, isEditing: false }];
      setTodos(newTodos);
    },
    [todos]
  );

  console.log(todos);

  return {
    todoText,
    todos,
    onChangeTodoText,
    onClickAdd,
    onClickEdit,
    onClickDelete,
    handleClickDeleteAllItems,
    onClickSave,
  };
};
