import { useState, useMemo } from "react";

const useSortTemplateData = (items, config = null) => {
  const [sort, setSort] = useState(config);

  const sortedTemplateItems = useMemo(() => {
    const sortedTemplateItems = [...items];
    if (sort) {
      sortedTemplateItems.sort((a, b) => {
        const isAscending = sort.direction === "ascending";
        if (a[sort.key] < b[sort.key]) {
          return isAscending ? -1 : 1;
        }
        if (a[sort.key] > b[sort.key]) {
          return isAscending ? 1 : -1;
        }
        return 0;
      });
    }
    return sortedTemplateItems;
  }, [items, sort]);

  const requestSort = (key) => {
    const direction =
      sort && sort.key === key && sort.direction === "ascending"
        ? "descending"
        : "ascending";
    setSort({ key, direction });
  };

  return { items: sortedTemplateItems, requestSort, sort };
};

export default useSortTemplateData;
