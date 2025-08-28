"use client";

import React, { useEffect, useState } from "react";
import { Loader } from "@/components/WebsiteComponents/Loader";
import { useParams, useRouter } from "next/navigation";
import NotFound from "@/components/WebsiteComponents/NotFound";
import Banner from "@/components/WebsiteComponents/off-plans/Banner";
import MarketTransaction from "@/components/WebsiteComponents/Area-Detail/MarketTransaction";
import AgentSlider from "@/components/WebsiteComponents/HomeComponents/AgentSlider";
import PropertyList from "@/components/WebsiteComponents/HomeComponents/PropertyList";
import DeveloperSlider from "@/components/WebsiteComponents/off-plans/DeveloperSlider";
import GetInTouch from "@/components/WebsiteComponents/off-plans/GetInTouch";
import AboutProperty from "@/components/WebsiteComponents/Area-Detail/AboutProperty";
import LandmarksSection from "@/components/WebsiteComponents/Area-Detail/LandmarksSection";
import PopularAreas from "@/components/WebsiteComponents/HomeComponents/PopularAreas";
import { Inquiry } from "@/components/WebsiteComponents/off-plans/Inquiry";
import Faqs from "@/components/WebsiteComponents/Area-Detail/Faqs";
import LatestProject from "@/components/WebsiteComponents/off-plans/LatestProject";

const AreaDetail = ({ data }) => {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // if (loading) return <Loader />;
  // if (hasError) return <NotFound />;

  return (
    <>
      <Banner />
      <div className="px-5 md:px-20">
        <LatestProject
          areaId={data?.id}
          heading={data?.name}
        />
        <MarketTransaction data={data} />
        <AboutProperty data={data} />
      </div>
      <LandmarksSection
        stayConnectedDetail={
          typeof data.stay_connected_detail === "string"
            ? JSON.parse(data.stay_connected_detail || "[]")
            : data.stay_connected_detail || []
        }
        stayConnectedImage={data.stay_connected_image || ""}
        stayConnectedTitle={data.stay_connected_title || ""}
      />
      <div className="px-5 md:px-20">
        <GetInTouch />
        <AgentSlider />
        <div className=" flex md:flex-row flex-col items-center py32 md:justify-between macbook:justify-around ">
          <Faqs faqs={data?.faqs} />
          {data?.name ? (
            <Inquiry page={`Area Deatil Of ${data?.name}`} />
          ) : (
            <p></p>
          )}
        </div>
        <PropertyList />
        <DeveloperSlider />
        <PopularAreas />
      </div>
    </>
  );
};

export default AreaDetail;
