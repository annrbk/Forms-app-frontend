import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import {
  apiBlockUser,
  apiDeleteUser,
  apiRoleChange,
  apiUnBlockUser,
  fetchUsers,
} from "../services/adminService";

const useAdminActions = () => {
  const [users, setUsers] = useState([]);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const fetchUsersData = async () => {
    const token = sessionStorage.getItem("token");

    try {
      if (!token || !user || user.role !== "admin") {
        navigate("/");
        return;
      }

      const response = await fetchUsers(token);
      setUsers(response);
      sessionStorage.setItem("usersData", JSON.stringify(response));
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  useEffect(() => {
    const savedUsers = sessionStorage.getItem("usersData");

    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    } else {
      fetchUsersData();
    }
  }, [user]);

  const roleChange = async (userId, newRole) => {
    try {
      await apiRoleChange(userId, newRole);
      fetchUsersData();
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  const blockUser = async (userId) => {
    try {
      await apiBlockUser(userId);
      fetchUsersData();
    } catch (error) {
      console.error("Error blocking user:", error);
    }
  };

  const unBlockUser = async (userId) => {
    try {
      await apiUnBlockUser(userId);
      fetchUsersData();
    } catch (error) {
      console.error("Error unblocking user:", error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await apiDeleteUser(userId);
      fetchUsersData();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return { users, roleChange, blockUser, unBlockUser, deleteUser };
};

export default useAdminActions;
