"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import Banner from "@/components/WebsiteComponents/DeveloperList/Banner";
import DeveloperSection from "@/components/WebsiteComponents/DeveloperList/DeveloperSection";
import ContactSection from "@/components/WebsiteComponents/HomeComponents/ContactSection";
import PropertyList from "@/components/WebsiteComponents/HomeComponents/PropertyList";
import Overview from "@/components/WebsiteComponents/DeveloperList/Overview";

export default function Developer({ pageData, developers }) {
  const [trending, setTrending] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <Banner
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        page={pageData}
      />
      <DeveloperSection
        developers={developers}
        searchTerm={searchTerm}
        heading={pageData?.developers_heading}
        description={pageData?.developers_description}
      />
      <ContactSection form={true} page={pageData} pageName="Developer List" />
      <Overview heading={pageData?.section_with_three_images_heading} description={pageData?.section_with_three_images_description} img1={pageData?.section_with_three_images_image_1} img2={pageData?.section_with_three_images_image_2} img3={pageData?.section_with_three_images_image_3} page='Developer List'/>
      <PropertyList />
    </>
  );
}
