import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";

export default function NewTemplateDetails({
  message,
  handleSubmit,
  template,
  setTemplate,
}) {
  return (
    <>
      <h2>
        <FormattedMessage
          id="message.title"
          defaultMessage="Create a New Template"
        />
      </h2>
      {message && <div className="alert alert-info"> {message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            value={template.title}
            onChange={(e) =>
              setTemplate({ ...template, title: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            rows="3"
            value={template.description}
            onChange={(e) =>
              setTemplate({ ...template, description: e.target.value })
            }
          ></textarea>
        </div>
        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            checked={template.isPublic}
            onChange={(e) =>
              setTemplate({ ...template, isPublic: e.target.checked })
            }
            id="isPublic"
          />
          <label className="form-check-label" htmlFor="isPublic">
            <FormattedMessage
              id="message.check-box"
              defaultMessage="Public template"
            />
          </label>
        </div>
      </form>
    </>
  );
}

NewTemplateDetails.propTypes = {
  message: PropTypes.string.isRequired,
  setTemplate: PropTypes.func.isRequired,
  template: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    isPublic: PropTypes.bool.isRequired,
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
