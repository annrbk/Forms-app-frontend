import { Link } from "react-router-dom";
import BackButton from "./BackButton";
import Card from "./Card";
import useShowSearch from "../hooks/useShowSearch";

export default function SearchResult() {
  const templates = useShowSearch();

  return (
    <div className="row">
      <BackButton />
      {templates.length > 0 ? (
        templates.map((template) => (
          <Link
            to={`/templates/${template._id}`}
            key={template._id}
            className="col-md-4 mb-4"
            style={{ textDecoration: "none" }}
          >
            <Card
              title={template.title}
              description={template.description}
              author={template.author}
            />
          </Link>
        ))
      ) : (
        <p>Nothing found</p>
      )}
    </div>
  );
}
