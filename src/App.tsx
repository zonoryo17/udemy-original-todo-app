import { CompleteTodos } from './components/model/todos/components/CompleteTodos';
import { IncompleteTodos } from './components/model/todos/components/IncompleteTodos';
import { InputTodo } from './components/model/todos/components/InputTodo';
import { useTodo } from './components/model/todos/useTodo';
import './styles.css';

export const App: React.FC = () => {
  const {
    todoText,
    incompleteTodos,
    completeTodos,
    handleChangeTodoText,
    handleClickAdd,
    handleClickDelete,
    handleClickEdit,
    handleClickSave,
    handleClickDeleteAllItems,
    handleClickEditCancel,
    handleTextChange,
    handleStatusChange,
  } = useTodo();

  const isIncompleteTodosLimit = incompleteTodos.length >= 5;

  return (
    <div className="container">
      <InputTodo
        todoText={todoText}
        onChangeTodoText={handleChangeTodoText}
        onClickAdd={handleClickAdd}
        disabled={isIncompleteTodosLimit}
      />

      {isIncompleteTodosLimit && (
        <p style={{ color: 'red' }}>
          登録できるTODOは5個までだよ〜。消化しろ〜。
        </p>
      )}

      <IncompleteTodos
        incompleteTodos={incompleteTodos}
        onClickDelete={handleClickDelete}
        onClickEdit={handleClickEdit}
        onClickSave={handleClickSave}
        onClickEditCancel={handleClickEditCancel}
        onTextChange={handleTextChange}
        onStatusChange={handleStatusChange}
      />
      <CompleteTodos
        completeTodos={completeTodos}
        onClickEdit={handleClickEdit}
        onClickSave={handleClickSave}
        onClickDeleteAllItems={handleClickDeleteAllItems}
        onClickEditCancel={handleClickEditCancel}
        onTextChange={handleTextChange}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};
