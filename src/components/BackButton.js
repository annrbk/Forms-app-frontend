import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button
        type="button"
        className="btn btn-link"
        onClick={() => navigate(-1)}
      >
        Go back
      </button>
    </div>
  );
};

export default BackButton;
