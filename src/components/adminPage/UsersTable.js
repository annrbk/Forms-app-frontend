import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";

export default function UsersTable({
  users,
  roleChange,
  blockUser,
  unBlockUser,
  deleteUser,
}) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>
            <FormattedMessage id="message.table-name" defaultMessage="Name" />
          </th>
          <th>
            <FormattedMessage id="message.table-email" defaultMessage="Email" />
          </th>
          <th>
            <FormattedMessage id="message.table-role" defaultMessage="Role" />
          </th>
          <th>
            <FormattedMessage
              id="message.table-status"
              defaultMessage="Status"
            />
          </th>
          <th>
            <FormattedMessage
              id="message.table-actions"
              defaultMessage="Actions"
            />
          </th>
        </tr>
      </thead>
      <tbody>
        {users?.map((user) => (
          <tr key={user._id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>{user.isBlocked ? "Blocked" : "Active"}</td>
            <td>
              <button
                className="btn btn-outline-primary me-2"
                onClick={() => roleChange(user._id, "admin")}
              >
                <FormattedMessage
                  id="message.button-make"
                  defaultMessage="Make admin"
                />
              </button>
              <button
                className="btn btn-outline-dark me-2"
                onClick={() => roleChange(user._id, "user")}
              >
                <FormattedMessage
                  id="message.button-del"
                  defaultMessage="Delete admin"
                />
              </button>
              <button
                className="btn btn-outline-danger me-2"
                onClick={() => blockUser(user._id)}
              >
                <FormattedMessage
                  id="message.button-block"
                  defaultMessage="Block"
                />

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-lock"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1" />
                </svg>
              </button>
              <button
                className="btn btn-outline-success me-2"
                onClick={() => unBlockUser(user._id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-unlock"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2M3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1z" />
                </svg>
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => deleteUser(user._id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-trash3"
                  viewBox="0 0 16 16"
                >
                  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                </svg>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  roleChange: PropTypes.func.isRequired,
  blockUser: PropTypes.func.isRequired,
  unBlockUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
};
