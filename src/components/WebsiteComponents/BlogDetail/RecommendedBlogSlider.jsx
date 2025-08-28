'use client';

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import Link from "next/link";
import { Image_URL } from "@/config/constants";


const RecommendedBlogSlider = ({ recommededBlogs }) => {
  const [swiperKey, setSwiperKey] = useState(0); // Add a key to force re-render

  useEffect(() => {
    setSwiperKey((prevKey) => prevKey + 1);
  }, [recommededBlogs]);

  return (
    <div className="py-8">
      <div className="flex w-full items-center relative mb-6">
        <h2 className="text-xl font-bold text-gray-800 flex-grow">
          You Might Also Like
        </h2>
        {/* Navigation Buttons */}
        <div className="flex gap-2">
          <button className="blog-custom-prev w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-300">
            <FaLongArrowAltLeft />
          </button>
          <button className="blog-custom-next w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-300">
            <FaLongArrowAltRight />
          </button>
        </div>
      </div>
      <div className="relative">
        <Swiper
          key={swiperKey}
          modules={[Navigation]}
          navigation={{
            nextEl: ".blog-custom-next",
            prevEl: ".blog-custom-prev",
          }}
          spaceBetween={20}
          loop={true}
          slidesPerView={1}
          breakpoints={{
            1524: { slidesPerView: 3, spaceBetween: 10 },
            1024: { slidesPerView: 3, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 15 },
            640: { slidesPerView: 1, spaceBetween: 5 },
            0: { slidesPerView: 1, spaceBetween: 8 },
          }}
          className="swiper-container"
        >
          {recommededBlogs?.map((blog, index) => {
            const isFirstInView = index % 3 === 0;
            const isLastInView = (index + 1) % 3 === 0;

            return (
              <SwiperSlide key={blog.id}>
                <div
                  className={`bg-white shadow ${
                    isFirstInView
                      ? "rounded-tl-[50px]"
                      : isLastInView
                      ? "rounded-tr-[50px]"
                      : ""
                  }`}
                >
                  <img
                    src={`${Image_URL}${blog?.blog_image}`}
                    alt={blog.title}
                    className={`w-full h-[300px] object-cover ${
                      isFirstInView
                        ? "rounded-tl-[50px]"
                        : isLastInView
                        ? "rounded-tr-[50px]"
                        : ""
                    }`}
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-montserrat mb-2 capitalize">
                      {blog.blog_title.substring(0, 40)}
                    </h3>
                    <div className="text-sm md:text-[13px] font-thin mb-4">
                      <div
                        className="font-montserrat text-[#555555] md:leading-[23px] macbook:text-[35px] macbook:leading-[38px] text-center md:text-start"
                        dangerouslySetInnerHTML={{
                          __html: blog.blog_body
                            .replace(/<img[^>]*>/g, "")
                            .replace(/<br\s*\/?>|\n/g, " ")
                            .substring(0, 180),
                        }}
                      />
                    </div>
                    <p className="text-xs font-thin mb-4 font-newsLetter text-[#555555]">
                      {blog?.blog_date}
                    </p>
                    <Link
                      href={`/${blog.slug}`}
                      className="w-[100px] md:w-[142px] text-center flex justify-center text-[11px] macbook:text-[18px] my-1 py-2 bg-[#8F8F8F] text-white rounded-[5px] hover:bg-gray-500"
                    >
                      Continue Reading
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default RecommendedBlogSlider;
