"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Loader } from "../Loader";
import ParseBody from "../HomeComponents/ParseBody";
import { Image_NotFound, Image_URL } from "@/config/constants";

export default function DeveloperSection({ searchTerm, heading, description, developers }) {
//   const [developers, setDevelopers] = useState([]);
//   const [loading, setLoading] = useState(true);
  const pathname = usePathname();

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.public.get("user/developers");
//         if (response.data?.data) {
//           const filteredProperties = response.data.data.filter(
//             (property) => property.status === 1
//           );
//           setDevelopers(filteredProperties);
//         }
//       } catch (error) {
//         console.error("Error fetching developers data", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [pathname]);

  const filteredDeveloper = developers.filter((dev) =>
    dev.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [visibleCount, setVisibleCount] = useState(6);
  const loadMore = () => setVisibleCount((prevCount) => prevCount + 6);

//   if (loading) return <Loader />;

  return (
    <div className="px4 py-12 w-full">
      <div className="flex flex-col items-center">
        <h2 className="text-[#8F8F8F] text-center md:text-start font-newsLetter font-medium text-[30px] macbook:text-[40px] mb-2">
          {heading || "UAE Top Real Estate Developers"}
        </h2>
        <div className="w-[90%] text-center">
          {description ? (
            <ParseBody body={description} />
          ) : (
            <p className="text-center font-montserrat text-[15px] md:text-[17px] macbook:text-[24px] text-[#555555]">
              Discover UAE elite real estate developers, known for iconic
              projects and innovative designs that redefine luxury living and
              modern landscapes.
            </p>
          )}
        </div>
      </div>

      {filteredDeveloper.length > 0 ? (
        filteredDeveloper.slice(0, visibleCount).map((developer, index) => (
          <div
            key={index}
            className="flex flex-col lg:flex-row gap-[20px] md:gap-[5px] justify-between mt-16"
          >
            {/* Developer Info */}
            <div className="flex flex-col md:w-[50%] macbook:w-[40%] p-4 md:pl-[30px] md:items-start items-center gap-[10px]">
              <img
                src={`${Image_URL}${developer.logo_image || developer.image}`}
                alt={developer.name}
                className="h-16 w-auto macbook:h-28 object-contain"
                onError={(e) => {
                  e.currentTarget.src = Image_NotFound;
                }}
              />
              <h2 className="text-3xl font-newsLetter macbook:text-5xl text-center md:text-start md:text-4xl text-[#8F8F8F] font-medium mb-2">
                {developer.name}
              </h2>
              <div
                className="text-[15px] font-montserrat macbook:text-[20px] md:w-[600px] macbook:w-[1000px] text-center md:text-start leading-[27px]"
                dangerouslySetInnerHTML={{
                  __html: developer?.introduction?.substring(0, 200),
                }}
              />
              <Link
            href={`/developer/${developer.slug}`}
            className="px-6 font-montserrat w-[150px] macbook:text-[14px] py-2 bg-[#8F8F8F] text-white rounded-[6.5px] inline-block text-center"
          >
            Explore More
          </Link>
            </div>

            {/* Property Slider */}
            <div className="w-[100%] md:w-[50%] macbook:w-[50%]">
              <Swiper
                spaceBetween={16}
                slidesPerView={1}
                loop={true}
                breakpoints={{
                  320: { slidesPerView: 1.1 },
                  640: { slidesPerView: 1.2 },
                  768: { slidesPerView: 1.5 },
                  1024: { slidesPerView: 1.5 },
                }}
                modules={[Navigation, Pagination]}
              >
                {developer.property && developer.property.length > 0 ? (
                  developer.property
                    .filter((property) => property.status === 1)
                    .map((property, idx) => (
                      <SwiperSlide key={idx}>
                        <div className="relative rounded-lg overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <img
                            src={`${Image_URL}${
                              property?.meadias?.[0]?.main_image
                                ? JSON.parse(property.meadias[0].main_image)[0]
                                : ""
                            }`}
                            alt={property?.title || "Property Image"}
                            className="macbook:h-96 macbook:w-[1000px] w-[600px] h-60 sm:h-64 md:h-72 object-cover rounded-[15px]"
                            onError={(e) => {
                              e.currentTarget.src = Image_NotFound;
                            }}
                          />
                          <div className="absolute gap-[4px] inset-0 text-white p-4 flex flex-col justify-end">
                            <h3 className="text-[16px] capitalize font-montserrat md:text-[28px] macbook:text-[32px] font-bold">
                              {property?.property_name}
                            </h3>
                            <div
                              className="mb-2 w-[80%] font-montserrat text-[12px] macbook:text-[16px]"
                              dangerouslySetInnerHTML={{
                                __html:
                                  property?.property_description?.substring(
                                    0,
                                    50
                                  ) || "",
                              }}
                            />
                            <div className="flex justify-between mt-2">
                              <div>
                                <p className="text-[14px] capitalize font-montserrat md:text-[16px] macbook:text-[20px] font-medium">
                                  {property?.addresses?.address?.substring(
                                    0,
                                    30
                                  )}
                                </p>
                                <div className="flex gap-1 text-[11px] md:text-[14px] font-montserrat font-extralight macbook:text-md mb-4">
                                  {property?.land_area}
                                  <span className="ml-1 flex gap-1">
                                    <img
                                      src="/dirham_white.PNG"
                                      className="w-3 h-2.5 md:h-3 mt-0.5 md:mt-1"
                                    />
                                    {property?.starting_price || "N/A"}
                                  </span>
                                </div>
                              </div>
                              <Link href={`/property/${property.slug}`}>
                                <button className="px-2 py-1 md:px-4 text-[10px] md:text-[14px] md:py-2 bg-[#8F8F8F] text-white rounded-md">
                                  View Details
                                </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))
                ) : (
                  <SwiperSlide>
                    <div className="relative rounded-lg overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <img
                        src={Image_NotFound}
                        alt="Property Image"
                        className="macbook:h-96 macbook:w-[1000px] w-[600px] h-60 sm:h-64 md:h-72 object-cover rounded-[15px]"
                      />
                      <div className="absolute gap-[4px] inset-0 text-white p-4 flex flex-col justify-end">
                        <h3 className="text-[16px] capitalize font-montserrat md:text-[28px] macbook:text-[32px] font-bold">
                          No Property Found
                        </h3>
                      </div>
                    </div>
                  </SwiperSlide>
                )}
              </Swiper>
            </div>
          </div>
        ))
      ) : (
        <p className="text-[14px] text-center md:text-start mt-2 font-montserrat">
          No Developers available
        </p>
      )}

      {visibleCount < filteredDeveloper.length && (
        <div className="w-full flex justify-center items-center">
          <button
            onClick={loadMore}
            className="mt-8 py-2 px-4 border-2 border-[#8F8F8F] bg-[#8F8F8F] text-white rounded hover:text-[#8F8F8F] hover:bg-transparent text-center"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
