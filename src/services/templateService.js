import { checkResponse } from "./errorService";

export const fetchTemplate = async (id, token) => {
  const response = await fetch(
    `${process.env.REACT_APP_LINK_TO_BACKEND}/api/templates/user-template/${id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return checkResponse(response);
};

export const fillTemplate = async (id, token, formData) => {
  const response = await fetch(
    `${process.env.REACT_APP_LINK_TO_BACKEND}/api/form/${id}/forms`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        templateId: id,
        answers: Object.entries(formData).map(([questionId, label, title]) => ({
          questionId: questionId,
          answer: label,
          title: title,
        })),
      }),
    }
  );

  return checkResponse(response);
};
