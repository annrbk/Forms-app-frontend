import { useEffect, useState } from "react";
import { fetchAllTemplates } from "../services/mainService";
import { useLocation } from "react-router-dom";

const useShowSearch = () => {
  const location = useLocation();
  const [templates, setTemplates] = useState([]);
  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    const loadTemplates = async () => {
      try {
        const response = await fetchAllTemplates(query);
        if (query) {
          const filteredTemplates = response.filter((template) =>
            template.title.toLowerCase().includes(query.toLowerCase())
          );
          setTemplates(filteredTemplates);
        } else {
          setTemplates(response);
        }
      } catch (error) {
        console.error("Error fetching templates:", error);
      }
    };

    loadTemplates();
  }, [query]);

  return templates;
};

export default useShowSearch;
