"use client";

import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Image_NotFound, Image_URL } from "@/config/constants";
import { Loader } from "../Loader";
import { getBlogCategories, getBlogsByCategorySlug } from "@/lib/api/blogs.server";

export default function ResourceSection() {
  const [activeTab, setActiveTab] = useState(null);
  const [categories, setCategories] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const isFirstLoad = useRef(true);

useEffect(() => {
  (async () => {
    const categories = await getBlogCategories();
    setCategories(categories);

    if (categories.length > 0) {
      setActiveTab(categories[0].slug);
    }
  })();
}, []);

useEffect(() => {
  if (!activeTab) return;
  (async () => {
    const blogs = await getBlogsByCategorySlug(activeTab);
    setBlogs(blogs);
  })();
}, [activeTab]);

  // Detect mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col items-center w-full my-12 md:my-20">
      {/* Heading and Tabs */}
      <div className="flex flex-col md:flex-row justify-evenly w-full items-center mb-8">
        <h3 className="macbook:text-[48px] font-newsLetter text-[18px] md:text-[34px] text-[#A39D9D] font-semibold">
          YOUR ONE-STOP RESOURCE GUIDE`s
        </h3>
        <div className="hidden md:flex items-center space-x-2">
          {categories.length > 0 ? (
            categories.slice(0, 4).map((category) => (
              <button
                key={category.id}
                className={`w-[90px] font-montserrat md:w-[120px] px-1 py-2 text-[10px] md:text-[13px] rounded-md ${
                  activeTab === category.slug
                    ? "text-[#8f8f8f] bg-white border-2 border-[#8f8f8f]"
                    : "bg-[#8f8f8f] text-white"
                }`}
                onClick={() => setActiveTab(category.slug)}
              >
                {category.name.substring(0, 10)}
              </button>
            ))
          ) : (
            <p className="my-96 font-newsLetter">Loading categories...</p>
          )}
        </div>
      </div>

      {/* Cards Section */}
      <div className="w-full md:w-[90%]">
        {loading ? (
          <p className="h-[550px]"></p>
        ) : blogs.length === 0 ? (
          <p className="text-center text-gray-500 font-newsLetter">
            No Blogs available
          </p>
        ) : isMobile ? (
          <Swiper
            modules={[Navigation, Pagination]}
            slidesPerView={1.5}
            breakpoints={{
              1024: { slidesPerView: 3, spaceBetween: 20 },
              768: { slidesPerView: 3, spaceBetween: 15 },
              640: { slidesPerView: 1, spaceBetween: 5 },
              0: { slidesPerView: 1.5, spaceBetween: 20 },
            }}
            centeredSlides={true}
            spaceBetween={10}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            loop={true}
          >
            {blogs.map((blog) => (
              <SwiperSlide key={blog.id}>
                <div className="bg-white rounded-tl-[58px] rounded-br-[58px] rounded-md overflow-hidden shadow-md">
                  <img
                    src={`${Image_URL}${blog.blog_image}`}
                    alt={blog.title}
                    className="w-full h-52 md:h-64 object-cover"
                    onError={(e) => {
                      e.currentTarget.src = Image_NotFound;
                    }}
                  />
                  <div className="p-6 flex flex-col items-center">
                    <div
                      className="text-[15px] font-newsLetter md:w[232px] text-center font-medium leading-[27px] mb-8"
                      dangerouslySetInnerHTML={{
                        __html: blog.blog_body
                          .replace(/<img[^>]*>/g, "")
                          .replace(/<br\s*\/?>|\n/g, " ")
                          .substring(0, 180),
                      }}
                    />
                    <button className="px-6 py-2 font-newsLetter text-[10px] md:text-[16px] mb-2 bg-[#8F8F8F] text-white rounded-[6.5px] md:mb-2">
                      CONTINUE READING
                    </button>
                    <p className="text-sm text-gray-500 mt-2 font-newsLetter">
                      BY NEXT LEVEL
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="flex justify-center gap-6">
            {blogs.slice(0, 3).map((blog, index) => (
              <div
                key={blog.id}
                className={`bg-[#D9D9D9] md:w-[340px] lg:w-[360px] lg:h-[550px] overflow-hidden shadow-md ${
                  index === 0
                    ? "md:rounded-bl-[150px]"
                    : index === 2
                    ? "rounded-br-[75px] md:rounded-br-[150px]"
                    : ""
                }`}
              >
                <img
                  src={`${Image_URL}${blog.blog_image}`}
                  alt={blog.title}
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    e.currentTarget.src = Image_NotFound;
                  }}
                />
                <div className="p-6 h-72 flex flex-col justify-between items-center">
                  <div
                    className="text-[15px] md:w[232px] font-newsLetter text-center font-medium leading-[27px] mb-8"
                    dangerouslySetInnerHTML={{
                      __html: blog.blog_body
                        .replace(/<img[^>]*>/g, "")
                        .replace(/<br\s*\/?>|\n/g, " ")
                        .substring(0, 180),
                    }}
                  />
                  <div className="flex flex-col items-center">
                    <Link
                      href={`/${blog.slug}`}
                      className="px-6 py-2 font-montserrat text-[10px] md:text-[16px] bg-[#8F8F8F] text-white rounded-[6.5px] mb-2"
                    >
                      CONTINUE READING
                    </Link>
                    <p className="text-sm text-[#8F8F8F] mt-2 font-newsLetter">
                      BY NEXT LEVEL
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
