import { Book as BookType } from "@/types";

const Book = ({ id, name, authors, description }: BookType) => (
  <li className="book">
    <div>
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
    </div>
    <hr />
  </li>
);

export default Book;
