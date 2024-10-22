import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function UserPage() {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState([]);
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
        console.log("Fetched templates data:", templatesData); //
        setTemplates(templatesData);
      } catch (error) {
        console.error("Error fetching templates", error);
      }
    };
    fetchTemplates();
  }, []);

  return (
    <div className="container mt-5">
      <p>Hello, {user.name}!</p>
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
                <td
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/template/${template._id}`)}
                >
                  {template.title}
                  <div className="float-end">
                    <button
                      type="button"
                      className="btn btn-outline-primary me-2"
                      onClick={() => navigate(`/template-edit/${template._id}`)}
                    >
                      Edit
                    </button>
                    <button type="button" className="btn btn-outline-danger">
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
          <tr>
            <th scope="row">1</th>
            <td>
              Form 1
              <div className="float-end">
                <button type="button" className="btn btn-outline-primary me-2">
                  Edit
                </button>
                <button type="button" className="btn btn-outline-danger">
                  Delete
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>
              Form 2
              <div className="float-end">
                <button type="button" className="btn btn-outline-primary me-2">
                  Edit
                </button>
                <button type="button" className="btn btn-outline-danger">
                  Delete
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>
              Form 3
              <div className="float-end">
                <button type="button" className="btn btn-outline-primary me-2">
                  Edit
                </button>
                <button type="button" className="btn btn-outline-danger">
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
