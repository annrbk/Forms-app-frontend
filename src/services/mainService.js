import { checkResponse } from "./errorService";

export const fetchLatestTemplate = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_LINK_TO_BACKEND}/api/templates/latest-templates`,
    {
      method: "GET",
    }
  );

  return checkResponse(response);
};

export const fetchMainTags = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_LINK_TO_BACKEND}/api/tags/all-tags`,
    {
      method: "GET",
    }
  );

  return checkResponse(response);
};

export const fetchAllTemplates = async (query) => {
  const response = await fetch(
    `${process.env.REACT_APP_LINK_TO_BACKEND}/api/templates/search?query=${query}`,
    {
      method: "GET",
    }
  );

  return checkResponse(response);
};

export const fetchTemplatesByTag = async (tagId) => {
  const response = await fetch(
    `${process.env.REACT_APP_LINK_TO_BACKEND}/api/templates/templates-tag/${tagId}`,
    {
      method: "GET",
    }
  );

  return checkResponse(response);
};
