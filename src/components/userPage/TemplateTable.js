import PropTypes from "prop-types";
import React from "react";
import { FormattedMessage } from "react-intl";

export default function TemplateTable({
  navigate,
  sortConfig,
  sortedTemplates,
  requestSort,
  deleteTemplate,
  templates,
}) {
  return (
    <>
      <h2 className="text-left">
        <FormattedMessage
          id="message.template-title"
          defaultMessage="Templates"
        />
      </h2>
      <div className="d-flex justify-content-end mb-3">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => navigate("/create-template")}
        >
          <FormattedMessage
            id="message.button-new"
            defaultMessage="Create a new template"
          />
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">
              <button
                type="button"
                onClick={() => requestSort("title")}
                className={
                  sortConfig?.key === "title" ? sortConfig.direction : undefined
                }
              >
                <FormattedMessage
                  id="message.button-sort"
                  defaultMessage="Name"
                />
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(templates) &&
            sortedTemplates.map((template, index) => (
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
                      <FormattedMessage
                        id="message.button-look"
                        defaultMessage="Look"
                      />
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-primary me-2"
                      onClick={() => navigate(`/template/${template._id}`)}
                    >
                      <FormattedMessage
                        id="message.button-edit"
                        defaultMessage="Edit"
                      />
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      onClick={() => deleteTemplate(template._id)}
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

TemplateTable.propTypes = {
  templates: PropTypes.array.isRequired,
  sortedTemplates: PropTypes.array.isRequired,
  navigate: PropTypes.func.isRequired,
  requestSort: PropTypes.func.isRequired,
  sortConfig: PropTypes.object,
  deleteTemplate: PropTypes.func.isRequired,
};
