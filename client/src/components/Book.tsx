import type { Book as BookType } from "@/types";
import { Link } from "react-router";

const Book = ({ id, name, authors, description }: BookType) => (
  <li className="book">
    <Link to={`/book/${id}`} className="text-decoration-none">
      <img src={`/books/${id}.jpg`} alt={name} />
      <div className="data">
        <div className="title" title={name}>
          {name}
        </div>
        <div
          className="authors"
          title={authors
            ?.map(({ first, last }) => `${first} ${last}`)
            .join(", ")}
        >
          {authors?.map(({ first, last }) => `${first} ${last}`).join(", ")}
        </div>
        <div className="description">{description}</div>
      </div>
    </Link>
  </li>
);

export default Book;
