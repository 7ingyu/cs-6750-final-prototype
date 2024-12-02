import { useContext, useEffect, useState } from "react";
import { format } from "date-fns";
import { TagsContext } from "@/context";
import { Tag } from "@/design";

type FilterObj = {
  sortBy: "newest" | "oldest" | "recent" | "size" | "name";
  regular: boolean;
  smart: boolean;
  order: "asc" | "desc";
};

const Home = () => {
  const [allTags, _] = useContext(TagsContext);
  const [filter, setFilter] = useState<FilterObj>({
    sortBy: "recent",
    regular: false,
    smart: false,
    order: "asc",
  });
  const [tags, setTags] = useState(allTags);

  useEffect(() => {
    let filteredTags = allTags;
    if (filter.smart && !filter.regular) {
      filteredTags = allTags?.filter((t) => t.smart);
    } else if (!filter.smart && filter.regular) {
      filteredTags = allTags?.filter((t) => !t.smart);
    }
    setTags(filteredTags);
  }, [filter]);

  return (
    <>
      <h1>Tags</h1>
      <div className="mt-2 mb-3 d-flex flex-wrap justify-content-between">
        <button className="btn btn-primary px-2 py-0 btn-lg mb-3">
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
    </>
  );
};

export default Home;
