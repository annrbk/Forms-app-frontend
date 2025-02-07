import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchTemplate, fillTemplate } from "../services/templateService";
import { editQuestion } from "../services/questionService";

const UseTemplateActions = () => {
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [template, setTemplate] = useState(null);
  const [formData, setFormData] = useState({});
  const [isAuthor, setIsAuthor] = useState(false);
  const [tags, setTags] = useState([]);
  const [editingQuestionId, setEditingQuestionId] = useState(null);
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
          acc[question._id] =
            question.type === "checkbox" ? [] : question.answer;
          return acc;
        }, {});

        setFormData(initialFormData);
      } catch (error) {
        console.error("Error fetching template:", error);
      }
    };
    fetchTemplateData();
  }, [id, navigate]);

  const handleAnswerChange = (e, questionId) => {
    setFormData({
      ...formData,
      [questionId]: e.target.value,
    });
  };

  const handleCheckboxChange = (e, questionId, checkboxValue) => {
    const isChecked = e.target.checked;

    setFormData((prevData) => {
      const updatedData = { ...prevData };
      const currentAnswers = Array.isArray(updatedData[questionId])
        ? updatedData[questionId]
        : [];

      if (isChecked) {
        if (!currentAnswers.includes(checkboxValue)) {
          updatedData[questionId] = [...currentAnswers, checkboxValue];
        }
      } else {
        updatedData[questionId] = currentAnswers.filter(
          (answer) => answer !== checkboxValue
        );
      }

      return updatedData;
    });
  };

  const handleEditQuestion = (e, questionId) => {
    const updatedLabel = e.target.value;
    setTemplate((prevTemplate) => ({
      ...prevTemplate,
      questions: prevTemplate.questions.map((q) =>
        q._id === questionId ? { ...q, label: updatedLabel } : q
      ),
    }));
  };

  const saveEditedQuestion = async (questionId) => {
    const token = sessionStorage.getItem("token");

    try {
      const questionToSave = template.questions.find(
        (q) => q._id === questionId
      );

      const updatedQuestion = await editQuestion(
        questionId,
        token,
        questionToSave
      );

      setTemplate((prevTemplate) => ({
        ...prevTemplate,
        questions: prevTemplate.questions.map((q) =>
          q._id === questionId ? { ...q, label: updatedQuestion.label } : q
        ),
      }));

      setEditingQuestionId(null);
      setMessage("Question updated successfully!");
    } catch (error) {
      console.error("Error update question:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem("token");
    try {
      await fillTemplate(id, token, formData);
      setMessage("Template completed successfully");
      setFormData("");
    } catch (error) {
      console.error(error);
    }
  };

  return {
    message,
    template,
    tags,
    handleAnswerChange,
    handleSubmit,
    formData,
    isAuthor,
    editingQuestionId,
    setEditingQuestionId,
    editQuestion,
    handleEditQuestion,
    saveEditedQuestion,
    handleCheckboxChange,
  };
};

export default UseTemplateActions;
