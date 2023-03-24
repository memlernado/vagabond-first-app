import { configureStore } from "@reduxjs/toolkit";
import todosSlice from "./features/todosSlice";
import authSlice from "./features/authSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import themeSlice from "./features/themeSlice";

export const store = configureStore({
  reducer: {
    todos: todosSlice,
    auth: authSlice,
    theme: themeSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
