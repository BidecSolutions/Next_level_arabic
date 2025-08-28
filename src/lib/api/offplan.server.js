
import axios from "axios";

export const fetchPropertiesData = async () => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}user/off-plan-properties-and-projects/off-plan-property-list`,
      {
        community_id: "",
        developer_id: "",
        property_status_id: "",
        area_id: "",
        property_type_id: "",
        property_name: "",
        amount: "",
      }
    );

    const filteredProperties = response.data.data.filter(
      (property) => property.status === 1 && property.feature_property === 1
    );

    const updatedProperties = filteredProperties?.map((property) => {
      const media = property.meadias?.[0];
      const mainImageArray = media?.main_image ? JSON.parse(media.main_image) : [];
      const mainImage = mainImageArray.length > 0 ? mainImageArray[0] : null;
      return { ...property, mainImage };
    });

    return updatedProperties;
  } catch (error) {
    console.error("Property Error: ", error);
    return null;
  }
};

export const fetchPropertiesData2 = async ({payload}) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}user/off-plan-properties-and-projects/off-plan-property-list`,
      payload
    );

    const filteredProperties = response.data.data.filter(
      (property) => property.status === 1 && property.feature_property === 1
    );

    const updatedProperties = filteredProperties?.map((property) => {
      const media = property.meadias?.[0];
      const mainImageArray = media?.main_image ? JSON.parse(media.main_image) : [];
      const mainImage = mainImageArray.length > 0 ? mainImageArray[0] : null;
      return { ...property, mainImage };
    });

    return updatedProperties;
  } catch (error) {
    console.error("Property Error: ", error);
    return null;
  }
};
// export const parsePropertyMedia = (property) => {
//   if (!property?.meadias) return null;

//   try {
//     const parsedMedia =
//       typeof property.meadias === "string"
//         ? JSON.parse(property.meadias)
//         : property.meadias;

//     return parsedMedia;
//   } catch (error) {
//     console.error("Error parsing meadias:", error);
//     return null;
//   }
// };

export const submitBrochureRequest = async (data) => {
  return axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}user/request-broucher-downloads/store`, data);
};


export const fetchAreas = async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}user/areas`);
  return response.data.data.filter((property) => property.status === 1);
};

// Fetch property types
export const fetchPropertyTypes = async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}user/property-types/1`);
  return response.data.data.filter((property) => property.status === 1);
};

// Fetch property statuses
export const fetchPropertyStatuses = async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}user/property-statuses/1`);
  return response.data.data.filter((property) => property.status === 1);
};

// Fetch properties with filter params
export const fetchProperties = async (filter) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}user/off-plan-properties-and-projects/off-plan-property-list`,
    {
      area_id: filter.selectedLocation?.id,
      property_type_id: filter.selectedProperty?.id,
      property_name: filter.searchProperty || "",
      property_status: filter.activeTab || "",
      amount: filter.selectedAmount || "",
    }
  );
  return response.data.data.filter((property) => property.status === 1);
};

// Fetch properties for advanced search with extended filters
export const fetchFilteredProperties = async ({
  selectedLocation,
  selectedProperty,
  searchProperty,
  activeTab,
  selectedCommunity,
  selectedDeveloper,
  selectedAmenities,
  maxPrice,
  minPrice,
}) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}user/off-plan-properties-and-projects/off-plan-property-list`,
    {
      area_id: selectedLocation?.id,
      property_type_id: selectedProperty?.id,
      property_name: searchProperty,
      property_status: activeTab,
      community_id: selectedCommunity,
      developer_id: selectedDeveloper,
      feature_id: selectedAmenities,
      to_price: maxPrice,
      from_price: minPrice,
    }
  );
  return response.data.data.filter((property) => property.status === 1);
};



export const fetchMarketData = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}user/market-transactions/pages_wise`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: 2 }),
      }
    );
    const result = await response.json();
    return result?.data?.[0];
  } catch (error) {
    console.error("Market Values Error:", error);
    throw error; // optional: throw error to handle it later
  }
};


export async function fetchHowToBuyData(pageId = 2) {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}user/how-to-buys/detail`, {
      page_id: pageId,
    });

    if (response.data.status === "success") {
      return response.data.data;
    } else {
      throw new Error("Failed to fetch How to Buy data");
    }
  } catch (error) {
    console.error("Error fetching How to Buy data:", error);
    throw error; // Rethrow to handle it later
  }
}


export async function fetchFaqs(page) {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}user/pages-faqs/pages_wise`, {
      type: page ? page : "",
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return []; // Return empty array on error
  }
}


export async function submitInquiry(formData) {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}user/inquiry-forms/store`, formData);
    return { success: true, data: response.data };
  } catch (error) {
    // Extract errors or return the error message
    const { errors, message } = error.response?.data || {};
    let errorMessages = "Network error or server is down. Please try again later.";
    if (errors && typeof errors === "object") {
      errorMessages = Object.values(errors)
        .map((arr) => arr.join(" "))
        .join("\n");
    } else if (message) {
      errorMessages = message;
    }
    return { success: false, error: errorMessages };
  }
}



export async function fetchDevelopers() {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}user/developers`);
    const filteredDeveloper = response.data.data.filter((dev) => dev.status === 1);
    return filteredDeveloper;
  } catch (error) {
    console.error("Developer Slider Error:", error);
    return []; 
  }
}