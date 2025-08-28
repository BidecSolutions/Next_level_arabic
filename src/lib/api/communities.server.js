// export const getFaqs = async () => {
//   const response = await axios.get("/faq"); // apna API endpoint lagao
//   return response.data;
// };
import axios from "axios";

export async function fetchBannerData(slug) {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/banner-data/${slug}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching banner data:", error);
    return null;
  }
}

export const fetchCommunitiesAPI = async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}user/communities`);

  const filteredCommunities = response.data.data.filter(
    (item) => item.status === 1
  );

  return filteredCommunities.map((community) => {
    let images = [];
    let updatefeatures = [];

    try {
      if (community.community_images) {
        images = JSON.parse(community.community_images);
      }
    } catch (e) {
      console.error("Error parsing community_images:", e);
    }

    try {
      if (community.key_features) {
        const features = JSON.parse(community.key_features);
        updatefeatures = JSON.parse(features);
      }
    } catch (e) {
      console.error("Error parsing key_features:", e);
    }

    return {
      ...community,
      community_images: images,
      key_features: updatefeatures,
    };
  });
};

export const fetchTrendingAPI = async () => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}cuser/off-plan-properties-and-projects/off-plan-property-list`,
    {
      trending_type: 1,
      community_id: null,
      developer_id: null,
      property_type_id: null,
      area_id: null,
    }
  );

  return response.data.data.filter((item) => item.status === 1);
};

export const fetchCommunityListSettingsAPI = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}user/community-list-settings/community-list-details/1`
  );
  return response.data.data;
};

export const fetchFeaturedProperties = async (communityId) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}user/communities/featuresPropertyList`,
    { community_id: communityId }
  );
  console.log(response,'defrf')
  return response.data.data;
};

export const submitBrochureRequest = async ({
  propertyId,
  brochureUrl,
  formData,
  communityId,
  communityName,
}) => {
  return axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}user/request-broucher-downloads/store`, {
    property_detail_id: propertyId,
    broucher_url: brochureUrl || "",
    name: formData.name,
    email: formData.email,
    country_code: formData.countryCode,
    phone_no: formData.phone,
    description: formData.description,
    community_id: communityId,
    subject: "Community Detail Of " + communityName,
  });
}

// export const fetchCommunityBySlug = async (slug) => {
//   console.log("🟢 fetchCommunityBySlug received slug:", slug);

//   const response = await axios.post(
//     `${process.env.NEXT_PUBLIC_API_BASE_URL}user/communities/showBySlug`,
//     { slug }
//   );

//   console.log("🟢 API raw response:", response.data);

//   return response.data;
// };

export const fetchCommunityBySlug = async (slug) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}user/communities/showBySlug`,
      { slug }
    );

    // 👇 Slug + Response ek sath print
    console.log("Slug:", slug, "| Response:", response.data);

    return response.data;
  } catch (error) {
    console.error("Error in fetchCommunityBySlug:", error);
    return null;
  }
};

export const fetchTrendingProjects = async (communityId) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}user/off-plan-properties-and-projects/off-plan-property-list`,
    {
      trending_type: 2,
      community_id: communityId,
      developer_id: "",
      property_type_id: "",
      area_id: "",
    }
  );
  return response.data;
};


// Community by Slug
export const getCommunityBySlug = async (slug) => {
  const response = await axios.public.post("user/communities/showBySlug", { slug });
  return response.data.data;
};

// Areas
export const getAreas = async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}user/areas`);
  return response.data.data;
};

// Property Types
export const getPropertyTypes = async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}user/property-types/1`);
  return response.data.data;
};

// Property Statuses
export const getPropertyStatuses = async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}user/property-statuses/1`);
  return response.data.data;
};

// Property List
export const getPropertyList = async ({
  community_id,
  property_type_id,
  property_name,
  property_status,
  area_id,
  developer_id,
  feature_id,
  to_price,
  from_price,
}) => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/communities/propertyList`, {
    community_id,
    property_type_id,
    property_name,
    property_status,
    area_id,
    developer_id,
    feature_id,
    to_price,
    from_price,
  });
  return response.data.data;
};
