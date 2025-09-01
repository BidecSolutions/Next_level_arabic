import { Image_NotFound, Image_URL } from "@/config/constants";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ParseBody from "../HomeComponents/ParseBody";
import { fetchAgentFeaturedProperties } from "@/lib/api/agent.server";


const FeatureProperties = ({ agentDetails }) => {
  const [property, setProperties] = useState([]);
  const [media, setMedia] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch data from the API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchAgentFeaturedProperties(agentDetails);
        setProperties(response);
      } catch (error) {
        console.log("Categories Page", error);
      }
    };
    fetchData();
  }, [agentDetails]);

  useEffect(() => {
    if (property && property[0]?.meadias) {
      try {
        // Parse `meadias` if it's a string
        const parsedMedia =
          typeof property[0].meadias === "string"
            ? JSON.parse(property[0].meadias)
            : property[0].meadias;

        // Update the media state
        setMedia(parsedMedia);
      } catch (error) {
        console.error("Error parsing meadias:", error);
      }
    }
  }, [property]);

  // Safely parse and access `main_image`
  const mainImages = media && media[0]?.main_image
    ? JSON.parse(media[0].main_image)
    : [];

  // Get the first main image URL
  const mainImage = mainImages.length ? `${Image_URL}${mainImages[0]}` : Image_NotFound;


  return (
    <div>
      <div
        className={`bg-white w-full md:w-[300px] border-[1px] p-[10px] border-[#0B0B0B] px-[10px] rounded-[13px] overflow-hidden flex  md:flex-col  items-center  `}
      >
        <img
          src={mainImage}
          // alt={property[0]?.title}
          className={` w-[50%] h-[150px] md:h-48  md:w-full   object-cover `}
          onError={(e) => {
            e.currentTarget.src = Image_NotFound;
          }}
        />
        <div className="flex flex-col items-start w-full pl-[9px] p-[15px] mt-2">
          <h3 className="text-[14px] md:text-[18px] macbook:text-[24px]  font-semibold mb-1 md:mb-2 text-[#8F8F8F]">
            {property[0]?.property_name}
          </h3>
          <div className="  text-[11px] flex items-center gap-2  mb-1 md:mb-2">
            <p className="text-[12px] md:text-[15px] text-[#6B6B6B] macbook:text-[20px]  ">
           ابتداء من
            </p>
            <p className="flex gap-1 text-[10px] md:text-[16px] macbook:text-[22px] font-bold text-[#8F8F8F]">
              <img src='/dirham.PNG' className="w-3 h-3 mt-1.5"/> {property[0]?.starting_price} 
            </p>
          </div>
          <div className="text-[#6B6B6B] text-[9px] macbook:text-[21px] mb-1 md:mb-2  ">
            {/* {property[0]?.property_introduction ? `${property[0]?.property_introduction.substring(120)}..` : 'It has been the industrys standard dummy text ever since the 1500s,'} */}
            <ParseBody body={property[0]?.property_introduction.substring(120)} />
          </div>
          <div className="flex    md:mb-2 md:w-[40%] text-sm text-gray-500  "></div>
          <Link
            href={`/property/${property[0]?.slug}`}
          >
            <button className="w-[100px] md:w-[252px] text-[10px] macbook:text-[18px] py-[2px]  md:py-1 macbook:py-2 bg-[#8F8F8F] text-white rounded-[5px] hover:bg-gray-500">
              انظر التفاصيل
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeatureProperties;
