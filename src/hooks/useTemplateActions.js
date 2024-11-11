import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  editTemplate,
  fetchTemplate,
  fillTemplate,
} from "../services/templateService";

const UseTemplateActions = () => {
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [template, setTemplate] = useState(null);
  const [formData, setFormData] = useState({});
  const [isAuthor, setIsAuthor] = useState(false);
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTemplateData = async () => {
      try {
        const token = sessionStorage.getItem("token");

        if (!token) {
          alert("You need to be logged in to access this page.");
          navigate("/login");
          return;
        }

        const data = await fetchTemplate(id, token);
        setTemplate(data);
        setTags(data.tags || []);
        const currentUser = JSON.parse(sessionStorage.getItem("user"));
        if (data.author === currentUser.name) {
          setIsAuthor(true);
        }

        const initialFormData = data.questions.reduce((acc, question) => {
          acc[question._id] = question.answer || "";
          return acc;
        }, {});

        setFormData(initialFormData);
      } catch (error) {
        console.error("Error fetching template:", error);
      }
    };
    fetchTemplateData();
  }, [id, navigate]);

  const handleChange = (e, questionId) => {
    setFormData({
      ...formData,
      [questionId]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem("token");
    try {
      if (isAuthor) {
        const updatedTemplate = await editTemplate(id, token, formData);
        setTemplate(updatedTemplate);
        setMessage("Template updated successfully!");
      } else {
        await fillTemplate(id, token, formData);

        setMessage("Template completed successfully");
        setFormData("");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return {
    message,
    template,
    tags,
    handleChange,
    handleSubmit,
    formData,
    isAuthor,
  };
};

export default UseTemplateActions;
