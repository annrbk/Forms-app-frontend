import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function UserPage() {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState([]);
  const [forms, setForms] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchTemplates = async () => {
      const token = sessionStorage.getItem("token");

      try {
        const templatesResponse = await fetch(
          `${process.env.REACT_APP_LINK_TO_BACKEND}/api/templates/user-templates`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const templatesData = await templatesResponse.json();
        setTemplates(templatesData);
      } catch (error) {
        console.error("Error fetching templates", error);
      }
    };

    const fetchForms = async () => {
      const token = sessionStorage.getItem("token");

      try {
        const formsResponse = await fetch(
          `${process.env.REACT_APP_LINK_TO_BACKEND}/api/form/user-forms`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const formsData = await formsResponse.json();
        setForms(formsData);
      } catch (error) {
        console.error("Error fetching forms", error);
      }
    };

    fetchTemplates();
    fetchForms();
  }, []);

  const deleteTemplate = async (templateId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_LINK_TO_BACKEND}/api/templates/${templateId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      if (response.ok) {
        setTemplates(
          templates.filter((template) => template._id !== templateId)
        );
      } else {
        console.error("Error delete template");
      }
    } catch (error) {
      console.error("Error delete template:", error);
    }
  };

  const deleteForm = async (formId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_LINK_TO_BACKEND}/api/form/${formId}/delete`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      if (response.ok) {
        setForms(forms.filter((form) => form._id !== formId));
      } else {
        console.error("Error delete template");
      }
    } catch (error) {
      console.error("Error delete template:", error);
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
      {user ? (
        <>
          <p className="float-end">Hello, {user.name}!</p>
          <h2 className="text-left">Templates</h2>
          <div className="d-flex justify-content-between mb-3">
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle btn-sm"
                type="button"
                id="sortDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Sort
              </button>
              <ul className="dropdown-menu" aria-labelledby="sortDropdown">
                <li>
                  <button className="dropdown-item">Name</button>
                </li>
                <li>
                  <button className="dropdown-item">Date of change</button>
                </li>
              </ul>
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate("/create-template")}
            >
              Create a new template
            </button>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(templates) &&
                templates.map((template, index) => (
                  <tr key={template._id}>
                    <th scope="row">{index + 1}</th>
                    <td>
                      {template.title}
                      <div className="float-end">
                        <button
                          type="button"
                          className="btn btn-outline-success me-2"
                          onClick={() => navigate(`/template/${template._id}`)}
                        >
                          Look
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-primary me-2"
                          onClick={() => navigate(`/template/${template._id}`)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={() => deleteTemplate(template._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <h2 className="text-left">Completed forms</h2>
          <div className="d-flex justify-content-between mb-3">
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle btn-sm"
                type="button"
                id="sortDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Sort
              </button>
              <ul className="dropdown-menu" aria-labelledby="sortDropdown">
                <li>
                  <button className="dropdown-item">Name</button>
                </li>
                <li>
                  <button className="dropdown-item">Date of change</button>
                </li>
              </ul>
            </div>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(forms) &&
                forms.map((form, index) => (
                  <tr key={form._id}>
                    <th scope="row">{index + 1}</th>
                    <td>
                      {form.templateId.title}
                      <div className="float-end">
                        <button
                          type="button"
                          className="btn btn-outline-success me-2"
                          onClick={() => navigate(`/form/${form._id}`)}
                        >
                          Look
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={() => deleteForm(form._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      ) : (
        <p>Loading name</p>
      )}
    </div>
  );
}
