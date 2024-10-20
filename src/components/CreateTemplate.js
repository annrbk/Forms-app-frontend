import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateTemplate() {
  const [message, setMessage] = useState("");
  const [template, setTemplate] = useState({
    title: "",
    description: "",
    isPublic: false,
    questions: [],
  });

  const [questionList, setQuestionList] = useState([
    { type: "text", label: "", required: true },
  ]);

  const navigate = useNavigate();

  const addQuestion = () => {
    setQuestionList([
      ...questionList,
      { type: "text", label: "", required: false },
    ]);
  };

  const changeQuestion = (index, e) => {
    const newQuestions = [...questionList];
    newQuestions[index][e.target.name] = e.target.value;
    setQuestionList(newQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const templateData = {
      ...template,
      questions: questionList,
    };

    const token = sessionStorage.getItem("token");
    console.log(token);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_LINK_TO_BACKEND}/api/templates/create-template`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(templateData),
        }
      );
      console.log(templateData);

      const data = await response.json();

      if (response.ok) {
        setMessage("Template successfully created");
        console.log("Created successful!");
      } else {
        console.log("Created failed");
        console.log(data.message);
      }
    } catch (error) {
      console.error("Error creating template:", error);
    }
  };

  return (
    <div className="container mt-5">
      <button
        type="button"
        className="btn btn-link"
        onClick={() => navigate(-1)}
      >
        Go back
      </button>
      <h2>Create a New Template</h2>
      {message && <div className="alert alert-info"> {message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            value={template.title}
            onChange={(e) =>
              setTemplate({ ...template, title: e.target.value })
            }
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            rows="3"
            value={template.description}
            onChange={(e) =>
              setTemplate({ ...template, description: e.target.value })
            }
          ></textarea>
        </div>

        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            checked={template.isPublic}
            onChange={(e) =>
              setTemplate({ ...template, isPublic: e.target.checked })
            }
            id="isPublic"
          />
          <label className="form-check-label" htmlFor="isPublic">
            Public template
          </label>
        </div>

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
          disabled={questionList.length >= 4}
        >
          Add question
        </button>

        <div className="mt-4">
          <button type="submit" className="btn btn-primary">
            Save template
          </button>
        </div>
      </form>
    </div>
  );
}
