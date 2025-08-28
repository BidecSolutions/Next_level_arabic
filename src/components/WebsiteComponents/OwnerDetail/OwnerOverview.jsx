"use client"
import { useState } from "react";
import { Image_URL, Image_NotFound } from "@/config/constants";
import ParseBody from "../HomeComponents/ParseBody";

const OwnerOverview = ({ ownerDetails }) => {
    const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex justify-center w-[100%] py-12 md:py-24  macbook:py-48 ">
      <div className="flex md:items-start  items-center flex-col-reverse md:flex-row  md:justify-center macbook:justify-center gap-8 md:gap-20">
        <div className="flex justify-end  lg:w-[35%] macbook:w-[40%]  ">
          <div className="relative w-full lg:w-[90%]  macbook:w-[80%]  ">
            <img
              src={`${Image_URL}/${ownerDetails?.overview_section_image}`}
              alt={ownerDetails?.overview_section_image_alt}
              className="  w-[300px] lg:w-[650px]   md:h-auto md:w-[400px] macbook:w-full macbook:h-auto   rounded-br-[150px] md:rounded-br-[100px]"
              onError={(e) => {
                e.currentTarget.src = Image_NotFound; // Path to your dummy image
              }}
            />
          </div>
        </div>
        <div className=" md:w-[40%] lg:w-[45%] macbook:w-[50%] flex flex-col items-center md:items-start gap-2 macbook:gap-3  ">
          {/* <h3 className="text-[#A39D9D]  macbook:text-[60px] lg:text-[30px] ">
            Overview
          </h3> */}
          <h3 className="text-5xl lg:text-[30px] font-newsLetter macbook:text-[50px] text-[#A39D9D] text-center md:text-start ">
            {` ${
              ownerDetails?.overview_section_heading
                ? ownerDetails?.overview_section_heading
                : "Overview"
            }   `}
          </h3>

          {/* <p className="text-[16px] lg:text-[17px] font-montserrat macbook:text-[25px]   macbook:leading-[40px] text-[#555555] md:leading-[23px] text-center md:text-start ">
            {` ${
              ownerDetails?.overview_section_description
                ? ownerDetails?.overview_section_description
                : ""
            }    `}
          </p> */}
           {ownerDetails?.overview_section_description &&
          ownerDetails?.overview_section_description?.length > 1500 ? (
            <>
              {/* Scrollable Text Area */}
              <div
                className={`${
                  isExpanded
                    ? "h-[140px] md:h-[440px] macbook:h-[600px]  overflow-y-auto transition-all duration-300"
                    : "h-[140px] md:h-[440px] macbook:h-[600px] overflow-hidden"
                } `}
              >
                <div className="text-sm md:text 2xl:text-md macbook:text-lg text-gray-700">
                  <ParseBody body={ownerDetails?.overview_section_description} />
                </div>
              </div>

              {/* Read More Button */}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-2 text-gray-600 text-xs macbook:text-lg font-medium hover:underline"
              >
                {isExpanded ? "Read Less" : "Read More"}
              </button>
            </>
          ) : (
            // If the description is less than 500 characters, show the entire text
            <div className="text-sm md:text-md macbook:text-lg text-gray-700">
              <ParseBody body={ownerDetails?.overview_section_description} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OwnerOverview;
