import React from "react";
import BackButton from "./BackButton";
import useTemplateActions from "../hooks/useTemplateActions";
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
    handleAnswerChange,
    handleSubmit,
    formData,
    isAuthor,
    editingQuestionId,
    setEditingQuestionId,
    handleEditQuestion,
    saveEditedQuestion,
    handleCheckboxChange,
  } = useTemplateActions();

  const { deleteComment } = useComment();

  return (
    <div className="container mt-5">
      <BackButton />
      {template ? (
        <>
          {message && <div className="alert alert-info">{message}</div>}
          <h2>{template.title}</h2>
          <p>{template.description}</p>
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
              <div
                key={question._id}
                className="p-3 mb-3"
                style={{
                  width: "70%",
                  border: "1px solid #f0ebeb",
                  borderRadius: "0.5rem",
                  position: "relative",
                }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  {editingQuestionId === question._id ? (
                    <input
                      type="text"
                      className="form-control border-warning"
                      value={question.label}
                      onChange={(e) => handleEditQuestion(e, question._id)}
                      style={{
                        width: "70%",
                      }}
                    />
                  ) : (
                    <div>{question.label}</div>
                  )}
                  {isAuthor && (
                    <>
                      {editingQuestionId === question._id ? (
                        <button
                          type="button"
                          className="btn btn-success btn-sm"
                          onClick={() => saveEditedQuestion(question._id)}
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          onClick={() => setEditingQuestionId(question._id)}
                        >
                          Edit
                        </button>
                      )}
                    </>
                  )}
                </div>
                {question.type === "text" ||
                question.type === "textarea" ||
                question.type === "number" ? (
                  <div>
                    <input
                      type={
                        question.type === "textarea" ? "text" : question.type
                      }
                      className="form-control mt-2"
                      id={question._id}
                      value={formData[question._id] || ""}
                      onChange={(e) => handleAnswerChange(e, question._id)}
                    />
                  </div>
                ) : question.type === "checkbox" ? (
                  <div className="mt-2">
                    {question.checkboxList.map((checkbox) => (
                      <div key={checkbox._id} className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={checkbox._id}
                          checked={
                            Array.isArray(formData[question._id]) &&
                            formData[question._id].includes(checkbox.value)
                          }
                          onChange={(e) =>
                            handleCheckboxChange(
                              e,
                              question._id,
                              checkbox.value
                            )
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor={checkbox._id}
                        >
                          {checkbox.value}
                        </label>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
            <button type="submit" className="btn btn-primary mt-2 mb-5">
              <FormattedMessage
                id="message.button-send"
                defaultMessage="Submit"
              />
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
