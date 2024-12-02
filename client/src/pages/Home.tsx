import { useContext } from "react";
import { format } from "date-fns";
import { TagsContext } from "@/context";
import { Tag } from "@/design";

const Home = () => {
  const [tags, _] = useContext(TagsContext);

  return (
    <>
      <h1>Tags</h1>
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
              <div className="text-primary">
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
