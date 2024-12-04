import type { Author } from "@/types";

export type Book = {
  id: number;
  name: string;
  description: string;
  authors: Author[];
  tags: string[];
};
