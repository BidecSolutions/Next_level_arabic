
import axios from "axios";

export const getPropertyManagementDetailUsingSlug = async (slug) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}user/property-managements/propertyManagementDetailUsingSlug`,
    { slug: `${slug}/` }
  );
  return response.data;
};

export const storeFreeConsultation = async ({
  property_management_id,
  name,
  email,
  country_code,
  phone_no,
  description,
  subject,
}) => {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}user/general-functions/getFreeConsultantStore`,
    {
      property_management_id,
      name,
      email,
      country_code,
      phone_no,
      description,
      subject,
    }
  );
};
export const getPropertyManagementDetail = async (slug) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}user/property-managements/propertyManagementDetailUsingSlug`,
    { slug: `services/${slug}/` }
  );
  return response?.data;
};

export const getOwnerDetails = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}user/owner-details`
  );
  return response?.data;
};
