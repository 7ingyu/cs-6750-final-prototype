const Nav = () => {
  const handleClick = () => {};

  return (
    <nav className="d-flex justify-content-end p-3">
      <button className="btn btn-link" onClick={handleClick}>
        <i className="bi bi-list"></i>
      </button>
    </nav>
  );
};

export default Nav;
