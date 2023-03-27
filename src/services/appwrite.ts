import { Client, Account, Databases, Locale, ID } from "appwrite";
import type { ITodo } from "../types/todo";

const DB = import.meta.env.VITE_DB_ID;
const TODOS_COLLECTION = import.meta.env.VITE_TODOS_COLLECTION_ID;

export const TODOS_RT_CHANNEL = `databases.${
  import.meta.env.VITE_DB_ID
}.collections.${import.meta.env.VITE_TODOS_COLLECTION_ID}.documents`;

export const TODOS_RT_EVENTS = {
  create: `${TODOS_RT_CHANNEL}.*.create`,
  update: `${TODOS_RT_CHANNEL}.*.update`,
  delete: `${TODOS_RT_CHANNEL}.*.delete`,
};

export const appwriteClient = new Client();

appwriteClient
  .setEndpoint("https://appwrite.vagabondfirst.com/v1")
  .setProject(import.meta.env.VITE_PROJECT_ID);

export const accountService = new Account(appwriteClient);

const db = new Databases(appwriteClient);
export const localeService = new Locale(appwriteClient);

export const todosService = {
  listTodos: async () => {
    const res = await db.listDocuments<ITodo>(DB, TODOS_COLLECTION);
    return res.documents;
  },
  createTodo: async (todo: Pick<ITodo, "title">) => {
    const $id = ID.unique();
    const { countryCode } = await localeService.get();
    return db.createDocument<ITodo>(DB, TODOS_COLLECTION, $id, {
      ...todo,
      countryCode,
    });
  },
  updateTodo: async (
    id: string,
    todo: Partial<Pick<ITodo, "title" | "isCompleted">>
  ) => await db.updateDocument<ITodo>(DB, TODOS_COLLECTION, id, todo),
};
