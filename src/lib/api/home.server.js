import axios from "axios";

export async function getPStatus() {
  try {
    const baseUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}user/property-statuses/1`;

    const res = await axios.get(baseUrl);
    console.log('sad',res)
    return res.data.data.filter(property => property.status === 1);
  } catch (err) {
    console.error("Status Fetch Error", err);
    return [];
  }
}

// Search properties by name
export async function searchProperties(query) {
  if (!query || query.length < 2) {
    return [];
  }

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}user/search?query=${encodeURIComponent(query)}`
    );
    return res.data?.results || [];
  } catch (error) {
    console.error("Search API error:", error);
    return [];
  }
}

export const getHomeCategories = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}user/home-categories/1`
    );
    const filteredCategory = response.data.data
      ?.slice(0, 4)
      ?.filter((category) => category.status === 1);

    return filteredCategory;
  } catch (error) {
    console.log("Categories Page", error);
    return [];
  }
};

export const fetchExperienceLuxury = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}user/general-functions/experience-the-luxury`
    );
    console.log(response, "ferfr");
    // Filter active properties and take only 4
    const filteredProperties = response.data?.data
      .filter((property) => property.status === 1)
      .slice(0, 4);
    console.log(filteredProperties, "ddd");
    return { data: filteredProperties, error: null };
  } catch (error) {
    console.error("Property Error:", error);
    return { data: [], error };
  }
};

export async function getTopProjectsForInvesting() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}user/general-functions/top-project-for-investing`
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


export const fetchPropertyTypes = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}user/property-types/1`);
    return response.data.data || [];
  } catch (error) {
    console.error("Property Types Error: ", error);
    return [];
  }
};

export const fetchLifeStyleProperties = async (propertyTypeId) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}user/general-functions/life-style-in-dubai`,
      { property_type_id: propertyTypeId }
    );

    return (response.data.data || [])
      .filter(
        (property) =>
          property.status === 1 &&
          property.show_life_style_in_dubai === 1
      )
      .slice(0, 6);
  } catch (error) {
    console.error("Property Error: ", error);
    return [];
  }
};


// export const fetchAboutSection = async () => {

//   try {
//     const response = await axios.get(
//       `${process.env.NEXT_PUBLIC_API_BASE_URL}user/general-functions/home-about-section-detail/1`
//     );
// console.log(response,"3dfrf")
//     const aboutData = response.data.data;
//     const parsedDetails = JSON.parse(aboutData.details || "[]");

//     return {
//       about: aboutData,
//       details: parsedDetails,
//     };
//   } catch (error) {
//     console.error("Error fetching About Section:", error);
//     return {
//       about: {},
//       details: [],
//     };
//   }
// };


export const fetchAboutSection = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}user/general-functions/home-about-section-detail/1`
    );

    console.log("Full API Response:", response);

    const aboutData = response?.data?.data || {};

    let parsedDetails = [];
    try {
      parsedDetails = JSON.parse(aboutData.details || "[]");
    } catch (e) {
      console.warn("Details is not valid JSON:", aboutData.details);
    }

    return {
      about: aboutData,
      details: parsedDetails,
    };
  } catch (error) {
    console.error("Error fetching About Section:", error);
    return {
      about: {},
      details: [],
    };
  }
};


export const fetchPopularCommunities = async (limit = 6) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}user/communities/popular_communities`);

    const filtered = response.data.data
      .filter((item) => item.status === 1)
      .slice(0, limit);

    return filtered;
  } catch (error) {
    console.error("Community Fetch Error:", error);
    return [];
  }
};


export const fetchTopProjects = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}user/general-functions/top-project-for-features`
    );

    return response.data.data.filter(
      (project) => project.status === 1 && project.feature_property === 1
    );
  } catch (error) {
    console.error("Error fetching projects:", error);
    return []; 
  }
};
export const fetchPopularAreas = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}user/areas/popular_areas`);
    return response.data.data
      .filter((property) => property.status === 1)
      .slice(0, 7);
  } catch (error) {
    console.error("Error fetching popular areas:", error);
    return [];
  }
};


export const fetchAwardsData = async () => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}user/winning-awards/popular_winning_awards`);
    return res.data.data.filter((award) => award.status === 1);
  } catch (error) {
    console.error("Awards fetch error:", error);
    return [];
  }
};