import {
  createAsyncThunk,
  createReducer,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import type { ITodo } from "../../types/todo";
import { localeService, todosService } from "../../services/appwrite";
import { ID } from "appwrite";

type BaseTodo = Pick<ITodo, "$id" | "title" | "isCompleted" | "countryCode">;

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
      console.log("ADDING LOCAL => ", action.payload.title);
      const index = state.todos.findIndex((t) => t.$id === action.payload.$id);
      index === -1 && state.todos.push(action.payload);
    },
    updateLocalTodo: (state, action: PayloadAction<BaseTodo>) => {
      console.log("UPDATING LOCAL => ", action.payload);
      const index = state.todos.findIndex((t) => t.$id === action.payload.$id);
      state.todos[index] = action.payload;
    },
    deleteLocalTodo: (state, action: PayloadAction<BaseTodo>) => {
      console.log("DELETING LOCAL => ", action.payload);
      const index = state.todos.findIndex((t) => t.$id === action.payload.$id);
      state.todos.splice(index, 1);
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
