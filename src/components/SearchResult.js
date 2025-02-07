import { Link } from "react-router-dom";
import Card from "./Card";
import useShowSearch from "../hooks/useShowSearch";
import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";

export default function SearchResult() {
  const templates = useShowSearch();
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <button
        type="button"
        className="btn btn-link"
        onClick={() => navigate("/")}
      >
        <FormattedMessage id="message.button-back" defaultMessage="Go back" />
      </button>
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
