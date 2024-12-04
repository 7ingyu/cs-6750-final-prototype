import { useContext } from "react";
import { Link, useLocation } from "react-router";
import { HistoryContext } from "@/context";

const Nav = () => {
  const handleClick = () => {};
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
        <button
          className="ms-auto btn btn-link btn-lg p-1"
          onClick={handleClick}
        >
          <i className="bi bi-list"></i>
        </button>
      </div>
    </nav>
  );
};

export default Nav;
