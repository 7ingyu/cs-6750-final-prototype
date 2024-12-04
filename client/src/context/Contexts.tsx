import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";

import ThemeContext from "./ThemeContext";
import TagsContext from "./TagsContext";
import BooksContext from "./BooksContext";
import HistoryContext from "./HistoryContext";

import type { ReactNode } from "react";

import type {
  Book as BookType,
  Tag as TagType,
  History as HistoryType,
} from "@/types";

const defaultTags = [
  {
    name: "🍰",
    smart: "Whenever you open a sample, the title will be added to this tag.",
    type: "Sampled",
    description: `Titles I've sampled since ${format(new Date(), "dd MMM yyyy")}.`,
    createdAt: new Date(),
    updatedAt: new Date(),
    books: [],
    size: 0,
  },
  {
    name: "Wishlist",
    smart:
      "Receive notification when tagged titles are added at your libraries - including new issues of magazines, and works by the same author.",
    type: "Notify Me",
    createdAt: new Date(),
    updatedAt: new Date(),
    books: [],
    size: 0,
  },
  {
    name: "📃",
    smart: "Every title you borrow is added to this tag.",
    type: "Borrowed",
    createdAt: new Date(),
    updatedAt: new Date(),
    description: "Titles I've borrowed in Libby",
    books: [],
    size: 0,
  },
];

const Contexts = ({ children }: { children: ReactNode }) => {
  const [books, setBooks] = useState<BookType[]>([]);
  const [history, setHistory] = useState<HistoryType[]>([
    { pathname: "/", title: "Tags" },
  ]);
  const [theme, setTheme] = useState("dark");
  const [tags, setTags] = useState<TagType[]>(defaultTags);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const { data: allBooks } = await axios.get("/api/books");
        setBooks(
          allBooks.map((b: BookType) => ({
            ...b,
            tags: [defaultTags[2].name],
          })),
        );
        setTags(
          defaultTags.map((t) =>
            t.type === "Borrowed" ? { ...t, size: allBooks.length } : t,
          ),
        );
      } catch (_) {
        console.error("Error fetching /api/books");
      }
    };
    getBooks();
  }, []);

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      <HistoryContext.Provider value={[history, setHistory]}>
        <TagsContext.Provider value={[tags, setTags]}>
          <BooksContext.Provider value={[books, setBooks]}>
            {children}
          </BooksContext.Provider>
        </TagsContext.Provider>
      </HistoryContext.Provider>
    </ThemeContext.Provider>
  );
};

export default Contexts;
