import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";

export default function FormTable({ forms, navigate, deleteForm }) {
  return (
    <>
      <h2 className="text-left">
        <FormattedMessage
          id="message.form-title"
          defaultMessage="Completed forms"
        />
      </h2>
      <div className="d-flex justify-content-between mb-3">
        <div className="dropdown">
          <ul className="dropdown-menu" aria-labelledby="sortDropdown">
            <li>
              <button className="dropdown-item">
                <FormattedMessage
                  id="message.button-sort"
                  defaultMessage="Name"
                />
              </button>
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
            <th scope="col">
              <FormattedMessage
                id="message.button-sort"
                defaultMessage="Name"
              />
            </th>
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
                      <FormattedMessage
                        id="message.button-look"
                        defaultMessage="Look"
                      />
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      onClick={() => deleteForm(form._id)}
                    >
                      <FormattedMessage
                        id="message.button-delete"
                        defaultMessage="Delete"
                      />
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
