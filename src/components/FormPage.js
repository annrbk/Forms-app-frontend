import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function FormPage() {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const token = sessionStorage.getItem("token");

        const response = await fetch(
          `${process.env.REACT_APP_LINK_TO_BACKEND}/api/form/user-form/${id}`,
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

        const formData = await response.json();
        setForm(formData);
      } catch (error) {
        console.error("Error fetching form:", error);
      }
    };
    fetchForm();
  }, [id]);

  return (
    <div className="container mt-5">
      <button
        type="button"
        className="btn btn-link"
        onClick={() => navigate(-1)}
      >
        Go back
      </button>
      {form ? (
        <>
          <h2>{form.templateId.title}</h2>
          <form>
            {form.answers.map((answer) => (
              <div className="mb-3" key={answer._id}>
                <label htmlFor={answer._id} className="form-label">
                  {answer.questionId.label}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id={answer._id}
                  value={answer.answer}
                  readOnly
                />
              </div>
            ))}
          </form>
        </>
      ) : (
        <p>Loading form...</p>
      )}
    </div>
  );
}
