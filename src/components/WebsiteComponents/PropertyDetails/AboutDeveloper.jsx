'use client'; // Required for hooks in Next.js App Router

import { useEffect, useState } from "react";
import Link from "next/link";
import ParseBody from "../HomeComponents/ParseBody";
import { Loader } from "../Loader";
import { Image_NotFound, Image_URL } from "@/config/constants";

const AboutDeveloper = ({ property }) => {
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

  const mainImages = media[0]?.developer_image
    ? JSON.parse(media[0].developer_image)
    : [];
  const mainImage = mainImages.length ? `${Image_URL}${mainImages[0]}` : null;

  return (
    <div className="flex justify-center w-full py-12 md:mt-24 md:mb-36">
      <div className="flex flex-wrap md:justify-center macbook:justify-center gap-10">
        
        {/* Text Section */}
        <div className="md:w-[40%] macbook:w-[40%] flex flex-col items-center md:items-start justify-center gap-3 my-4">
          <h2 className="text-2xl md:text-3xl mb-4 text-[#8F8F8F] text-center md:text-start font-newsLetter">
            {property?.devloperHeading || "About Developer"}
          </h2>

          <div className="text-[16px] macbook:text-[25px] macbook:leading-[40px] text-[#555555] md:leading-[23px] text-center md:text-start">
            {property?.devloperDesc && property.devloperDesc.length > 500 ? (
              <>
                <div
                  className={`${
                    isExpanded
                      ? "h-[140px] md:h-[240px] macbook:h-[300px] overflow-y-auto transition-all duration-300"
                      : "h-[140px] md:h-[240px] macbook:h-[300px] overflow-hidden"
                  }`}
                >
                  <div className="text-sm md:text-lg text-gray-700">
                    <ParseBody body={property?.devloperDesc} />
                  </div>
                </div>
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="mt-2 text-gray-600 text-xs md:text-lg font-medium hover:underline"
                >
                  {isExpanded ? "Read Less" : "Read More"}
                </button>
              </>
            ) : (
              <div className="text-sm text-gray-700 font-montserrat">
                <ParseBody body={property?.devloperDesc} />
              </div>
            )}
          </div>

          <Link
            href={`/developer/${property?.developer?.slug}`}
            className="px-[8px] py-[10px] cursor-pointer text-[12px] md:px-4 macbook:text-[18px] bg-[#A39D9D] md:py-2 md:text-[14px] flex items-center gap-[10px] text-white rounded-[5px]"
          >
            View Developer Properties
          </Link>
        </div>

        {/* Image Section */}
        <div className="flex w-full md:w-[50%] macbook:w-[30%] justify-center md:justify-end">
          <div className="relative w-full flex justify-center">
            <img
              src={mainImage || Image_NotFound}
              alt="Developer"
              className="h-[300px] w-[300px] md:w-[550px] md:h-[490px] macbook:w-full object-cover macbook:h-auto rounded-br-[100px]"
              onError={(e) => {
                e.currentTarget.src = Image_NotFound;
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutDeveloper;
