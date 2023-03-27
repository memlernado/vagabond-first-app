import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import type { ITodo } from "../../types/todo";
import { localeService, todosService } from "../../services/appwrite";
import { ID } from "appwrite";

type BaseTodo = Pick<ITodo, "$id" | "title" | "isCompleted" | "countryCode">;

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () =>
  todosService.listTodos()
);

export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async (title: string) => {
    const $id = ID.unique();
    const { countryCode } = await localeService.get();
    const newTodo = await todosService.createTodo($id, { title, countryCode });
    return newTodo;
  }
);

export const toggleCompleted = createAsyncThunk(
  "todos/toggleCompleted",
  async (todo: Pick<ITodo, "$id" | "isCompleted">) => {
    await todosService.updateTodo(todo.$id, { ...todo });
    return todo;
  }
);

export interface TodosState {
  todos: BaseTodo[];
}

const initialState: TodosState = {
  todos: [],
};

export const todosSlice = createReducer(initialState, (builder) => {
  builder.addCase(fetchTodos.fulfilled, (state, action) => {
    state.todos = action.payload;
  });
  builder.addCase(addTodo.fulfilled, (state, action) => {
    state.todos.push(action.payload);
  });
  builder.addCase(toggleCompleted.fulfilled, (state, action) => {
    const todoIndex = state.todos.findIndex((t) => t.$id == action.payload.$id);
    if (todoIndex !== -1) {
      state.todos[todoIndex].isCompleted = action.payload.isCompleted;
    }
  });
});

export default todosSlice;
