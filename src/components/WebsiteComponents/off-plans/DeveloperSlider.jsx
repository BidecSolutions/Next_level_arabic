
"use client";

import { useState, useEffect } from "react";
import { Image_NotFound, Image_URL } from "@/config/constants";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { fetchDevelopers } from "@/lib/api/offplan.server";

const DeveloperSlider = () => {
    const [developers, setDevelopers] = useState([]);
    const pathname = usePathname();

    useEffect(() => {
        fetchDevelopers().then(setDevelopers);
    }, [pathname]);

    return (
        <div className="flex flex-col items-center justify-center w-full md:my-24">
            <h3 className="text-center text-[#8F8F8F] font-newsLetter text-2xl md:text-[34px] macbook:text-[48px] font-bold uppercase">
                UAE Top Real Estate Developers
            </h3>
            {developers.length === 0 && (
                <p className="text-center text-[25px] font-montserrat w-full flex justify-center text-[#8F8F8F]">
                    No Developer available
                </p>
            )}
            <div className="w-full md:max-w-[1100px] macbook:max-w-full mt-[25px] hauto mx-auto px-4 py-10">
                <Swiper
                    modules={[Autoplay]}
                    slidesPerView={5}
                    spaceBetween={30}
                    loop={true}
                    autoplay={{
                        delay: 1500,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: false,
                    }}
                    breakpoints={{
                        1024: { slidesPerView: 7, spaceBetween: 30 },
                        768: { slidesPerView: 3, spaceBetween: 30 },
                        640: { slidesPerView: 2, spaceBetween: 10 },
                        0: { slidesPerView: 2, spaceBetween: 8 },
                    }}
                    className="mySwiper"
                >
                    {developers.map((developer, index) => (
                        <SwiperSlide key={index}>
                            <div className="flex flex-col items-center text-center">
                                <Link href={`/developer/${developer?.slug}`}>
                                    <img
                                        src={`${Image_URL}${developer?.logo_image}`}
                                        alt={developer?.name}
                                        className="w-[116px] md:w-[440px] object-contain"
                                        onError={(e) => {
                                            e.currentTarget.src = Image_NotFound;
                                        }}
                                    />
                                </Link>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <button
                type="button"
                className="bg-[#8F8F8F] w-[150px] text-white py-3 macbook:text-[18px] px-4 rounded-lg hover:bg-transparent hover:text-[#8F8F8F] border hover:border-[#8F8F8F] transition"
            >
                <Link href="/developers/" className="font-montserrat">
                    View More
                </Link>
            </button>
        </div>
    );
};

export default DeveloperSlider;
