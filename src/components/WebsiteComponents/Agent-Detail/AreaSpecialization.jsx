"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
// import { Link } from "react-router-dom";
// import { fetchAreaSpecialization } from "@/lib/api/agent.server";
// import { Image_NotFound, Image_Url } from "@/utils/const";
import { Image_NotFound, Image_URL } from "@/config/constants";
import { fetchAreaSpecialization } from "@/lib/api/agent.server";

const AreaSpecialization = ({ heading, data }) => {
  const [visibleCount, setVisibleCount] = useState(6);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!data?.id) return;

    const getSpecialization = async () => {
      setLoading(true);
      const res = await fetchAreaSpecialization(data.id);

      if (res.success) {
        setProperties(res.data);
      }
      setLoading(false);
    };

    getSpecialization();
  }, [data]);

  const loadMore = () => setVisibleCount((prev) => prev + 6);

  return (
    <div className="flex flex-col items-center my-20">
      <div>
        <h3 className="text-2xl md:text-[40px] text-[#8F8F8F] font-newsLetter">
          {heading ? heading : "Areas of Specialization"}
        </h3>
      </div>

      <div className="pt-12 md:pt-20 md:p-24 flex flex-wrap justify-center items-center gap-4">
        {properties.length === 0 && !loading && (
          <div className="text-center text-xl font-montserrat">
            No Areas found
          </div>
        )}

        {properties.slice(0, visibleCount).map((property, index) => (
          <div
            key={index}
            className="bg-white md:w-[350px] border border-black px-[5px] p-2 rounded-[13px] overflow-hidden flex flex-col items-center"
          >
            <img
              src={`${Image_URL}${property?.image_path}`}
              alt={property?.name}
              className="md:w-[340px] w-[173px] h-[159px] md:h-[250px] object-cover rounded"
              onError={(e) => (e.currentTarget.src = Image_NotFound)}
            />
            <div className="flex flex-col mt-4 w-full p-[10px] pt-[0px]">
              <h3 className="text-[12px] md:text-[18px] font-semibold mb-1 md:mb-2 text-[#8F8F8F]">
                {property?.name}
              </h3>
              <div className="text-[#8F8F8F] text-[11px] flex flex-col mb-1 md:mb-4">
                <div className="flex gap-1 text-xs md:text-md text-[#8F8F8F]">
                  Price From:
                  <span className="flex gap-1 text-[16px] ml-[10px] font-bold">
                    <img src="/dirham.PNG" className="w-3 h-3 mt-0.5" />
                    {property?.startingPrice}
                  </span>
                </div>
              </div>

              <div className="flex justify-center gap-1">
                <button className="w-full md:p-4 font-montserrat text-[7px] md:text-[12px] py-1 md:py-2 bg-[#8F8F8F] text-white rounded-[5px] hover:border-[1px] border-[#8F8F8F] hover:text-[#8F8F8F] hover:bg-transparent">
<Link href={`/area/${property.slug}`}>View Details</Link>
                </button>
              </div>
            </div>
          </div>
        ))}

        {visibleCount < properties.length && (
          <div className="w-full flex justify-center items-center">
            <button
              onClick={loadMore}
              className="mt-8 py-2 px-4 border-2 border-[#8F8F8F] bg-[#8F8F8F] text-white rounded hover:text-[#8F8F8F] hover:bg-transparent"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AreaSpecialization;
