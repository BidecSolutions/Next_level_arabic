"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import Image from "next/image";

const PlatformSlider = () => {
  const reviews = [
    { rating: 4.6, platform: "تروستبايلوت", logo: "/trustpilot.png" },
    { rating: 4.7, platform: "جوجل", logo: "/google.png" },
    { rating: 5, platform: "مرحبا دبي", logo: "/HiDubai.png" },
    { rating: 5, platform: "قائمة الفرز", logo: "/sortlist.png" },
    { rating: 4.6, platform: "آخر", logo: "/star.png" },
    { rating: 5, platform: "شركات جيدة", logo: "/dil.png" },
  ];

  return (
    <div className="w-full md:w-[1100px] macbook:w-[1300px] mt-[25px] h-auto mx-auto my-12 md:my-20 px-4">
      <Swiper
        slidesPerView={4}
        spaceBetween={10}
        modules={[Autoplay]}
        breakpoints={{
          1024: { slidesPerView: 6, spaceBetween: 20 },
          768: { slidesPerView: 6, spaceBetween: 15 },
          640: { slidesPerView: 2, spaceBetween: 10 },
          0: { slidesPerView: 2, spaceBetween: 8 },
        }}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        loop={true}
        className="mySwiper"
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col items-center text-center">
              <div className="flex flex-col">
                <p className="text-lg font-semibold">{review.rating}</p>
                <Image
                  src="/rating.png"
                  alt="Rating Stars"
                  width={94}
                  height={16}
                  className="mb-2"
                />
              </div>

              <Image
                src={review?.logo}
                alt={review.platform}
                width={116}
                height={50}
                className="w-[116px] h-[50px] object-contain"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PlatformSlider;
