import { useEffect, useState } from "react";
import { PhoneLayout } from "./design";
import axios from "axios";
import { Book } from "./types/Book";
import { Nav } from "./components";

const App = () => {
  const [books, setBooks] = useState<Book[]>([]);

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
    <PhoneLayout>
      <div className="app">
        <Nav />
        <main className="container">
          <h1>Books</h1>
          <ul>
            {books.map((book, i) => (
              <li key={i}>{book?.name}</li>
            ))}
          </ul>
        </main>
        <img src="/bottom_nav.png" alt="bottom navigation" className="w-100" />
      </div>
    </PhoneLayout>
  );
};

export default App;
