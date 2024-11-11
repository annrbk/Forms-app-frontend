import { checkResponse } from "./errorService";

export const fetchForm = async (id, token) => {
  const response = await fetch(
    `${process.env.REACT_APP_LINK_TO_BACKEND}/api/form/user-form/${id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return checkResponse(response);
};
