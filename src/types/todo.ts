import type { Models } from "appwrite";

export interface ITodo extends Models.Document {
  title: string;
  isCompleted?: boolean;
}
