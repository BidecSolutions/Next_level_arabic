"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Image_NotFound, Image_URL } from "@/config/constants";
import { getAreas } from "@/lib/api/areas.server";
import { Loader } from "../Loader";
// import CustomSeo from "../CustomSeo";

export const AreaList = ({ searchTerm }) => {
    const [areas, setAreas] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [visibleCount, setVisibleCount] = useState(8); // For "Load More"

    // useEffect(() => {
    //     const fetchData = async () => {
    //         setIsLoading(true);
    //         try {
    //             const response = await axios.public.get("user/areas");
    //             const filteredProperties = response.data.data.filter(
    //                 (property) => property.status === 1
    //             );
    //             setAreas(filteredProperties);
    //         } catch (error) {
    //             console.error("Categories Page Error:", error);
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     };
    //     fetchData();
    // }, []);

     useEffect(() => {
    const fetchAreas = async () => {
      setIsLoading(true);
      const data = await getAreas();
      setAreas(data);
      setIsLoading(false);
    };
    fetchAreas();
  }, []);
    const filteredAreas = areas.filter((area) =>
        area.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const loadMore = () => {
        setVisibleCount((prevCount) => prevCount + 8);
    };

    if (isLoading) return <Loader />;

    return (
        <div className="pt-12 md:pt-24 md:py-24 macbook:mt-24 w-full flex flex-wrap justify-center items-center gap-2 macbook:gap-[20px]">
            {/* <CustomSeo id={5} /> */}

            <div className="flex flex-wrap w-full md:w-[95%] md:gap-[10px] gap-x-[5px] macbook:w-[95%] justify-center gap-y-[20px]">
                {filteredAreas.length > 0 ? (
                    filteredAreas.slice(0, visibleCount).map((property, index) => (
                        <div
                            key={index}
                            className="bg-white w-[180px] md:w-[310px] relative cursor-pointer macbook:w-[400px] border-2 border-[#5555] px-[5px] p-2 rounded-[10px] md:rounded-[13px] overflow-hidden flex flex-col items-center"
                        >
                            <img
                                src={`${Image_URL}${property.image_path}`}
                                alt={property.name}
                                className="md:w-full w-[173px] h-[159px] md:h-[250px] object-cover"
                                onError={(e) => {
                                    e.currentTarget.src = Image_NotFound;
                                }}
                            />

                            <div className="flex flex-col mb-2 justify-between w-full h-[65px] md:h-auto p-[5px] md:p-[10px] mt-2 pt-[0px]">
                                <h3 className="text-[12px] font-montserrat md:text-[18px] font-semibold mb-1 md:mb-2 text-[#8F8F8F]">
                                    {property.name}
                                </h3>
                                <div className="text-[#8F8F8F] mb-2 text-[11px] flex flex-col md:mb-4">
                                    <p className="text-[8px] font-montserrat md:text-[11px] text-[#8F8F8F]">
                                        Price From
                                        <span className="flex gap-1 ml-1 text-[11px] md:text-[16px] font-bold">
                                            AED {Math.floor(property.startingPrice)}{" "}
                                            <img
                                                src="/dirham.PNG"
                                                className="w-3.5 h-3 mt-1"
                                                alt="AED"
                                            />
                                        </span>
                                    </p>
                                </div>

                                <div className="flex justify-center absolute bottom-1 w-[90%] z-10 gap-1">
                                    <Link
                                        href={`/area/${property.slug}`}
                                        className="w-full md:p-4 font-montserrat text-[7px] md:text-[12px] py-1 md:py-2 bg-[#8F8F8F] text-white rounded-[5px] hover:border-[1px] border-[#8F8F8F] hover:text-[#8F8F8F] hover:bg-transparent text-center"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center font-montserrat text-gray-500 text-lg w-full py-10">
                        No areas available
                    </div>
                )}
            </div>

            {visibleCount < filteredAreas.length && (
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
};
