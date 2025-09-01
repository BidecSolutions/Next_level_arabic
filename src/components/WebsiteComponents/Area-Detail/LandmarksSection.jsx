"use client";

import { Image_NotFound, Image_URL } from "@/config/constants";
import React from "react";
import { BsBuildings } from "react-icons/bs";

const LandmarksSection = ({ stayConnectedDetail = [], stayConnectedImage = "", stayConnectedTitle = "" }) => {
  return (
    <div className="flex flex-col-reverse relative justify-end md:flex-row items-center w-full mb-12 md:py-24 macbook:mt-48 rounded-lg">
      {/* Left Column - Image */}
      <div className="hidden md:flex max:md:w-[40%] md:bottom-[30%] left-[10%] static macbook:bottom-[20%] md:absolute macbook:left-[15%] overflow-hidden">
        <img
          src={
            stayConnectedImage
              ? `${Image_URL}${stayConnectedImage}`
              : "/placeholder-image.png"
          }
          alt="Stay Connected"
          className="w-[320px] h-[250px] md:w-[490px] md:h-[490px] macbook:w-[600px] macbook:h-[650px] object-cover rounded-tr-[150px] md:rounded-tr-[150px]"
          onError={(e) => {
            e.currentTarget.src = Image_NotFound;
          }}
        />
      </div>

      {/* Right Column - Text and Icons */}
      <div className="w-full py-28 md:w-[57%] lg:w-[120%] xl:w-[68%] macbook:w-[65%] p-6 md:p12 bg-gray-100 rounded-lg flex flex-col items-center macbook:gap-[20px] md:rounded-none md:rounded-tr-lg md:rounded-br-lg">
        <h3 className="text-xl font-newsLetter text-[#8F8F8F] md:text-[25px] macbook:text-[40px] text-center md:text-start md:w-[50%] uppercase mb-6 leading-10">
          {stayConnectedTitle
            ? stayConnectedTitle
            : "ابقَ على اتصال بمعالم دبي"}
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-2 gap-8 md:w-[50%] text-gray-700">
          {stayConnectedDetail.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="bg-white rounded-full p-4">
                <BsBuildings className="text-2xl macbook:text-[25px] text-gray-600" />
              </div>
              <p className="text-[#8F8F8F] font-montserrat ml-[4px] md:w-[70%] text-[11px] md:text-[14px] macbook:text-[30px]">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandmarksSection;
