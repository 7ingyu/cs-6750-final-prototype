import { useContext, useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router";
import { BooksContext, HistoryContext } from "@/context";
import { Tag } from "@/design";
import type { Book as BookType } from "@/types";
// import { format } from "date-fns";
// import { Offcanvas, Modal } from "react-bootstrap";

const Book = () => {
  const id = useParams().id;
  const { pathname } = useLocation();
  // const navigate = useNavigate();
  // const [allTags, setAllTags] = useContext(TagsContext);
  const [allBooks] = useContext(BooksContext);
  const [_, setHistory] = useContext(HistoryContext);
  // const [showEdit, setShowEdit] = useState(false);
  // const [showDuplicateError, setShowDuplicateError] = useState(false);
  // const [showConfirmation, setShowConfirmation] = useState(false);

  const [{ name, authors, tags }, setBook] = useState<BookType>({
    name: "",
    authors: [],
    tags: [],
  });

  useEffect(() => {
    const bookData = allBooks.find((_, i) => i === Number(id));
    if (bookData) setBook(bookData);
  }, [allBooks, id]);

  useEffect(() => {
    if (!name) return;
    document.title = name;
    setHistory((prev) =>
      prev[prev.length - 1].pathname === pathname
        ? prev
        : [...prev, { pathname, title: document.title }],
    );
  }, [name]);

  if (!name) {
    return (
      <div>
        <h1>Book not found</h1>
      </div>
    );
  }

  return (
    <div className="book-pg">
      <header className="mb-3">
        <div className="bg" />
        <div className="authors">
          {authors?.map(({ first, last }) => `${first} ${last}`).join(", ")}
        </div>
        <h1 className="title">{name}</h1>
        <img src={`/books/${id}.jpg`} alt={name} />
      </header>
      <main className="pt-3">
        <div>Borrow</div>
        <hr />
        <div>Read Sample</div>
        <hr />
        <div>
          {tags?.length ? (
            tags.map((t, i) => (
              <Link to={`/tag/${i}`} key={i}>
                <Tag>{t.name}</Tag>
              </Link>
            ))
          ) : (
            <em>No tags</em>
          )}
        </div>
      </main>
    </div>
  );
};

export default Book;
