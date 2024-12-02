import { useContext, useEffect, useState } from "react";
import { format } from "date-fns";
import Offcanvas from "react-bootstrap/Offcanvas";
import { TagsContext } from "@/context";
import { Tag } from "@/design";

type SortType = "newest" | "oldest" | "recent activity" | "size" | "name";
type FilterObj = {
  sortBy: SortType;
  regular: boolean;
  smart: boolean;
  order: "asc" | "desc";
};

const Home = () => {
  const [allTags, _] = useContext(TagsContext);
  const [filter, setFilter] = useState<FilterObj>({
    sortBy: "recent activity",
    regular: false,
    smart: false,
    order: "asc",
  });
  const [count, setCount] = useState(allTags?.length || 0);
  const [tags, setTags] = useState(allTags);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    let filteredTags = allTags;
    if (filter.smart && !filter.regular) {
      filteredTags = allTags?.filter((t) => t.smart);
    } else if (!filter.smart && filter.regular) {
      filteredTags = allTags?.filter((t) => !t.smart);
    }
    filteredTags = filteredTags?.sort((a, b) => {
      switch (filter.sortBy) {
        case "newest":
          return filter.order === "asc"
            ? a.createdAt.getTime() - b.createdAt.getTime()
            : b.createdAt.getTime() - a.createdAt.getTime();
        case "oldest":
          return filter.order === "asc"
            ? b.createdAt.getTime() - a.createdAt.getTime()
            : a.createdAt.getTime() - b.createdAt.getTime();
        case "size":
          return filter.order === "asc"
            ? a.books.length - b.books.length
            : b.books.length - a.books.length;
        case "recent activity":
          return filter.order === "asc"
            ? a.updatedAt.getTime() - b.updatedAt.getTime()
            : b.updatedAt.getTime() - a.updatedAt.getTime();
        case "name":
          return filter.order === "asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
      }
    });
    setTags(filteredTags);
    setCount(filteredTags?.length || 0);
  }, [filter]);

  return (
    <>
      <h1>Tags</h1>
      <div className="mt-2 mb-3 d-flex flex-wrap justify-content-between">
        <button
          className="btn btn-primary px-2 py-0 btn-lg mb-3"
          onClick={() => setShowFilter(!showFilter)}
        >
          <i className="bi bi-filter" />
        </button>
        <div>
          <button
            onClick={() => setFilter({ ...filter, smart: !filter.smart })}
            className={`btn btn-sm ${filter.smart ? "btn-light" : "btn-dark"} serif me-2`}
          >
            <span>smart tag</span>
            <span className="opacity-50 ms-2">
              {allTags?.filter((t) => t.smart).length}
            </span>
          </button>
          <button
            onClick={() => setFilter({ ...filter, regular: !filter.regular })}
            className={`btn btn-sm ${filter.regular ? "btn-light" : "btn-dark"} serif me-2`}
          >
            <span>regular tag</span>
            <span className="opacity-50 ms-2">
              {allTags?.filter((t) => !t.smart).length}
            </span>
          </button>
        </div>
      </div>
      <div>
        {tags?.map(({ name, type, smart, createdAt, books }) => {
          let desc = "";
          switch (type) {
            case "Sampled":
              desc = `Titles I've sampled since ${format(createdAt, "dd MMM yyyy")}`;
              break;
            case "Borrowed":
              desc = "Titles I've borrowed in Libby";
              break;
          }
          return (
            <div role="button">
              <div className="d-flex justify-content-between">
                <Tag onClick={() => console.log(name)}>{name}</Tag>
                <div className="badge text-bg-primary d-flex align-items-center">
                  {books.length}
                </div>
              </div>
              <div className="text-primary mt-1">
                {smart ? `Smart Tag: ${type}` : "Regular Tag"}
              </div>
              <div>{desc || `Created ${format(createdAt, "dd MMM yyyy")}`}</div>
              <hr />
            </div>
          );
        })}
      </div>
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
              SHOW {count} RESULTS
            </button>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div>Sort By</div>
          <div>
            {["name", "newest", "oldest", "size", "recent activity"].map(
              (sort) => (
                <button
                  className={`btn btn-sm ${filter.sortBy === sort ? "btn-light" : "btn-dark"} serif me-2`}
                  onClick={() =>
                    filter.sortBy === sort
                      ? setFilter({
                          ...filter,
                          order: filter.order === "asc" ? "desc" : "asc",
                        })
                      : setFilter({ ...filter, sortBy: sort as SortType })
                  }
                >
                  <span>{sort}</span>
                  <span className="ms-1 small">
                    <i className="bi bi-arrow-down-up"></i>
                  </span>
                </button>
              ),
            )}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Home;
