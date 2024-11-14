import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";

export default function Questions({
  questionList,
  changeQuestion,
  addQuestion,
}) {
  return (
    <>
      <h3>
        <FormattedMessage
          id="message.title-questions"
          defaultMessage="Questions"
        />
      </h3>
      {questionList.map((question, index) => (
        <div key={index} className="mb-3">
          <label className="form-label">
            <FormattedMessage
              id="message.label-questions"
              defaultMessage="Question {index}"
              values={{ index: index + 1 }}
            />
          </label>
          <input
            type="text"
            name="label"
            className="form-control"
            value={question.label}
            onChange={(e) => changeQuestion(index, e)}
            placeholder="Enter question text"
            required
          />
          <select
            name="type"
            className="form-select mt-2"
            value={question.type}
            onChange={(e) => changeQuestion(index, e)}
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
};
