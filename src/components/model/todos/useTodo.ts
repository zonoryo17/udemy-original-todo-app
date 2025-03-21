import type { Todo, Status } from '@/types/todo';
import { type ChangeEvent, useCallback, useState } from 'react';

export const useTodo = () => {
  /**
   * State
   */
  const [todoText, setTodoText] = useState('');
  // TODO: incompleteTodosとcompleteTodosは分けたほうが再レンダリングを抑えられる
  const [incompleteTodos, setIncompleteTodos] = useState<Todo[]>([]);
  const [completeTodos, setCompleteTodos] = useState<Todo[]>([]);
  // 編集中のTodoの一時的な状態を保持
  const [editingTodos, setEditingTodos] = useState<{
    [id: string]: { text: string; status: Status };
  }>({});

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
    setCompleteTodos((prevTodos) =>
      prevTodos.map((t) => (t.id === todo.id ? { ...t, isEditing: true } : t))
    );

    setEditingTodos((prev) => ({
      ...prev,
      [todo.id]: { text: todo.text, status: todo.status },
    }));
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
    setCompleteTodos([]);
  }, []);

  // 編集中のテキスト更新
  const handleUpdateText = useCallback((id: string, text: string) => {
    setEditingTodos((prev) => {
      if (!prev[id]) return prev;

      return {
        ...prev,
        [id]: { ...prev[id], text },
      };
    });
  }, []);

  const handleUpdateStatus = useCallback(
    (id: string, status: Status) => {
      setEditingTodos((prev) => {
        if (!prev[id]) {
          const targetIncompleteTodo = incompleteTodos.find(
            (todo) => todo.id === id
          );
          const targetCompleteTodo = completeTodos.find(
            (todo) => todo.id === id
          );
          const targetTodo = targetIncompleteTodo || targetCompleteTodo;

          if (!targetTodo) return prev;

          return {
            ...prev,
            [id]: { text: targetTodo.text, status },
          };
        }

        return {
          ...prev,
          [id]: { ...prev[id], status },
        };
      });
    },
    [incompleteTodos, completeTodos]
  );

  const onClickSave = useCallback(
    (id: string) => {
      const editData = editingTodos[id];
      if (!editData) return;

      const targetIncompleteTodo = incompleteTodos.find(
        (todo) => todo.id === id
      );
      const targetCompleteTodo = completeTodos.find((todo) => todo.id === id);

      if (!targetIncompleteTodo && !targetCompleteTodo) return;

      const updatedTodo: Todo = {
        id,
        text: editData.text,
        status: editData.status,
        isEditing: false,
      };

      if (editData.status === 'done') {
        if (targetIncompleteTodo) {
          setIncompleteTodos((prev) => prev.filter((todo) => todo.id !== id));
          setCompleteTodos((prev) => [...prev, updatedTodo]);
        } else if (targetCompleteTodo) {
          setCompleteTodos((prev) =>
            prev.map((todo) => (todo.id === id ? updatedTodo : todo))
          );
        }
      } else {
        if (targetIncompleteTodo) {
          setIncompleteTodos((prev) =>
            prev.map((todo) => (todo.id === id ? updatedTodo : todo))
          );
        } else if (targetCompleteTodo) {
          setCompleteTodos((prev) => prev.filter((todo) => todo.id !== id));
          setIncompleteTodos((prev) => [...prev, updatedTodo]);
        }
      }

      setEditingTodos((prev) => {
        const newData = { ...prev };
        delete newData[id];
        return newData;
      });
    },
    [incompleteTodos, completeTodos, editingTodos]
  );

  const handleClickEditCancel = useCallback((id: string) => {
    // 編集モードを解除
    setIncompleteTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: false } : todo
      )
    );
    setCompleteTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: false } : todo
      )
    );

    // 編集データをクリア
    setEditingTodos((prev) => {
      const newData = { ...prev };
      delete newData[id];
      return newData;
    });
  }, []);

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
    handleUpdateText,
    handleUpdateStatus,
    editingTodos,
  };
};
