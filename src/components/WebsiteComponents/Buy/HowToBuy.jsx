"use client";

import { useState } from "react";
import Image from "next/image";
import { IoCloudDownloadOutline } from "react-icons/io5";
import ParseBody from "../HomeComponents/ParseBody";
import RegisterForm from "../Forms/RegisterForm";
// import ParseBody from "../PropertyDetails/ParseBody";
// import RegisterForm from "../RegisterForm";

export default function HowToBuy({ image, heading, description, page }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex justify-center w-full py-10 md:py-20">
      <div className="flex justify-center items-center w-full flex-wrap macbook:justify-center gap-10">
        
        {/* Left Image */}
        <div className="flex w-full md:w-[35%] macbook:w-[40%] justify-start">
          <div className="relative w-full flex justify-start">
            <Image
              src={image || "/property-detail/group3.png"}
              alt="How to Buy"
              width={450}
              height={500}
              className="h-[250px] w-[310px] lg:w-[450px] md:h-[500px] md:w-[400px] macbook:w-full macbook:h-auto rounded-br-[120px] md:rounded-br-[100px]"
            />
          </div>
        </div>

        {/* Right Content */}
        <div className="md:w-[40%] macbook:w-[38%] flex flex-col items-center md:items-start gap-3 my-4">
          <h3 className="text-2xl md:text-4xl font-newsLetter macbook:text-[60px] text-[#A39D9D] text-center md:text-start uppercase">
            {heading}
          </h3>

          <div className="text-[14px] macbook:text-[25px] macbook:leading-[40px] text-[#555555] md:leading-[23px] text-center md:text-start">
            {description && description?.length > 500 ? (
              <>
                {/* Scrollable Text Area */}
                <div
                  className={`${
                    isExpanded
                      ? "h-[240px] overflow-y-auto transition-all duration-300"
                      : "h-[240px] overflow-hidden"
                  }`}
                >
                  <div className="text-[16px] font-montserrat text-[#555555] md:leading-[22px] macbook:text-[35px] macbook:leading-[38px] text-center md:text-start">
                    <ParseBody body={description} />
                  </div>
                </div>

                {/* Read More Button */}
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="mt-2 text-gray-600 text-xs font-medium hover:underline"
                >
                  {isExpanded ? "Read Less" : "Read More"}
                </button>
              </>
            ) : (
              <div className="text-sm text-gray-700 font-montserrat">
                <ParseBody body={description} />
              </div>
            )}
          </div>

          {/* CTA Button */}
          <button
            className="p-2 px-4 macbook:py-4 mt-4 macbook:text-[20px] rounded-md text-md text-white bg-[#A39D9D] hover:bg-transparent hover:text-[#A39D9D] border hover:border-[#A39D9D] w-fit flex justify-center items-center gap-2"
            onClick={() => setIsModalOpen(true)}
          >
            Let's Talk Real Estate
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
}
