import { checkResponse } from "./errorService";

export const createTemplate = async (token, templateData) => {
  const response = await fetch(
    `${process.env.REACT_APP_LINK_TO_BACKEND}/api/templates/create-template`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(templateData),
    }
  );

  return checkResponse(response);
};
