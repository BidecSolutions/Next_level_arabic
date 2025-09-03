"use client";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "./PropertyServicesSlider.css";

export default function PropertyServicesSlider({ propData }) {
    // Fallback services
 const services = [
  { img: "property/landlordIcon-1.png", name: "الاحترافية" },
  { img: "property/landlordIcon-2.png", name: "الحفاظ على العقارات في أيدٍ أمينة" },
  { img: "property/landlordIcon-3.png", name: "تحديد السعر المناسب للعقار" },
  { img: "property/landlordIcon-4.png", name: "إجراء فحص المستأجرين" },
  { img: "property/landlordIcon-5.png", name: "دخل سلبي بدون عناء" },
  { img: "property/landlordIcon-6.png", name: "الحفاظ على المستأجرين" },
];

    // Use propData if provided, otherwise fallback to empty object
    const data = propData || {};

    // Determine which data to display
    const displayData =
        data?.exclusive_list_of_nlre_details?.length > 0
            ? JSON.parse(data.exclusive_list_of_nlre_details)
            : services;

    return (
        // <div className="flex flex-col items-center md:pt-20">
        //   {/* Heading */}
        //   <h4 className="text-[#8F8F8F] text-center font-newsLetter text-[17px] md:text-[34px] mt-4 mb-6">
        //     {data?.exclusive_list_heading ||
        //       "EXCLUSIVE LIST OF NLRE PROPERTY MANAGEMENT SERVICES"}
        //   </h4>

        //   <div className="relative w-full max-w-full mt-4 h-[200px] overflow-hidden">
        //     <Swiper
        //       spaceBetween={10}
        //       slidesPerView={3}
        //       autoplay={{
        //         delay: 1500,
        //         disableOnInteraction: false,
        //       }}
        //       breakpoints={{
        //         1024: { slidesPerView: 4, spaceBetween: 0 },
        //         768: { slidesPerView: 3, spaceBetween: 10 },
        //         640: { slidesPerView: 1.5, spaceBetween: 10 },
        //         0: { slidesPerView: 1.1, spaceBetween: 8 },
        //       }}
        //       pagination={{ clickable: true }}
        //       modules={[Pagination, Navigation, Autoplay]}
        //       loop={true}
        //       className="md:w-[80%] macbook:w-[80%]"
        //     >
        //       {displayData.map((service, index) => (
        //         <SwiperSlide key={index}>
        //           <div className="bg-[#8F8F8F] flex items-center justify-center text-white md:w-[300px] rounded-lg p-4 h-[78px] macbook:w-[450px] macbook:h-[120px] macbook:text-[18px] text-center mx-2">
        //             <p className="font-montserrat text-[13px]">
        //               {service.description?.length > 15
        //                 ? `${service.description.slice(0, 50)}...`
        //                 : service.title || service.name}
        //             </p>
        //           </div>
        //         </SwiperSlide>
        //       ))}
        //     </Swiper>
        //   </div>

        //   <div className="swiper-pagination mt-4 sta"></div>
        // </div>
        <div className="flex flex-col items-center   md:pt-20   ">
            {/* Heading */}
            <h4 className="text-[#8F8F8F] text-center font-newsLetter text-[17px] md:text-[34px] mt-4 mb-6">
                {data
                    ? data?.exclusive_list_heading
                    : "قائمة حصرية لخدمات إدارة الممتلكات من NLRE"}
            </h4>

            <div className="relative w-full max-w-full mt-4 h-[200px] overflow-hidden">
                <Swiper
                    spaceBetween={10}
                    slidesPerView={3}
                    autoplay={{
                        delay: 1500, // Delay between slides in milliseconds
                        disableOnInteraction: false, // Autoplay will not stop after user interaction
                    }}
                    breakpoints={{
                        1024: { slidesPerView: 4, spaceBetween: 0 },
                        768: { slidesPerView: 3, spaceBetween: 10 },
                        640: { slidesPerView: 1.5, spaceBetween: 10 },
                        0: { slidesPerView: 1.1, spaceBetween: 8 },
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination, Navigation, Autoplay]}
                    loop={true}
                    className="  md:w-[80%] macbook:w-[80%] "
                >
                    {/* Map over services array to create slides */}
                    {displayData.map((service, index) => (
                        <SwiperSlide key={index}>
                            <div className="bg-[#8F8F8F] flex items-center justify-center text-white md:w-[200px] rounded-lg p-4 h-[78px] macbook:w-[450px] macbook:h-[120px] macbook:text-[18px] text-center mx-2">
                                <p className="font-montserrat text-[13px]">
                                    {service.description?.length > 15
                                        ? `${service.description.slice(0, 50)}...`
                                        : service.title || service.name}
                                </p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Custom Pagination Styles */}
            <div className="swiper-pagination mt-4  sta "></div>
        </div>
    );
}
