import type { Todo } from '@/types/todo';
import { type ChangeEvent, useCallback, useState } from 'react';

export const useTodo = () => {
  /**
   * State
   */
  const [todoText, setTodoText] = useState('');
  // TODO: incompleteTodosとcompleteTodosは分けたほうが再レンダリングを抑えられる
  const [incompleteTodos, setIncompleteTodos] = useState<Todo[]>([]);
  const [completeTodos, setCompleteTodos] = useState<Todo[]>([]);

  /**
   * Methods
   */
  const onChangeTodoText = (event: ChangeEvent<HTMLInputElement>) => {
    setTodoText(event.target.value);
  };

  const onClickAdd = useCallback(() => {
    if (todoText.trim() === '') return;

    setIncompleteTodos((prevTodos) => [
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

  const onClickEdit = useCallback((todo: Todo) => {
    setIncompleteTodos((prevTodos) =>
      prevTodos.map((t) => (t.id === todo.id ? { ...t, isEditing: true } : t))
    );
  }, []);

  const onClickDelete = useCallback(
    (id: string) => {
      const targetIncompleteTodo = incompleteTodos.find(
        (todo) => todo.id === id
      );
      if (!targetIncompleteTodo) return;

      const newTodos = [...incompleteTodos];
      newTodos.splice(incompleteTodos.indexOf(targetIncompleteTodo), 1);
      setIncompleteTodos(newTodos);
    },
    [incompleteTodos]
  );

  const handleClickDeleteAllItems = useCallback(() => {
    const newTodos = completeTodos.filter((todo) => todo.status !== 'done');
    setCompleteTodos(newTodos);
  }, [completeTodos]);

  const onClickSave = useCallback(
    (id: string) => {
      const targetTodo = incompleteTodos.find((todo) => todo.id === id);
      if (!targetTodo) return;

      const newTodos = [
        ...incompleteTodos,
        { ...targetTodo, isEditing: false },
      ];
      setIncompleteTodos(newTodos);
    },
    [incompleteTodos]
  );

  const handleClickEditCancel = useCallback((id: string) => {
    setIncompleteTodos((prevTodos) =>
      [...prevTodos].map((todo) =>
        todo.id === id ? { ...todo, isEditing: false } : todo
      )
    );
  }, []);

  console.log(incompleteTodos, completeTodos);

  return {
    todoText,
    incompleteTodos,
    completeTodos,
    onChangeTodoText,
    onClickAdd,
    onClickEdit,
    onClickDelete,
    handleClickDeleteAllItems,
    onClickSave,
    handleClickEditCancel,
  };
};
