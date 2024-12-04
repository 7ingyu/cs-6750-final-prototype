import { ReactNode } from "~/@types/react";

type FloatBtnProps = {
  children: ReactNode;
  onClick: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  color?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark";
};

const FloatBtn = ({ children, onClick, color = "primary" }: FloatBtnProps) => (
  <button className={`float-btn btn-${color}`} onClick={onClick}>
    <span>{children}</span>
  </button>
);

export default FloatBtn;
