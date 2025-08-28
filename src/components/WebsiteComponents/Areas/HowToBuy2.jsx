"use client";

import { useState } from "react";
import Link from "next/link";
// import { Image_NotFound, Image_Url } from "@/utils/const";
// import ParseBody from "../PropertyDetails/ParseBody";
import { Image_NotFound, Image_URL } from "@/config/constants";
import ParseBody from "../HomeComponents/ParseBody";

export const HowToBuy2 = ({ howToBuyData, page }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const description =
    howToBuyData?.description ||
    `Embark on a journey through Dubai’s diverse districts with our all-encompassing area guide. Whether you're drawn to the
historical richness of Deira, the bustling business environment of Downtown, or the serene landscapes of The Lakes, our guide
provides detailed insights into what makes each area unique. Delve into the characteristics of each district, from lifestyle
amenities to cultural hotspots, ensuring you find the perfect spot that suits your needs. Our guide serves as your gateway to
understanding Dubai's varied neighborhoods, helping you explore the city's rich tapestry of communities.`;

  return (
    <div className="flex justify-center w-full py-10 macbook:py-48">
      <div className="flex items-center md:items-start flex-col-reverse md:flex-row md:justify-center macbook:justify-center gap-20">
        
        {/* Image Section */}
        <div className="flex justify-end lg:w-[35%] macbook:w-[40%]">
          <div className="relative w-full lg:w-[90%] macbook:w-[80%]">
            <img
              src={`${Image_URL}/${page?.how_to_buy_2_image}`}
              alt={page?.buy_image_alt || "How to Buy"}
              className="w-[300px] lg:w-[650px] md:h-[500px] md:w-[400px] macbook:w-[600px] macbook:h-[550px] rounded-br-[150px] md:rounded-br-[100px]"
              onError={(e) => {
                e.currentTarget.src = Image_NotFound;
              }}
            />
          </div>
        </div>

        {/* Text Section */}
        <div className="md:w-[40%] lg:w-[45%] macbook:w-[50%] flex flex-col items-center md:items-start gap-3">
          <h1 className="text-3xl md:text-5xl lg:text-[25px] font-newsLetter macbook:text-[60px] text-[#A39D9D] text-center md:text-start">
            {page?.how_to_buy_2_heading || "How To Buy"}
          </h1>

          {page?.how_to_buy_2_description &&
          page?.how_to_buy_2_description?.length > 500 ? (
            <>
              <div
                className={`${
                  isExpanded
                    ? "h-[140px] md:h-[240px] macbook:h-[300px] overflow-y-auto transition-all duration-300"
                    : "h-[140px] md:h-[240px] macbook:h-[300px] overflow-hidden"
                }`}
              >
                <div className="text-sm text-gray-700 font-montserrat">
                  <ParseBody body={page?.how_to_buy_2_description} />
                </div>
              </div>

              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-2 text-gray-600 text-xs macbook:text-lg font-medium hover:underline"
              >
                {isExpanded ? "Read Less" : "Read More"}
              </button>
            </>
          ) : (
            <div className="text-sm text-gray-700 font-montserrat">
              <ParseBody body={page?.how_to_buy_2_description} />
            </div>
          )}

          <Link
            href="/areas/"
            className="p-2 px-4 macbook:py-4 font-montserrat macbook:text-[20px] rounded-md text-md text-white bg-[#A39D9D] hover:bg-transparent hover:text-[#A39D9D] border hover:border-[#A39D9D] w-fit flex justify-center items-center gap-2"
          >
            Get Free Areas Guide
          </Link>
        </div>
      </div>
    </div>
  );
};
