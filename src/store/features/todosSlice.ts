import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { ITodo } from "../../types/todo";
import { todosService } from "../../services/appwrite";
import { ID } from "appwrite";

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () =>
  todosService.listTodos()
);

export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async (title: string) => {
    const $id = ID.unique();
    await todosService.createTodo($id, { title });
    return {
      $id,
      title,
    };
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
  todos: Pick<ITodo, "$id" | "title" | "isCompleted">[];
}

const initialState: TodosState = {
  todos: [],
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // addTodo: (state, action: ) => {

    // },
    toggleCompleted: (
      state,
      action: PayloadAction<Pick<ITodo, "isCompleted" | "$id">>
    ) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.todos = action.payload;
    });
    builder.addCase(addTodo.fulfilled, (state, action) => {
      state.todos.push(action.payload);
    });
    builder.addCase(toggleCompleted.fulfilled, (state, action) => {
      const todoIndex = state.todos.findIndex(
        (t) => t.$id == action.payload.$id
      );
      if (todoIndex !== -1) {
        state.todos[todoIndex].isCompleted = action.payload.isCompleted;
      }
    });
  },
});

// export const { addTodo, toggleCompleted } = todosSlice.actions;

export default todosSlice.reducer;
