import axiosClient from "./axiosClient";

export async function getOffPlanProjects() {
  try {
    const response = await axiosClient.post(
      "user/off-plan-properties-and-projects/off-plan-property-list",
      {
        area_id: "",
        property_type_id: "",
        property_name: "",
        property_status: "",
        show_data_type: 1
      }
    );

    const filteredProperties = response?.data?.filter(
      (property) => property.status === 1
    ) || [];

    return filteredProperties.reverse();
  } catch (error) {
    console.error("Property Error:", error.response?.data || error.message);
    return [];
  }
}

export async function searchProperties(query) {
  if (!query || query.length < 2) {
    return [];
  }

  try {
    const res = await axiosClient.get(`user/search?query=${query}`);
    return res?.results || [];
  } catch (err) {
    console.error("Search API error", err.response?.data || err.message);
    return [];
  }
}

export const getPropertyDetails = async (propertyId) => {
  if (!propertyId) {
    console.error("❌ propertyId is missing");
    return null;
  }

  try {
    const response = await axiosClient.post(
      "user/properties/property_detail_using_slug",
      { slug: `${propertyId}/` }
    );

    const property = response.data.data;
    const propertyFeatures = response.data.property_features;

    return response;
  } catch (error) {
    console.error("Error fetching property details:", error.message);
    return null;
  }
};

export const getReadyPropertyDetails = async (propertyId) => {
  if (!propertyId) {
    console.error("❌ propertyId is missing");
    return null;
  }

  try {
    const response = await axiosClient.post(
      "user/ready-properties",
      { slug: `${propertyId}/` }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching property details:", error.message);
    return null;
  }
}