import React from "react";
import BackButton from "./BackButton";
import UseTemplateActions from "../hooks/useTemplateActions";

export default function TemplatePage() {
  const {
    message,
    template,
    tags,
    handleChange,
    handleSubmit,
    formData,
    isAuthor,
  } = UseTemplateActions();

  return (
    <div className="container mt-5">
      <BackButton />
      {template ? (
        <>
          {message && <div className="alert alert-info"> {message}</div>}
          <h2>{template.title}</h2>
          <form onSubmit={handleSubmit}>
            {template.questions.map((question) => (
              <div className="mb-3" key={`${question._id}`}>
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
            <button type="submit" className="btn btn-primary">
              {isAuthor ? "Edit" : "Submit"}
            </button>
            <div>
              {tags.map((tag) => (
                <span
                  key={tag._id}
                  className="badge border border-primary text-primary me-2 mt-3 py-2 px-3 rounded-pill"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </form>
        </>
      ) : (
        <p>Loading template...</p>
      )}
    </div>
  );
}
