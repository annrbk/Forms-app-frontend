import { checkResponse } from "./errorService";

export const fetchUsers = async (token) => {
  const response = await fetch(
    `${process.env.REACT_APP_LINK_TO_BACKEND}/api/admin/users`,
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

export const apiRoleChange = async (userId, newRole) => {
  const response = await fetch(
    `${process.env.REACT_APP_LINK_TO_BACKEND}/api/admin/users/${userId}/role`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify({ role: newRole }),
    }
  );

  return checkResponse(response);
};

export const apiBlockUser = async (userId) => {
  const response = await fetch(
    `${process.env.REACT_APP_LINK_TO_BACKEND}/api/admin/users/${userId}/block`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    }
  );

  return checkResponse(response);
};

export const apiUnBlockUser = async (userId) => {
  const response = await fetch(
    `${process.env.REACT_APP_LINK_TO_BACKEND}/api/admin/users/${userId}/unblock`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    }
  );

  return checkResponse(response);
};

export const apiDeleteUser = async (userId) => {
  const response = await fetch(
    `${process.env.REACT_APP_LINK_TO_BACKEND}/api/admin/users/${userId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    }
  );

  return checkResponse(response);
};
