"use client";

import { useState, useEffect } from "react";
import { Image_NotFound, Image_URL } from "@/config/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { fetchPopularAreas } from "@/lib/api/home.server";

const PopularAreas = ({ heading, dev }) => {
  const [areas, setAreas] = useState([]);
  const pathname = usePathname();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.public.get("user/areas/popular_areas");
//         const filteredProperties = response.data.data
//           .filter((property) => property.status === 1)
//           .slice(0, 7);

//         setAreas(filteredProperties);
//       } catch (error) {
//         console.log("Categories Page", error);
//       }
//     };
//     fetchData();
//   }, [pathname]);


useEffect(() => {
  const loadAreas = async () => {
    const data = await fetchPopularAreas();
    setAreas(data);
  };

  loadAreas();
}, [pathname]);
  return (
    <div className="flex flex-col w-full items-center my-12 md:my-20">
      {!dev ? (
        <h4 className="text-[25px] md:text-3xl font-newsLetter text-[#8F8F8F] macbook:text-[48px] font-semibold text-center mb-2">
          {heading || "MOST POPULAR AREAS"}
        </h4>
      ) : (
        <p className="text-[25px] md:text-3xl font-newsLetter text-[#8F8F8F] macbook:text-[48px] font-semibold text-center mb-2">
          {heading || "MOST POPULAR AREAS"}
        </p>
      )}

      <p className="text-center font-montserrat md:w-[70%] text-gray-700 macbook:text-[28px] mb-8 md:mb-16">
        Explore Dubai's top real estate spots: Downtown Dubai, Emirates Hills,
        Business Bay, and more. Discover luxury and innovation.
      </p>

      {areas.length === 0 && (
        <p className="text-center text-[25px] font-montserrat w-full flex justify-center text-gray-500">
          No Areas available
        </p>
      )}

      <div className="flex w-full macbook:w-[80%] gap-[10px] justify-center">
        <div className="flex justify-center w-full flex-col items-center">
          {/* First Row */}
          <div className="flex justify-center flex-wrap md:flex-nowrap w-full gap-[10px] mb-[10px]">
            {areas?.slice(0, 3).map((area, index) => (
              <div
                key={area.id}
                className={`relative h-[224px] md:h-[284px] ${
                  index === 0
                    ? "w-full md:w-[50%]"
                    : index === 1
                    ? "hidden md:block md:w-[25%]"
                    : index === 2
                    ? "hidden md:block md:w-[25%]"
                    : ""
                }`}
              >
                <Link href={`/area/${area.slug}`}>
                  <div className="relative w-full md:w-full h-[220px] md:h-[280px] rounded-[18px] overflow-hidden">
                    <img
                      src={`${Image_URL}${area.image_path}`}
                      alt={`area ${area.id}`}
                      loading="lazy"
                      className="object-cover rounded-[18px] w-full h-full"
                      onError={(e) => {
                        e.currentTarget.src = Image_NotFound;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-transparent" />
                  </div>
                  <p className="absolute font-montserrat bottom-4 w-full text-center text-white text-md md:text-lg">
                    {area.name}
                  </p>
                </Link>
              </div>
            ))}
          </div>

          {/* Second Row */}
          <div className="w-full flex gap-[8px] justify-center">
            {areas?.slice(3, 7).map((area, index) => (
              <div
                key={index}
                className={`relative md:w-[25%] flex gap-[5px] ${
                  index === 2 ? "hidden md:block" : index === 3 ? "hidden md:block" : ""
                }`}
              >
                <div className="relative w-[160px] md:w-full h-[220px] md:h-[280px] rounded-[18px] overflow-hidden">
                  <img
                    src={`${Image_URL}${area.image_path}`}
                    alt={`area ${area.id}`}
                    loading="lazy"
                    className="object-cover rounded-[18px] w-full h-full"
                    onError={(e) => {
                      e.currentTarget.src = Image_NotFound;
                    }}
                  />
                  <Link href={`/area/${area.slug}`}>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-transparent" />
                  </Link>
                </div>
                <p className="absolute font-montserrat bottom-4 w-full text-center text-white text-[10px] md:text-lg">
                  {area.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* View All Areas Button */}
      <div className="text-center mt-8">
        <Link
          href="/areas/"
          className="px-6 py-2 font-montserrat bg-[#8F8F8F] text-white hover:bg-transparent hover:text-[#8F8F8F] border hover:border-[#8F8F8F] macbook:text-[16px] rounded-[6.5px]"
        >
          View All Areas
        </Link>
      </div>
    </div>
  );
};

export default PopularAreas;
