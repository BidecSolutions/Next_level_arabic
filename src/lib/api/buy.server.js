import axios from "axios";

export async function getBuyPage(slug) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}user/popular-search-managements/popularSearchManagementDetailUsingSlug`,
      { slug: `buy/${slug}/` }
    );

    if (response?.data?.data?.status === 1) {
      return response.data.data; // ✅ Return data for the page
    } else {
      // console.error("Invalid status in API response:", response?.data);
      return null;
    }
  } catch (error) {
    console.error("Error fetching property data:", error);
    return null;
  }
}

export const fetchPropertyList = async (params) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}user/off-plan-properties-and-projects/off-plan-property-list`,
      params
    );
    return response.data.data;
  } catch (error) {
    console.error('Error fetching property list:', error);
    throw error;
  }
};

export const fetchReadyProjectsList = async (params) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}user/ready-plan-properties-and-projects/ready-plan-property-list`,
      params
    );
    return response.data.data;
  } catch (error) {
    console.error('Error fetching property list:', error);
    throw error;
  }
};

export const fetchReadyPropertyList = async (params) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}user/ready-properties-list/list`,
      params
    );
    console.log('ready', response.data.data);
    return response.data.data.AllReadyProperties;
  } catch (error) {
    console.error('Error fetching property list:', error);
    throw error;
  }
};

