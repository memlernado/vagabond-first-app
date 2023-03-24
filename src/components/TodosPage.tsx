import TaskInput from "components/TaskInput";
import TodoCard from "components/TodoCard";
import { useAppDispatch, useAppSelector } from "store";
import { toggleCompleted } from "store/features/todosSlice";
import styled from "styled-components";

const TodoList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 0;
  padding: 0;
  list-style: none;
  width: 100%;
  max-width: 600px;
`;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 80px;
  padding: 10px;
`;

const TodosPage: React.FC = () => {
  const todos = useAppSelector((state) => state.todos.todos);
  const dispatch = useAppDispatch();

  return (
    <Layout>
      <TaskInput />

      <TodoList>
        {todos.map((todo) => (
          <TodoCard
            key={todo.$id}
            title={todo.title}
            isCompleted={todo.isCompleted}
            toggleCompleted={() =>
              dispatch(
                toggleCompleted({
                  $id: todo.$id,
                  isCompleted: !todo.isCompleted,
                })
              )
            }
          />
        ))}
      </TodoList>
    </Layout>
  );
};

export default TodosPage;
