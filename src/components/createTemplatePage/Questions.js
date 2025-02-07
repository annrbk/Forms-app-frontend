import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";

export default function Questions({
  questionList,
  changeQuestion,
  addQuestion,
  addCheckbox,
  checkboxChange,
  deleteQuestion,
  questionError,
}) {
  return (
    <>
      <h3>
        <FormattedMessage
          id="message.title-questions"
          defaultMessage="Questions"
        />
      </h3>
      {questionError && <p className="text-danger">{questionError}</p>}
      {questionList.map((question, questionIndex) => (
        <div
          key={questionIndex}
          className="mb-3 p-3"
          style={{
            width: "70%",
            border: "1px solid #f0ebeb",
            borderRadius: "0.5rem",
          }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <label className="form-label">
              <FormattedMessage
                id="message.label-questions"
                defaultMessage="Question {index}"
                values={{ index: questionIndex + 1 }}
              />
            </label>
            <button
              className="btn pb-4"
              onClick={() => deleteQuestion(questionIndex)}
              style={{ color: "#dc3545" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-x"
                viewBox="0 0 16 16"
              >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </button>
          </div>
          <input
            type="text"
            name="label"
            className="form-control"
            value={question.label}
            onChange={(e) => changeQuestion(questionIndex, e)}
            placeholder="Enter question text"
            required
          />
          <select
            name="type"
            className="form-select mt-2"
            value={question.type}
            onChange={(e) => changeQuestion(questionIndex, e)}
          >
            <option value="text">
              <FormattedMessage
                id="message.option-short"
                defaultMessage="Short Text"
              />
            </option>
            <option value="textarea">
              <FormattedMessage
                id="message.option-long"
                defaultMessage="Long Text"
              />
            </option>
            <option value="number">
              <FormattedMessage
                id="message.option-number"
                defaultMessage="Number"
              />
            </option>
            <option value="checkbox">
              <FormattedMessage
                id="message.option-check"
                defaultMessage="Checkbox"
              />
            </option>
          </select>
          {question.type === "checkbox" &&
            question.checkboxList &&
            question.checkboxList.length > 0 && (
              <div className="mt-2">
                {question.checkboxList.map((checkbox, index) => (
                  <div
                    key={index}
                    className="form-check d-flex align-items-center gap-2"
                  >
                    <input className="form-check-input" type="checkbox" />
                    <input
                      className="form-control d-inline-block w-auto ms-2"
                      type="text"
                      placeholder="Enter option"
                      value={checkbox.value || ""}
                      onChange={(e) => checkboxChange(questionIndex, index, e)}
                    ></input>
                    <label className="form-check-label">{checkbox.label}</label>
                  </div>
                ))}
                <button
                  type="button"
                  className="btn btn-primary btn-sm mt-2"
                  onClick={() => addCheckbox(questionIndex)}
                >
                  Add checkbox
                </button>
              </div>
            )}
        </div>
      ))}
      <button
        type="button"
        className="btn btn-outline-primary"
        onClick={addQuestion}
      >
        <FormattedMessage
          id="message.button-add"
          defaultMessage="Add question"
        />
      </button>
    </>
  );
}

Questions.propTypes = {
  questionList: PropTypes.array.isRequired,
  changeQuestion: PropTypes.func.isRequired,
  addQuestion: PropTypes.func.isRequired,
  addCheckbox: PropTypes.func.isRequired,
  checkboxChange: PropTypes.func.isRequired,
  deleteQuestion: PropTypes.func.isRequired,
  questionError: PropTypes.string.isRequired,
};
