import { checkResponse } from "./errorService";

export const loginUser = async (userData) => {
  const response = await fetch(
    `${process.env.REACT_APP_LINK_TO_BACKEND}/api/auth/login`,
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
