import { CompleteTodos } from './components/model/todos/CompleteTodos';
import { IncompleteTodos } from './components/model/todos/IncompleteTodos';
import { InputTodo } from './components/model/todos/InputTodo';
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
    handleUpdateText,
    handleUpdateStatus,
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
        onUpdateText={handleUpdateText}
        onUpdateStatus={handleUpdateStatus}
      />
      <CompleteTodos
        completeTodos={completeTodos}
        onClickEdit={handleClickEdit}
        onClickSave={handleClickSave}
        onClickDeleteAllItems={handleClickDeleteAllItems}
        onClickEditCancel={handleClickEditCancel}
        onUpdateText={handleUpdateText}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
};
