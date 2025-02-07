import { Link } from "react-router-dom";
import BackButton from "./BackButton";
import Card from "./Card";
import useResultByTag from "../hooks/useResultByTag";

export default function ResultByTag() {
  const templates = useResultByTag();

  return (
    <div
      className="container mt-5"
      style={{
        width: "70%",
      }}
    >
      <BackButton />
      {templates && templates.length ? (
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
