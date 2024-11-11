import { useState, useEffect } from "react";
import { fetchTemplatesByTag } from "../services/mainService";
import { useParams } from "react-router-dom";

const useResultByTag = () => {
  const { tagId } = useParams();
  const [templates, setTemplates] = useState(null);

  useEffect(() => {
    const getTemplatesByTag = async () => {
      try {
        const response = await fetchTemplatesByTag(tagId);
        setTemplates(response);
      } catch (error) {
        console.error("Error fetching templates:", error);
      }
    };

    getTemplatesByTag();
  }, [tagId]);

  return templates;
};
export default useResultByTag;
