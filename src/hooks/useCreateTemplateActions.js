import { useState, useContext } from "react";
import { createTemplate } from "../services/createTemplateService";
import { UserContext } from "../context/UserContext";

const useCreateTemplateActions = () => {
  const [questionList, setQuestionList] = useState([
    { type: "text", label: "", required: true },
  ]);
  const [template, setTemplate] = useState({
    title: "",
    description: "",
    isPublic: false,
    questions: [],
  });
  const [message, setMessage] = useState("");
  const [tags, setTags] = useState([]);
  const { user } = useContext(UserContext);

  const addQuestion = () => {
    setQuestionList([
      ...questionList,
      { type: "text", label: "", required: false },
    ]);
  };

  const changeQuestion = (index, e) => {
    const newQuestions = [...questionList];
    newQuestions[index][e.target.name] = e.target.value;
    setQuestionList(newQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const templateData = {
      ...template,
      questions: questionList,
      tags: tags,
      author: user ? user.name : "No name",
    };

    const token = sessionStorage.getItem("token");

    try {
      await createTemplate(token, templateData);

      setMessage("Template successfully created");
      setTemplate({
        title: "",
        description: "",
        isPublic: false,
        questions: [],
      });
      setQuestionList([
        {
          type: "text",
          label: "",
          required: true,
        },
      ]);
      setTags([]);
    } catch (error) {
      console.error("Error creating template:", error);
    }
  };

  return {
    message,
    questionList,
    addQuestion,
    changeQuestion,
    handleSubmit,
    tags,
    template,
    setTemplate,
    setTags,
  };
};

export default useCreateTemplateActions;
