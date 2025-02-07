import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import useUserActions from "../../hooks/useUserActions";
import useSortTemplateData from "../../hooks/useSortTemplateData";
import FormTable from "./FormTable";
import TemplateTable from "./TemplateTable";
import BackButton from "../BackButton";
import { FormattedMessage } from "react-intl";

export default function UserPage() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { templates, forms, deleteTemplate, deleteForm } = useUserActions();
  const {
    items: sortedTemplates,
    requestSort,
    sortConfig,
  } = useSortTemplateData(templates);

  return (
    <div
      className="container mt-5"
      style={{
        width: "70%",
      }}
    >
      <BackButton />
      {user ? (
        <>
          <p className="float-end">
            <FormattedMessage
              id="message.greeting"
              defaultMessage="Hello, {name}!"
              values={{ name: user.name }}
            />
          </p>
          <TemplateTable
            templates={templates}
            requestSort={requestSort}
            navigate={navigate}
            sortedTemplates={sortedTemplates}
            deleteTemplate={deleteTemplate}
            sortConfig={sortConfig}
          />
          <FormTable
            forms={forms}
            navigate={navigate}
            deleteForm={deleteForm}
          />
        </>
      ) : (
        <p>Loading name</p>
      )}
    </div>
  );
}
