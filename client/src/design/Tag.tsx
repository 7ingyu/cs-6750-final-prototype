import { ReactNode } from "~/@types/react";

type TagProps = {
  size?: "sm" | "lg";
  children: ReactNode;
  onClick?: undefined | ((event: React.MouseEvent<HTMLButtonElement>) => void);
};

const TagEnd = () => (
  <svg viewBox="0 0 18 30">
    <defs>
      <mask id="mask" x="0" y="0" width="18" height="30">
        <rect x="0" y="0" width="18" height="30" fill="#fff" />
        <text
          text-anchor="top"
          font-size="150%"
          font-weight="bold"
          x="5"
          y="20"
          dy="1"
          fill="#000"
        >
          :
        </text>
      </mask>
    </defs>
    <rect
      x="0"
      y="0"
      width="18"
      height="30"
      mask="url(#mask)"
      fill-opacity="1"
      fill="var(--bs-secondary)"
    />
    <text
      text-anchor="top"
      font-size="145%"
      font-weight="bold"
      x="5"
      y="20"
      dy="1"
      stroke="white"
      strokeOpacity={1}
      strokeWidth={1.5}
      fillOpacity={0}
      mask="url(#mask)"
    >
      :
    </text>
  </svg>
);

const Tag = ({ size = "sm", children, onClick }: TagProps) => {
  return onClick ? (
    <button className={`tag ${size}`} onClick={onClick}>
      <span>{children}</span>
      <TagEnd />
    </button>
  ) : (
    <span className={`tag ${size}`}>
      <span>{children}</span>
      <TagEnd />
    </span>
  );
};

export default Tag;
