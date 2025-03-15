import type { Todo } from '@/types/todo';
import { getLocalStorage } from '@/utils/localStorage';
import { type ChangeEvent, useEffect, useState } from 'react';

const localStorageIncompleteTodos: Todo[] = getLocalStorage('incompleteTodos');
const localStorageCompleteTodos: Todo[] = getLocalStorage('completeTodos');

export const useTodo = () => {
  /**
   * State
   */
  const [todoText, setTodoText] = useState('');
  const [incompleteTodos, setIncompleteTodos] = useState<Todo[]>(
    localStorageIncompleteTodos
  );
  const [completeTodos, setCompleteTodos] = useState<Todo[]>(
    localStorageCompleteTodos
  );

  /**
   * Effects
   */
  useEffect(() => {
    localStorage.setItem('incompleteTodos', JSON.stringify(incompleteTodos));
    localStorage.setItem('completeTodos', JSON.stringify(completeTodos));
  }, [incompleteTodos, completeTodos]);

  /**
   * Methods
   */
  const onChangeTodoText = (event: ChangeEvent<HTMLInputElement>) => {
    setTodoText(event.target.value);
  };

  const onClickAdd = () => {
    if (todoText.trim() === '') return;

    localStorage.setItem('incompleteTodos', JSON.stringify(incompleteTodos));
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
  };

  const onClickEdit = (id: string) => {
    const targetIncompleteTodo = incompleteTodos.find((todo) => todo.id === id);
    if (!targetIncompleteTodo) return;

    const newTodos = [...incompleteTodos];
    const targetIndex = incompleteTodos.indexOf(targetIncompleteTodo);
    newTodos[targetIndex] = {
      ...targetIncompleteTodo,
      isEditing: true,
    };
    setIncompleteTodos(newTodos);
    console.log(incompleteTodos);
  };

  const onClickDelete = (id: string) => {
    const targetIncompleteTodo = incompleteTodos.find((todo) => todo.id === id);
    if (!targetIncompleteTodo) return;

    const newTodos = [...incompleteTodos];
    newTodos.splice(incompleteTodos.indexOf(targetIncompleteTodo), 1);
    setIncompleteTodos(newTodos);
  };

  const onClickComplete = (id: string) => {
    const targetIncompleteTodo = incompleteTodos.find((todo) => todo.id === id);
    if (!targetIncompleteTodo) return;

    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(incompleteTodos.indexOf(targetIncompleteTodo), 1);

    const newCompleteTodos = [...completeTodos, targetIncompleteTodo];
    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  const onClickBack = (id: string) => {
    const targetCompleteTodo = completeTodos.find((todo) => todo.id === id);
    if (!targetCompleteTodo) return;

    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(completeTodos.indexOf(targetCompleteTodo), 1);

    const newIncompleteTodos = [...incompleteTodos, targetCompleteTodo];
    setCompleteTodos(newCompleteTodos);
    setIncompleteTodos(newIncompleteTodos);
  };

  const deleteAllTodos = () => {
    localStorage.setItem('completeTodos', JSON.stringify([]));
    setCompleteTodos([]);
  };

  return {
    todoText,
    incompleteTodos,
    completeTodos,
    onChangeTodoText,
    onClickAdd,
    onClickEdit,
    onClickDelete,
    onClickComplete,
    onClickBack,
    deleteAllTodos,
  };
};
