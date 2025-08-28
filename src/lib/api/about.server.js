import axios from "axios";

export const getOwnerDetails = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}user/owner-details`
    );
    return res.data.data.filter((item) => item.status === 1);
  } catch (error) {
    console.error("Error fetching owner details:", error);
    return [];
  }
};
