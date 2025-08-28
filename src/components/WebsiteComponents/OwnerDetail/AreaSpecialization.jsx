"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Image_NotFound, Image_URL } from "@/config/constants";
import { getPopularAreas } from "@/lib/api/areas.server";

const AreaSpecialization = () => {
  const [visibleCount, setVisibleCount] = useState(6);
  const [areas, setAreas] = useState([]);
  const pathname = usePathname();

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPopularAreas();

        setAreas(response);
        console.log("✅ Areas Fetched:", response);
      } catch (error) {
        console.error("❌ Categories Page Error:", error);
      }
    };

    fetchData();
  }, [pathname]);

  return (
    <div className="flex w-full flex-col items-center">
      <div>
        <h3 className="md:text-[40px] font-newsLetter py-10 text-[#8F8F8F] font-medium macbook:text-[60px]">
          Areas of Specialization
        </h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 macbook:grid-cols-4 gap-[12px] md:gap-[20px] mt-8 pb-12">
        {areas.slice(0, visibleCount).map((property, index) => (
          <div
            key={index}
            className="bg-white md:w-[310px] md:mx-[10px] cursor-pointer macbook:w-[400px] border-2 border-[#5555] px-[5px] p-2 rounded-[13px] overflow-hidden flex flex-col items-center"
          >
            <img
              src={`${Image_URL}${property.image_path}`}
              alt={property.name}
              className="md:w-full w-[173px] h-[159px] md:h-[250px] object-cover"
              onError={(e) => {
                e.currentTarget.src = Image_NotFound;
              }}
            />

            <div className="flex flex-col w-full justify-end gap-[10px] p-[10px] mt-2 pb-[0px] pt-[0px]">
              <h3 className="text-[12px] font-montserrat md:text-[18px] font-semibold mb-1 md:mb-2 text-[#8F8F8F]">
                {property.name}
              </h3>

              <div className="text-[#8F8F8F] text-[11px] flex flex-col mb-1 md:mb-4">
                <p className="text-[10px] font-montserrat md:text-md text-[#8F8F8F]">
                  Starting From{" "}
                  <span className="flex gap-1 text-[12px] font-montserrat font-normal md:text-[16px] md:font-bold">
                    <img src="/dirham.PNG" className="w-3.5 h-3.5 mt-1" />
                    {Number(property?.startingPrice)}
                  </span>
                </p>
              </div>

              <div className="flex justify-center gap-1">
                <Link
                  href={`/area/${property?.slug}`}
                  className="w-full text-center py-1 px-1 font-montserrat text-[7px] md:p-4 md:text-[12px] md:py-2 border-[#8F8F8F] rounded-[5px] hover:border-[1px] hover:bg-[#8F8F8F] border text-[#8F8F8F] hover:text-white"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {visibleCount < areas.length && (
        <div className="w-full flex justify-center items-center">
          <button
            onClick={loadMore}
            className="mt-8 py-2 px-4 border-2 font-montserrat border-[#8F8F8F] bg-[#8F8F8F] text-white rounded hover:text-[#8F8F8F] hover:bg-transparent text-center"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default AreaSpecialization;
