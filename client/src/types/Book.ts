import type { Author } from "./Author";
import type { Tag } from "./Tag";

export type Book = {
  id?: number;
  name: string;
  description?: string;
  authors?: Author[];
  tags?: Tag[];
};
