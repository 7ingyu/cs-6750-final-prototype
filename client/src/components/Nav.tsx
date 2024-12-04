import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { Dropdown, Modal } from "react-bootstrap";
import { HistoryContext, TagsContext, BooksContext } from "@/context";

const Nav = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [history, setHistory] = useContext(HistoryContext);
  const [allTags, setAllTags] = useContext(TagsContext);
  const [_, setAllBooks] = useContext(BooksContext);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const id = Number(pathname.replace(/^\/tag\//, ""));

  const handleDelete = () => {
    const newTags = allTags.toSpliced(Number(id), 1);
    setAllTags(newTags);
    setShowConfirmation(false);
    setAllBooks((prev) =>
      prev.map((b) => ({
        ...b,
        tags: b.tags.filter((tag) => newTags.map((t) => t.name).includes(tag)),
      })),
    );
  };

  if (pathname.match(/^\/tag\//) && !allTags[id]) {
    navigate("/");
  }

  return (
    <nav className="">
      <div className={`bg ${pathname.match(/^\/book\//) ? "" : "d-none"}`} />
      <div className="nav">
        {history.length > 1 && pathname !== "/" ? (
          <Link
            to={history[history.length - 2].pathname}
            onClick={() => setHistory((prev) => [...prev.slice(0, -1)])}
            className="text-decoration-none"
          >
            <i className="bi bi-chevron-left" />
            <span>{history[history.length - 2].title}</span>
          </Link>
        ) : null}
        {pathname.match(/^\/tag\//) ? (
          <>
            <Dropdown className="ms-auto">
              <Dropdown.Toggle variant="link">
                <i className="bi bi-list"></i>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#">
                  <div>Export List</div>
                  <div>(not yet implemented)</div>
                </Dropdown.Item>
                <Dropdown.Item
                  className="text-danger"
                  onClick={() => setShowConfirmation(true)}
                >
                  <div>Delete Tag</div>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Modal
              show={showConfirmation}
              onHide={() => setShowConfirmation(false)}
              centered
            >
              <Modal.Body>
                Are you sure you want to delete your{" "}
                <span className="text-primary">{allTags?.[id]?.name}</span> tag?
                This action cannot be undone.
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
          </>
        ) : null}
        {pathname === "/" ? (
          <Dropdown className="ms-auto">
            <Dropdown.Toggle variant="link">
              <i className="bi bi-list"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#">
                <div>Synchronize Shelf</div>
                <div>(not yet implemented)</div>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : null}
      </div>
    </nav>
  );
};

export default Nav;
