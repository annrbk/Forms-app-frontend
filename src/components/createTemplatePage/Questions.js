import React from "react";
import PropTypes from "prop-types";

export default function Questions({
  questionList,
  changeQuestion,
  addQuestion,
}) {
  return (
    <>
      <h3>Questions</h3>
      {questionList.map((question, index) => (
        <div key={index} className="mb-3">
          <label className="form-label">Question {index + 1}</label>
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
            <option value="text">Short Text</option>
            <option value="textarea">Long Text</option>
            <option value="number">Number</option>
            <option value="checkbox">Checkbox</option>
          </select>
        </div>
      ))}
      <button
        type="button"
        className="btn btn-outline-primary"
        onClick={addQuestion}
      >
        Add question
      </button>
    </>
  );
}

Questions.propTypes = {
  questionList: PropTypes.array.isRequired,
  changeQuestion: PropTypes.func.isRequired,
  addQuestion: PropTypes.func.isRequired,
};
