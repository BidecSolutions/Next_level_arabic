"use client";

import { GoSearch } from "react-icons/go";
import { Image_URL } from "@/config/constants";
import ParseBody from "../HomeComponents/ParseBody";

export const  Banner = ({ data, searchTerm, setSearchTerm, handleSearch }) => {
  return (
    <div className="flex justify-center text-white">
      <div
        className="relative h-[34rem] md:h-[600px] w-[90%] md:w-[95%] md:pt-[140px] bg-cover bg-center rounded-bl-[50px] rounded-br-[50px] md:rounded-bl-[90px] md:rounded-br-[90px] flex flex-col items-center justify-center gap-[10px]"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${
            data?.image_path
              ? `${Image_URL}${data?.image_path}`
              : "/Areas/banner.png"
          })`,
        }}
      >
        <h1 className="text-2xl md:text-7xl macbook:text-8xl font-newsLetter">
          {data?.banner_title || "وكلائنا"}
        </h1>

        <div className="text-sm md:text-lg font-montserrat">
          <ParseBody body={data?.banner_description} />
        </div>

        <div
          className="absolute -bottom-6 md:p-[20px] md:-bottom-4 w-[300px] md:w-1/2 macbook:w-[680px] h-20 bg-white rounded-lg flex justify-center items-center"
          style={{ boxShadow: "0px 4px 41.8px 0px #0000001A" }}
        >
          <input
            type="text"
            className="p-3 border-2 border-[#8F8F8F] font-montserrat outline-none w-[220px] md:w-full text-black rounded-l-md"
            placeholder="وكلاء البحث في دبي"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div
            className="bg-[#8F8F8F] px-4 font-montserrat py-[12px] rounded-r-md cursor-pointer"
            onClick={handleSearch}
          >
            <GoSearch size={24} />
          </div>
        </div>
      </div>
    </div>
  );
};
