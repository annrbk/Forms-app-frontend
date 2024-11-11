import { useEffect, useState } from "react";
import { fetchLatestTemplate, fetchMainTags } from "../services/mainService";

const useMainActions = () => {
  const [templates, setTemplates] = useState([]);
  const [tags, setTags] = useState([]);
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetchLatestTemplate();
        setTemplates(response);
      } catch (error) {
        console.error("Error fetching latest templates:", error);
      }
    };

    const fetchTags = async () => {
      try {
        const response = await fetchMainTags();
        setTags(response);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };
    fetchTemplates();
    fetchTags();
  }, []);

  return { templates, tags };
};

export default useMainActions;
