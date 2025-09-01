"use client";

import { useState } from "react";
// import ParseBody from "@/components/PropertyDetails/ParseBody";
// import ImageContainer2 from "@/components/Developer/ImageContainner2";
// import { Image_Url } from "@/utils/const"; // adjust path according to your project
// import RegisterForm from "@/components/RegisterForm";
import { Image_NotFound, Image_URL } from "@/config/constants";
import ParseBody from "../HomeComponents/ParseBody";
import RegisterForm from "../Forms/RegisterForm";
import ImageContainer2 from "../ImageContainner2";

const Overview2 = ({ heading, description, img1, img2, img3, page }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex w-[100%] justify-center md:pt-24 pb-8">
      <div className="w-[95%] flex flex-col-reverse md:flex-row gap-3 md:gap-10 md:justify-around">
        {/* Image Section */}
        <div className="w-[100%] md:w-[50%] macbook:w-[40%]">
          <ImageContainer2
            firstImage={`${Image_URL}/${img1}`}
            secondImage={`${Image_URL}/${img2}`}
            thirdImage={`${Image_URL}/${img3}`}
          />
        </div>

        {/* Text Section */}
        <div className="md:w-[40%] macbook:w-[40%] gap-[10px] md:gap-[20px] flex flex-col items-center md:items-start my-4">
          <h2 className="text-[30px] md:leading-[32px] text-[#A39D9D] font-newsLetter text-center md:text-start macbook:text-[75px]">
            {heading
              ? heading
              : "اكتشف مجتمعات متنوعة في جميع أنحاء دبي والإمارات العربية المتحدة"}
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
                {isExpanded ? "اقرأ أقل" : "اقرأ المزيد"}
              </button>
            </>
          ) : (
            <div className="text-sm text-gray-700 font-montserrat">
              <ParseBody body={description} />
            </div>
          )}

          <button
            className="p-2 font-montserrat px-4 rounded-md text-md text-white bg-[#A39D9D] macbook:text-[30px] macbook:px-8 flex justify-center items-center gap-2"
            onClick={() => setIsModalOpen(true)}
          >
           سجل اهتمامك
          </button>
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

export default Overview2;
