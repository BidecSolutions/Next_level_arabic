"use client";

import { useState } from "react";
// import ParseBody from "../PropertyDetails/ParseBody";
// import RegisterForm from "../RegisterForm";
// import { Image_Url } from "../../../Utils/const";
import { Image_NotFound, Image_URL } from "@/config/constants";
import RegisterForm from "../Forms/RegisterForm";
import ParseBody from "../HomeComponents/ParseBody";

export const NewSection = ({ howToBuyData, pageName }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const description = `
  <h2>ROI from Off-Plan Projects in Dubai</h2>
  <p>
    Investing in off-plan projects in Dubai continues to show strong potential for high ROI. 
    Off-plan sales accounted for 55% of total transactions in the first half of 2024.
  </p>
  <p>
    Investors have seen average returns of 25% to 35% upon project completion, 
    driven by attractive pricing and flexible payment plans. Property values in prime locations 
    have increased by up to 45% from pre-construction prices.
  </p>

  <h3>What to Expect in Dubai?</h3>
  <p>
    Dubai offers a cosmopolitan lifestyle with modern and traditional influences. 
    Residents enjoy world-class shopping, dining, and entertainment alongside 
    top-tier healthcare and education facilities.
  </p>
  <p>
    The city's strategic position between East and West enhances its global appeal. 
    Ongoing infrastructure projects continue to strengthen the real estate sector.
  </p>

  <h3>Reasons for Investing in Dubai Off-Plan Properties</h3>
  <ul>
    <li><strong>Higher ROI:</strong> Lower initial prices and strong appreciation potential (Colliers, 2024).</li>
    <li><strong>Flexible Payment Plans:</strong> Developers offer structured plans for easier financing.</li>
    <li><strong>Modern Amenities:</strong> New developments feature state-of-the-art facilities.</li>
  </ul>

  <h3>Key Benefits of Buying Off-Plan Properties in Dubai</h3>
  <ul>
    <li><strong>Lower Purchase Price:</strong> Off-plan properties cost less than ready units.</li>
    <li><strong>Customization:</strong> Buyers can personalize aspects of their property.</li>
    <li><strong>High Capital Appreciation:</strong> Prices rise significantly upon completion.</li>
  </ul>

  <h3>Prime Locations and Luxurious Amenities</h3>
  <p>
    Dubai’s off-plan properties are in sought-after locations like Downtown Dubai, 
    <a href="https://www.nextlevelrealestate.ae/area/business-bay/" target="_blank" rel="noreferrer" style="color: #1B66C9;">Business Bay</a>, and Palm Jumeirah. 
    These developments include high-end features such as pools, gyms, parks, and 24/7 security. 
    They provide a luxurious lifestyle with easy access to business and entertainment hubs.
  </p>

  <h3>Long-Term Value: Investment Growth in Dubai</h3>
  <p>
    Dubai's continuous economic growth and government-backed infrastructure projects 
    enhance long-term real estate value. Property prices have shown resilience and steady 
    appreciation over the past decade. The city remains a key investment hub with strong rental demand.
  </p>

  <h3>Predicting Future Trends: What Buyers Should Know</h3>
  <p>
    Dubai’s growing population and economic expansion will sustain demand for off-plan properties. 
    Major projects, including Expo 2020 legacy developments, continue to drive price appreciation. 
    Buyers should focus on well-located, reputable projects for maximum ROI.
  </p>
`;

  return (
    <div className="flex justify-center w-full py-10 md:pt-20">
      <div className="flex justify-center items-center w-full flex-wrap macbook:justify-center gap-10">
        <div className="capitalize md:w-[40%] macbook:w-[38%] flex flex-col items-center md:items-start gap-3 my-4">
          <h3 className="text-3xl md:text-5xl font-newsLetter text-[#A39D9D] text-center md:text-start">
            {howToBuyData?.heading_s2}
          </h3>
          <div className="text-[16px] macbook:text-[25px] macbook:leading-[40px] text-[#555555] md:leading-[23px] text-center md:text-start">
            {description && description.length > 500 ? (
              <>
                <div
                  className={`${
                    isExpanded
                      ? "h-[240px] overflow-y-auto transition-all duration-300"
                      : "h-[240px] overflow-hidden"
                  }`}
                >
                  <div className="text-[16px] font-montserrat text-[#555555] md:leading-[22px] macbook:text-[35px] macbook:leading-[38px] text-center md:text-start">
                    <ParseBody body={howToBuyData?.description_s2} />
                  </div>
                </div>
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="mt-2 text-gray-600 text-xs font-medium hover:underline"
                >
                  {isExpanded ? "Read Less" : "Read More"}
                </button>
              </>
            ) : (
              <div className="text-sm text-gray-700 font-montserrat">
                <ParseBody body={howToBuyData?.description} />
              </div>
            )}
          </div>
          <button
            className="p-2 px-4 macbook:py-4 mt-4 macbook:text-[20px] rounded-md text-md text-white bg-[#A39D9D] hover:bg-transparent hover:text-[#A39D9D] border hover:border-[#A39D9D] w-fit flex justify-center items-center gap-2"
            onClick={() => setIsModalOpen(true)}
          >
            Get Free Areas Guide
          </button>
        </div>

        <div className="flex w-full md:w-[40%] macbook:w-[40%] justify-start">
          <div className="relative w-full flex justify-start">
            <img
              src={`${Image_URL}/${howToBuyData?.buy_image_s2}`}
              alt=""
              className="w-[310px] lg:w-[650px] md:h-[500px] md:w-[400px] macbook:w-full macbook:h-auto rounded-br-[50px] md:rounded-br-[100px]"
              onError={(e) => {
                e.currentTarget.src = "/offplan-new.png";
              }}
            />
          </div>
        </div>
      </div>

      <RegisterForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        page={pageName}
      />
    </div>
  );
};
