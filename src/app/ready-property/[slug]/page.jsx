"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Loader } from "@/components/WebsiteComponents/Loader";
import { getReadyPropertyDetails } from "../../../lib/api/projects.server";
import NotFound from "@/components/WebsiteComponents/NotFound";
import ReadyDetailBanner from "@/components/WebsiteComponents/ReadyDetail/ReadyDetailBanner";
import LandmarksSection from "@/components/WebsiteComponents/ReadyDetail/LandmarksSection";
import GetInTouch from "@/components/WebsiteComponents/off-plans/GetInTouch";
import PropertyAmenitiesAndMap from "@/components/WebsiteComponents/ReadyDetail/PropertyAmenitiesAndMap";


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
      const data = await getReadyPropertyDetails(propertyId);
      console.log('data', data)
      setProperty(data);
    } catch (error) {
      console.error(error);
      setHasError(true);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [propertyId]);

  if (loading) return <Loader />;
  if (hasError) return <NotFound />;

  return (
    <>
    <ReadyDetailBanner property={property} />
 <div className="px-4 md:px-20">
     <PropertyAmenitiesAndMap
          property={property}
          pageName={property?.name}
        />
    <LandmarksSection property={property} />

    <GetInTouch
          page={{
            guide_section_heading: "تواصل معنا للحصول على دليل مجاني",
            guide_section_image: property?.agent?.profile_image,
            guide_section_name: property?.agent?.name,
            guide_section_contact: property?.agent?.phone_no,
            guide_section_address: property?.agent?.address,
          }}
          pageName={property?.name}
        />

        </div>
    </>
  );
};

export default ProjectDetails;
