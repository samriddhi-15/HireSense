import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/api/interview`;

export const generateAIQuestions = async (data) => {
  const response = await axios.post(
    `${API}/generate-questions`,
    data
  );

  return response.data;
};