import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import useComment from "../../hooks/useComment";
import CommentInput from "../comments/CommentInput";
import { FormattedMessage } from "react-intl";
import { UserContext } from "../../context/UserContext";

export default function CommentCard({ templateId, deleteComment }) {
  const { comments } = useComment(templateId);
  const { user } = useContext(UserContext);
  const [visibleComments, setVisibleComments] = useState(5);

  const isAdminRole = () => {
    return user.role === "admin";
  };

  function handleMoreClick() {
    setVisibleComments((prevComments) => prevComments + 5);
  }

  return (
    <div>
      <h4 className="mb-4">
        <FormattedMessage id="message.comments" defaultMessage="Comments" />
      </h4>
      <CommentInput templateId={templateId} />
      {comments && comments.length > 0 ? (
        <div className="comments-list mb-3 mt-3">
          {comments.slice(0, visibleComments).map((comment) => (
            <div className="card mb-3" key={comment._id}>
              <div className="card-body">
                {isAdminRole() && (
                  <button
                    className="btn btn-link text-danger position-absolute top-0 end-0 m-2 p-0"
                    onClick={() => deleteComment(comment._id)}
                    aria-label="Delete comment"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-x"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                  </button>
                )}
                <h6 className="card-title mb-1">{comment.author?.email}</h6>
                <small className="text-muted">
                  {new Date(comment.date).toLocaleString()}
                </small>
                <p className="card-text mt-2">{comment.text}</p>
              </div>
            </div>
          ))}
          {comments.length > 5 && (
            <button
              type="button"
              className="btn btn-link"
              onClick={handleMoreClick}
            >
              Show more
            </button>
          )}
        </div>
      ) : (
        <p>No comments found</p>
      )}
    </div>
  );
}

CommentCard.propTypes = {
  templateId: PropTypes.string.isRequired,
  deleteComment: PropTypes.func.isRequired,
};
