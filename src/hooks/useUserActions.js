import { useEffect, useState } from "react";
import {
  apiDeleteForm,
  apiDeleteTemplate,
  fetchForms,
  fetchTemplates,
} from "../services/userPageService";

const useUserActions = () => {
  const [templates, setTemplates] = useState([]);
  const [forms, setForms] = useState([]);
  useEffect(() => {
    const fetchTemplatesData = async () => {
      const token = sessionStorage.getItem("token");

      try {
        const templatesResponse = await fetchTemplates(token);
        setTemplates(templatesResponse);
      } catch (error) {
        console.error("Error fetching templates", error);
      }
    };

    const fetchFormsData = async () => {
      const token = sessionStorage.getItem("token");

      try {
        const formsResponse = await fetchForms(token);
        setForms(formsResponse);
      } catch (error) {
        console.error("Error fetching forms", error);
      }
    };

    fetchTemplatesData();
    fetchFormsData();
  }, []);

  const deleteTemplate = async (templateId) => {
    try {
      await apiDeleteTemplate(templateId);
      setTemplates(templates.filter((template) => template._id !== templateId));
    } catch (error) {
      console.error("Error delete template:", error);
    }
  };

  const deleteForm = async (formId) => {
    try {
      await apiDeleteForm(formId);
      setForms(forms.filter((form) => form._id !== formId));
    } catch (error) {
      console.error("Error delete form:", error);
    }
  };

  return { templates, forms, deleteTemplate, deleteForm };
};

export default useUserActions;
