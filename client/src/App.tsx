import { useEffect, useState } from "react";
import { PhoneLayout } from "./design";
import axios from "axios";
import { Book } from "./types/Book";

function App() {
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
      <h1>Books</h1>
      <ul>
        {books.map((book, i) => (
          <li key={i}>{book?.name}</li>
        ))}
      </ul>
    </PhoneLayout>
  );
}

export default App;
