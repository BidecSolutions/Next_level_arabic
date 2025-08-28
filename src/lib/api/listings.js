import axiosClient from "./axiosClient";

export const listingsApi = {
  createListing: async (formData) => {
    const response = await axiosClient.post("/user/listings/store", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
  updateListing: async (slug, formData) => {
    const response = await axiosClient.post(
      `/user/listings/${slug}/update`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  },
  placeBid: (productId, formData) =>
    axiosClient.post(`/user/listings/bids/${productId}/store`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  getListings: async (params = {}) => {
    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(([_, v]) => v !== undefined)
    );
    const searchParams = new URLSearchParams(filteredParams).toString();
    console.log("Check Listing:", searchParams)
    const response = await axiosClient.get(
      `/listings${searchParams ? `?${searchParams}&status=1` : "?status=1"}`
    );
    return response.data;
  },
  getListingBySlug: async (productSlug) => {
    const response = await axiosClient.get(`/listings/${productSlug}/show`);
    return response.data;
  },
  // getUserListings: async (params = {}) => {
  //   const filteredParams = Object.fromEntries(
  //     Object.entries(params).filter(([_, v]) => v !== undefined)
  //   );
  //   const searchParams = new URLSearchParams(filteredParams).toString();
  //   const hasNotEqualStatus = Object.prototype.hasOwnProperty.call(
  //     filteredParams,
  //     "not_equal_status"
  //   );
  //   const response = await axiosClient.get(
  //     `/user/listings${
  //       searchParams
  //         ? hasNotEqualStatus
  //           ? `?${searchParams}`
  //           : `?${searchParams}&status=1`
  //         : hasNotEqualStatus
  //         ? ""
  //         : "?status=1"
  //     }`
  //   );
  //   return response.data;
  // },
  // getUserListingsOffer: async (params = {}) => {
  //   const filteredParams = Object.fromEntries(
  //     Object.entries(params).filter(([_, v]) => v !== undefined)
  //   );
  //   const searchParams = new URLSearchParams(filteredParams).toString();
  //   const response = await axiosClient.get(`/getUserListingsOffer`);
  //   return response.data;
  // },
  // getUserListings: async (params = {}) => {
  //   const filteredParams = Object.fromEntries(
  //     Object.entries(params).filter(([_, v]) => v !== undefined)
  //   );
  //   const searchParams = new URLSearchParams(filteredParams).toString();
  //   const hasNotEqualStatus = Object.prototype.hasOwnProperty.call(
  //     filteredParams,
  //     "not_equal_status"
  //   );
  //   const hasStatus = Object.prototype.hasOwnProperty.call(
  //     filteredParams,
  //     "status"
  //   );
  //   const response = await axiosClient.get(
  //     `/user/listings${
  //       searchParams
  //         ? (hasNotEqualStatus || hasStatus)
  //           ? `?${searchParams}`
  //           : `?${searchParams}&status=1`
  //         : (hasNotEqualStatus || hasStatus)
  //         ? ""
  //         : "?status=1"
  //     }`
  //   );
  //   return response.data;
  // },
  // getUserListings: async (params = {}) => {
  //   const filteredParams = Object.fromEntries(
  //     Object.entries(params).filter(([_, v]) => v !== undefined)
  //   );
  //   const hasNotEqualStatus = Object.prototype.hasOwnProperty.call(
  //     filteredParams,
  //     "not_equal_status"
  //   );
  //   const hasStatus = Object.prototype.hasOwnProperty.call(
  //     filteredParams,
  //     "status"
  //   );

  //   // Build query string manually to support repeated params like ?status=4&status=5
  //   const searchParams = new URLSearchParams();

  //   for (const [key, value] of Object.entries(filteredParams)) {
  //     if (Array.isArray(value)) {
  //       // Append each item as separate query param
  //       value.forEach((v) => searchParams.append(key, v));
  //     } else {
  //       searchParams.append(key, value);
  //     }
  //   }

  //   // Append default status=1 if neither status nor not_equal_status is provided
  //   if (!hasStatus && !hasNotEqualStatus) {
  //     searchParams.append("status", "1");
  //   }

  //   const queryString = searchParams.toString();
  //   const response = await axiosClient.get(
  //     `/user/listings${queryString ? `?${queryString}` : ""}`
  //   );
  //   return response.data;
  // },
  getUserListings: async (params = {}) => {
    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(([_, v]) => v !== undefined)
    );
  
    const hasNotEqualStatus = Object.prototype.hasOwnProperty.call(
      filteredParams,
      "not_equal_status"
    );
    const hasStatus = Object.prototype.hasOwnProperty.call(
      filteredParams,
      "status"
    );
  
    // Manually build the query string to avoid encoding commas
    const queryParts = [];
  
    for (const [key, value] of Object.entries(filteredParams)) {
      if (Array.isArray(value)) {
        queryParts.push(`${key}=${value.join(",")}`); // Force comma without encoding
      } else {
        queryParts.push(`${key}=${value}`);
      }
    }
  
    // Append default status=1 if neither status nor not_equal_status is provided
    if (!hasStatus && !hasNotEqualStatus) {
      queryParts.push("status=1");
    }
  
    const queryString = queryParts.join("&");
    const response = await axiosClient.get(
      `/user/listings${queryString ? `?${queryString}` : ""}`
    );
    return response.data;
  },

  getUserListingsOffer: async (params = {}) => {
    const response = await axiosClient.get(`/user/listings/offers`);
    return response;
  },
  makeOffer: async (productId, formData) => {
    const response = await axiosClient.post(
      `/user/listings/offers/${productId}/store`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  },
  buyNow: async (productSlug) => {
    const response = await axiosClient.post(
      `/user/listings/${productSlug}/buy-now`
    );
    return response.data;
  },
  getUserWonListings: async (params = {}) => {
    const response = await axiosClient.get(`/user/auction-results/won`);
    return response.data;
  },

  getUserLostListings: async (params = {}) => {
    const response = await axiosClient.get(`/user/auction-results/lost`);
    return response.data;
  },
  withdrawListing: async (productSlug) => {
    const response = await axiosClient.post(
      `/user/listings/${productSlug}/withdraw`
    );
    return response.data;
  },

  PostNote: (formData, noteId) =>
    axiosClient.post(`user/listings/note/${noteId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  DeleteNote: async (noteId) =>
    await axiosClient.delete(`user/listings/note/${noteId}`),

  userReList: async (listingId) => {
    const response = await axiosClient.post(
      `/user/listings/${listingId}/relist`
    );
    return response.data;
  },

  acceptOffer: async (litingId) => {
    const response = await axiosClient.post(
      `/user/listings/offers/${litingId}/approve`
    );
    return response.data;
  },

  declineOffer: async (litingId) => {
    const response = await axiosClient.post(
      `/user/listings/offers/${litingId}/reject`
    );
    return response.data;
  },

  acceptBid: async (bidId) => {
    const response = await axiosClient.post(
      `/user/listings/bids/${bidId}/accept-bid`
    );
    return response.data;
  },

  rejectBid: async (bidId) => {
    const response = await axiosClient.post(
      `/user/listings/bids/${bidId}/reject-bid`
    );
    return response.data;
  },
};
