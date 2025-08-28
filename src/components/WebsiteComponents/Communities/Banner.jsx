    "use client";

import { useState, useEffect } from "react";
import { Image_NotFound, Image_URL } from "@/config/constants";
import { GoSearch } from "react-icons/go";
import { usePathname } from "next/navigation";
import { fetchBannerData } from "@/lib/api/communities.server";
// import { Image_Url } from "@/Utils/const";
// import { fetchBannerData } from "@/services/banner"; // New import

export default function Banner({ initialSearchTerm = "", data }) {
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  // useEffect(() => {
  //   const slug = pathname?.split("/").pop();
  //   fetchBannerData(slug).then((bannerData) => {
  //     setData(bannerData);
  //   });
  // }, [pathname]);

  const handleSearch = () => {
    console.log("Searching for:", searchTerm);
    // router.push('/search?query=' + searchTerm)
  };

  return (
    <div className="flex justify-center text-white">
      <div
        className="relative h-[34rem] md:h-[600px] w-[90%] md:w-[95%] md:pt-[140px] bg-cover bg-center rounded-bl-[50px] rounded-br-[50px] md:rounded-bl-[90px] gap-[10px] md:rounded-br-[90px] flex flex-col items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${
            data?.banner_image
              ? `${Image_URL}${data.banner_image}`
              : "/Areas/banner.png"
          })`,
        }}
      >
        <h1 className="text-2xl md:text-7xl macbook:text-8xl font-newsLetter">
          {data?.banner_title || "Our Communities"}
        </h1>

        <div className="absolute p-4 -bottom-6 md:bottom-0 w-[300px] md:w-1/2 h-16 bg-white rounded-lg flex justify-center items-center">
          <input
            type="text"
            className="p-3 border-2 text-[11px] md:text-[15px] font-montserrat border-[#8F8F8F] outline-none w-[220px] md:w-full text-black rounded-l-md"
            placeholder="Search Communities in Dubai"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div
            className="bg-[#8F8F8F] px-4 py-[10px] md:py-[12px] rounded-r-md cursor-pointer"
            onClick={handleSearch}
          >
            <GoSearch size={24} />
          </div>
        </div>
      </div>
    </div>
  );
}
