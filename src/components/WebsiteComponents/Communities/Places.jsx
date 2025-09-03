"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link"; // ✅ Next.js Link
import { IoCloudDownloadOutline } from "react-icons/io5";
import RegisterForm from "../Forms/RegisterForm";
// import { Image_URL } from "@/config/constants";
// import RegisterForm from "../RegisterForm";
import { Image_NotFound, Image_URL } from "@/config/constants";

const Places = ({ about, page }) => {
  let mainImage = ""; // Default empty string for image
  let altText = "الصورة غير متوفرة"; // Default alt text
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const description =
    about?.about_section_description ||
    "تأسست شركة إعمار العقارية على يد محمد العبار، وهو مطور رائد مقره الإمارات العربية المتحدة، في عام 1997. وبفضل سنوات الخبرة الواسعة، أنشأ المطور ستة قطاعات أعمال و60 شركة نشطة في العديد من المناطق مثل الشرق الأوسط وشمال أفريقيا وآسيا وأوروبا وشمال.";

  // 🔹 Parse the about_section_images JSON string safely
  if (about?.about_section_images) {
    try {
      const images = JSON.parse(about.about_section_images);
      mainImage = images?.[0]?.image || mainImage;
      altText = images?.[0]?.alt || altText;
    } catch (error) {
      console.error("Error parsing about_section_images:", error);
    }
  }

  return (
    <div className="flex w-full justify-center py-16 md:py-24">
      <div className="flex flex-wrap gap-10 md:justify-center">
        {/* 🔹 Left Image Section */}
        <div className="flex w-full md:w-[40%] macbook:w-[40%] justify-center">
          {mainImage ? (
            <Image
              src={`${Image_URL}${mainImage}`}
              alt={altText}
              width={700}
              height={750}
              className="h-[300px] w-[250px] md:w-[450px] md:h-[500px] object-cover macbook:w-[700px] macbook:h-[750px] rounded-br-[75px] md:rounded-br-[150px]"
            />
          ) : (
            <p className="font-montserrat">لا توجد صورة متاحة</p>
          )}
        </div>

        {/* 🔹 Right Content Section */}
        <div className="md:w-[40%] macbook:w-[40%] gap-[10px] md:gap-[30px] flex flex-col items-center md:items-start my-2">
          <h3 className="text-[26px] md:text-5xl text-[#A39D9D] font-newsLetter text-center md:text-start macbook:text-[75px]">
            {about?.about_section_heading}
          </h3>

          <div>
            <div
              className={`text-[16px] font-montserrat text-[#555555] md:leading-[23px] macbook:text-[35px] macbook:leading-[38px] text-center md:text-start ${
                isExpanded
                  ? "max-h-[30rem] overflow-y-auto"
                  : "max-h-[24rem] overflow-hidden"
              } transition-all duration-300`}
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            />
            {description.length > 400 && (
              <p
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-gray-500 mt-2 underline cursor-pointer text-[14px]"
              >
                {isExpanded ? "عرض أقل" : "عرض المزيد"}
              </p>
            )}
          </div>

          {/* Contact Button */}
          <button
            className="p-2 px-4 font-montserrat rounded-md text-md text-white bg-[#A39D9D] macbook:text-[30px] macbook:px-8 flex justify-center items-center gap-2"
            onClick={() => setIsModalOpen(true)}
          >
            اتصل بنا
          </button>
        </div>
      </div>

      {/* 🔹 Modal Form */}
      <RegisterForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        page={page}
      />
    </div>
  );
};

export default Places;
