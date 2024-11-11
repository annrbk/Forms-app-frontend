import React from "react";
import PropTypes from "prop-types";

export default function FormTable({ forms, navigate, deleteForm }) {
  return (
    <>
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
  );
}

FormTable.propTypes = {
  forms: PropTypes.arrayOf(PropTypes.object).isRequired,
  navigate: PropTypes.func.isRequired,
  deleteForm: PropTypes.func.isRequired,
};
