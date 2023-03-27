import { Client, Account, Databases, Locale } from "appwrite";
import type { ITodo } from "../types/todo";

const DB = import.meta.env.VITE_DB_ID;
const TODOS_COLLECTION = import.meta.env.VITE_TODOS_COLLECTION_ID;

const client = new Client();

client
  .setEndpoint("https://appwrite.vagabondfirst.com/v1")
  .setProject(import.meta.env.VITE_PROJECT_ID);

export const accountService = new Account(client);

const db = new Databases(client);
export const localeService = new Locale(client);

export const todosService = {
  listTodos: async () => {
    const res = await db.listDocuments<ITodo>(DB, TODOS_COLLECTION);
    return res.documents;
  },
  createTodo: async (
    id: string,
    todo: Pick<ITodo, "title" | "countryCode">
  ) => {
    return db.createDocument(DB, TODOS_COLLECTION, id, {
      ...todo,
    });
  },
  updateTodo: async (
    id: string,
    todo: Partial<Pick<ITodo, "title" | "isCompleted">>
  ) => await db.updateDocument(DB, TODOS_COLLECTION, id, todo),
};
