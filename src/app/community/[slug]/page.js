"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import BannerSlider from "@/components/WebsiteComponents/Communities/BannerSlider";
import { Loader } from "@/components/WebsiteComponents/Loader";
import NotFound from "@/components/WebsiteComponents/NotFound";
import { fetchCommunityBySlug, fetchTrendingProjects } from "@/lib/api/communities.server";
import PropertyDetails from "@/components/WebsiteComponents/Communities/PropertyDetails";
import { Inquiry } from "@/components/WebsiteComponents/off-plans/Inquiry";
import MarketTransaction from "@/components/WebsiteComponents/off-plans/MarketTransaction";
import { BestProperty } from "@/components/WebsiteComponents/Areas/BestProperty";
import Masterplan from "@/components/WebsiteComponents/Communities/Masterplan";
import WhyInvestSection from "@/components/WebsiteComponents/Communities/WhyInvestSection";
import Places from "@/components/WebsiteComponents/Communities/Places";
import Faqs from "@/components/WebsiteComponents/Area-Detail/Faqs";
import PropertyList from "@/components/WebsiteComponents/HomeComponents/PropertyList";
import LatestProject from "@/components/WebsiteComponents/off-plans/LatestProject";

const page = () => {
  const pathname = usePathname();
  let communityId = pathname.split("/community/")[1];

  // 🔥 Fix: Add trailing slash if missing
  if (communityId && !communityId.endsWith("/")) {
    communityId += "/";
  }

  console.log("🟡 Pathname:", pathname);
  console.log("🟡 Extracted communityId:", communityId);
  const [element, setElement] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const getCommunityData = async () => {
      console.log("🔍 Fetching community details for slug:", communityId);
      try {
        const data = await fetchCommunityBySlug(communityId);
        console.log("✅ Community API Response:", data);

        if (data.status === "success") {
          setElement(data.data);
          console.log("🎯 Community Data Set:", data.data);
        } else {
          console.warn("⚠️ Community not found");
          setHasError(true);
        }
      } catch (error) {
        console.error("❌ Community Detail Page Error", error);
        setHasError(true);
      } finally {
        setLoading(false);
        console.log("⏳ Community API Loading finished");
      }
    };

    getCommunityData();
  }, [communityId]);

  // ✅ Fetch Trending Projects
  useEffect(() => {
    if (!element?.id) {
      console.log("⏭ Skipping trending fetch, no community ID yet");
      return;
    }

    const getTrendingProjects = async () => {
      console.log("🔍 Fetching trending projects for community_id:", element.id);
      try {
        const data = await fetchTrendingProjects(element.id);
        console.log("✅ Trending Projects API Response:", data);

        const filteredTrending = data.data.filter((item) => item.status === 1);
        setTrending(filteredTrending);

        console.log("🎯 Trending Projects Set:", filteredTrending);
      } catch (error) {
        console.error("❌ Trending Projects Error:", error);
      }
    };

    getTrendingProjects();
  }, [element?.id]);

  if (loading) return <Loader />;
  if (hasError) return <NotFound />;


  return (
    <div>
      <BannerSlider data={element} type="community" />
      <div className="px-5 md:px-24">
        <PropertyDetails data={element} />
        <LatestProject
          communityId={element?.id}
          heading={element?.name}
        />
        <BestProperty />
        <MarketTransaction />
        <Masterplan data={element} />
      </div>
      <WhyInvestSection data={element} />
      <div className="px-5 md:px-24">
                <Places about={element}  page={'Community Detail Of '+ element?.name}/>

        <div className=" flex md:flex-row flex-col items-center py-2 md:justify-between macbook:justify-center ">
          <Faqs faqs={element.faqs} heading={element?.faq_heading} />
          {element?.name && <Inquiry page={`Community Detail ${element?.name}`} />}
        </div>
        <PropertyList />
      </div>
    </div>
  )
}

export default page