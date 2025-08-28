"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Image_NotFound, Image_URL } from "@/config/constants";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./AwardsSlider.css";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { fetchAwardsData } from "@/lib/api/home.server";

const AwardsSlider = () => {
  const [awards, setAwards] = useState([]);
  const [swiperKey, setSwiperKey] = useState(0);

//   useEffect(() => {
//     const fetchAwards = async () => {
//       try {
//         const res = await axios.public.get("user/winning-awards/popular_winning_awards");
//         const filtered = res.data.data.filter((award) => award.status === 1);
//         setAwards(filtered);
//         setSwiperKey((prev) => prev + 1);
//       } catch (error) {
//         console.error("Awards fetch error:", error);
//       }
//     };

//     fetchAwards();
//   }, []);

  useEffect(() => {
    const getAwards = async () => {
      const data = await fetchAwardsData();
      setAwards(data);
      setSwiperKey((prev) => prev + 1);
    };

    getAwards();
  }, []);
  return (
    <div className="my-12 md:my-20">
      <h3 className="text-center font-newsLetter uppercase text-[25px] md:text-4xl macbook:text-[48px] text-[#8F8F8F] font-semibold mb-8">
        Our Winning Awards
      </h3>

      <div className="relative">
        <Swiper
          key={swiperKey}
          modules={[Pagination, Navigation, Autoplay]}
          spaceBetween={15}
          slidesPerView={1.5}
          centeredSlides={true}
          breakpoints={{
            1524: { slidesPerView: 3, spaceBetween: 1 },
            1024: { slidesPerView: 3, spaceBetween: 15 },
            768: { slidesPerView: 3, spaceBetween: 15 },
            640: { slidesPerView: 1, spaceBetween: 5 },
            0: { slidesPerView: 1, spaceBetween: 8 },
          }}
          navigation={{
            nextEl: ".award-custom-next",
            prevEl: ".award-custom-prev",
          }}
          loop={true}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          className="awards-slider"
        >
          {awards.map((award) => (
            <SwiperSlide key={award.id}>
              <div className="flex flex-col items-center">
                <Image
                  src={`${Image_URL}${award.image_path}`}
                  alt={award.name}
                  width={350}
                  height={400}
                  className="object-cover w-[350px] h-[400px] macbook:h-[450px]"
                  onError={(e) => {
                    e.currentTarget.src = Image_NotFound;
                  }}
                />
                <p className="text-center font-montserrat text-[#8F8F8F] mt-4 text-lg font-medium">
                  {award.name}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation buttons */}
        <div className="absolute z-10 w-full hidden lg:block">
          <div
            className="award-custom-prev swiper-button-prev px-4"
            style={{
              color: "white",
              top: "-200px",
              left: "25px",
              width: "1rem",
            }}
          />
          <div
            className="award-custom-next swiper-button-next px-4"
            style={{
              color: "red",
              top: "-200px",
              right: "25px",
              width: "1rem",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AwardsSlider;
