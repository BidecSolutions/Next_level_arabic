"use client";

import { useState } from "react";
import Link from "next/link";
// import ParseBody from "../PropertyDetails/ParseBody";
import { Image_NotFound, Image_URL } from "@/config/constants";
import RegisterForm from "../Forms/RegisterForm";
import ParseBody from "../HomeComponents/ParseBody";

export const HowToBuy = ({ howToBuyData, page, pageName }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const description =
    page?.description ||
    `Explore every corner of Dubai with our extensive real estate listings across all areas. From the bustling downtown districts to
the tranquil coastal enclaves, we provide insights into the diverse properties available throughout Dubai. Whether you are
looking to invest in a modern apartment, a family villa, or commercial real estate, our area-specific guides detail the advantages
of each location, including local amenities, transport links, and community features. Each listing is designed to offer prospective
homeowners and investors the information needed to make well-informed decisions in Dubai's dynamic property market.`;

  return (
    <div className="flex justify-center w-full py-10 macbook:py-48">
      <div className="flex items-center md:items-start flex-col-reverse md:flex-row md:justify-center macbook:justify-center gap-20">
        <div className="flex justify-end lg:w-[35%] macbook:w-[40%]">
          <div className="relative w-full lg:w-full macbook:w-[80%]">
            <img
              src={`${Image_URL}/${howToBuyData?.buy_image}`}
              alt={howToBuyData?.buy_image_alt || "Buy Image"}
              className="w-[300px] lg:w-full md:h-[450px] md:w-[400px] macbook:w-[600px] macbook:h-[550px] rounded-br-[150px] md:rounded-br-[100px]"
              onError={(e) => {
                e.currentTarget.src = "/offplan/off.jpg"; // fallback image path inside public folder
              }}
            />
          </div>
        </div>

        <div className="md:w-[40%] lg:w-[45%] macbook:w-[50%] flex flex-col items-center md:items-start gap-3">
          <h3 className="text-3xl md:text-5xl font-newsLetter macbook:text-[60px] text-[#A39D9D] text-center md:text-start">
            {howToBuyData?.heading || "Buying Off Plan Properties in Dubai"}
          </h3>

          {howToBuyData?.description &&
          howToBuyData?.description.length > 500 ? (
            <>
              <div
                className={`${
                  isExpanded
                    ? "h-[140px] md:h-[240px] macbook:h-[300px] overflow-y-auto transition-all duration-300"
                    : "h-[140px] md:h-[240px] macbook:h-[300px] overflow-hidden"
                }`}
              >
                <div className="text-sm text-gray-700 font-montserrat">
                  <ParseBody body={howToBuyData.description} />
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
              <ParseBody body={howToBuyData?.description} />
            </div>
          )}

          <button
            onClick={() => setIsModalOpen(true)}
            className="p-2 px-4 macbook:py-4 font-montserrat macbook:text-[20px] rounded-md text-md text-white bg-[#A39D9D] hover:bg-transparent hover:text-[#A39D9D] border hover:border-[#A39D9D] w-fit flex justify-center items-center gap-2"
          >
            Get Free Areas Guide
          </button>
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

export default HowToBuy;
