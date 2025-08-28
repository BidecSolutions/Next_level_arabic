'use client'; // Required for App Router since we use hooks

import { useEffect, useState } from "react";
import { BsBuildings } from "react-icons/bs";
import { Loader } from "../Loader";
import { Image_NotFound, Image_URL } from "@/config/constants";

const LandmarksSection = ({ property }) => {
  const staticLandmarks = [
    { heading: property?.addresses?.near_by_location_one },
    { heading: property?.addresses?.near_by_location_two },
    { heading: property?.addresses?.near_by_location_three },
    { heading: property?.addresses?.near_by_location_four },
    { heading: property?.addresses?.near_by_location_five },
    { heading: property?.addresses?.near_by_location_six },
  ];

  const [landmark, setLandmark] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API or delay for demonstration
    const timer = setTimeout(() => {
      setLandmark(staticLandmarks);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [property]);

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-col-reverse relative justify-end md:flex-row items-center w-full md:py-20 macbook:mt-48 rounded-lg">
      {/* Left Column - Image */}
      <div className="hidden md:flex max:md:w-[40%] md:bottom-[30%] left-[10%] static macbook:bottom-[20%] md:absolute macbook:left-[15%] overflow-hidden">
        <img
          src={
            property?.meadias?.length > 0 && property.meadias[0]?.nearby_image
              ? `${Image_URL}${JSON.parse(property.meadias[0].nearby_image)[0]}`
              : Image_NotFound
          }
          alt="Nearby Location"
          className="w-[320px] h-[250px] md:w-[490px] md:h-[490px] macbook:w-[600px] macbook:h-[650px] object-cover rounded-tr-[150px] md:rounded-tr-[150px]"
          onError={(e) => {
            e.currentTarget.src = Image_NotFound;
          }}
        />
      </div>

      {/* Right Column - Landmarks */}
      <div className="w-full py-16 md:py-28 md:w-[57%] lg:w-[120%] xl:w-[68%] macbook:w-[65%] p-4 md:p-6 bg-gray-100 rounded-lg flex flex-col items-center macbook:gap-[20px] md:rounded-none md:rounded-tr-lg md:rounded-br-lg">
        <h2 className="text-xl font-newsLetter text-[#8F8F8F] md:text-[25px] macbook:text-[40px] text-center md:text-start md:w-[50%] uppercase mb-6 leading-10">
          {property?.nearByHeading || "Nearby Locations"}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-2 gap-8 md:w-[50%] text-gray-700">
          {landmark.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="bg-white rounded-full p-4">
                <BsBuildings className="text-2xl macbook:text-[25px] text-[#8F8F8F]" />
              </div>
              <span className="text-[#8F8F8F] font-newsLetter ml-[4px] md:w-[70%] text-[11px] md:text-[20px] macbook:text-[30px]">
                {item?.heading}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandmarksSection;
