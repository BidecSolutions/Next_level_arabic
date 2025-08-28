'use client'; // If you're using Next.js App Router, keep this for client-side interactivity

import { useEffect, useState } from "react";
import Link from "next/link";
import ParseBody from "./../HomeComponents/ParseBody";
import { Loader } from "../Loader";
import RegisterForm from "../Forms/RegisterForm";
import { Image_NotFound, Image_URL } from "@/config/constants";

const AboutLocation = ({ property }) => {
  const [media, setMedia] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const mainImages = media[0]?.location_image
    ? JSON.parse(media[0].location_image)
    : [];

  const mainImage = mainImages.length
    ? `${Image_URL}${mainImages[0]}`
    : null;

  return (
    <div className="flex justify-center items-center w-full">
      <div className="flex items-center flex-wrap justify-center md:w-[100%] macbook:justify-center gap-10">
        
        {/* Left Column - Location Info */}
        <div className="md:w-[40%] macbook:w-[40%] flex flex-col items-center md:items-start gap-3 my4">
          <h2 className="text-2xl md:text-3xl mb-4 text-[#8F8F8F] text-center md:text-start font-newsLetter">
            {property?.locationHeading || "About Location"}
          </h2>

          {property?.locationDesc && property.locationDesc?.length > 500 ? (
            <>
              <div
                className={`${
                  isExpanded
                    ? "h-[140px] md:h-[240px] macbook:h-[300px] overflow-y-auto transition-all duration-300"
                    : "h-[140px] md:h-[240px] macbook:h-[300px] overflow-hidden"
                }`}
              >
                <div className="text-sm macbook:text-lg text-gray-700">
                  <ParseBody body={property?.locationDesc} />
                </div>
              </div>

              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-2 text-gray-600 text-xs macbook:text-lg font-medium hover:underline"
              >
                {isExpanded ? "Read Less" : "Read More"}
              </button>
            </>
          ) : (
            <div className="text-sm text-gray-700 font-montserrat">
              <ParseBody body={property?.locationDesc} />
            </div>
          )}

          <button
            className="p-2 px-4 macbook:py-4 macbook:text-[20px] rounded-md text-md text-white bg-[#A39D9D] w-fit flex justify-center items-center gap-2"
            onClick={() => setIsModalOpen(true)}
          >
            Request Available Units & Prices
          </button>
        </div>

        {/* Right Column - Image */}
        <div className="flex justify-start md:justify-center md:w-[50%] mb-1 macbook:w-[40%] gap-[10px]">
          <img
            src={mainImage || Image_NotFound}
            alt="Gallery 1"
            className="h-[300px] w-[320px] md:w-[550px] md:h-[490px] macbook:w-[600px] macbook:h-[650px] object-cover rounded-br-[100px]"
            onError={(e) => {
              e.currentTarget.src = Image_NotFound;
            }}
          />
        </div>

        {/* Register Form Modal */}
        <RegisterForm
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          page={`Property Detail Of ${property?.property_name || ""}`}
        />
      </div>
    </div>
  );
};

export default AboutLocation;
