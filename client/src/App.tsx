import { useEffect, useState } from "react";
import { PhoneLayout } from "./design";
import axios from "axios";
import { Book, Tag } from "@/types";
import { Nav } from "@/components";
import { ThemeContext, TagsContext, BooksContext } from "@/context";
import { BrowserRouter, Routes, Route } from "react-router";
import { Home } from "@/pages";

const App = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [theme, setTheme] = useState("dark");
  const [tags, setTags] = useState<Tag[]>([
    {
      name: "🍰",
      type: "Sampled",
      smart: true,
      description: "Titles I've sampled",
      createdAt: new Date(),
      books: [],
    },
    {
      name: "Wishlist",
      type: "Notify Me",
      smart: true,
      createdAt: new Date(),
      books: [],
    },
    {
      name: "📃",
      type: "Borrowed",
      smart: true,
      createdAt: new Date(),
      description: "Titles I've borrowed in Libby",
      books: [],
    },
  ]);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const { data } = await axios.get("/api/books");
        setBooks(data);
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
              <Nav />
              <main className="container">
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Home />} />
                  </Routes>
                </BrowserRouter>
              </main>
              <img
                src="/bottom_nav.png"
                alt="bottom navigation"
                className="w-100"
              />
            </div>
          </PhoneLayout>
        </BooksContext.Provider>
      </TagsContext.Provider>
    </ThemeContext.Provider>
  );
};

export default App;
