import { ReactNode } from "~/@types/react";

type TagProps = {
  size?: "sm" | "lg";
  children: ReactNode;
  onClick?: undefined | ((event: React.MouseEvent<HTMLButtonElement>) => void);
};

const TagEnd = ({ size }: { size: string }) => (
  <svg viewBox="0 0 22 44">
    <defs>
      <mask id={`mask-${size}`} x="0" y="0" width="100%" height="100%">
        <rect x="0" y="0" width="100%" height="100%" fill="#fff" />
        <text
          textAnchor="middle"
          fontSize="190%"
          fontWeight="bold"
          x="50%"
          y="65%"
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
      width="100%"
      height="100%"
      mask={`url(#mask-${size})`}
      fillOpacity="1"
      fill="var(--bs-secondary)"
    />
    <text
      textAnchor="middle"
      fontSize="190%"
      fontWeight="bold"
      x="50%"
      y="65%"
      dy="1"
      stroke="white"
      strokeOpacity={1}
      strokeWidth={size === "sm" ? 0.5 : 0.75}
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
      <TagEnd size={size} />
    </button>
  ) : (
    <span className={`tag ${size}`}>
      <span>{children}</span>
      <TagEnd size={size} />
    </span>
  );
};

export default Tag;
