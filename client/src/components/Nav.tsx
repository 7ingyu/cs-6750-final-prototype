import { NavLink } from "react-router";
import { useLocation } from "react-router";

const Nav = () => {
  const handleClick = () => {};
  const { pathname } = useLocation();

  return (
    <nav className="">
      <div className={`bg ${pathname.match(/^\/book\//) ? "" : "d-none"}`} />
      <div className="nav">
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
