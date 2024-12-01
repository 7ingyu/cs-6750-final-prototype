import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { Tag } from "@/types";

const TagsContext = createContext<
  [Tag[], Dispatch<SetStateAction<Tag[]>>] | []
>([]);

export default TagsContext;
