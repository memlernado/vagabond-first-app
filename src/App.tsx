import { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Header, { NAV_HEIGHT } from "./components/Header";
import TaskInput from "./components/TaskInput";
import TodoCard from "./components/TodoCard";
import { themes } from "./styles/themes";
import type { RootState } from "./store";
import { useAppDispatch, useAppSelector } from "./store";
import { accountService } from "./services/appwrite";
import { setUser } from "./store/features/authSlice";
import { fetchTodos, toggleCompleted } from "./store/features/todosSlice";

const Layout = styled.main`
  height: 100vh;
  display: grid;
  justify-items: center;
  grid-template-rows: ${NAV_HEIGHT} auto 1fr;
  row-gap: 35px;
  padding: 10px;
  background-color: ${({ theme }) => theme.pageBackgroundColor};
`;

const TodoList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 0;
  padding: 80px 0 0 0;
  list-style: none;
  width: 100%;
  max-width: 600px;
`;

const getUser = async () => {
  let appWriteUser;
  try {
    appWriteUser = await accountService.get();
  } catch (error) {
    try {
      await accountService.createAnonymousSession();
      appWriteUser = await accountService.get();
    } catch (error) {
      console.error(error);
    }
  }

  return appWriteUser;
};

function App() {
  const [isDarkMode, setDarkMode] = useState(false);
  const todos = useAppSelector((state: RootState) => state.todos.todos);
  const dispatch = useAppDispatch();
  useEffect(() => {
    getUser().then((s) => {
      if (s) {
        dispatch(setUser(s));
        dispatch(fetchTodos());
      }
    });
  }, []);
  return (
    <ThemeProvider theme={themes[isDarkMode ? "dark" : "light"]}>
      <Layout>
        <Header
          toggleDarkMode={() => setDarkMode(!isDarkMode)}
          theme={isDarkMode ? "dark" : "light"}
        />
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
    </ThemeProvider>
  );
}

export default App;
