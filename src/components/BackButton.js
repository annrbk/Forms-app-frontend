import React from "react";
import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button
        type="button"
        className="btn btn-link"
        onClick={() => navigate(-1)}
      >
        <FormattedMessage id="message.button-back" defaultMessage="Go back" />
      </button>
    </div>
  );
};

export default BackButton;
