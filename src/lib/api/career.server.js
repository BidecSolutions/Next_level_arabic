import axios from "axios";

export const fetchCareerOpportunities = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}user/career-opportunities`);
    return response.data.data.filter((property) => property.status === 1);
  } catch (error) {
    console.error("Error fetching Jobs:", error);
    throw error;
  }
};

// Submit career application
export const submitCareerApplication = async (formData) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}user/applied-career-opportunity/store`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error submitting the form:", error);
    throw error;
  }
};
