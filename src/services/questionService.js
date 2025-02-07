import { checkResponse } from "./errorService";

export const editQuestion = async (id, token, updatedQuestion) => {
  const response = await fetch(
    `${process.env.REACT_APP_LINK_TO_BACKEND}/api/questions/edit-question/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        label: updatedQuestion.label,
      }),
    }
  );

  return checkResponse(response);
};
