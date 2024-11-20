import React from "react";
import PropTypes from "prop-types";
import useComment from "../../hooks/useComment";
import { FormattedMessage } from "react-intl";

export default function CommentInput({ templateId }) {
  const { commentSubmit, textComment, setTextComment } = useComment(templateId);

  return (
    <div>
      <form id="commentForm" onSubmit={(e) => commentSubmit(e)}>
        <div className="mb-3">
          <textarea
            className="form-control"
            id="commentText"
            value={textComment}
            onChange={(e) => setTextComment(e.target.value)}
            rows="3"
            placeholder="Write your comment"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          <FormattedMessage id="message.button-send" defaultMessage="Submit" />
        </button>
      </form>
    </div>
  );
}

CommentInput.propTypes = {
  templateId: PropTypes.string.isRequired,
};
