"use client"
import { head } from "lodash";
import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import RegisterForm from "../Forms/RegisterForm";
// import RegisterForm from "../../RegisterForm";

const GallerySection = ({ head, para01, para02, btnName, iswhatsappbtn, page }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className=" flex w-full justify-center py-16 md:py-20 ">
      <div className=" flex flex-col gap-[30px]  md:flex-row  macbook:w-[80%] md:h-[500px] justify-center   md:gap-[25px] ">
        {/* Left Photo Gallery */}
        <div className="flex   justify-center md:w-[50%] macbook:w-[30%] gap-[10px] ">
          <img
            src="/property-management/group.png"
            alt="Gallery 1"
            className="   object-cover  "
          />
        </div>

        {/* Right Content */}
        <div className="w-full md:h-[450px] md:w-[60%] macbook:w-[50%] macbook:justify-center macbook:gap-[20px] flex flex-col items-center md:items-start ">
          <h2 className="text-[17px] font-newsLetter md:text-[34px] font-semibold  text-center md:text-start text-[#8F8F8F] mb-4  md:w-[90%]  ">
            {head}
          </h2>
          <p className="text-[#555555] font-montserrat mb-4 md:w-[90%] text-center md:text-start text-[16px] leading-[25.04px] ">
            {para01}
          </p>
          <p className="text-[#555555] font-montserrat mb-4 md:w-[90%] text-center md:text-start text-[16px] leading-[22.04px] ">
            {para02}
          </p>
          <div className="flex flex-row items-center justify-center">
           {/* <Link to={'/contact'}> */}
            <button className="px-6 py-2 font-montserrat bg-[#8F8F8F] text-white rounded-[6.5px] "
            onClick={() => setIsModalOpen(true)}>
              {btnName}
            </button>
            {/* </Link> */}
            {iswhatsappbtn && (
              <button className="ml-2  p-1.5 border-2 border-[#555555] text-xl text-[#555555] rounded-[3.5px] ">
                <FaWhatsapp />
              </button>
            )}
          </div>
        </div>
      </div>

      <RegisterForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        page={page}
      />
    </div>
  );
};

export default GallerySection;