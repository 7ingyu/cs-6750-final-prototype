import { useEffect, useState } from "react";
import { PhoneLayout } from "./design";
import axios from "axios";
import { Book, Tag } from "@/types";
import { Nav } from "@/components";
import { ThemeContext, TagsContext, BooksContext } from "@/context";
import { Home } from "@/pages";

const App = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [theme, setTheme] = useState("dark");
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const { data } = await axios.get("/api/books");
        setBooks(data);
      } catch (_) {
        console.error("Error fetching /api/books");
      }
    };
    const getTags = async () => {
      try {
        const { data } = await axios.get("/api/tags");
        setTags(data);
      } catch (_) {
        console.error("Error fetching /api/tags");
      }
    };
    getBooks();
    getTags();
  }, []);

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      <TagsContext.Provider value={[tags, setTags]}>
        <BooksContext.Provider value={[books, setBooks]}>
          <PhoneLayout>
            <div className="app">
              <Nav />
              <main className="container">
                <Home />
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
