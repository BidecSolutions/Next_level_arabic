import axios from "axios";


export async function getTopProjectsForInvesting() {
  try {
    const response = await axios.get(
      "user/general-functions/top-project-for-investing"
    );

    const filteredProperties = response.data?.data
      ?.filter(
        (property) =>
          property.status === 1 && property.top_project_for_investing === 1
      )
      ?.slice(0, 5);

    return filteredProperties || [];
  } catch (error) {
    console.error("Top Property Error:", error.response?.data || error.message);
    return [];
  }
}
