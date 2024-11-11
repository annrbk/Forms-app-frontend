import { checkResponse } from "./errorService";

export const registerUser = async (userData) => {
  const response = await fetch(
    `${process.env.REACT_APP_LINK_TO_BACKEND}/api/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }
  );

  return checkResponse(response);
};
