import { useState, useContext } from "react";
import { createTemplate } from "../services/createTemplateService";
import { UserContext } from "../context/UserContext";

const useCreateTemplateActions = () => {
  const [questionList, setQuestionList] = useState([
    {
      type: "text",
      label: "",
      required: true,
      checkboxList: [{ value: "" }],
    },
  ]);
  const [template, setTemplate] = useState({
    title: "",
    description: "",
    isPublic: false,
    questions: [],
  });
  const [questionError, setQuestionError] = useState("");
  const [message, setMessage] = useState("");
  const [tags, setTags] = useState([]);
  const { user } = useContext(UserContext);

  const addQuestion = () => {
    setQuestionList([
      ...questionList,
      {
        type: "text",
        label: "",
        required: false,
        checkboxList: [{ value: "" }],
      },
    ]);
  };

  const changeQuestion = (index, e) => {
    const newQuestions = [...questionList];
    newQuestions[index][e.target.name] = e.target.value;

    setQuestionList(newQuestions);
  };

  const addCheckbox = (questionIndex) => {
    const questionWithCheckbox = [...questionList];
    questionWithCheckbox[questionIndex].checkboxList.push({ value: "" });

    setQuestionList(questionWithCheckbox);
  };

  const checkboxChange = (questionIndex, index, e) => {
    const updatedQuestions = [...questionList];
    updatedQuestions[questionIndex].checkboxList[index].value = e.target.value;

    setQuestionList(updatedQuestions);
  };

  const deleteQuestion = (questionIndex) => {
    setQuestionList(
      questionList.filter((currentQuestion, index) => index !== questionIndex)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedQuestionList = questionList.map((question) => {
      return {
        ...question,
        checkboxList: question.checkboxList.map((checkbox) => ({
          value: checkbox.value,
        })),
      };
    });

    const templateData = {
      ...template,
      questions: updatedQuestionList,
      tags: tags,
      author: user ? user.name : "No name",
    };

    const isValidData = questionList.every(
      (question) => question.label.trim() !== ""
    );

    if (!isValidData) {
      setQuestionError("All question fields must be filled in");
      return;
    }

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
    addCheckbox,
    checkboxChange,
    deleteQuestion,
    questionError,
  };
};

export default useCreateTemplateActions;
