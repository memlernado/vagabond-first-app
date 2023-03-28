import {
  createAsyncThunk,
  createReducer,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import type { BaseTodo, ITodo } from "../../types/todo";
import { todosService } from "../../services/appwrite";

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () =>
  todosService.listTodos()
);
export interface TodosState {
  todos: BaseTodo[];
}

const initialState: TodosState = {
  todos: [],
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addLocalTodo: (state, action: PayloadAction<BaseTodo>) => {
      const index = state.todos.findIndex((t) => t.$id === action.payload.$id);
      if (index === -1) state.todos.push(action.payload);
    },
    updateLocalTodo: (state, action: PayloadAction<BaseTodo>) => {
      const index = state.todos.findIndex((t) => t.$id === action.payload.$id);
      if (index !== -1) state.todos[index] = action.payload;
    },
    deleteLocalTodo: (state, action: PayloadAction<string>) => {
      const index = state.todos.findIndex((t) => t.$id === action.payload);
      if (index !== -1) state.todos.splice(index, 1);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.todos = action.payload;
    });
  },
});

export const { addLocalTodo, updateLocalTodo, deleteLocalTodo } =
  todosSlice.actions;

export default todosSlice.reducer;
