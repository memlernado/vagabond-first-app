import TaskInput, { INPUT_HEIGHT } from "components/TaskInput";
import TodoCard from "components/TodoCard";
import { todosService } from "services/appwrite";
import { useAppDispatch, useAppSelector } from "store";
import { updateLocalTodo } from "store/features/todosSlice";
import styled from "styled-components";
import { NAV_HEIGHT } from "./Header";
import {
  ScrollAreaCorner,
  ScrollAreaRoot,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from "./ScrollArea";

const LAYOUT_GAP = "80px";

const TodoList = styled(ScrollAreaRoot)`
  width: 100%;
  max-width: 600px;
  height: calc(100vh - ${NAV_HEIGHT} - ${LAYOUT_GAP} - ${INPUT_HEIGHT} - 20px);
`;
const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 0;
  padding: 0;
`;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${LAYOUT_GAP};
  padding: 10px;
`;

const TodosPage: React.FC = () => {
  const todos = useAppSelector((state) => state.todos.todos);
  const dispatch = useAppDispatch();

  return (
    <Layout>
      <TaskInput />

      <TodoList>
        <ScrollAreaViewport>
          <Box>
            {todos.map((todo) => (
              <TodoCard
                key={todo.$id}
                title={todo.title}
                isCompleted={todo.isCompleted}
                toggleCompleted={async () => {
                  const newState = !todo.isCompleted;
                  try {
                    dispatch(
                      updateLocalTodo({
                        ...todo,
                        isCompleted: newState,
                      })
                    );
                    await todosService.updateTodo(todo.$id, {
                      isCompleted: newState,
                    });
                  } catch (error) {
                    // TODO: show toast error
                    dispatch(
                      updateLocalTodo({
                        ...todo,
                        isCompleted: !newState,
                      })
                    );
                  }
                }}
              />
            ))}
          </Box>
        </ScrollAreaViewport>
        <ScrollAreaScrollbar orientation="vertical">
          <ScrollAreaThumb />
        </ScrollAreaScrollbar>
        <ScrollAreaCorner />
      </TodoList>
    </Layout>
  );
};

export default TodosPage;
