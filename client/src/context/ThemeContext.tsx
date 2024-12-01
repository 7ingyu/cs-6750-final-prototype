import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";

const ThemeContext = createContext<
  [string, Dispatch<SetStateAction<string>>] | []
>([]);

export default ThemeContext;
