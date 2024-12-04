import { useContext, useState, useEffect } from "react";
import { useParams, useLocation } from "react-router";
import { format } from "date-fns";
import { Offcanvas, Modal, Spinner } from "react-bootstrap";
import { BooksContext, TagsContext, HistoryContext } from "@/context";
import { Book, FloatBtn, Tag as TagComponent } from "@/components";

import type { Book as BookType, Tag as TagType } from "@/types";

const Tag = () => {
  const id = useParams().id;
  const { pathname } = useLocation();
  const [_, setHistory] = useContext(HistoryContext);
  const [allBooks, setAllBooks] = useContext(BooksContext);
  const [relevantBooks, setRelevantBooks] = useState<BookType[]>([]);
  const [allTags, setAllTags] = useContext(TagsContext);
  const [showEdit, setShowEdit] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState<{ [key: string]: boolean }>({});
  const [showTagger, setShowTagger] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const [{ name, smart, description, createdAt, size }, setTag] =
    useState<TagType>({
      name: "",
      books: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      size: 0,
    });
  const [books, setBooks] = useState<BookType[]>([]);
  const [selectedBooks, setSelectedBooks] = useState<{
    [key: number]: boolean;
  }>({});

  useEffect(() => {
    if (id === undefined) return;
    const tagData = allTags[Number(id)];
    if (tagData) {
      setTag(tagData);
      const rBooks = allBooks.filter((b) => b.tags.includes(tagData.name));
      setRelevantBooks(rBooks);
      setBooks(rBooks);
      setSelectedBooks((prev) =>
        rBooks.reduce(
          (acc, b) => ({ ...acc, [b.id]: prev[b.id] ?? false }),
          {},
        ),
      );
      setFilters(
        [...new Set(rBooks.map((b) => b.tags).flat())].reduce(
          (acc, t) => ({ ...acc, [t]: t === tagData.name ? true : false }),
          {},
        ),
      );
    }
  }, [allTags, id, allBooks]);

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
    const tagsList = allTags.map((t) => t.name);
    allBooks
      .filter((b) => selectedBooks[b.id])
      .forEach((b) => {
        tagsList.forEach((t, i) => {
          if (!b.tags.includes(t)) {
            tagsList.splice(i, 1);
          }
        });
      });
    setSelectedTags(tagsList);
  }, [selectedBooks, allBooks]);

  useEffect(() => {
    const relevantTags = Object.entries(filters)
      .filter(([, v]) => v)
      .map(([k]) => k);
    setBooks(
      relevantBooks.filter((b) =>
        relevantTags.every((t) => b.tags.includes(t)),
      ),
    );
  }, [filters]);

  const handleDelete = () => {
    setSelectedBooks({});
    setAllBooks((prev) =>
      prev.map((b) =>
        selectedBooks[b.id]
          ? { ...b, tags: b.tags.filter((t) => t !== name) }
          : b,
      ),
    );
    setShowConfirmation(false);
  };

  const handleSave = () => {
    setAllTags((prev) =>
      prev.map((t, i) =>
        i === Number(id)
          ? { ...t, name, description, updatedAt: new Date() }
          : t,
      ),
    );
    setShowEdit(false);
  };

  const toggleTag = (tagName: string) => {
    const includes = selectedTags.includes(tagName);
    const taggedBooks: { [key: number]: BookType } = allBooks
      .filter((b) => selectedBooks[b.id])
      .map((b) => ({
        ...b,
        tags: includes
          ? b.tags.filter((t) => t !== tagName)
          : [...b.tags, tagName],
      }))
      .reduce((acc, b) => ({ ...acc, [b.id]: b }), {});
    setAllBooks((prev) => prev.map((b) => taggedBooks[b.id] || b));
  };

  if (id === undefined || !allTags[Number(id)]) {
    return (
      <div className="h-100 w-100 d-flex justify-content-center align-items-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className="tag-pg">
      <header className="mb-3">
        <div>
          <TagComponent size="lg">
            {showEdit ? (
              <input
                style={{ width: `${name.length * 0.75 + 0.5}rem` }}
                value={name}
                onChange={(e) =>
                  setTag({
                    name: e.target.value,
                    smart,
                    description,
                    createdAt,
                    size,
                    updatedAt: new Date(),
                  })
                }
              />
            ) : (
              <h1>{name}</h1>
            )}
          </TagComponent>
          <div className="duplicate-warning">
            {allTags
              .filter((_, i) => i !== Number(id))
              .map((t) => t.name)
              .includes(name)
              ? "Tag already exists"
              : ""}
          </div>
        </div>
        <div className="description mt-3 mb-2">
          <input
            value={
              showEdit
                ? description
                : description ||
                  `Created on ${format(createdAt, "dd MMM yyyy")}`
            }
            onChange={(e) =>
              setTag({
                name,
                smart,
                description: e.target.value,
                createdAt,
                size,
                updatedAt: new Date(),
              })
            }
            disabled={!showEdit}
          />
        </div>
        {smart ? (
          <div className="smart-desc">
            <small>{smart}</small>
          </div>
        ) : null}
      </header>
      <hr />
      <main>
        <div
          onClick={() => setShowFilter(!showFilter)}
          role="button"
          className="d-flex gap-2 align-items-center"
        >
          <span className="btn btn-primary px-2 py-0 btn-lg">
            <i className="bi bi-filter" />
          </span>
          <ul className="list-unstyled p-0 m-0 d-flex gap-2">
            {Object.entries(filters)
              .filter(([k, v]) => v && k !== name)
              .map(([k], i) => (
                <li key={i}>
                  <TagComponent color="primary">{k}</TagComponent>
                </li>
              ))}
          </ul>
        </div>
        <hr className="mb-0 pb-0" />
        {books.length ? (
          books.map((book, i) => (
            <Book
              key={i}
              {...book}
              checked={selectedBooks[book.id]}
              onClick={
                showEdit
                  ? () =>
                      setSelectedBooks({
                        ...selectedBooks,
                        [book.id]: !selectedBooks[book.id],
                      })
                  : undefined
              }
            />
          ))
        ) : (
          <em>No books with this tag.</em>
        )}
      </main>
      {showEdit ? (
        <div className="edit-bar">
          <button
            className="btn btn-primary"
            onClick={handleSave}
            disabled={allTags
              .filter((_, i) => i !== Number(id))
              .map((t) => t.name)
              .includes(name)}
          >
            <i className="bi bi-check-lg" />
          </button>
          <button
            className="btn btn-secondary"
            disabled={Object.values(selectedBooks).every((v) => !v)}
            onClick={() => setShowTagger(true)}
          >
            <i className="bi bi-tag-fill" />
          </button>
          <button
            className="btn btn-danger"
            disabled={Object.values(selectedBooks).every((v) => !v)}
            onClick={() => setShowConfirmation(true)}
          >
            <i className="bi bi-trash3-fill" />
          </button>
        </div>
      ) : (
        <FloatBtn onClick={() => setShowEdit(true)}>
          <i className="bi bi-pencil-fill" />
        </FloatBtn>
      )}
      <Modal
        show={showConfirmation}
        onHide={() => setShowConfirmation(false)}
        centered
      >
        <Modal.Body>
          Are you sure your want to remove the selected books from your {name}{" "}
          tag?
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-light"
            onClick={() => setShowConfirmation(false)}
          >
            CANCEL
          </button>
          <button className="btn btn-danger" onClick={handleDelete}>
            REMOVE FROM TAG
          </button>
        </Modal.Footer>
      </Modal>
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
                <TagComponent
                  onClick={() => toggleTag(t.name)}
                  color={selectedTags?.includes(t.name) ? "secondary" : "dark"}
                >
                  {t.name}
                </TagComponent>
              </li>
            ))}
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
      <Offcanvas
        show={showFilter}
        onHide={() => setShowFilter(false)}
        placement={"bottom"}
      >
        <Offcanvas.Header>
          <Offcanvas.Title>
            <button
              className="btn btn-primary"
              onClick={() => setShowFilter(false)}
            >
              SHOW {books.length} RESULTS
            </button>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {/* <div className="mb-2">Display Books with  Tags:</div> */}
          <ul className="list-unstyled d-flex flex-wrap gap-2">
            {[...new Set(allBooks.map((b) => b.tags).flat())].map((t, i) => (
              <li key={i}>
                <TagComponent
                  color={filters[t] ? "primary" : "dark"}
                  onClick={
                    t !== name
                      ? () => setFilters({ ...filters, [t]: !filters[t] })
                      : () => {}
                  }
                >
                  {t}
                </TagComponent>
              </li>
            ))}
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default Tag;
