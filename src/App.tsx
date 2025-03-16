import { useMemo } from 'react';
import { CompleteTodos } from './components/model/todos/CompleteTodos';
import { IncompleteTodos } from './components/model/todos/IncompleteTodos';
import { InputTodo } from './components/model/todos/InputTodo';
import { useTodo } from './components/model/todos/useTodo';
import './styles.css';

export const App: React.FC = () => {
  const {
    todoText,
    todos,
    onChangeTodoText,
    onClickAdd,
    onClickDelete,
    onClickEdit,
    onClickSave,
    handleClickDeleteAllItems,
  } = useTodo();
  const incompleteTodos = useMemo(
    () => todos.filter((todo) => todo.status !== 'done'),
    [todos]
  );
  const completeTodos = useMemo(
    () => todos.filter((todo) => todo.status === 'done'),
    [todos]
  );
  const isIncompleteTodosLimit = incompleteTodos.length >= 5;

  return (
    <div className="container">
      <InputTodo
        todoText={todoText}
        onChangeTodoText={onChangeTodoText}
        onClickAdd={onClickAdd}
        disabled={isIncompleteTodosLimit}
      />

      {isIncompleteTodosLimit && (
        <p style={{ color: 'red' }}>
          登録できるTODOは5個までだよ〜。消化しろ〜。
        </p>
      )}

      <IncompleteTodos
        incompleteTodos={incompleteTodos}
        onClickDelete={onClickDelete}
        onClickEdit={onClickEdit}
        onClickSave={onClickSave}
      />
      <CompleteTodos
        completeTodos={completeTodos}
        onClickEdit={onClickEdit}
        onClickSave={onClickSave}
        onClickDeleteAllItems={handleClickDeleteAllItems}
      />
    </div>
  );
};
