import { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Header from "components/Header";
import { themes } from "styles/themes";
import { useAppDispatch, useAppSelector } from "store";
import {
  accountService,
  appwriteClient,
  TODOS_RT_CHANNEL,
  TODOS_RT_EVENTS,
} from "services/appwrite";
import { setUser } from "store/features/authSlice";
import {
  addLocalTodo,
  deleteLocalTodo,
  fetchTodos,
  updateLocalTodo,
} from "store/features/todosSlice";
import { Route, Routes, useNavigate } from "react-router-dom";
import TodosPage from "components/TodosPage";
import MapPage from "components/MapPage";
import Login from "components/Login";
import RouteGuard from "components/RouteGuard";
import { ITodo } from "types/todo";

const AppLayout = styled.main`
  height: 100vh;
  background-color: ${({ theme }) => theme.pageBackgroundColor};
  overflow: hidden;
`;

function App() {
  const theme = useAppSelector((state) => state.theme.theme);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [userResolved, setUserResolve] = useState(false);

  useEffect(() => {
    accountService
      .get()
      .then((user) => {
        if (user) {
          dispatch(setUser(user));
          dispatch(fetchTodos());
        }
      })
      .catch((e) => {
        if (e.code === 401) {
          navigate("login");
        }
      })
      .finally(() => setUserResolve(true));
  }, []);

  useEffect(() => {
    const unsub = appwriteClient.subscribe<ITodo>(
      TODOS_RT_CHANNEL,
      ({ events, payload }) => {
        if (events.includes(TODOS_RT_EVENTS.update))
          dispatch(updateLocalTodo(payload));
        else if (events.includes(TODOS_RT_EVENTS.create))
          dispatch(addLocalTodo(payload));
        else if (events.includes(TODOS_RT_EVENTS.delete))
          dispatch(deleteLocalTodo(payload.$id));
      }
    );
    return () => unsub();
  }, []);

  return (
    <ThemeProvider theme={themes[theme]}>
      <AppLayout>
        <Header />
        {userResolved && (
          <Routes>
            <Route
              path="/"
              element={
                <RouteGuard>
                  <TodosPage />
                </RouteGuard>
              }
            />
            <Route
              path="map"
              element={
                <RouteGuard>
                  <MapPage />
                </RouteGuard>
              }
            />
            <Route path="login" element={<Login />} />
          </Routes>
        )}
      </AppLayout>
    </ThemeProvider>
  );
}

export default App;
