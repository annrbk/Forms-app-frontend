import { checkResponse } from "./errorService";

export const createComment = async (token, commentsData) => {
  const response = await fetch(
    `${process.env.REACT_APP_LINK_TO_BACKEND}/api/comments/create-comment`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(commentsData),
    }
  );

  return checkResponse(response);
};

export const getComments = async (token, templateId) => {
  const response = await fetch(
    `${process.env.REACT_APP_LINK_TO_BACKEND}/api/comments/${templateId}/comments`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return checkResponse(response);
};
