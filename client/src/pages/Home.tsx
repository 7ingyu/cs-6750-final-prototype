import { useContext } from "react";
import { TagsContext } from "@/context";
import { Tag } from "@/design";

const Home = () => {
  const [tags, _] = useContext(TagsContext);

  return (
    <>
      <h1>Tags</h1>
      <div>
        {tags?.map(({ name }) => (
          <Tag onClick={() => console.log(name)}>{name}</Tag>
        ))}
        {tags?.map(({ name }) => (
          <Tag size="lg" onClick={() => console.log(name)}>
            {name}
          </Tag>
        ))}
      </div>
    </>
  );
};

export default Home;
