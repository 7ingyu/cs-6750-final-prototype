import { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router";
import { Nav, PhoneLayout } from "@/components";
import {
  ThemeContext,
  TagsContext,
  BooksContext,
  HistoryContext,
} from "@/context";
import { Home, Tag, Book } from "@/pages";
import { format } from "date-fns";

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
  },
  {
    name: "Wishlist",
    smart:
      "Receive notification when tagged titles are added at your libraries - including new issues of magazines, and works by the same author.",
    type: "Notify Me",
    createdAt: new Date(),
    updatedAt: new Date(),
    books: [],
  },
  {
    name: "📃",
    smart: "Every title you borrow is added to this tag.",
    type: "Borrowed",
    createdAt: new Date(),
    updatedAt: new Date(),
    description: "Titles I've borrowed in Libby",
    books: [],
  },
];

const App = () => {
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
            <PhoneLayout>
              <div className="app">
                <BrowserRouter>
                  <Nav />
                  <div className="container">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/tag/:id" element={<Tag />} />
                      <Route path="/book/:id" element={<Book />} />
                    </Routes>
                  </div>
                  <img
                    src="/bottom_nav.png"
                    alt="bottom navigation"
                    className="w-100"
                  />
                </BrowserRouter>
              </div>
            </PhoneLayout>
          </BooksContext.Provider>
        </TagsContext.Provider>
      </HistoryContext.Provider>
    </ThemeContext.Provider>
  );
};

export default App;
