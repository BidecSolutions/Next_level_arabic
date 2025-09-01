"use client"; // Only if this is a client component in Next.js

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import axios from 'axios';
import { Image_NotFound, Image_URL } from "@/config/constants";
import { fetchLifeStyleProperties, fetchPropertyTypes } from "@/lib/api/home.server";

const LifeStyleSection = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [activeTab, setActiveTab] = useState();
  const [pType, setpType] = useState([]);
  const [properties, setProperties] = useState();



useEffect(() => {
  const getPropertyTypes = async () => {
    const propertyTypes = await fetchPropertyTypes();
    setpType(propertyTypes);
    console.log(propertyTypes,'property')
    if (propertyTypes.length > 0) {
      setActiveTab(3);
    }
  };
  getPropertyTypes();
}, [pathname]);

useEffect(() => {
  if (activeTab) {
    const getProperties = async () => {
      const props = await fetchLifeStyleProperties(activeTab);
      setProperties(props);
    };
    getProperties();
  }
}, [activeTab]);
  const handleTabClick = (type) => {
    setActiveTab(type);
  };

  return (
    <div className="w-full my-12 md:my-20 flex md:justify-center flex-col items-center">
      <h3 className="text-center font-newsLetter font-semibold uppercase text-[#8F8F8F] macbook:text-[48px] text-[18px] md:text-[34px] md:w-full mb-8">
        التنقل بين الخصائص حسب النوع
      </h3>

      {/* Tabs */}
      <div className="flex justify-center mb-8">
        {pType
          .filter((type) => [1, 2, 3].includes(type.id))
          .map((type) => (
            <button
              key={type.id}
              className={`px-4 text-[8px] md:text-[11px] font-montserrat py-2 font-light mx-2 rounded w-20 md:w-24 ${
                activeTab === type.id
                  ? "bg-white text-[#8F8F8F] border border-[#8F8F8F] shadow-md"
                  : "bg-[#8F8F8F] text-white shadow-lg"
              }`}
              onClick={() => handleTabClick(type.id)}
            >
              <div>{type.name}</div>
            </button>
          ))}
      </div>

      {properties?.length === 0 ? (
        <p className="text-center text-[16px] md:text-[20px] mt-6 font-montserrat w-full flex justify-center text-gray-500">
          لا يوجد عقار متاح في هذه اللحظة
        </p>
      ) : (
        <>
          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-2 md:grid-cols-3 macbook:grid-cols-3 gap-[20px] mb-8 mt-8">
            {properties?.slice(0, 7).map((property, index) => (
              <div
                key={index}
                className={`bg-white w-full border border-[#0B0B0B] px-[10px] rounded-[13px] overflow-hidden flex flex-col items-center ${
                  index === 4 ? "hidden md:hidden macbook:flex" : ""
                }`}
              >
                <img
                  src={
                    property?.meadias[0]?.main_image
                      ? `${Image_URL}/${JSON.parse(property.meadias[0].main_image)[0]}`
                      : "/home/p2.png"
                  }
                  alt={property?.property?.property_name}
                  loading="lazy"
                  className={`m-2 w-full h-36 md:h-48 object-cover ${
                    index === 0 || index === 3
                      ? "md:rounded-bl-[74px]"
                      : index === 2 || index === 6
                      ? "rounded-br-[74px]"
                      : ""
                  }`}
                />
                <div className="flex flex-col justify-between items-center min-h-[210px] w-full p-[10px] pt-0">
                  <h3 className="text-[11px] font-montserrat md:text-[17px] text-center font-semibold mb-2 text-[#8F8F8F]">
                    {property?.property_name.substring(0, 20)}
                  </h3>
                  <div className="text-gray-500 text-[11px] flex flex-col items-center mb-4">
                    <p className="text-[9px] font-montserrat md:text-[15px]">
                      ابتداء من
                    </p>
                    <p className="flex gap-1 text-[9px] font-montserrat md:text-[18px] font-bold text-[#8F8F8F]">
                      {property?.starting_price}{" "}
                      <img
                        src="/dirham.PNG"
                        className="w-4 h-3.5 mt-1.5"
                        alt="AED"
                      />
                    </p>
                  </div>
                  <div className="flex justify-evenly mt-2 mb-2 w-full md:w-[80%] text-sm text-gray-500">
                    <div className="flex items-center gap-2 pr-[10px] border-r border-gray-300">
                      <img src="/bed.png" alt="bed" className="w-[9px]" />
                      <span className="text-[8px] md:text-xs">
                        {property?.no_of_bedrooms}
                      </span>
                    </div>
                    <div className="flex items-center ml-[5px] gap-2">
                      <img src="/feet.png" alt="sqft" className="w-[9px]" />
                      <span className="text-[7px] md:text-xs">
                        {property?.land_area}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      router.push(`/property/${property.slug}`)
                    }
                    className="w-[100px] md:w-[202px] text-[11px] my-1 py-1 bg-[#8F8F8F] text-white rounded-[5px] hover:bg-transparent hover:text-[#8F8F8F] border hover:border-[#8F8F8F]"
                  >
                    عرض المزيد من التفاصيل
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Swiper */}
          <div className="block md:hidden w-[320px] h-[378px]">
            <Swiper
              spaceBetween={20}
              slidesPerView={1}
              centeredSlides
              pagination={{ clickable: true }}
              loop
              autoplay={{ delay: 1500, disableOnInteraction: false }}
            >
              {properties?.map((property) => (
                <SwiperSlide key={property?.id}>
                  <div className="bg-white border border-black w-[300px] h-[370px] p-3 rounded-[13px] overflow-hidden">
                    <img
                      src={
                        property?.meadias[0]?.main_image
                          ? `${Image_URL}/${JSON.parse(property.meadias[0].main_image)[0]}`
                          : "/home/p2.png"
                      }
                      alt={property?.property_name}
                      loading="lazy"
                      className="w-full h-[159px] object-cover"
                      onError={(e) => (e.currentTarget.src = Image_NotFound)}
                    />
                    <div className="flex flex-col justify-between min-h-[160px] text-center py-3">
                      <h3 className="text-[20px] font-montserrat font-semibold mb-2 text-[#8F8F8F]">
                        {property?.property_name.substring(0, 20)}
                      </h3>
                      <p className="text-[16px] text-[#8F8F8F]">
                        ابتداء من
                      </p>
                      <p className="flex gap-1 text-[14px] font-bold text-[#8F8F8F] mb-2">
                        {property?.starting_price}{" "}
                        <img
                          src="/dirham.PNG"
                          className="w-5 h-4 mt-1"
                          alt="AED"
                        />
                      </p>
                      <div className="flex flex-col items-center text-sm text-[#8F8F8F]">
                        <div className="flex items-center gap-1">
                          <img src="/bed.png" alt="bed" className="w-[10px]" />
                          <span className="text-[10px]">
                            {property?.no_of_bedrooms}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <img src="/feet.png" alt="sqft" className="w-[10px]" />
                          <span className="text-[10px]">
                            {property?.land_area}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        router.push(`/property/${property.slug}`)
                      }
                      className="w-[275px] text-[10px] my-1 py-1 bg-[#8F8F8F] text-white rounded-[5px] hover:bg-transparent hover:text-[#8F8F8F] border hover:border-[#8F8F8F]"
                    >
                      عرض المزيد من التفاصيل
                    </button>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </>
      )}

      {/* See All Properties */}
      <div className="text-center mt-[20px]">
        {properties?.length > 0 && (
          <Link href="/off-plan">
            <button className="block font-montserrat text-[12px] md:text-[16px] px-4 py-2 bg-[#8F8F8F] text-white rounded-[8px] hover:bg-transparent hover:text-[#8F8F8F] border hover:border-[#8F8F8F]">
              شاهد جميع العقارات
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default LifeStyleSection;
