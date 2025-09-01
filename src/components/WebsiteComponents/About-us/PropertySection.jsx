"use client";

import React from "react";
import Link from "next/link";

const PropertySection = ({ Heading, para, btn1Text, btn2Text }) => {
  return (
    <div className="w-full relative flex my-10 md:my-20 justify-center">
      <div
        className="bg-cover bg-center rounded-[30px] md:overflow-hidden md:w-[80%] macbook:w-[70%] h-[600px] md:h-[400px] macbook:h-[600px] mb-16"
        style={{
          backgroundImage: "url('/about/property.png')",
        }}
      >
        {/* Top Circle */}
        <div className="absolute top-[-10px] left-1/2 bg-[#8F8F8F] p-1 z-10 border-2 border-white w-5 h-5 rounded-full"></div>

        {/* Overlay */}
        <div className="flex flex-col justify-center h-full items-center text-center">
          {/* Heading */}
          <h3 className="text-white font-newsLetter text-[23px] md:text-[34px] md:leading-[53px] md:w-[60%]">
            {Heading || "من نحن؟"}
          </h3>

          {/* Subtext */}
          <p className="text-white font-montserrat mt-4 text-[13px] leading-[19px] md:leading-[24px] md:text-[15px] w-[94%] md:w-[70%]">
            {para ||
              "اكتشف خدماتنا العقارية المتخصصة، المصممة خصيصًا لمساعدتك في العثور على العقار المثالي بكل سهولة وثقة"}
          </p>

          {/* Buttons */}
          <div className="mt-6 flex items-center flex-row px-2 gap-[5px] md:gap-[12px]">
            <Link href="/off-plan">
              <button className="bg-white border text-[12px] w-[100px] md:w-[200px] font-montserrat border-white text-[#555555] py-2 md:px-4 rounded-[8.8px] hover:bg-transparent hover:text-white">
                {btn1Text || "يستكشف"}
              </button>
            </Link>
            <Link href="/contact">
              <button className="bg-transparent font-montserrat w-[190px] md:w-[250px] text-[11px] border border-white text-white py-2 md:px-4 rounded-[8.8px]">
                {btn2Text || "اتصل بنا"}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertySection;
