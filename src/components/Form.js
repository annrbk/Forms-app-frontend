import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchForm } from "../services/formService";
import BackButton from "./BackButton";

export default function FormPage() {
  const { id } = useParams();
  const [form, setForm] = useState(null);

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const token = sessionStorage.getItem("token");

        const data = await fetchForm(id, token);
        setForm(data);
      } catch (error) {
        console.error("Error fetching form:", error);
      }
    };
    fetchFormData();
  }, [id]);

  return (
    <div className="container mt-5">
      <BackButton />
      {form ? (
        <>
          <h2>{form.templateId.title}</h2>
          <form>
            {form.answers.map((answer) => (
              <div
                className="mb-3 p-3"
                key={answer._id}
                style={{
                  width: "70%",
                  border: "1px solid #f0ebeb",
                  borderRadius: "0.5rem",
                  position: "relative",
                }}
              >
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
