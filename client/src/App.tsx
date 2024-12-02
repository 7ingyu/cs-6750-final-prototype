import { useEffect, useState } from "react";
import { PhoneLayout } from "./design";
import axios from "axios";
import { Book, Tag as TagType } from "@/types";
import { Nav } from "@/components";
import { ThemeContext, TagsContext, BooksContext } from "@/context";
import { BrowserRouter, Routes, Route } from "react-router";
import { Home, Tag } from "@/pages";

const App = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [theme, setTheme] = useState("dark");
  const [tags, setTags] = useState<TagType[]>([
    {
      name: "🍰",
      type: "Sampled",
      smart: true,
      description: "Titles I've sampled",
      createdAt: new Date(),
      updatedAt: new Date(),
      books: [],
    },
    {
      name: "Wishlist",
      type: "Notify Me",
      smart: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      books: [],
    },
    {
      name: "📃",
      type: "Borrowed",
      smart: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      description: "Titles I've borrowed in Libby",
      books: [],
    },
  ]);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const { data } = await axios.get("/api/books");
        setBooks(data);
        setTags(
          tags.map((tag) =>
            tag.type === "Borrowed" ? { ...tag, books: data } : tag,
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
                <main className="container">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/tag/:id" element={<Tag />} />
                  </Routes>
                </main>
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
