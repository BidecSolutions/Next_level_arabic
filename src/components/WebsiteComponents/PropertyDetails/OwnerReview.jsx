'use client';

import { useState } from "react";
import ParseBody from "../HomeComponents/ParseBody";

const OwnerReview = ({ property }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex justify-center pt-10 md:mt-48">
      <div className="flex flex-col md:w-[80%] macbook:w-[80%] bg-[#F3F3F3] md:flex-row items-center md:items-start p-8 md:p-16 gap-8 rounded-br-[50px] rounded-bl-[25px] rounded-t-[25px]">
        
        {/* Left Side - Image */}
        <div className="relative md:w-[40%]">
          <img
            src="/about/ahad.png"
            alt="Profile"
            className="w-full h-64 md:h-[535px] macbook:h-[680px] object-cover md:rounded-br-[150px]"
          />
        </div>

        {/* Right Side - Content */}
        <div className="flex flex-col justify-center text-center md:text-start gap-4 md:pl-4 md:w-[50%]">
          <h2 className="text-2xl md:text-[35px] macbook:text-[45px] macbook:leading-[45px] md:leading-[35px] uppercase md:pb-2 text-[#8F8F8F] font-newsLetter">
            {property?.ownerSaysHeading ||
              "ماذا يقول عبد الأحد عن هذا المشروع"}
          </h2>

          {property?.ownerSays && property.ownerSays.length > 500 ? (
            <>
              <div
                className={`${
                  isExpanded
                    ? "h-[140px] overflow-y-auto transition-all duration-300"
                    : "h-[140px] overflow-hidden"
                }`}
              >
                <div className="text-sm md:text-lg text-gray-700">
                  <ParseBody body={property?.ownerSays} />
                </div>
              </div>

              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-2 text-gray-600 text-xs md:text-lg text-start font-medium hover:underline"
              >
                {isExpanded ? "اقرأ أقل" : "اقرأ المزيد"}
              </button>
            </>
          ) : (
            <div className="text-sm text-gray-700 font-montserrat">
              <ParseBody body={property?.ownerSays} />
            </div>
          )}

          {/* Signature */}
          <div>
            <p className="text-[#555555] text-[20px] macbook:text-[35px] font-semibold">
              <span> — </span> عبد الأحد
            </p>
            <p className="text-[#555555] text-[10px] macbook:text-[18px] font-semibold pl-6">
              المدير العام <br />
              عقارات المستوى التالي
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerReview;
