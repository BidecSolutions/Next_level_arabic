"use client";

import { useState } from "react";
import Image from "next/image";
import MultiStepPropertyForm from "./MultiStepPropertyForm";
import { IoCloudDownloadOutline } from "react-icons/io5";
import FeaturesSection from "./FeaturesSection";
import ResponsiveMap from "./ResponsiveMap";
import BrochureRegisterForm from "../Forms/BrochureRegisterForm";
import ParseBody from "../HomeComponents/ParseBody";
import { Image_NotFound } from "@/config/constants";

const PropertyAmenitiesAndMap = ({ property, pageName }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const propertyTypeOptions = [
    { id: "1", name: "Apartment" },
    { id: "2", name: "Villas" },
    { id: "3", name: "Townhouse" },
    { id: "4", name: "Penthouse " },
    { id: "5", name: "Duplexes" },
  ];

  const getPropertyTypeName = (id) => {
    const found = propertyTypeOptions.find((type) => type.id === id?.toString());
    return found ? found.name : "N/A";
  };

  return (
    <div className="flex relative flex-col lg:flex-row gap-8 md:max-w-7xl mx-auto items-start">
      {/* Left Section */}
      <div className="w-80 md:w-2/3 md:pr-4">
        <div className="text-[#555555] macbook:leading-[38px] text-start">
          <h3 className="text-xl md:text-3xl font-newsLetter text-black">
            {property?.name}
          </h3>
          <p className="text-md md:text-xl font-newsLetter text-black">
            {property?.price && (
              <span className="flex gap-1">
                {property?.price}
                <Image
                  src="/dirham-black.PNG"
                  alt="price"
                  width={16}
                  height={16}
                  className="w-3.5 md:w-4 h-3 md:h-3.5 mt-[0.3rem]"
                />
              </span>
            )}
          </p>
          <ParseBody body={property?.description} />
        </div>

        {/* Download Brochure Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-[10px] w-auto py-4 macbook:text-[35px] px-[14px] justify-center bg-[#A39D9D] text-white hover:bg-transparent hover:text-[#A39D9D] border hover:border-[#A39D9D] rounded-md mb-8"
        >
          <IoCloudDownloadOutline className="text-[18px] macbook:text-[40px]" />
          <span className="text-[14px] md:text-[12px] macbook:text-[20px]">
            Download Free PDF Brochure
          </span>
        </button>

        {/* Property Information */}
        <h2 className="text-xl md:text-3xl font-newsLetter text-[#A39D9D] mb-6">
          Property Information
        </h2>
        <div className="w-full md:w-5/6 mb-8">
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="divide-y divide-gray-200">
              {[
                {
                  label: "Unit Options",
                  value: getPropertyTypeName(property?.property_type_id_new),
                },
                { label: "Developer", value: property?.developer?.name },
                { label: "Community", value: property?.community?.name },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row md:items-center justify-between px-4 py-3 bg-white"
                >
                  <div className="text-base font-semibold text-gray-800 md:w-1/3">
                    {item.label}
                  </div>
                  <div className="text-base text-gray-600 mt-1 md:mt-0 md:w-2/3">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Property Overview */}
        <h2 className="text-xl md:text-3xl font-newsLetter text-[#A39D9D] mb-6">
          Property Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 mb-8">
          {[
            { label: "Property Type", value: property?.section_2_content?.[0]?.text, icon: "/property_type.png" },
            { label: "Property Size", value: property?.section_2_content?.[2]?.text, icon: "/size.png" },
            { label: "Bedrooms", value: property?.section_2_content?.[1]?.text, icon: "/bedroom.png" },
            { label: "Bathrooms", value: property?.section_2_content?.[3]?.text, icon: "/bathroom.png" },
            { label: "Purpose", value: property?.section_2_content?.[4]?.text, icon: "/purpose.png" },
            { label: "Usage", value: property?.section_2_content?.[5]?.text, icon: "/usage.png" },
          ].map((detail, index) => (
            <div key={index} className="flex items-center">
              <div className="text-gray-500 mr-3">
                <Image
                  src={detail.icon}
                  alt={detail.label}
                  width={24}
                  height={24}
                  className="w-6 h-6 object-contain"
                  onError={(e) => (e.currentTarget.src = Image_NotFound)}
                />
              </div>
              <div>
                <div className="text-sm text-gray-500">{detail.label}</div>
                <div className="text-md font-medium text-gray-800">
                  {detail.value}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Amenities */}
        <FeaturesSection features={property?.features} />
      </div>

      {/* Right Section */}
      <div className="md:w-2/3 md:pr-4 overflow-hidden relative">
        <ResponsiveMap iframe={property?.iFrame || ""} />
        <MultiStepPropertyForm property={property} />
      </div>

      {/* Register Form (Modal) */}
      <BrochureRegisterForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        page={pageName}
        pdf={property?.broucher_link}
      />
    </div>
  );
};

export default PropertyAmenitiesAndMap;
