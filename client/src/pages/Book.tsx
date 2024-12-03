import { useContext } from "react";
import { useParams, Link } from "react-router";
import { BooksContext } from "@/context";
import { Tag } from "@/design";
// import { format } from "date-fns";
// import { Offcanvas, Modal } from "react-bootstrap";

const Book = () => {
  const id = useParams().id;
  // const navigate = useNavigate();
  // const [allTags, setAllTags] = useContext(TagsContext);
  const [allBooks, _] = useContext(BooksContext);
  // const [showEdit, setShowEdit] = useState(false);
  // const [showDuplicateError, setShowDuplicateError] = useState(false);
  // const [showConfirmation, setShowConfirmation] = useState(false);

  const book = allBooks.find((_, i) => i === Number(id));

  if (!book)
    return (
      <div>
        <h1>Tag not found</h1>
      </div>
    );

  const { name, authors, tags } = book;

  return (
    <div className="book-pg">
      <div className="bg" />
      <header className="mb-3">
        <div className="authors">
          {authors?.map(({ first, last }) => `${first} ${last}`).join(", ")}
        </div>
        <h1 className="title">{name}</h1>
        <img src={`/books/${id}.jpg`} alt={name} />
      </header>
      <main className="pt-3">
        <div>Borrow</div>
        <hr />
        <div>Read Sample</div>
        <hr />
        <div>
          {tags?.length ? (
            tags.map((t, i) => (
              <Link to={`/tag/${i}`} key={i}>
                <Tag>{t.name}</Tag>
              </Link>
            ))
          ) : (
            <em>No tags</em>
          )}
        </div>
      </main>
    </div>
  );
};

export default Book;
