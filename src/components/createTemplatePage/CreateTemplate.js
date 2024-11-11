import { TagsInput } from "react-tag-input-component";
import BackButton from "../BackButton";
import useCreateTemplateActions from "../../hooks/useCreateTemplateActions";
import Questions from "./Questions";
import NewTemplateDetails from "./NewTemplateDetails";

export default function CreateTemplate() {
  const {
    message,
    questionList,
    addQuestion,
    changeQuestion,
    handleSubmit,
    tags,
    template,
    setTemplate,
    setTags,
  } = useCreateTemplateActions();

  return (
    <div className="container mt-5">
      <BackButton />
      <NewTemplateDetails
        message={message}
        handleSubmit={handleSubmit}
        template={template}
        setTemplate={setTemplate}
      />
      <Questions
        questionList={questionList}
        changeQuestion={changeQuestion}
        addQuestion={addQuestion}
      />
      <div>
        <h3 className="mt-3">Add tags</h3>
        <TagsInput value={tags} onChange={setTags} placeHolder="enter tags" />
        <em>press enter to add new tag</em>
      </div>
      <div className="mt-4">
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Save template
        </button>
      </div>
    </div>
  );
}
