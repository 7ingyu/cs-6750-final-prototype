import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { Book } from "@/types";

const BooksContext = createContext<
  [Book[], Dispatch<SetStateAction<Book[]>>] | []
>([]);

export default BooksContext;
