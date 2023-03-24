import { useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import Header from "components/Header";
import { themes } from "styles/themes";
import { useAppDispatch, useAppSelector } from "store";
import { accountService } from "services/appwrite";
import { setUser } from "store/features/authSlice";
import { fetchTodos } from "store/features/todosSlice";
import { Route, Routes } from "react-router-dom";
import TodosPage from "components/TodosPage";

const AppLayout = styled.main`
  height: 100vh;
  background-color: ${({ theme }) => theme.pageBackgroundColor};
  overflow: hidden;
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
  const theme = useAppSelector((state) => state.theme.theme);
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
    <ThemeProvider theme={themes[theme]}>
      <AppLayout>
        <Header />
        <Routes>
          <Route path="/" element={<TodosPage />} />
          <Route path="map" element={<></>} />
        </Routes>
      </AppLayout>
    </ThemeProvider>
  );
}

export default App;
