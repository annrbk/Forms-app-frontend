import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function TemplatePage() {
  const { id } = useParams();
  const [template, setTemplate] = useState(null);
  const [formData, setFormData] = useState({});
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
          `${process.env.REACT_APP_LINK_TO_BACKEND}/api/templates/${id}`,
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

        const initialFormData = templateData.questions.reduce(
          (acc, question) => {
            acc[question._id] = "";
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
          <h2>{template.title}</h2>
          <form>
            {template.questions.map((question) => (
              <div className="mb-3" key={question._id}>
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
              Submit
            </button>
          </form>
        </>
      ) : (
        <p>Loading template...</p>
      )}
    </div>
  );
}
