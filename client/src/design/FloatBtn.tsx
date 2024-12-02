import { ReactNode } from "~/@types/react";

type FloatBtnProps = {
  children: ReactNode;
  onClick: (event?: React.MouseEvent<HTMLButtonElement>) => void;
};

const FloatBtn = ({ children, onClick }: FloatBtnProps) => (
  <button className="float-btn" onClick={onClick}>
    <span>{children}</span>
  </button>
);

export default FloatBtn;
