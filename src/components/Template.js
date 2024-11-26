import React from "react";
import BackButton from "./BackButton";
import UseTemplateActions from "../hooks/useTemplateActions";
import CommentCard from "./comments/CommentCard";
import { useParams } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import useComment from "../hooks/useComment";

export default function Template() {
  const { id } = useParams();

  const {
    message,
    template,
    tags,
    handleChange,
    handleSubmit,
    formData,
    isAuthor,
  } = UseTemplateActions();

  const { deleteComment } = useComment();

  return (
    <div className="container mt-5">
      <BackButton />
      {template ? (
        <>
          {message && <div className="alert alert-info"> {message}</div>}
          <h2>{template.title}</h2>
          <div className="mb-2">
            {tags.map((tag) => (
              <span
                key={tag._id}
                className="badge border border-primary text-primary me-2 py-2 px-3 rounded-pill"
              >
                {tag.name}
              </span>
            ))}
          </div>
          <form className="mt-4" onSubmit={handleSubmit}>
            {template.questions.map((question) => (
              <div key={`${question._id}`}>
                <label htmlFor={question._id} className="form-label">
                  {question.label ? question.label : "No question"}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id={question._id}
                  value={formData[question._id] || ""}
                  onChange={(e) => handleChange(e, question._id)}
                />
              </div>
            ))}
            <button type="submit" className="btn btn-primary mt-2 mb-5">
              {isAuthor ? (
                <FormattedMessage
                  id="message.button-edit"
                  defaultMessage="Edit"
                />
              ) : (
                <FormattedMessage
                  id="message.button-send"
                  defaultMessage="Submit"
                />
              )}
            </button>
          </form>
          <CommentCard templateId={id} deleteComment={deleteComment} />
        </>
      ) : (
        <p>Loading template...</p>
      )}
    </div>
  );
}
