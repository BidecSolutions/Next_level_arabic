
"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./ManagementCycleSlider.css";
import Image from "next/image";
import { Image_NotFound, Image_URL } from "@/config/constants";

export default function PropertyManagementCycle({ propData }) {
//   const [data, setData] = useState(propData || {});

//   useEffect(() => {
//     console.log("PropertyManagementCycle propData -->", propData);
//   }, [propData]);

  const data = propData || {};
  console.log(data,'datass')

  // Only use API data
  const displayData =
    data?.managementCycleImages && data.managementCycleImages.length > 0
      ? (() => {
          try {
            return JSON.parse(data.managementCycleImages);
          } catch (err) {
            console.error("Error parsing managementCycleImages:", err);
            return [];
          }
        })()
      : [];

  // Don't render if no API data
//   if (!displayData.length) return null;

  console.log("management Cycle Images Details", displayData);

  return (
    // <div className="relative w-full py-10 md:py-24">
    //   <h3 className="text-center font-newsLetter text-[#8F8F8F] uppercase text-[17px] md:text-[34px] my-8 pb-4">
    //     {data.management_cycle_heading || "Property Management Cycle"}
    //   </h3>

    //   <div className="flex justify-center w-full">
    //     <div className="w-[100%] lg:w-[90%] macbook:max-w-screen-2xl">
    //       <Swiper
    //         modules={[Navigation, Pagination, Autoplay]}
    //         spaceBetween={30}
    //         slidesPerView={1}
    //         breakpoints={{
    //           1524: { slidesPerView: 5, spaceBetween: 10 },
    //           1024: { slidesPerView: 5, spaceBetween: 20 },
    //           768: { slidesPerView: 5, spaceBetween: 15 },
    //           640: { slidesPerView: 2, spaceBetween: 5 },
    //           0: { slidesPerView: 2, spaceBetween: 8 },
    //         }}
    //         navigation={{
    //           nextEl: ".cycle-custom-next",
    //           prevEl: ".cycle-custom-prev",
    //         }}
    //         pagination={{ clickable: true, el: ".swiper-pagination" }}
    //         autoplay={{ delay: 2500, disableOnInteraction: false }}
    //         loop={true}
    //       >
    //         {displayData.map((slide, index) => (
    //           <SwiperSlide
    //             key={index}
    //             className="bg-gray-100 rounded-lg overflow-hidden shadow-lg w-64 h-64"
    //           >
    //             <div className="relative w-full h-[200px]">
    //               <img
    //                 src={slide.image ? `${Image_URL}${slide.image}` : slide.image}
    //                 alt={slide.alt || slide.title}
    //                 className="w-full h-full object-cover"
    //                 onError={(e) => {
    //                   e.currentTarget.src = Image_NotFound;
    //                 }}
    //               />
    //               <div className="absolute inset-0 bg-black bg-opacity-50"></div>
    //               <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
    //                 <p className="text-[13px] md:text-xl font-bold font-montserrat">
    //                   0{index + 1}
    //                 </p>
    //                 <p className="font-montserrat text-[10px] md:text-[16px]">
    //                   {slide.heading || slide.title}
    //                 </p>
    //               </div>
    //             </div>
    //           </SwiperSlide>
    //         ))}
    //       </Swiper>
    //     </div>
    //   </div>

    //   {/* Custom navigation buttons */}
    //   <div className="absolute z-10 w-full hidden lg:block">
    //     <div
    //       className="cycle-custom-prev swiper-button-prev px-4"
    //       style={{ color: "red", top: "-120px", left: "0px", width: "1rem" }}
    //     ></div>
    //     <div
    //       className="cycle-custom-next swiper-button-next px-4"
    //       style={{ color: "red", top: "-120px", right: "6px", width: "1rem" }}
    //     ></div>
    //   </div>
    // </div>
    //     <>
    //   <div className="relative w-full py-10 md:py-24    ">
    //     <h3 className="text-center font-newsLetter text-[#8F8F8F] uppercase text-[17px] md:text-[34px] my-8 pb-4">
    //       {data.management_cycle_heading
    //         ? data.management_cycle_heading
    //         : "Property Management Cycle"}
    //     </h3>
    //     <div className="flex justify-center w-full">
    //       <div className="w-[100%] lg:w-[90%] macbook:max-w-screen-2xl">
    //         <Swiper
    //           modules={[Navigation, Pagination, Autoplay]}
    //           spaceBetween={30}
    //           slidesPerView={1}
    //           breakpoints={{
    //             1524: { slidesPerView: 5, spaceBetween: 10 }, // Desktop
    //             1024: { slidesPerView: 5, spaceBetween: 20 },
    //             768: { slidesPerView: 5, spaceBetween: 15 },
    //             640: { slidesPerView: 2, spaceBetween: 5 },
    //             0: { slidesPerView: 2, spaceBetween: 8 },
    //           }}
    //           navigation={{
    //             nextEl: ".cycle-custom-next",
    //             prevEl: ".cycle-custom-prev",
    //           }}
    //           pagination={{ clickable: true, el: ".swiper-pagination" }}
    //           autoplay={{ delay: 2500, disableOnInteraction: false }}
    //           loop={true}
    //         >
    //           {/* {slides?.map((slide, index) => (
    //             <SwiperSlide
    //               key={index}
    //               className="bg-gray-100 rounded-lg overflow-hidden shadow-lg w-64 h-64"
    //             >
    //               <div className="relative w-full h-[200px]">
    //                 <img
    //                   src={slide?.image}
    //                   alt={slide?.title}
    //                   className="w-full h-full object-cover"
    //                 />
    //                 <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 text-white">
    //                   <p className="  text-[13px]   md:text-xl font-bold  font-montserrat ">
    //                     {slide?.number}
    //                   </p>
    //                   <p className="font-montserrat  text-[10px]  md:text-[16px] ">
    //                     {" "}
    //                     {slide.title}
    //                   </p>
    //                 </div>
    //               </div>
    //             </SwiperSlide>
    //           ))} */}
    //           {displayData?.map((slide, index) => (
    //             <SwiperSlide
    //               key={index}
    //               className="bg-gray-100 rounded-lg overflow-hidden shadow-lg w-64 h-64"
    //             >
    //               <div className="relative w-full h-[200px]">
    //                 {/* Slide Image */}
    //                 {console.log('check',slide.image)}
    //                <Image
    //                 src={slide.image ? `${Image_URL}${slide.image}` : Image_NotFound}
    //                 alt={slide.alt || slide.title || `Step ${index + 1}`}
    //                 className="object-cover"
    //                 fill
    //                 onError={(e) => {
    //                   e.currentTarget.src = Image_NotFound;
    //                 }}
    //               />
    //                 {/* <div className="absolute inset-0 bg-black bg-opacity-50"></div> */}
    //                 {/* Text Box */}
    //                 <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
    //                   <p className="text-[13px] md:text-xl font-bold font-montserrat">
    //                     0{index + 1}
    //                   </p>
    //                   <p className="font-montserrat text-[10px] md:text-[16px]">
    //                     {slide?.heading || slide.title}
    //                   </p>
    //                 </div>
    //               </div>
    //             </SwiperSlide>
    //           ))}
    //         </Swiper>
    //       </div>
    //     </div>
    //     {/* Custom navigation buttons */}
    //     <div className="absolute z-10 w-full hidden lg:block">
    //       <div
    //         className="cycle-custom-prev swiper-button-prev px-4"
    //         style={{
    //           color: "red",

    //           top: "-120px",
    //           left: "0px",
    //           width: "1rem",
    //         }}
    //       ></div>
    //       <div
    //         className="cycle-custom-next swiper-button-next px-4"
    //         style={{
    //           color: "red",

    //           top: "-120px",
    //           right: "6px",
    //           width: "1rem",
    //         }}
    //       ></div>
    //     </div>
    //   </div>
    // </>
        <>
      <div className="relative w-full py-10 md:py-24    ">
        <h3 className="text-center font-newsLetter text-[#8F8F8F] uppercase text-[17px] md:text-[34px] my-8 pb-4">
          {data.management_cycle_heading
            ? data.management_cycle_heading
            : "دورة إدارة الممتلكات"}
        </h3>
        <div className="flex justify-center w-full">
          <div className="w-[100%] lg:w-[90%] macbook:max-w-screen-2xl">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{
                1524: { slidesPerView: 5, spaceBetween: 10 }, // Desktop
                1024: { slidesPerView: 5, spaceBetween: 20 },
                768: { slidesPerView: 5, spaceBetween: 15 },
                640: { slidesPerView: 2, spaceBetween: 5 },
                0: { slidesPerView: 2, spaceBetween: 8 },
              }}
              navigation={{
                nextEl: ".cycle-custom-next",
                prevEl: ".cycle-custom-prev",
              }}
              pagination={{ clickable: true, el: ".swiper-pagination" }}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              loop={true}
            >
              {/* {slides?.map((slide, index) => (
                <SwiperSlide
                  key={index}
                  className="bg-gray-100 rounded-lg overflow-hidden shadow-lg w-64 h-64"
                >
                  <div className="relative w-full h-[200px]">
                    <img
                      src={slide?.image}
                      alt={slide?.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 text-white">
                      <p className="  text-[13px]   md:text-xl font-bold  font-montserrat ">
                        {slide?.number}
                      </p>
                      <p className="font-montserrat  text-[10px]  md:text-[16px] ">
                        {" "}
                        {slide.title}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))} */}
              {displayData?.map((slide, index) => (
                <SwiperSlide
                  key={index}
                  className="bg-gray-100 rounded-lg overflow-hidden shadow-lg w-64 h-64"
                >
                  <div className="relative w-full h-[200px]">
                    {/* Slide Image */}
                    <img
                      src={`${Image_URL}${slide.image}` || slide.image}
                      alt={slide.alt || slide.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = Image_NotFound; // Path to your dummy image
                      }}
                    />
                    {/* <div className="absolute inset-0 bg-black bg-opacity-50"></div> */}
                    {/* Text Box */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <p className="text-[13px] md:text-xl font-bold font-montserrat">
                        0{index + 1}
                      </p>
                      <p className="font-montserrat text-[10px] md:text-[16px]">
                        {slide?.heading || slide.title}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        {/* Custom navigation buttons */}
        <div className="absolute z-10 w-full hidden lg:block">
          <div
            className="cycle-custom-prev swiper-button-prev px-4"
            style={{
              color: "red",

              top: "-120px",
              left: "0px",
              width: "1rem",
            }}
          ></div>
          <div
            className="cycle-custom-next swiper-button-next px-4"
            style={{
              color: "red",

              top: "-120px",
              right: "6px",
              width: "1rem",
            }}
          ></div>
        </div>
      </div>
    </>
  );
}
