import type { Book as BookType } from "@/types";
import { Link } from "react-router";

type BookProps = BookType & { onClick?: () => void; checked: boolean };

const BookContents = ({ id, name, authors, description }: BookType) => (
  <>
    <div>
      <img src={`/books/${id}.jpg`} alt={name} />
    </div>
    <div className="data">
      <div className="title" title={name}>
        {name}
      </div>
      <div
        className="authors"
        title={authors?.map(({ first, last }) => `${first} ${last}`).join(", ")}
      >
        {authors?.map(({ first, last }) => `${first} ${last}`).join(", ")}
      </div>
      <div className="description">{description}</div>
    </div>
  </>
);

const Book = ({ onClick, checked, ...book }: BookProps) => (
  <li className="book">
    {onClick ? (
      <a
        role="button"
        onClick={onClick}
        className={`text-decoration-none${checked ? " selected" : ""}`}
      >
        <BookContents {...book} />
        <input
          className="form-check-input"
          type="checkbox"
          checked={checked}
          readOnly
        />
      </a>
    ) : (
      <Link to={`/book/${book.id}`} className="text-decoration-none">
        <BookContents {...book} />
      </Link>
    )}
  </li>
);

export default Book;
