import React from "react";

const Card = (template) => {
  return (
    <div className="card h-100 mt-3">
      <div className="card-body">
        <h2 className="card-title">{template.title}</h2>
        <p className="card-text">{template.description}</p>
        <p className="card-text">
          <small className="text-muted">Author: {template.author}</small>
        </p>
      </div>
    </div>
  );
};
export default Card;
