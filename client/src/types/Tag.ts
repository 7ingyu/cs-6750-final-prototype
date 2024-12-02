import { Book } from "@/types";

export type Tag = {
  name: string;
  type?: "Sampled" | "Notify Me" | "Borrowed";
  smart: boolean;
  description?: string;
  books: Book[];
  createdAt: Date;
  updatedAt: Date;
};
