"use client";

import React, { useState, useEffect } from "react";
import ParseBody from "../HomeComponents/ParseBody";
import { Image_NotFound, Image_URL } from "@/config/constants";


const AboutProperty = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const defaultHeading = "About the Farmhouses Villas in DAMAC Hill 2";

  return (
    <div className="flex flex-col md:flex-row gap-8 justify-center items-center md:gap-16 mb-20 mt-20 md:mb-44 md:mt-32">
      {/* Text Section */}
      <div className="macbook:w-[80%] flex items-start flex-col gap-[30px] md:gap-[0px] md:flex-row justify-around">
        <div className="md:w-[40%] macbook:w-[50%] flex flex-col items-center md:items-start gap-3 my-4">
          <h2 className="text-2xl md:text-[30px] font-newsLetter md:leading-[40px] macbook:leading-[60px] macbook:text-[60px] text-[#A39D9D] text-center md:text-start mb-4">
            {data?.top_section_heading || defaultHeading}
          </h2>

          {data?.top_section_description?.length > 500 ? (
            <>
              <div
                className={`${
                  isExpanded
                    ? "h-[140px] overflow-y-auto transition-all duration-300"
                    : "h-[140px] overflow-hidden"
                }`}
              >
                <div className="text-sm text-center md:text-start text-gray-700">
                  <ParseBody body={data?.top_section_description} />
                </div>
              </div>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-2 text-gray-600 text-sm font-medium hover:underline"
              >
                {isExpanded ? "Read Less" : "Read More"}
              </button>
            </>
          ) : (
            <div className="text-sm text-gray-700 font-montserrat">
              <ParseBody body={data?.top_section_description} />
            </div>
          )}

          <button
            onClick={() => setIsModalOpen(true)}
            className="p-2 mt-8 font-montserrat px-4 macbook:py-4 macbook:text-[20px] rounded-md text-md text-white bg-[#A39D9D] w-fit flex justify-center items-center gap-2"
          >
            Get More Info
          </button>
        </div>

        {/* Image Section */}
        <div className="relative w-full md:w-[30%] macbook:w-[40%] flex justify-start md:justify-end">
          <img
            src={
              data?.top_about_image
                ? `${Image_URL}${data?.top_about_image}`
                : "/path-to-default-image.jpg"
            }
            alt="Property Expert"
            className="w-full h-[300px] md:w-[500px] md:h-[450px] macbook:w-full object-cover rounded-tl-[150px]"
            onError={(e) => {
              e.currentTarget.src = Image_NotFound;
            }}
          />
        </div>
      </div>

      {/* <RegisterForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        page={`Area Detail Of ${data?.name}`}
      /> */}
    </div>
  );
};

export default AboutProperty;
