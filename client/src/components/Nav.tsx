import { NavLink } from "react-router";

const Nav = () => {
  const handleClick = () => {};

  return (
    <nav className="d-flex justify-content-end align-items-center p-3">
      <NavLink
        to="/"
        className={({ isActive, isPending, isTransitioning }) =>
          [
            isPending ? "pending" : "",
            isActive ? "d-none" : "",
            isTransitioning ? "transitioning" : "",
          ].join(" ")
        }
      >{`< Tags`}</NavLink>
      <button className="ms-auto btn btn-link btn-lg p-1" onClick={handleClick}>
        <i className="bi bi-list"></i>
      </button>
    </nav>
  );
};

export default Nav;
