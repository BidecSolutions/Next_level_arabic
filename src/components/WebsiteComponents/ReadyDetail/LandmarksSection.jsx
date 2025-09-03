"use client";

import { useState } from "react";
import Image from "next/image";
import {
  FaPlane,
  FaSchool,
  FaHospital,
  FaShoppingCart,
  FaUniversity,
  FaGasPump,
} from "react-icons/fa";
import { Image_NotFound, Image_URL } from "@/config/constants";

const categoryIcons = {
  School: <FaSchool className="text-xl" />,
  Hospital: <FaHospital className="text-xl" />,
  Airport: <FaPlane className="text-xl" />,
  Supermarkets: <FaShoppingCart className="text-xl" />,
  Banks: <FaUniversity className="text-xl" />,
  Petrol: <FaGasPump className="text-xl" />,
};

const LandmarksSection = ({ property }) => {
  const heading = property?.section_5_heading || "معالم قريبة";
  const content = property?.section_5_content || {};

  const imagePath = property?.section_5_image
    ? `${Image_URL}${property.section_5_image}`
    : Image_NotFound;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const defaultCategories = ["مدرسة", "مستشفى", "مطار", "محلات السوبر ماركت", "البنوك", "بنزين"];

  const defaultItems = defaultCategories
    .map((category) => {
      const items = content?.[category];
      if (items && items.length > 0) {
        return {
          ...items[0],
          category,
          key: `${category}-0`,
        };
      }
      return null;
    })
    .filter(Boolean);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const shouldShowButton = Object.values(content).some(
    (items) => Array.isArray(items) && items.length > 1
  );

  return (
    <div className="flex flex-col-reverse relative justify-end md:flex-row items-center w-full mt-20 md:py-20 macbook:mt-48 rounded-lg">
      {/* Left Column - Image */}
      <div className="hidden md:flex max:md:w-[40%] md:bottom-[30%] left-[10%] static macbook:bottom-[20%] md:absolute macbook:left-[15%] overflow-hidden">
        <div className="relative w-[320px] h-[250px] md:w-[470px] md:h-[490px] macbook:w-[600px] macbook:h-[650px] rounded-tr-[150px] md:rounded-tr-[150px] overflow-hidden">
          <Image
            src={imagePath}
            alt="Nearby Landmark"
            fill
            className="object-cover rounded-tr-[150px]"
            onError={(e) => {
              e.currentTarget.src = Image_NotFound;
            }}
          />
        </div>
      </div>

      {/* Right Column - Heading and List */}
      <div className="w-full py-16 md:py-28 md:w-[57%] lg:w-[120%] xl:w-[68%] macbook:w-[65%] p-4 md:p-6 bg-gray-100 rounded-lg flex flex-col items-center macbook:gap-[20px] md:rounded-none md:rounded-tr-lg md:rounded-br-lg">
        <h2 className="text-xl font-newsLetter text-[#8F8F8F] md:text-[25px] macbook:text-[40px] text-center md:text-start md:w-[50%] uppercase mb-6 leading-10">
          {heading}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-2 gap-8 md:w-[50%] text-gray-700">
          {defaultItems.map((item) => (
            <div key={item.key} className="flex items-center gap-2">
              <div className="bg-white rounded-full p-4">
                {categoryIcons[item.category] || <FaPlane className="text-xl" />}
              </div>
              <span className="text-[#8F8F8F] font-newsLetter ml-[4px] text-[11px] md:text-[20px] macbook:text-[30px]">
                {item.text}
              </span>
            </div>
          ))}

          {shouldShowButton && (
            <button
              onClick={openModal}
              className="hidden md:block mt-2 px-6 py-2 bg-[#8F8F8F] text-white rounded hover:bg-gray-700 transition"
            >
              عرض الكل القريبة
            </button>
          )}
        </div>

        {shouldShowButton && (
          <button
            onClick={openModal}
            className="md:hidden block mt-6 px-6 py-2 bg-[#8F8F8F] text-white rounded hover:bg-gray-700 transition"
          >
            عرض الكل القريبة
          </button>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsModalOpen(false);
          }}
          className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center"
        >
          <div className="bg-white w-[90%] max-w-3xl max-h-[90vh] overflow-y-auto p-6 rounded-lg relative">
            <h3 className="text-2xl font-semibold mb-4">{heading}</h3>

            {Object.entries(content).map(([category, items]) => (
              <div key={category} className="mb-6">
                <h4 className="text-xl font-medium mb-2 flex items-center gap-2">
                  {categoryIcons[category] || <FaPlane />} {category}
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 ml-6">
                  {items.map((item, idx) => (
                    <li key={idx} className="text-gray-700">
                      - {item.text}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandmarksSection;
