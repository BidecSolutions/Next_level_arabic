"use client"
import { Image_NotFound, Image_URL } from "@/config/constants";
import React, { useState } from "react";
import ParseBody from "../HomeComponents/ParseBody";

const IntroSection = ({developer}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const description =
    developer?.description ||
    "تأسست شركة ar Properties على يد محمد العبار - وهو مطور رائد مقره الإمارات العربية المتحدة - في عام 1997. مع سنوات واسعة من الخبرة، أنشأ المطور ستة قطاعات أعمال و60 شركة نشطة في العديد من المناطق مثل الشرق الأوسط وشمال إفريقيا وآسيا وأوروبا وشمال";

  return (
    <div className="flex justify-center w-[100%] md:py-24  ">
      <div className="   md:w-full flex md:justify-around flex-wrap gap-10 macbook:gap-[20px] ">
        <div className=" w-full md:w-[40%] macbook:w-[40%] flex flex-col items-center md:items-start gap-3 my-4">
          <h1 className="     text-[22px] md:text-5xl font-newsLetter macbook:text-[50px] uppercase text-[#A39D9D] text-center md:text-start font-newsLetter">
            {developer?.name}
            {/* Emaar */}
          </h1>
          {description && description?.length > 500 ? (
            <>
              {/* Scrollable Text Area */}
              <div
                className={`${
                  isExpanded
                    ? "h-[240px] overflow-y-auto transition-all duration-300"
                    : "h-[240px] overflow-hidden"
                } `}
              >
                <div className="text-sm text-gray-700">
                  <ParseBody body={description} />
                </div>
              </div>

              {/* Read More Button */}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-2 text-gray-600 text-xs font-medium hover:underline"
              >
                {isExpanded ? "اقرأ أقل" : "اقرأ المزيد"}
              </button>
            </>
          ) : (
            // If the description is less than 500 characters, show the entire text
            <div className="text-sm text-gray-700 font-montserrat">
              <ParseBody body={description} />
            </div>
          )}
        </div>

        <div className="flex w-[100%] md:w-[40%]  macbook:w-[40%] justify-center ">
          <img
            src={`${Image_URL}/${developer?.image_path}`}
            alt=""
            className="h-[300px] rounded-tl-[150px] w-full md:w-[450px] md:h-[500px] object-cover  md:rounded-tl-[200px] macbook:w-[700px] macbook:h-[750px]  "
            onError={(e) => {
              e.currentTarget.src = Image_NotFound; // Path to your dummy image
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default IntroSection;
