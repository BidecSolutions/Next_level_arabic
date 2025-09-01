"use client";
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getPStatus, searchProperties } from "@/lib/api/home.server";
import { useFilters } from "@/lib/stores/useFilters";
// import axios from "@/lib/axios"; // apne Next.js axios path ke hisab se adjust karo

const Banner = () => {
  const [HomeFilters, setHomeFilters] = useState({
    activeTab: "عقارات خارج الخطة",
    propertyType: "",
    PropertyName: "",
    priceTypeOrSize: "",
  });
  const [pStatus, setpStatus] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();
  const { setFilters } = useFilters();

useEffect(() => {
  async function fetchStatus() {
    const statusList = await getPStatus();
    console.log('حالة', statusList)
    setpStatus(statusList);
  }
  fetchStatus();
}, []);

  const handleTabClick = (tab) => {
    setHomeFilters((prev) => ({ ...prev, activeTab: tab }));
  };

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setHomeFilters((prev) => ({ ...prev, [name]: value }));

    if (name === "PropertyName") {
      const results = await searchProperties(value);
      if (results.length) {
        setSuggestions(results);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }
  };

  const handleSubmit = () => {
      setFilters(HomeFilters);
    const path = HomeFilters.activeTab === "عقار جاهز" ? "/ready-properties" : "/off-plan";
    router.push(path);
  };

  return (
    <div className="relative mb-8 flex justify-center">
      <Image
        src="/banner.webp"
        alt="Property Banner"
        width={1920}
        height={1080}
        priority
        className="absolute inset-0 w-[90%] md:w-[95%] h-[34rem] md:h-screen macbook:h-[60vh] rounded-bl-[50px] rounded-br-[50px] md:rounded-bl-[90px] md:rounded-br-[90px] object-cover z-0 mx-auto"
      />

      <div className="relative z-10 w-[90%] md:w-[95%] h-[34rem] md:h-screen macbook:h-[60vh] pt-[100px] md:pt-[140px] flex flex-col items-center justify-center rounded-bl-[50px] rounded-br-[50px] md:rounded-bl-[90px] md:rounded-br-[90px] text-white text-center bg-black/10">
        <h1 className="font-newsLetter w-[80%] md:w-full md:text-[40px] text-[22px] font-semibold">
          شراء وبيع وتأجير العقارات في جميع أنحاء الإمارات العربية المتحدة
        </h1>

        <div className="flex gap-5 md:mt-4 my-4">
          {["عقارات خارج الخطة", "عقار جاهز"].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`py-2 px-4 text-[10px] md:text-[16px] h-[30px] w-[125px] md:h-[52px] md:w-[180px] rounded-[20px] md:rounded-[50px] font-montserrat ${
                HomeFilters.activeTab === tab
                  ? "bg-white text-[#8D7F76]"
                  : "bg-transparent text-white border border-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="flex md:flex-row md:justify-between flex-col items-center w-[300px] h-[80px] md:w-[841px] px-[5px] md:px-[20px] md:h-[70px] bg-white rounded-tl-[17px] md:rounded-tl-[50px] rounded-br-[17px] md:rounded-br-[50px] overflow-hidden"
        >
          <select
            name="propertyType"
            value={HomeFilters.propertyType}
            onChange={handleInputChange}
            className="w-full md:w-[10%] font-montserrat text-[#8D7F76] macbook:px-4 mr-[5px] pt-3 md:py-3 bg-transparent focus:outline-none"
          >
            {pStatus.map((tab) => (
              <option className="font-montserrat" value={tab?.id} key={tab.id}>
                {tab.name}
              </option>
            ))}
          </select>

          <div className="w-full h-[131px] md:h-[82px] justify-between items-center md:w-[820px] flex">
            <div className="relative w-full md:w-[40%]">
              <input
                type="text"
                name="PropertyName"
                value={HomeFilters.PropertyName}
                onChange={handleInputChange}
                placeholder="اسم العقار"
                className="font-montserrat md:text-[19px] w-full text-[#8D7F764D] text-[13px] pl-[10px] md:px-4 py-3 bg-transparent border-r border-gray-300 text-gray-600 focus:outline-none"
              />
            </div>

            <input
              type="text"
              name="priceTypeOrSize"
              value={HomeFilters.priceTypeOrSize}
              onChange={handleInputChange}
              placeholder="سعر العقار"
              className="w-[115px] font-montserrat md:w-[35%] md:text-[19px] text-[13px] text-[#8D7F764D] pl-[10px] md:px-4 py-3 bg-transparent text-gray-600 focus:outline-none"
            />

            <button
              type="submit"
              className="bg-[#8A7C72] text-white w-[28px] h-[28px] py-3 md:w-[55px] md:h-[53px] rounded-full flex justify-center items-center"
            >
              <CiSearch className="text-[white] text-[12px] md:text-[20px]" />
            </button>
          </div>
        </form>

        {showSuggestions && suggestions.length > 0 && (
          <ul className="absolute top-[70%] md:top-2/3 w-[80%] md:w-2/3 z-20 max-h-40 overflow-y-auto bg-white shadow-lg border border-gray-200 rounded-md">
            {suggestions.map((item) => (
              <li
                key={item.id}
                onClick={() => {
                  setHomeFilters((prev) => ({
                    ...prev,
                    PropertyName: item.title,
                  }));
                  setShowSuggestions(false);
                  if (item.type === "readyProperty") {
                    router.push(`/ready-property/${item?.slug}`);
                  } else if (item.type === "offPlan") {
                    router.push(`/property/${item?.slug}`);
                  }
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-left text-black text-sm"
              >
                {item.title}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6">
          <p className="text-[14px] md:text-[20px] font-montserrat w-64 md:w-96">
           مرحباً بكم في وكالة العقارات الإماراتية الحائزة على جوائز
          </p>
          <Link href="/contact">
            <button className="mt-4 bg-white hover:bg-transparent hover:text-white border border-white text-[#8D7F76] text-[10px] md:text-[16px] h-[30px] w-[100px] md:h-[52px] md:w-[160px] rounded-[20px] md:rounded-[50px] font-montserrat">
             اتصل بنا
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
