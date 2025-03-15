import type { Todo } from '@/types/todo';
import { getLocalStorage } from '@/utils/localStorage';
import { type ChangeEvent, useEffect, useState } from 'react';

const localStorageTodos: Todo[] = getLocalStorage('todos');

export const useTodo = () => {
  /**
   * State
   */
  const [todoText, setTodoText] = useState('');
  const [todos, setTodos] = useState<Todo[]>(localStorageTodos);

  /**
   * Effects
   */
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  /**
   * Methods
   */
  const onChangeTodoText = (event: ChangeEvent<HTMLInputElement>) => {
    setTodoText(event.target.value);
  };

  const onClickAdd = () => {
    if (todoText.trim() === '') return;

    localStorage.setItem('todos', JSON.stringify(todos));
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
  };

  const onClickEdit = (id: string) => {
    const targetIncompleteTodo = todos.find((todo) => todo.id === id);
    if (!targetIncompleteTodo) return;

    const newTodos = [...todos];
    const targetIndex = todos.indexOf(targetIncompleteTodo);
    newTodos[targetIndex] = {
      ...targetIncompleteTodo,
      isEditing: true,
    };
    setTodos(newTodos);
    console.log(todos);
  };

  const onClickDelete = (id: string) => {
    const targetIncompleteTodo = todos.find((todo) => todo.id === id);
    if (!targetIncompleteTodo) return;

    const newTodos = [...todos];
    newTodos.splice(todos.indexOf(targetIncompleteTodo), 1);
    setTodos(newTodos);
  };

  const onClickComplete = (id: string) => {
    const targetIncompleteTodo = todos.find((todo) => todo.id === id);
    if (!targetIncompleteTodo) return;

    const newtodos = [...todos];
    newtodos.splice(todos.indexOf(targetIncompleteTodo), 1);

    setTodos(newtodos);
  };

  const deleteAllTodos = () => {
    localStorage.setItem('todos', JSON.stringify([]));
    setTodos([]);
  };

  const onClickSave = (id: string) => {
    const targetIncompleteTodo = todos.find((todo) => todo.id === id);
    if (!targetIncompleteTodo) return;

    const newTodos = [...todos];
    const targetIndex = todos.indexOf(targetIncompleteTodo);
    newTodos[targetIndex] = {
      ...targetIncompleteTodo,
      isEditing: false,
    };
    setTodos(newTodos);
  };

  return {
    todoText,
    todos,
    onChangeTodoText,
    onClickAdd,
    onClickEdit,
    onClickDelete,
    onClickComplete,
    deleteAllTodos,
    onClickSave,
  };
};
