import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { History } from "@/types";

const HistoryContext = createContext<
  [History[], Dispatch<SetStateAction<History[]>>]
>([[], () => []]);

export default HistoryContext;
