import type { Models } from "appwrite";
export interface ITodo extends Models.Document {
  title: string;
  isCompleted?: boolean;
  countryCode: string;
}

export type BaseTodo = Pick<
  ITodo,
  "$id" | "title" | "isCompleted" | "countryCode"
>;
