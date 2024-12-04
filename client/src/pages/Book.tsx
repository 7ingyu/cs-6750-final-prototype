import { useContext, useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router";
import { BooksContext, TagsContext, HistoryContext } from "@/context";
import { Offcanvas, Spinner } from "react-bootstrap";
import { Tag, FloatBtn } from "@/components";

import type { Book as BookType } from "@/types";

const Book = () => {
  const id = useParams().id;
  const { pathname } = useLocation();
  const [allTags] = useContext(TagsContext);
  const [allBooks, setAllBooks] = useContext(BooksContext);
  const [_, setHistory] = useContext(HistoryContext);
  const [showTagger, setShowTagger] = useState(false);

  const [{ name, authors, tags }, setBook] = useState<BookType>({
    id: Number(id),
    description: "",
    name: "",
    authors: [],
    tags: [],
  });

  useEffect(() => {
    if (allBooks.length === 0) return;
    const bookData = allBooks.find((b) => b.id === Number(id));
    if (bookData) setBook(bookData);
  }, []);

  useEffect(() => {
    if (!name) return;
    document.title = name;
    setHistory((prev) =>
      prev[prev.length - 1].pathname === pathname
        ? prev
        : [...prev, { pathname, title: document.title }],
    );
  }, [name]);

  useEffect(() => {
    setAllBooks((prev) =>
      prev.map((b) => (b.id === Number(id) ? { ...b, tags } : b)),
    );
  }, [tags]);

  const toggleTag = (tagName: string) => {
    const includes = tags.includes(tagName);
    setBook((prev) => ({
      ...prev,
      tags: includes
        ? prev.tags.filter((t) => t !== tagName)
        : [...prev.tags, tagName],
    }));
  };

  if (!name) {
    return (
      <div className="h-100 w-100 d-flex justify-content-center align-items-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
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
            <ul className="tags">
              {tags.map((t, i) => (
                <li key={i}>
                  <Link to={`/tag/${i}`}>
                    <Tag>{t}</Tag>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <em>No tags</em>
          )}
        </div>
        <FloatBtn onClick={() => setShowTagger(true)}>
          <i className="bi bi-tag-fill" />
        </FloatBtn>
        <Offcanvas
          show={showTagger}
          onHide={() => setShowTagger(false)}
          placement={"bottom"}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>TAG BOOK</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <ul className="tags">
              {allTags.map((t, i) => (
                <li key={i} className="d-inline">
                  <Tag
                    onClick={() => toggleTag(t.name)}
                    color={tags?.includes(t.name) ? "secondary" : "dark"}
                  >
                    {t.name}
                  </Tag>
                </li>
              ))}
            </ul>
          </Offcanvas.Body>
        </Offcanvas>
      </main>
    </div>
  );
};

export default Book;
