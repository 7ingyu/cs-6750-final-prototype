import { Book } from "@/types";

export type Tag = {
  name: string;
  type?: string;
  smart?: string;
  description?: string;
  books: Book[];
  createdAt: Date;
  updatedAt: Date;
  size: number;
};
