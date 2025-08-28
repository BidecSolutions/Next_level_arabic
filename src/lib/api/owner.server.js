import axios from "axios";

// Fetch Owner Details
export const getOwnerDetails = async () => {

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}user/owner-details/details/owner`
    );

    if (response.data?.status === "success") {
      return response.data.data;
    } else {
      console.error("Owner Details API returned error:", response.data);
      return null;
    }
  } catch (error) {
    console.error("Owner Details API Error:", error);
    return null;
  }
};