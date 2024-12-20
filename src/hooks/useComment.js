import { useState, useEffect } from "react";
import { createComment, getComments } from "../services/commentService";
import { apiDeleteComment } from "../services/commentService";

const useComment = (templateId) => {
  const [comments, setComments] = useState([]);
  const [textComment, setTextComment] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const data = await getComments(token, templateId);

        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [templateId]);

  const commentSubmit = async (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem("token");

    const commentsData = {
      text: textComment,
      templateId: templateId,
    };

    try {
      const newComment = await createComment(token, commentsData);
      setComments([...comments, newComment]);
      setTextComment("");
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      await apiDeleteComment(commentId);
      setComments(comments.filter((comment) => comment._id !== commentId));
    } catch (error) {
      console.error("Error delete comment:", error);
    }
  };

  return {
    comments,
    commentSubmit,
    textComment,
    setTextComment,
    deleteComment,
  };
};

export default useComment;
