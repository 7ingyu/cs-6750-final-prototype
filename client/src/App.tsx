import { useEffect, useState } from "react";
import { PhoneLayout } from "./design";
import axios from "axios";
import type { Book as BookType, Tag as TagType } from "@/types";
import { Nav } from "@/components";
import { ThemeContext, TagsContext, BooksContext } from "@/context";
import { BrowserRouter, Routes, Route } from "react-router";
import { Home, Tag, Book } from "@/pages";
import { format } from "date-fns";

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
  const [theme, setTheme] = useState("dark");
  const [tags, setTags] = useState<TagType[]>(defaultTags);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const { data: allBooks } = await axios.get("/api/books");
        setBooks(
          allBooks.map((b: BookType) => ({ ...b, tags: [defaultTags[2]] })),
        );
        setTags(
          tags.map((tag) =>
            tag.type === "Borrowed" ? { ...tag, books: allBooks } : tag,
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
    </ThemeContext.Provider>
  );
};

export default App;
