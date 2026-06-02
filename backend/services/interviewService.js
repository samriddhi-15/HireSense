import axios from "axios";

const API = "http://localhost:4000/api/interview";

export const generateAIQuestions = async (data) => {
  const response = await axios.post(
    `${API}/generate-questions`,
    data
  );

  return response.data;
};