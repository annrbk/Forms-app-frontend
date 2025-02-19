import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Card from "./Card";
import useMainActions from "../hooks/useMainActions";
import { FormattedMessage } from "react-intl";

export default function MainContent() {
  const navigate = useNavigate();
  const { templates, tags } = useMainActions();

  const handleTag = (tag) => {
    navigate(`/templates-tag/${tag._id}`);
  };

  return (
    <div
      className="container my-4"
      style={{
        width: "70%",
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-left">
          <FormattedMessage
            id="message.main-title"
            defaultMessage="Latest Templates"
          />
        </h1>
      </div>
      <div className="row">
        {templates.map((template) => (
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
        ))}
      </div>
      <div>
        {tags.map((tag) => (
          <span
            className="badge border border-primary text-primary me-2 mt-3 py-2 px-3 rounded-pill"
            key={tag._id}
            onClick={() => handleTag(tag)}
            style={{ cursor: "pointer" }}
          >
            {tag.name}
          </span>
        ))}
      </div>
    </div>
  );
}
