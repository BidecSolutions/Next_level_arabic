"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ParseBody from "../HomeComponents/ParseBody";
import { Loader } from "../Loader";
import { Image_NotFound, Image_URL } from "@/config/constants";

export default function AboutProperty({ property }) {
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

  if (!media) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  const mainImages = media[0]?.aboutus_image
    ? JSON.parse(media[0].aboutus_image)
    : [];
  const mainImage = mainImages.length
    ? `${Image_URL}${mainImages[0]}`
    : Image_NotFound;

  return (
    <div className="flex flex-col md:flex-row gap-8 justify-center items-center md:gap-16 mb-24 md:mt-32">
      <div className="w-[90%] md:w-[90%] macbook:w-[80%] flex flex-col md:flex-row justify-evenly gap-3 md:gap-[5px]">
        {/* Left Column */}
        <div className="md:w-[40%] macbook:w-[50%] flex flex-col items-center md:items-start gap-3 my-4">
          <h2 className="text-2xl md:text-3xl mb-4 text-[#8F8F8F] text-center md:text-start md:leading-[50px] font-newsLetter">
            About the{" "}
            {property?.property_name || "اسم العقار"}
          </h2>

          {property?.property_description &&
          property.property_description?.length > 500 ? (
            <>
              <div
                className={`${
                  isExpanded
                    ? "h-[140px] md:h-[240px] macbook:h-[300px] overflow-y-auto transition-all duration-300"
                    : "h-[140px] md:h-[240px] macbook:h-[300px] overflow-hidden"
                }`}
              >
                <div className="text-sm macbook:text-lg text-gray-700">
                  <ParseBody body={property?.property_description} />
                </div>
              </div>

              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-2 text-gray-600 text-xs macbook:text-lg font-medium hover:underline"
              >
                {isExpanded ? "اقرأ أقل" : "اقرأ المزيد"}
              </button>
            </>
          ) : (
            <div className="text-sm text-gray-700 font-montserrat">
              <ParseBody body={property?.property_description} />
            </div>
          )}
        </div>

        {/* Right Column - Image */}
        <div>
          <Image
            src={mainImage}
            alt={property?.property_name || "Property Image"}
            width={600}
            height={400}
            className="h-[400px] w-[450px] md:h-[400px] macbook:w-[600px] macbook:h-full rounded-tl-[100px] md:rounded-tl-[150px] object-cover"
            onError={(e) => {
              e.target.src = Image_NotFound;
            }}
          />
        </div>
      </div>
    </div>
  );
}
