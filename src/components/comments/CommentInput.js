import React, { useState } from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import useComment from "../../hooks/useComment";

export default function CommentInput({ templateId }) {
  const [textComment, setTextComment] = useState("");
  const { sendComment } = useComment(templateId);

  const handleSendComment = (e) => {
    e.preventDefault();
    if (textComment.trim()) {
      sendComment(textComment);
      setTextComment("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendComment(e);
    }
  };

  return (
    <div>
      <form id="commentForm" onSubmit={handleSendComment}>
        <div className="mb-3">
          <textarea
            className="form-control"
            id="commentText"
            value={textComment}
            onChange={(e) => setTextComment(e.target.value)}
            rows="3"
            placeholder="Write your comment"
            onKeyDown={handleKeyDown}
          ></textarea>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSendComment}
        >
          <FormattedMessage id="message.button-send" defaultMessage="Submit" />
        </button>
      </form>
    </div>
  );
}

CommentInput.propTypes = {
  templateId: PropTypes.string.isRequired,
};
