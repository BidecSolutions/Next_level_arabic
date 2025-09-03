"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaEnvelope, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { Image_URL } from "@/config/constants";

function PropertyCard({ property }) {
  return (
    <div className="w-full flex flex-col sm:gap-5 gap-2 absolute pb-10 bottom-[-10%] md:bottom-[0%] items-center justify-center">
      <div
        className="w-[90%] md:w-[70%] macbook:w-[70%] macbook:px-8 justify-between flex flex-col md:flex-row bg-[#555555] md:bg-white rounded-[20px] md:rounded-[30px] p-6 md:p-6"
        style={{ boxShadow: "0px 4px 73.7px 0px rgba(0, 0, 0, 0.1)" }}
      >
        {/* Left Section */}
        <div className="flex flex-col items-center md:items-start gap-[3px]">
          <div className="flex flex-wrap space-x-2 justify-center gap-1 mb-2">
            {property?.addresses?.area_id !== null && (
              <span className="px-2 py-1 bg-white md:bg-[#A39D9D] text-black md:text-white rounded-[6px] text-[9px] macbook:text-[18px] macbook:py-[10px] flex items-center md:font-semibold font-montserrat">
                <Link href={`/area/${property?.addresses?.area?.slug}`}>
                  {property?.addresses?.area?.name || "نان"}
                </Link>
              </span>
            )}
            <span className="px-2 py-1 bg-white md:bg-[#A39D9D] text-black md:text-white rounded-[6px] text-[9px] macbook:text-[18px] macbook:py-[10px] flex items-center md:font-semibold font-montserrat">
              <Link href={`/${property?.project_type === 1 ? "off-plan" : "off-plan"}`}>
                {property?.project_type === 1 ? "خارج الخطة" : "خارج الخطة"}
              </Link>
            </span>
            <span className="px-2 py-1 bg-white md:bg-[#A39D9D] text-black md:text-white rounded-[6px] text-[9px] macbook:text-[18px] macbook:py-[10px] flex items-center md:font-semibold uppercase font-montserrat">
              <Link href={`/developer/${property?.developer?.slug}`}>
                {property?.developer?.name || "نان"}
              </Link>
            </span>
          </div>
          <p className="flex gap-1 text-[16px] md:text-[18px] macbook:text-[30px] text-white md:text-[#8F8F8F] font-newsLetter">
            السعر الابتدائي:{" "}
            {property?.starting_price ? (
              <span className="flex gap-1">
                {property?.starting_price}
                <Image
                  src="/dirham.PNG"
                  alt="AED"
                  width={16}
                  height={14}
                  className="mt-1.5 w-4 h-3.5"
                />
              </span>
            ) : (
              "نان"
            )}
          </p>
          <p className="text-white md:text-[#555555] md:font-medium text-[14px] macbook:text-[30px] md:text-[17px] font-montserrat">
            خطة التقسيط السهلة
          </p>
          {property?.addresses?.area_id !== null && (
            <div className="flex items-center text-center md:text-start justify-center text-white md:text-[#555555] mt-1">
              <MdLocationOn className="mr-1 font-medium text-white md:text-[#555555] text-[20px] macbook:text-[30px]" />
              <Link href={`/area/${property?.addresses?.area?.slug}`}>
                <p className="text-white md:text-[#555555] md:font-medium text-[14px] md:text-[17px] macbook:text-[30px] font-montserrat">
                  {property?.addresses?.area?.name || "نان"}
                </p>
              </Link>
            </div>
          )}
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-center md:items-end mt-4 md:mt-0 md:ml-8">
          <div className="flex gap-[20px] items-center">
            <Image
              src={`${Image_URL}/${property?.agent?.profile_image}`}
              alt="Expert Profile"
              width={90}
              height={90}
              className="object-cover rounded-full w-12 h-12 macbook:w-[90px] macbook:h-[90px]"
            />
            <div>
              <p className="text-[19px] md:text-[25px] macbook:text-[30px] text-white md:text-[#555555] font-newsLetter">
                {property?.agent?.name || "نان"}
              </p>
              <p className="text-white md:text-gray-600 text-[14px] md:text-[15px] macbook:text-[22px]">
               اتصل بخبير المشروع
              </p>
            </div>
          </div>
          <div className="flex items-center gap-[10px]">
            <div className="flex gap-[10px] justify-center md:justify-start mt-4">
              <Link
                href={`/agent/${property?.agent?.slug}`}
                className="flex items-center gap-2 macbook:text-[15px] text-[10px] px-6 py-2 bg-white md:bg-[#A39D9D] text-black md:text-white hover:bg-transparent border hover:border-[#A39D9D] hover:text-[#A39D9D] rounded-md"
              >
               انظر الملف الشخصي
              </Link>
              <a
                href={`mailto:${property?.agent?.email}`}
                className="flex items-center gap-2 px-3 py-2 border border-[#A39D9D] rounded-md"
              >
                <FaEnvelope className="text-white md:text-[#8F8F8F] text-[20px]" />
              </a>
              <a
                href={`https://wa.me/${property?.agent?.whatsapp_no}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-2 py-2 border border-[#A39D9D] rounded-md"
              >
                <FaWhatsapp className="text-white md:text-[#8F8F8F] text-[20px]" />
              </a>
              <a
                href={`tel:${property?.agent?.phone_no}`}
                className="flex items-center gap-2 px-2 py-2 border border-[#A39D9D] rounded-md"
              >
                <FaPhoneAlt className="text-white md:text-[#8F8F8F] text-[20px]" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;
