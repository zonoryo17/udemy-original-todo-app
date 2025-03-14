import { CompleteTodos } from './components/CompleteTodos';
import { IncompleteTodos } from './components/IncompleteTodos';
import { InputTodo } from './components/InputTodo';
import { useTodo } from './hooks/useTdoo';
import './styles.css';

export const App: React.FC = () => {
  const {
    todoText,
    incompleteTodos,
    completeTodos,
    onChangeTodoText,
    onClickAdd,
    onClickDelete,
    onClickComplete,
    onClickBack,
  } = useTodo();

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
        onClickComplete={onClickComplete}
      />
      <CompleteTodos completeTodos={completeTodos} onClickBack={onClickBack} />
    </div>
  );
};
