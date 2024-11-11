export const checkResponse = async (response) => {
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "Unknown error");
  }
  return response.json();
};
