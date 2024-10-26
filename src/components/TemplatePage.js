import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function TemplatePage() {
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [template, setTemplate] = useState(null);
  const [formData, setFormData] = useState({});
  const [isAuthor, setIsAuthor] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const token = sessionStorage.getItem("token");

        if (!token) {
          alert("You need to be logged in to access this page.");
          navigate("/login");
          return;
        }

        const response = await fetch(
          `${process.env.REACT_APP_LINK_TO_BACKEND}/api/templates/user-template/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }

        const templateData = await response.json();
        setTemplate(templateData);

        const currentUser = JSON.parse(sessionStorage.getItem("user"));
        if (templateData.author === currentUser.name) {
          setIsAuthor(true);
        }

        const initialFormData = templateData.questions.reduce(
          (acc, question) => {
            acc[question._id] = question.answer || "";
            return acc;
          },
          {}
        );

        setFormData(initialFormData);
      } catch (error) {
        console.error("Error fetching template:", error);
      }
    };
    fetchTemplate();
  }, [id, navigate]);

  const handleChange = (e, questionId) => {
    setFormData({
      ...formData,
      [questionId]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem("token");
    try {
      if (isAuthor) {
        const response = await fetch(
          `${process.env.REACT_APP_LINK_TO_BACKEND}/api/templates/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              questions: Object.entries(formData).map(([id, label]) => ({
                id: id,
                label: label,
              })),
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to update: ${response.statusText}`);
        }

        const updatedTemplate = await response.json();
        setTemplate(updatedTemplate);
        setMessage("Template updated successfully!");
      } else {
        const response = await fetch(
          `${process.env.REACT_APP_LINK_TO_BACKEND}/api/form/${id}/forms`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              templateId: id,
              answers: Object.entries(formData).map(
                ([questionId, label, title]) => ({
                  questionId: questionId,
                  answer: label,
                  title: title,
                })
              ),
            }),
          }
        );

        if (response.ok) {
          setMessage("Template completed successfully");
          setFormData("");
        }
      }
    } catch (error) {
      console.error(error);
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
          </form>
        </>
      ) : (
        <p>Loading template...</p>
      )}
    </div>
  );
}
