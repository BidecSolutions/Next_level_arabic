
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import NotFound from "@/app/not-found";
import CustomBanner from "@/components/WebsiteComponents/Service/CustomBanner";
import { getPropertyManagementDetail } from "@/lib/api/sevice.server";
import WhoWeAre from "@/components/WebsiteComponents/Service/WhoWeAre";
import PropertySection from "@/components/WebsiteComponents/Service/PropertySection";
import ChooseState from "@/components/WebsiteComponents/Service/ChooseState";
import GallerySection from "@/components/WebsiteComponents/Service/GallerySection";
import { Steps } from "@/components/WebsiteComponents/Service/Steps";
import EfficientProperty from "@/components/WebsiteComponents/Service/EfficientProperty";
import { getAreaBySlug } from "@/lib/api/areas.server";
import PropertyServicesSlider from "@/components/WebsiteComponents/Service/PropertyServicesSlider";
import ServicesList from "@/components/WebsiteComponents/Service/ServicesList";
import PropertyManagementCycle from "@/components/WebsiteComponents/Service/PropertyManagementCycle";
import AgentSlider from "@/components/WebsiteComponents/HomeComponents/AgentSlider";
import TopNotch from "@/components/WebsiteComponents/Service/TopNotch";
import { Inquiry } from "@/components/WebsiteComponents/off-plans/Inquiry";
import { Faqs } from "@/components/WebsiteComponents/Service/Faqs";

export default function Page() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  const { slug } = useParams(); // yahan se slug direct milta hai
  console.log("🔹 Slug from params:", slug);

  const hasQueryParams =
    typeof window !== "undefined" && window.location.search !== "";

  useEffect(() => {
    if (slug) {
      (async () => {
        try {
          console.log("📡 Fetching property data for slug:", slug);
          const res = await getPropertyManagementDetail(slug);
          console.log("✅ Raw API Response:", res);

          if (res?.data?.status === 1 && res?.status === "success") {
            console.log("🎯 Setting data:", res.data);
            setData(res.data);
          } else {
            console.warn("⚠️ API returned error or unexpected status");
            setError(true);
          }
        } catch (err) {
          console.error("❌ Error fetching property management data", err);
          setError(true);
        }
      })();
    }
  }, [slug]);

  if (error || hasQueryParams) {
    return <NotFound />;
  }

  return (
    <div>
      <CustomBanner pmId={slug} propData={data} />
      <div className="w-full px-5 md:px-24">
        <WhoWeAre pmId={slug} propData={data} />
        <PropertySection pmId={slug} propData={data} />
        <ChooseState pmId={slug} propData={data} />
        <GallerySection pmId={slug} propData={data} />
      </div>
      <Steps pmId={slug} propData={data} />
      <div className="w-full px-5 md:px-24">


        <EfficientProperty pmId={slug} propData={data} heading={data?.known_for_efficient_heading} des={data?.known_for_efficient_description} />
        < PropertyServicesSlider pmId={slug} propData={data} />
        <ServicesList pmId={slug} propData={data} />
        <PropertyManagementCycle pmId={slug} propData={data} />
        <AgentSlider />



      </div>
      <div className=" flex md:flex-row flex-col justify-center px-5 md:px-20 w-full ">

        <TopNotch pmId={slug} propData={data} />
        <Inquiry page={`Project Deatil Of ${data?.home_category?.name}`} />
      </div>
      <div className="w-full px-5 md:px-24">
        <Faqs pmId={slug} propData={data} />
      </div>
    </div>
  );
}
