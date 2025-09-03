"use client";

import { useEffect, useState } from "react";
import Image from "next/image"; // For optimized images // Adjust path as per your folder
import ParseBody from "@/components/WebsiteComponents/HomeComponents/ParseBody";
import { Loader } from "@/components/WebsiteComponents/Loader";
import { Image_NotFound, Image_URL } from "@/config/constants";

const PropertyOverview = ({ property }) => {
  const [media, setMedia] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (property?.meadias) {
      try {
        const parsedMedia =
          typeof property.meadias === "string"
            ? JSON.parse(property.meadias)
            : property.meadias;

        setMedia(parsedMedia);
      } catch (error) {
        console.error("Error parsing meadias:", error);
      }
    }
  }, [property]);

  if (!media) return <Loader />;

  const mainImages = media[0]?.overview_image
    ? JSON.parse(media[0].overview_image)
    : [];
  const mainImage = mainImages.length
    ? `${Image_URL}${mainImages[0]}`
    : Image_NotFound;

  return (
    <div className="flex flex-col md:flex-row justify-center items-center md:mt-20 gap-10 w-full mb-24">
      {/* Left Section - Image */}
      <div className="flex justify-center md:w-[40%]">
        <div className="relative w-full flex justify-center">
          <Image
            src={mainImage}
            alt="Property Overview"
            width={600}
            height={400}
            className="h-[400px] w-[450px] md:h-[400px] macbook:w-[600px] macbook:h-full rounded-tl-[150px] object-cover"
            onError={(e) => (e.target.src = Image_NotFound)}
          />
        </div>
      </div>

      {/* Right Section - Info */}
      <div className="flex flex-col items-center mt-10 macbook:gap-5 md:items-start md:w-[40%] text-center md:text-start">
        <h2 className="text-2xl md:text-3xl mb-4 text-[#8F8F8F] font-newsLetter">
          {property.propertyOverviewHeading || "نظرة عامة على المشروع"}
        </h2>

        {/* Description with Read More */}
        <div className="text-[#555] text-[18px] macbook:text-[30px]">
          {property?.propertyOverviewDesc &&
          property.propertyOverviewDesc?.length > 500 ? (
            <>
              <div
                className={`${
                  isExpanded
                    ? "h-[140px] md:h-[100px] overflow-y-auto transition-all duration-300"
                    : "h-[140px] md:h-[100px] overflow-hidden"
                }`}
              >
                <div className="text-sm text-gray-700">
                  <ParseBody body={property?.propertyOverviewDesc} />
                </div>
              </div>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-2 text-gray-600 text-xs font-medium hover:underline"
              >
                {isExpanded ? "اقرأ أقل" : "اقرأ المزيد"}
              </button>
            </>
          ) : (
            <div className="text-sm text-gray-700">
              <ParseBody body={property?.propertyOverviewDesc} />
            </div>
          )}
        </div>

        {/* Property Details */}
        <div className="grid mt-4 grid-cols-2 gap-4 w-full text-gray-700">
          {[
            { label: "يكتب", value: property?.project_type === 1 ? "مستعد" : "خارج الخطة", icon: "/property-detail/type.png" },
            { label: "إجمالي الغرف", value: property?.no_of_rooms || "نان", icon: "/property-detail/bed.png" },
            { label: "غرفة نوم", value: property?.no_of_bedrooms || "نان", icon: "/property-detail/bed.png" },
            { label: "مقاس", value: property?.land_area || "نان", icon: "/property-detail/area.png" },
            { label: "المطور", value: property?.developer?.name || "نان", icon: "/property-detail/developer.png" },
            { label: "سنة البناء", value: property?.build_year || "نان", icon: "/property-detail/type.png" }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-1">
              <div className="bg-white rounded-full">
                <Image
                  src={item.icon}
                  alt={item.label}
                  width={40}
                  height={40}
                  className="macbook:w-[70px] macbook:h-auto"
                />
              </div>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-1">
                <span className="text-[#8F8F8F] text-[15px] md:text-[17px]">{item.label}</span>
                <span className="text-[10px] md:text-[12px] font-medium text-[#8F8F8F]">
                  {item.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyOverview;
