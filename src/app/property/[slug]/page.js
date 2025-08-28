"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Banner from "../../../components/WebsiteComponents/PropertyDetails/Banner"
import { Loader } from "@/components/WebsiteComponents/Loader";
import { getPropertyDetails } from "../../../lib/api/projects.server";
import NotFound from "@/components/WebsiteComponents/NotFound";
import PropertyCard from "@/components/WebsiteComponents/PropertyDetails/PropertyCard";
import GetVoucher from "@/components/WebsiteComponents/PropertyDetails/GetVoucher";
import PropertyOverview from "@/components/WebsiteComponents/PropertyDetails/PropertyOverview";
import GallerySlider from "@/components/WebsiteComponents/PropertyDetails/GallerySlider";
import PaymentPlan from "@/components/WebsiteComponents/PropertyDetails/PaymentPlan";
import AboutProperty from "@/components/WebsiteComponents/PropertyDetails/AboutProperty";
import FloorPlanSection from "@/components/WebsiteComponents/PropertyDetails/FloorPlanSection";
import ContactSection from "@/components/WebsiteComponents/HomeComponents/ContactSection";
import AboutLocation from "@/components/WebsiteComponents/PropertyDetails/AboutLocation";
import LandmarksSection from "@/components/WebsiteComponents/PropertyDetails/LandmarksSection";
import AboutDeveloper from "@/components/WebsiteComponents/PropertyDetails/AboutDeveloper";
import OwnerReview from "@/components/WebsiteComponents/PropertyDetails/OwnerReview";
import { Faqs } from "@/components/WebsiteComponents/PropertyDetails/Faqs";
import { Inquiry } from "@/components/WebsiteComponents/off-plans/Inquiry";
import GetInTouch from "@/components/WebsiteComponents/off-plans/GetInTouch";
import PropertyList from "@/components/WebsiteComponents/HomeComponents/PropertyList";


const ProjectDetails = () => {
  const [property, setProperty] = useState(null);
  const [propertyFeatures, setPropertyFeatures] = useState(null);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const params = useParams();
  const propertyId = params.slug; // matches /property/[slug]
console.log('slug',propertyId)
  // Fetch property details
useEffect(() => {
  if (!propertyId) return;

  const fetchData = async () => {
    try {
      const data = await getPropertyDetails(propertyId);
      setProperty(data.data);
      setPropertyFeatures(data.property_features);
    } catch (error) {
      console.error(error);
      setHasError(true);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [propertyId]);


  // Fetch trending projects
//   useEffect(() => {
//     const fetchTrendingProjects = async () => {
//       try {
//         const response = await axios.public.post(
//           "user/off-plan-properties-and-projects/off-plan-property-list",
//           {
//             trending_type: 2,
//             community_id: "",
//             developer_id: "",
//             property_type_id: "",
//             area_id: "",
//           }
//         );

//         const filteredTrending = response.data.data.filter(
//           (item) => item.status === 1
//         );
//         setTrending(filteredTrending);
//       } catch (error) {
//         console.error("Trending Projects Error:", error);
//       }
//     };

//     fetchTrendingProjects();
//   }, []);

  if (loading) return <Loader />;
  if (hasError) return <NotFound />;

  return (
    <>
      <div className="relative">
        <Banner property={property} />
        <PropertyCard property={property} />
      </div>

<div className="px-5 md:px-20">
        <GetVoucher property={property} />
        <PropertyOverview property={property} />
      </div>

      <GallerySlider property={property} />
 
      <div className="px-5 md:px-20">
        <PaymentPlan property={property} />
        <AboutProperty property={property} />
        <FloorPlanSection
          floorInfos={property?.floor_infos}
          property={property}
        />
      </div>
   
      <ContactSection page={`Property Detail Of ${property?.property_name}`} />
 
      <div className="px-5 md:px-20">
        <AboutLocation property={property} />
      </div>

      <LandmarksSection property={property} />

      <div className="px-5 md:px-20">
        <AboutDeveloper property={property} />
         <OwnerReview property={property} />

        <div className="flex md:flex-row flex-col items-center mt-12 md:justify-between gap-2 px-4 md:px-20">
          <Faqs faqs={property?.property_faqs} />
          <Inquiry page={`Project Detail Of ${property?.property_name}`} />
        </div>

        {/* <TrendingProjects
          properties={trending}
          heading="Most Trending Properties in Dubai."
        /> */}
        <PropertyList />
        <GetInTouch property={property} /> 
      </div> 
    </>
  );
};

export default ProjectDetails;
