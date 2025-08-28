import axiosClient from "./axiosClient";

export const formsApi = {
  SubscriptionForm: (email) =>
    axiosClient.delete(`/user/subscribers/add`, { email }),

  submitInquiryForm : (payload) =>
    axiosClient.post("user/inquiry-forms/storeTouchAFreeGuide", payload),

 

}

export async function sendContactDetails(formData) {
  try {
    const response = await axiosClient.post(
      "user/contacts/addContactDetail",
      formData
    );
    return response.data;
  } catch (error) {
    console.error("Contact form error:", error);
    throw new Error("Failed to send contact form");
  }
}
