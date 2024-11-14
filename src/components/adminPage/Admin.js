import React from "react";
import BackButton from "../BackButton";
import UsersTable from "./UsersTable";
import useAdminActions from "../../hooks/useAdminActions";
import { FormattedMessage } from "react-intl";

export default function Admin() {
  const { users, roleChange, blockUser, unBlockUser, deleteUser } =
    useAdminActions();

  return (
    <div className="container mt-5">
      <BackButton />
      <h2>
        <FormattedMessage
          id="message.title-admin"
          defaultMessage="Admin Page"
        />
      </h2>
      <UsersTable
        users={users}
        roleChange={roleChange}
        blockUser={blockUser}
        unBlockUser={unBlockUser}
        deleteUser={deleteUser}
      />
    </div>
  );
}
