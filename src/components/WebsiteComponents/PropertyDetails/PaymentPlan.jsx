"use client";

import { useState } from "react";
import Image from "next/image";
import ParseBody from "../HomeComponents/ParseBody";
import { Image_NotFound } from "@/config/constants";

const PaymentPlan = ({ property }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (property?.installment_plan === 2) return null;

  return (
    <div className="w-full relative flex h-[420px] md:h-[400px] macbook:h-[310px] mt-16 md:mt-32 justify-center">
      <div
        className="bg-white flex flex-col pt-[20px] justify-start items-center rounded-[30px] overflow-hidden w-[90%] md:w-[80%] macbook:w-[80%] mb-16"
        style={{ boxShadow: "0px 4px 78.2px 0px #0000001A" }}
      >
        {/* Top Circle */}
        <div
          className="absolute top-[-10px] left-1/2 transform -translate-x-1/2 bg-[#8F8F8F] p-2 z-10 border-[3px] border-white w-5 h-5 rounded-full"
          style={{ boxShadow: " 0px 6px 15px 0px #00000040" }}
        ></div>

        {/* Heading and Subtext */}
        <div className="flex flex-col mt-[20px] md:mt-[0px] items-center text-center px-4 pt-6 pb-4">
          <h2 className="text-2xl md:text-3xl mb-4 text-[#8F8F8F] text-center leading-[30px] w-[94%] md:w-[90%] macbook:w-[80%] uppercase font-newsLetter">
            {property?.planHeading || "NaN"}
          </h2>

          {property?.planDesc && property.planDesc?.length > 500 ? (
            <>
              <div
                className={`${
                  isExpanded
                    ? "h-[55px] overflow-y-auto transition-all duration-300"
                    : "h-[55px] overflow-hidden"
                }`}
              >
                <div className="text-sm text-center max-w-[600px] text-gray-700">
                  <ParseBody body={property?.planDesc} />
                </div>
              </div>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-2 text-gray-600 text-xs font-medium hover:underline"
              >
                {isExpanded ? "Read Less" : "Read More"}
              </button>
            </>
          ) : (
            <div className="text-sm md:text-sm text-center max-w-[650px] text-gray-700 font-montserrat">
              <ParseBody body={property?.planDesc} />
            </div>
          )}
        </div>

        {/* Payment Plan Details */}
        <div className="bg-[#8F8F8F] flex justify-around w-[90%] md:w-[50%] macbook:w-[40%] absolute bottom-0 macbook:bottom-[-50px] items-center py-6 px-4 rounded-lg mx-4 mb-8">
          {/* Down Payment */}
          <div className="text-center text-white w-[30%] flex flex-col items-center gap-[5px] border-r border-[#FFFFFF] pr-2">
            <div className="flex gap-[10px] items-center">
              <Image
                src="/property-detail/installment.png"
                width={30}
                height={30}
                alt="Down Payment"
                onError={(e) => (e.target.src = Image_NotFound)}
              />
              <div className="text-[15px] md:text-[28px] font-semibold macbook:text-[40px]">
                {property?.first_installment
                  ? parseInt(property.first_installment)
                  : "NaN"}
                %
              </div>
            </div>
            <div className="text-[10px] md:text-[15px]">Down Payment</div>
          </div>

          {/* During Construction */}
          <div className="text-center text-white w-[30%] flex flex-col items-center gap-[5px] border-r border-[#FFFFFF] pr-2">
            <div className="flex gap-[10px] items-center">
              <Image
                src="/property-detail/percent.png"
                width={30}
                height={30}
                alt="During Construction"
                onError={(e) => (e.target.src = Image_NotFound)}
              />
              <div className="text-[18px] md:text-[28px] font-semibold">
                {property?.second_installment
                  ? parseInt(property.second_installment)
                  : "NaN"}
                %
              </div>
            </div>
            <div className="text-[10px] md:text-base">During Construction</div>
          </div>

          {/* Handover */}
          <div className="text-center text-white w-[35%] flex flex-col items-center gap-[5px]">
            <div className="flex gap-[10px] items-center">
              <Image
                src="/property-detail/handover.png"
                width={30}
                height={30}
                alt="Handover"
                onError={(e) => (e.target.src = Image_NotFound)}
              />
              <div className="text-[18px] md:text-[28px] font-semibold">
                {property?.hand_over ? parseInt(property.hand_over) : "NaN"}%
              </div>
            </div>
            <div className="text-[10px] md:text-[15px]">
              Handover after Completion
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPlan;
