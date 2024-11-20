import React from "react";
import PropTypes from "prop-types";
import useComment from "../../hooks/useComment";
import CommentInput from "../comments/CommentInput";
import { FormattedMessage } from "react-intl";

export default function CommentCard({ templateId }) {
  const { comments } = useComment(templateId);

  return (
    <div>
      <h4 className="mb-4">
        <FormattedMessage id="message.comments" defaultMessage="Comments" />
      </h4>
      <CommentInput templateId={templateId} />
      {comments && comments.length > 0 ? (
        <div className="comments-list mb-3 mt-3">
          {comments.map((comment) => (
            <div className="card mb-3" key={comment._id}>
              <div className="card-body">
                <h6 className="card-title mb-1">{comment.author?.email}</h6>
                <small className="text-muted">
                  {new Date(comment.date).toLocaleString()}
                </small>
                <p className="card-text mt-2">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No comments found</p>
      )}
    </div>
  );
}

CommentCard.propTypes = {
  templateId: PropTypes.string.isRequired,
};
