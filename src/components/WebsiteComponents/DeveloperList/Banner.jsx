"use client";

import { GoSearch } from "react-icons/go";
import { useRouter } from "next/navigation";
import { Image_URL } from "@/config/constants";

export default function Banner({ searchTerm, setSearchTerm, handleSearch, page }) {
  const router = useRouter();

  return (
    <div className="flex justify-center text-white">
      <div
        className="relative h-[34rem] md:h-[600px] w-[90%] md:w-[95%] md:pt-[140px] bg-cover bg-center rounded-bl-[50px] rounded-br-[50px] md:rounded-bl-[90px] gap-[10px] md:rounded-br-[90px] flex flex-col items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${
            page?.banner_image
              ? `${Image_URL}${page.banner_image}`
              : "/Areas/banner.png"
          })`,
        }}
      >
        <h1 className="text-2xl md:text-5xl text-center font-newsLetter">
          {page?.banner_heading
            ? page.banner_heading
            : "Top Real Estate Developers in Dubai & The UAE"}
        </h1>

        <div
          className="absolute -bottom-6 md:p-[20px] md:-bottom-4 w-[300px] md:w-1/2 macbook:w-[680px] h-20 bg-white rounded-lg flex justify-center items-center"
          style={{ boxShadow: "0px 4px 41.8px 0px #0000001A" }}
        >
          <input
            type="text"
            className="p-3 border-2 text-[12px] md:text-[14px] font-montserrat border-[#8F8F8F] outline-none w-[220px] md:w-full text-black rounded-l-md"
            placeholder="Search developers in Dubai"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div
            className="bg-[#8F8F8F] px-4 py-[12px] rounded-r-md cursor-pointer"
            onClick={handleSearch}
          >
            <GoSearch size={24} />
          </div>
        </div>
      </div>
    </div>
  );
}
