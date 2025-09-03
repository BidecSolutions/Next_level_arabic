"use client";

import { useEffect, useState } from "react";
import { Image_NotFound, Image_URL } from "@/config/constants";
import ParseBody from "../HomeComponents/ParseBody";
// import RegisterForm from "../forms/RegisterForm"; // uncomment if needed

export const Overview = ({ developer }) => {
  const [images, setImages] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const description =
    developer?.about_section_description ||
    "تأسست شركة ar Properties على يد محمد العبار - وهو مطور رائد مقره الإمارات العربية المتحدة - في عام 1997. مع سنوات واسعة من الخبرة، أنشأ المطور ستة قطاعات أعمال و60 شركة نشطة في العديد من المناطق مثل الشرق الأوسط وشمال إفريقيا وآسيا وأوروبا وشمال";

  useEffect(() => {
    if (developer?.aboutSectionImages) {
      try {
        const parsedImages = JSON.parse(developer.aboutSectionImages);
        setImages(parsedImages);
      } catch (err) {
        console.error("Error parsing aboutSectionImages:", err);
        setImages([]);
      }
    } else {
      setImages([]);
    }
  }, [developer]);

  return (
    <div className="flex w-full justify-center py-10 md:py-24">
      <div className="w-[95%] flex flex-wrap gap-10 md:justify-around">
        {/* LEFT SIDE: TEXT */}
        <div className="md:w-[40%] macbook:w-[40%] flex flex-col gap-5 items-center md:items-start my-4">
          <h2 className="text-[28px] md:text-5xl macbook:text-[75px] font-newsLetter text-[#A39D9D] text-center md:text-start">
            {developer?.about_section_heading || "لوريم دولور"}
          </h2>

          {description && description.length > 500 ? (
            <>
              {/* Scrollable Text */}
              <div
                className={`${
                  isExpanded
                    ? "h-[240px] overflow-y-auto transition-all duration-300"
                    : "h-[240px] overflow-hidden"
                }`}
              >
                <div className="text-sm text-gray-700">
                  <ParseBody body={description} />
                </div>
              </div>

              {/* Read More Button */}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-2 text-gray-600 text-xs font-medium hover:underline"
              >
                {isExpanded ? "اقرأ أقل" : "اقرأ المزيد"}
              </button>
            </>
          ) : (
            <div className="text-sm text-gray-700 font-montserrat">
              <ParseBody body={description} />
            </div>
          )}

          {/* Contact Button */}
          <button
            className="p-2 px-4 macbook:px-8 font-montserrat rounded-md text-md macbook:text-[30px] text-white bg-[#A39D9D] flex justify-center items-center gap-2"
            onClick={() => setIsModalOpen(true)}
          >
            اتصل بنا
          </button>
        </div>

        {/* RIGHT SIDE: IMAGE */}
        <div className="flex w-full md:w-[40%] macbook:w-[40%] justify-center">
          {images.length > 0 ? (
            <img
              src={`${Image_URL}/${images[0].image}`}
              alt={images[0]?.alt || "Developer Image"}
              className="h-[300px] w-[250px] md:w-[450px] md:h-[500px] macbook:w-[700px] macbook:h-[750px] object-cover rounded-tl-[100px] md:rounded-tl-[150px]"
              onError={(e) => {
                e.currentTarget.src = Image_NotFound;
              }}
            />
          ) : (
            <img
              src="/developer/group.png"
              alt="Default Developer"
              className="h-[300px] w-[250px] md:w-[450px] md:h-[500px] macbook:w-[700px] macbook:h-[750px] object-cover"
              onError={(e) => {
                e.currentTarget.src = Image_NotFound;
              }}
            />
          )}
        </div>
      </div>

      {/* ✅ Optional Contact Modal */}
      {/* <RegisterForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        page={`Developer Detail Of ${developer?.name}`}
      /> */}
    </div>
  );
};
