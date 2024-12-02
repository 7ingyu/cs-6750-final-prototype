import { useContext } from "react";
import { useParams } from "react-router";
import { TagsContext } from "@/context";
import { Tag as TagComponent } from "@/design";
import { Book } from "@/components";

const Tag = () => {
  const id = useParams().id;
  const [allTags, setAllTags] = useContext(TagsContext);

  const tag = allTags.find((_, i) => i === Number(id));

  if (!tag)
    return (
      <div>
        <h1>Tag not found</h1>
      </div>
    );

  const { name, type, smart, description, books, createdAt, updatedAt } = tag;

  return (
    <>
      <div className="mb-3">
        <TagComponent size="lg">
          <h1 className="fs-3 p-0 m-0">{name}</h1>
        </TagComponent>
      </div>
      <ul className="list-unstyled">
        {books.map((book, i) => (
          <Book key={i} {...book} />
        ))}
      </ul>
    </>
  );
};

export default Tag;
