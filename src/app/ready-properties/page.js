"use client";
import PropertyList from "@/components/WebsiteComponents/HomeComponents/PropertyList";
import DeveloperSlider from "@/components/WebsiteComponents/off-plans/DeveloperSlider";
import { Faqs } from "@/components/WebsiteComponents/off-plans/Faqs";
import GetInTouch from "@/components/WebsiteComponents/off-plans/GetInTouch";
import HowToBuy from "@/components/WebsiteComponents/off-plans/HowToBuy";
import { Inquiry } from "@/components/WebsiteComponents/off-plans/Inquiry";
import MarketTransaction from "@/components/WebsiteComponents/off-plans/MarketTransaction";
import { NewSection } from "@/components/WebsiteComponents/off-plans/NewSection";
import Banner from "@/components/WebsiteComponents/ReadyProperties/Banner";
import LatestProject from "@/components/WebsiteComponents/ReadyProperties/LatestProject";
import { fetchHowToBuyData } from "@/lib/api/offplan.server";
import React, { useEffect, useState } from "react";

const page = () => {
  const [howToBuyData, setHowToBuyData] = useState(null);
  // useEffect(() => {

  //     const fetchHowToBuyData = async () => {
  //         try {
  //             const response = await axios.public.post("user/how-to-buys/detail", {
  //                 page_id: 2,
  //             }); // Adjust the endpoint based on your API
  //             if (response.data.status === "success") {
  //                 setHowToBuyData(response.data.data);
  //             }
  //         } catch (error) {
  //             console.error("Error fetching How to Buy data:", error);
  //         }
  //     };

  //     fetchHowToBuyData();
  // }, []);

  useEffect(() => {
    fetchHowToBuyData(3)
      .then(setHowToBuyData)
      .catch((err) => {});
  }, []);
  return (
    <div>
      <Banner page={"Ready Properties"} />
      <div className="px-4 md:px-20">
        <LatestProject />

        {/* <MarketTransaction /> */}
        <HowToBuy howToBuyData={howToBuyData} pageName={"Ready Properties"} />
        <NewSection howToBuyData={howToBuyData} pageName={"Ready Properties"} />
        <div className=" flex md:flex-row flex-col items-center py-2 md:justify-between macbook:justify-center ">
          <Faqs page={8} />
          <Inquiry page={`Ready Properties`} />
        </div>
        <PropertyList />
        <DeveloperSlider />
        <GetInTouch />
      </div>
    </div>
  );
};

export default page;
