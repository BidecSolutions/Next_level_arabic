// developer.server.js
import axios from "axios"; // Adjust the path to your axios instance

export async function getDevelopers() {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}user/developers`);
    const filtered = res.data.data.filter((dev) => dev.status === 1);
    return filtered;
  } catch (error) {
    console.error("Developer Fetch Error:", error);
    throw error;
  }
}

export async function getDeveloperListPage() {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}user/developer-list-settings/developer-list-details/1`
    );

    const responseData = res.data.data;
    if (responseData.status == 1) {
      return responseData;
    }

    return null; // No data found
  } catch (error) {
    console.error("Developer List Page Details Error:", error);
    return null;
  }
}

// Fetch developer detail by slug
export async function getDeveloperPage(slug) {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}user/developers/showBySlug`,
      {slug: `${slug}/`}
    );

    if (response?.data?.status === "success" && response?.data?.data) {
      return response.data.data;
    } else {
      console.error("Developer not found:", response?.data?.message);
      return null;
    }
  } catch (error) {
    console.error("Error fetching developer:", error);
    return null;
  }
}


export async function getDeveloperFeaturedProperties(developer_id) {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}user/developers/featuresPropertyList`,
      { developer_id }
    );

    const filtered = res.data.data.filter(
      (property) => property.status === 1 && property.feature_property === 1
    );

    return filtered;
  } catch (error) {
    console.error("Featured Properties Fetch Error:", error);
    return [];
  }
}