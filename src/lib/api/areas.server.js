import axios from "axios";

export const getAreaBySlug = async (slug) => {
  if (!slug) {
    console.error("❌ getAreaBySlug called with no slug");
    return null;
  }

  console.log("🔍 Fetching area for slug:", slug);
  console.log("🌍 API Base URL:", process.env.NEXT_PUBLIC_API_BASE_URL);

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}user/areas/showBySlug`,
      { slug: `${slug}/` }
    );

    console.log("📦 Full API response:", response.data);

    if (response.data.status === "success") {
      return response.data.data;
    } else {
      console.error("Area Details API returned an error status:", response.data);
      return null;
    }
  } catch (error) {
    console.error("Area Detail Page Error:", error);
    return null;
  }
};


export const getAreaListDetails = async (id) => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}user/area-list-settings/area-list-details/${id}`);
    return res.data.data;
  } catch (error) {
    console.error("Area List Page Details Error:", error);
    return null;
  }
};

// Fetch "How to Buy" Data
export const getHowToBuyData = async (pageId) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}user/how-to-buys/detail`, { page_id: pageId });
    if (res.data.status === "success") {
      return res.data.data;
    }
    return null;
  } catch (error) {
    console.error("How to Buy Data Error:", error);
    return null;
  }
};

export async function getPopularAreas() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}user/areas/popular_areas`
    );

    const filteredProperties = response.data.data.filter(
      (property) => property.status === 1 && property.areaSpecilization === 1
    );

    return filteredProperties;
  } catch (error) {
    console.error("❌ Categories Page Error:", error);
    return [];
  }
};

// Fetch Areas (status = 1 only)
export const getAreas = async () => {
  try {
    const res = await axios .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}user/areas`);
    return res.data.data.filter((property) => property.status === 1);
  } catch (error) {
    console.error("Areas List Error:", error);
    return [];
  }
};

// Fetch Trending Projects (status = 1 only)
export const getTrendingProjects = async () => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}user/off-plan-properties-and-projects/off-plan-property-list`,
      {
        trending_type: 1,
        community_id: "",
        developer_id: "",
        property_type_id: "",
        area_id: "",
      }
    );
    return res.data.data.filter((item) => item.status === 1);
  } catch (error) {
    console.error("Trending Projects Error:", error);
    return [];
  }
};

export const getPropertyList = (filters = { area_id: "" }) => {
  return axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}user/areas/propertyList`, filters)
    .then(res => res.data.data)
    .catch(err => {
      console.error("Property List Error:", err);
      return [];
    });
};
export const getPropertyTypes = () => {
  return axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}user/property-types/1`)
    .then(res => res.data.data)
    .catch(err => {
      console.error("Property Types Error:", err);
      return [];
    });
};  

export const getCommunities = () => {
  return axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}user/communities`)
    .then(res => res.data.data.filter(item => item.status === 1))
    .catch(err => {
      console.error("Communities API Error:", err);
      return [];
    });
};


export const getDevelopers = () => {
  return axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}user/developers`)
    .then(res => res.data.data.filter(item => item.status === 1))
    .catch(err => {
      console.error("Developers API Error:", err);
      return [];
    });
};

export const getAmenities = () => {
  return axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}user/features`)
    .then(res => res.data.data.filter(item => item.status === 1))
    .catch(err => {
      console.error("Amenities API Error:", err);
      return [];
    });
};
export const getPopularCommunities = async () => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}user/communities/popular_communities`);
    return res.data.data.filter((area) => area.status === 1);
  } catch (error) {
    console.error("Popular Communities API Error:", error);
    return [];
  }
};