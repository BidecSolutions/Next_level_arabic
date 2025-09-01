"use client";

import { useState } from "react";
import { IoCloudDownloadOutline } from "react-icons/io5";
import Link from "next/link";
import { Image_NotFound, Image_URL } from "@/config/constants";
import ParseBody from "../HomeComponents/ParseBody";
import RegisterForm from "../Forms/RegisterForm";
import ImageContainer from "../ImageContainer";

// import { Image_NotFound, Image_Url } from "@/utils/const"; // adjust to your Next.js path
// import ParseBody from "@/components/PropertyDetails/ParseBody";
// import ImageContainer from "@/components/Developer/ImageContainer";
// import RegisterForm from "@/components/RegisterForm";

const Overview = ({
  loading,
  developer,
  heading,
  description,
  img1,
  img2,
  img3,
  page,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (loading) {
    return <p></p>;
  }

  return (
    <div className="flex w-[100%] justify-center py-8 md:py-24">
      <div className="w-[95%] flex flex-wrap gap-10 md:justify-around">
        {/* Left Section */}
        <div className="md:w-[40%] macbook:w-[40%] gap-[10px] md:gap-[40px] flex flex-col items-center md:items-start my-4">
          <h2 className="text-3xl md:text-[30px] md:leading-[32px] text-[#A39D9D] font-newsLetter text-center md:text-start macbook:text-[75px]">
            {heading
              ? heading
              : "أفضل مطوري العقارات في الإمارات العربية المتحدة: عقارات مميزة للمشترين المميزين"}
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
                  <ParseBody body={description ? description : "مرحبًا"} />
                </div>
              </div>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-2 text-gray-600 text-xs macbook:text-lg font-medium hover:underline"
              >
                {isExpanded ? "اقرأ أقل" : "اقرأ المزيد"}
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
            استفسر الآن
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

      {/* Modal Form */}
      <RegisterForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        page={page}
      />
    </div>
  );
};

export default Overview;
