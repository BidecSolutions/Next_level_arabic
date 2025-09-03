"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
// import axios from "@/utils/axios"; // apne axios ka path update karein
import { Image_NotFound, Image_URL } from "@/config/constants";
import { RxCross2 } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";
import { fetchCategoriesAPI, fetchTagsAPI, fetchTopPostsAPI } from "@/lib/api/blogs.server";

export default function BlogSidebar({
  selectedCategory,
  onCategorySelect,
  onTagSelect,
  selectedTag,
  onClearCategory,
  toggleSidebar,
  isSidebarOpen,
  handleSearch,
  searchQuery,
  setSearchQuery,
}) {
  const [categories, setCategories] = useState([]);
  const [topPosts, setTopPosts] = useState([]);
  const [error, setError] = useState(null);
  const [tags, setTags] = useState(null);
  const pathname = usePathname();

//   const fetchTags = async () => {
//     try {
//       const response = await axios.get(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}user/blog-tags/1`
//       );
//       setTags(response.data.data.filter((item) => item.status !== 2) || []);
//     } catch (err) {
//       console.error("Error fetching Tags:", err);
//       setError("Failed to load Tags");
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}user/blog-categories`
//       );
//       setCategories(
//         response.data.data.filter((item) => item.status !== 2) || []
//       );
//     } catch (err) {
//       console.error("Error fetching categories:", err);
//       setError("Failed to load categories");
//     }
//   };

//   const fetchTopPosts = async () => {
//     try {
//       const response = await axios.get(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}user/blogs`
//       );
//       setTopPosts(response.data.data.slice(0, 5));
//     } catch (err) {
//       console.error("Error fetching top posts:", err);
//       setError("No top posts available");
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//     fetchTopPosts();
//     fetchTags();
//   }, [pathname]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [catData, postData, tagData] = await Promise.all([
          fetchCategoriesAPI(),
          fetchTopPostsAPI(),
          fetchTagsAPI(),
        ]);
        setCategories(catData);
        setTopPosts(postData);
        setTags(tagData);
      } catch (err) {
        console.error("Error loading sidebar data:", err);
        setError("فشل تحميل بيانات الشريط الجانبي");
      }
    };
    loadData();
  }, [pathname]);


  const handleWhatsAppClick = (message) => {
    const phoneNumber = "+971552588870";
    message =
      message || "مرحباً، أود الاستفسار عن خدماتكم";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div
      className={`fixed lg:static lg:flex top-0 left-0 w-2/3 lg:w-full h-screen md:h-full flex-col gap-[20px] overflow-y-scroll bg-white p-4 lg:rounded-lg transition-transform duration-300 ease-in-out z-50 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0`}
    >
      <div className="lg:hidden flex justify-end">
        <button onClick={toggleSidebar} className="text-xl p-2">
          <RxCross2 />
        </button>
      </div>

      {/* Search */}
      <div className="flex md:items-center rounded-lg mb-2 md:mb-6 border border-[#A39D9D]">
        <input
          type="text"
          placeholder="يبحث"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-transparent p-2 font-montserrat text-[#8F8F8F] md:pl-4 md:text-[17px] focus:outline-none flex-grow"
        />
        <button
          onClick={handleSearch}
          className="h-[30px] p-2 md:h-[52px] rounded-r-[10px] bg-[#8F8F8F]"
        >
          <CiSearch className="text-white text-[20px]" />
        </button>
      </div>

      {/* Categories */}
      <div>
        <h2 className="text-lg md:text-[23px] font-montserrat text-[#8F8F8F] mb-4">
         فئات
        </h2>
        {error ? (
          <div className="text-[#8F8F8F] font-montserrat">{error}</div>
        ) : (
          <div
            className={`grid gap-3 border border-[#555555] rounded-[10px] p-4 ${
              categories.length > 5 ? "max-h-[300px] overflow-y-auto" : ""
            }`}
          >
            {categories.map((category) => (
              <div
                key={category.id}
                className={`relative cursor-pointer pb-4 md:pb-8 border-b border-[#D9D9D9] ${
                  selectedCategory === category.slug
                    ? "text-red-500"
                    : "text-[#8F8F8F]"
                }`}
                onClick={() => onCategorySelect(category.slug)}
              >
                <span className="font-montserrat absolute inset-0 text-[17px] text-[#8F8F8F] flex items-center">
                  {category.name}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Posts */}
      <div className="mb-2 md:mb-6 py-4 md:py-1 rounded-lg">
        <h2 className="text-lg md:text-[23px] font-montserrat text-[#8F8F8F] mb-4">
         المشاركات الأخيرة
        </h2>
        {error ? (
          <div className="text-[#8F8F8F] font-montserrat">{error}</div>
        ) : (
          <ul className="space-y-4 border border-[#555555] rounded-[10px] p-4">
            {topPosts.map((post) => (
              <li key={post.id} className="flex items-start space-x-2 text-sm">
                <Link href={`/${post.slug}`} className="flex items-center space-x-2">
                  <img
                    src={`${Image_URL}/${post?.blog_image}`}
                    alt=""
                    className="w-[50px] h-[50px] object-cover rounded-[5px]"
                  />
                  <div>
                    <p className="text-xs text-gray-400 font-montserrat">
                      {post.date} -{" "}
                    </p>
                    <h3 className="text-[12px] font-montserrat font-semibold leading-[18.18px] overflow-hidden text-ellipsis">
                      {post?.title.substring(0, 50)}
                    </h3>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Tags */}
      <div
        className={`py-4 md:py-1 ${
          tags?.length > 5 ? "max-h-[300px] overflow-y-auto" : ""
        }`}
      >
        <h2 className="text-lg md:text-[20px] font-montserrat text-[#8F8F8F] mb-4">
          العلامات الشعبية
        </h2>
        {selectedTag && (
          <button
            onClick={onClearCategory}
            className="bg-gray-200 text-gray-700 px-2 py-2 text-[12px] rounded-lg flex items-center space-x-2 mb-4"
          >
            <RxCross2 /> <span className="font-montserrat">واضح</span>
          </button>
        )}
        <div className="flex flex-wrap gap-[10px] gap-y-[30px] items-center">
          {tags?.map((tag, index) => (
            <div key={index} onClick={() => onTagSelect(tag.slug)}>
              <span className="border border-[#A39D9D] text-[10px] text-[#555555] font-semibold cursor-pointer p-2 rounded-[5px]">
                {tag.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Social */}
      <div className="py-4 md:py-1 mt-10 flex flex-col items-start">
        <h2 className="text-lg md:text-[23px] font-montserrat text-[#8F8F8F] mb-4">
          تابعنا
        </h2>
        <div className="flex space-x-4">
          <a href="https://www.facebook.com/nextleveldubai" target="_blank">
            <FaFacebookF size={35} className="text-[#A39D9D] border border-[#A39D9D] p-[7px] rounded-[5px]" />
          </a>
          <a href="https://www.instagram.com/Nextlevelrealestate.ae/" target="_blank">
            <FaInstagram size={35} className="text-[#A39D9D] border border-[#A39D9D] p-[7px] rounded-[5px]" />
          </a>
          <a href="https://www.youtube.com/channel/UCtNFEfB4qPfMejiNKvRN1rA" target="_blank">
            <FaYoutube size={35} className="text-[#A39D9D] border border-[#A39D9D] p-[7px] rounded-[5px]" />
          </a>
          <a onClick={() => handleWhatsAppClick("")}>
            <FaWhatsapp size={35} className="text-[#A39D9D] border border-[#A39D9D] p-[7px] rounded-[5px] cursor-pointer" />
          </a>
        </div>
      </div>
    </div>
  );
}
