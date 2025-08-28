"use client";

import { useState } from "react";
import { IoCloudDownloadOutline } from "react-icons/io5";
import Link from "next/link"; // Next.js Link
import Image from "next/image"; // Next.js optimized Image
import ParseBody from "../HomeComponents/ParseBody";
import ImageContainer from "./ImageContainer";
import { Image_URL } from "@/config/constants";


export default function Overview({ loading, developer, heading, description, img1, img2, img3, page }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  let images = [];
  try {
    if (developer?.developerImages) {
      images = JSON.parse(developer.developerImages);
    }
  } catch (error) {
    console.error("Error parsing developerImages JSON:", error);
  }

  if (loading) return <p></p>;

  return (
    <div className="flex w-[100%] justify-center py-10 md:py-20">
      <div className="md:justify-around w-[95%] flex flex-wrap gap-10">
        {/* Left Section */}
        <div className="md:w-[40%] macbook:w-[40%] gap-[40px] flex flex-col items-center md:items-start my-4">
          <h2 className="text-[30px] md:leading-[32px] text-[#A39D9D] font-newsLetter text-center md:text-start macbook:text-[75px]">
            {heading || "Top UAE Real Estate Developers: Premier Properties for Discerning Buyers"}
          </h2>

          {description && description?.length > 500 ? (
            <>
              <div
                className={`${
                  isExpanded
                    ? "h-[140px] md:h-[240px] macbook:h-[300px] overflow-y-auto transition-all duration-300"
                    : "h-[140px] md:h-[240px] macbook:h-[300px] overflow-hidden"
                }`}
              >
                <div className="text-sm text-gray-700 font-montserrat">
                  <ParseBody body={description} />
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
              <ParseBody body={description} />
            </div>
          )}

          <button
            className="p-2 px-4 font-montserrat font-newsLetter rounded-md text-md text-white bg-[#A39D9D] macbook:text-[30px] macbook:px-8 flex justify-center items-center gap-2"
            onClick={() => setIsModalOpen(true)}
          >
            Contact us
          </button>
        </div>

        {/* Right Section */}
        <div className="w-[100%] md:w-[50%] macbook:w-[40%]">
          <ImageContainer
            firstImage={`${Image_URL}/${img1}`}
            secondImage={`${Image_URL}/${img2}`}
            thirdImage={`${Image_URL}/${img3}`}
          />
        </div>
      </div>

      {/* Modal */}
      {/* <RegisterForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} page={page} /> */}
    </div>
  );
}
