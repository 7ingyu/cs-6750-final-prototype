import { useContext } from "react";
import { Link, useLocation } from "react-router";
import { Dropdown } from "react-bootstrap";
import { HistoryContext } from "@/context";

const Nav = () => {
  const { pathname } = useLocation();
  const [history, setHistory] = useContext(HistoryContext);

  return (
    <nav className="">
      <div className={`bg ${pathname.match(/^\/book\//) ? "" : "d-none"}`} />
      <div className="nav">
        {history.length > 1 && pathname !== "/" ? (
          <Link
            to={history[history.length - 2].pathname}
            onClick={() => setHistory([...history.slice(0, -1)])}
            className="text-decoration-none"
          >
            <i className="bi bi-chevron-left" />
            <span>{history[history.length - 2].title}</span>
          </Link>
        ) : null}
        {pathname.match(/^\/tag\//) ? (
          <Dropdown className="ms-auto">
            <Dropdown.Toggle variant="link">
              <i className="bi bi-list"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#">
                <div>Export List</div>
                <div>(not yet implemented)</div>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
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
