import axios from "axios";

export const getFaqTitles = async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}user/faqs/titles`);
  return response.data.data || [];
};

// Fetch FAQs by title ID
export const getFaqsByTitleId = async (id) => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}user/faqs/type_wise`, {
    title_id: id,
  });
  return response.data.data || [];
};

export const submitFaqQuestion = async (formData) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}user/faqs/submit_faq_question`,
      formData
    );
    return response.data;
  } catch (error) {
    console.error("Error submitting FAQ question:", error);
    throw error;
  }
};