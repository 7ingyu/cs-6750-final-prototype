import { useContext, useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import { format } from "date-fns";
import { Offcanvas, Modal } from "react-bootstrap";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import { BooksContext, TagsContext, HistoryContext } from "@/context";
import { Book, FloatBtn, Tag as TagComponent } from "@/components";

import type { Book as BookType, Tag as TagType } from "@/types";

const Tag = () => {
  const id = useParams().id;
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [_, setHistory] = useContext(HistoryContext);
  const [allBooks, setAllBooks] = useContext(BooksContext);
  const [allTags, setAllTags] = useContext(TagsContext);
  const [showEdit, setShowEdit] = useState(false);
  const [showDuplicateError, setShowDuplicateError] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [{ name, smart, description, createdAt }, setTag] = useState<TagType>({
    name: "",
    books: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  const [books, setBooks] = useState<BookType[]>([]);

  useEffect(() => {
    const tagData = allTags.find((_, i) => i === Number(id));
    if (tagData) {
      setTag(tagData);
      setBooks(allBooks.filter((b) => b.tags.includes(tagData.name)));
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

  if (!name) {
    return (
      <div>
        <h1>Tag not found</h1>
      </div>
    );
  }

  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    setShowDuplicateError(false);
    e.preventDefault();
    document
      .querySelectorAll(".needs-validation")
      .forEach((form) => form.classList.add("was-validated"));
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const isDuplicate = allTags?.find((t) => t.name === name);
    if (name && !isDuplicate) {
      setAllTags(
        allTags.map((t, i) =>
          String(i) === id
            ? { ...t, name, description, updatedAt: new Date() }
            : t,
        ),
      );
      setShowEdit(false);
    }
    if (isDuplicate) {
      setShowDuplicateError(true);
    }
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setAllTags(allTags.filter((_, i) => String(i) !== id));
    navigate("/");
  };

  const removeBook = (book: BookType) => {
    setAllBooks(
      allBooks.map((b) =>
        b.id === book.id ? { ...b, tags: b.tags.filter((t) => t !== name) } : b,
      ),
    );
  };

  const action = (book: BookType) => (
    <SwipeAction onClick={() => removeBook(book)}>
      <div className="bg-danger text-white d-flex justify-content-center align-items-center fs-1">
        <i className="bi bi-trash3-fill" />
      </div>
    </SwipeAction>
  );

  const leadingActions = (book: BookType) => (
    <LeadingActions>{action(book)}</LeadingActions>
  );

  const trailingActions = (book: BookType) => (
    <TrailingActions>{action(book)}</TrailingActions>
  );

  return (
    <div className="tag-pg">
      <header className="mb-3">
        <div>
          <TagComponent size="lg">
            <h1 className="fs-3 p-0 m-0">{name}</h1>
          </TagComponent>
        </div>
        <div className="description my-2">
          {description || `Created on ${format(createdAt, "dd MMM yyyy")}`}
        </div>
        {smart ? (
          <div className="smart-desc">
            <small>{smart}</small>
          </div>
        ) : null}
      </header>
      <hr className="mb-0 pb-0" />
      <main>
        {books.length ? (
          <SwipeableList>
            {books.map((book, i) => (
              <SwipeableListItem
                leadingActions={leadingActions(book)}
                trailingActions={trailingActions(book)}
                key={i}
              >
                <Book {...book} />
              </SwipeableListItem>
            ))}
          </SwipeableList>
        ) : (
          <em>No books with this tag.</em>
        )}
        <FloatBtn onClick={() => setShowEdit(true)}>
          <i className="bi bi-pencil-fill" />
        </FloatBtn>
        <Offcanvas
          show={showEdit}
          onHide={() => setShowEdit(false)}
          placement={"bottom"}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>EDIT TAG</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <form onSubmit={handleEdit} noValidate className="needs-validation">
              <div className="has-validation">
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  placeholder="NAME OF TAG..."
                  required
                />
                <div className="invalid-feedback">
                  Please enter a name for your new tag.
                </div>
              </div>
              <hr />
              <div>
                <input
                  className="form-control"
                  type="text"
                  name="description"
                  placeholder="DESCRIPTION..."
                />
              </div>
              <div className="small">
                Optionally, add a description for your tag.
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <button
                  className="btn btn-danger"
                  onClick={() => setShowConfirmation(true)}
                >
                  <i className="bi bi-trash3-fill" />
                </button>
                <button className="btn btn-light">SAVE TAG</button>
              </div>
              <div className="small text-danger">
                {showDuplicateError && "Tag already exists."}
              </div>
            </form>
          </Offcanvas.Body>
        </Offcanvas>
        <Modal
          show={showConfirmation}
          onHide={() => setShowConfirmation(false)}
          centered
        >
          <Modal.Body>
            Are you sure your want to delete your {name} tag? This cannot be
            undone.
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn-light"
              onClick={() => setShowConfirmation(false)}
            >
              CANCEL
            </button>
            <button className="btn btn-danger" onClick={handleDelete}>
              DELETE
            </button>
          </Modal.Footer>
        </Modal>
      </main>
    </div>
  );
};

export default Tag;
