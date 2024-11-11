import { checkResponse } from "./errorService";

export const fetchTemplates = async (token) => {
  const response = await fetch(
    `${process.env.REACT_APP_LINK_TO_BACKEND}/api/templates/user-templates`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return checkResponse(response);
};

export const fetchForms = async (token) => {
  const response = await fetch(
    `${process.env.REACT_APP_LINK_TO_BACKEND}/api/form/user-forms`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return checkResponse(response);
};

export const apiDeleteTemplate = async (templateId) => {
  const response = await fetch(
    `${process.env.REACT_APP_LINK_TO_BACKEND}/api/templates/${templateId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    }
  );

  return checkResponse(response);
};

export const apiDeleteForm = async (formId) => {
  const response = await fetch(
    `${process.env.REACT_APP_LINK_TO_BACKEND}/api/form/${formId}/delete`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    }
  );

  return checkResponse(response);
};
