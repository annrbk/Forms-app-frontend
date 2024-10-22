import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function MainContent() {
  const [templates, setTemplates] = useState([]);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_LINK_TO_BACKEND}/api/templates/latest-templates`,
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }

        const latestTemplates = await response.json();
        setTemplates(latestTemplates);
      } catch (error) {
        console.error("Error fetching latest templates:", error);
      }
    };
    fetchTemplates();
  }, []);

  const PersonalPageClick = () => {
    if (user && user._id) {
      navigate(`/user/${user._id}`);
    }
  };

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Latest Templates</h1>
        {user && (
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={PersonalPageClick}
          >
            Personal page
          </button>
        )}
      </div>
      <div className="row">
        {templates.map((template) => (
          <div key={template._id} className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h2 className="card-title">{template.title}</h2>
                <p className="card-text">{template.description}</p>
                <p className="card-text">
                  <small className="text-muted">
                    Author: {template.author}
                  </small>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
