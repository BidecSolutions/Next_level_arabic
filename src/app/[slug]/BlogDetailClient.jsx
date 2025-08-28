'use client';

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams,useRouter  } from "next/navigation";
import { Loader } from "../../components/WebsiteComponents/Loader";
import { RxCross2 } from "react-icons/rx";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";
import RecommendedBlogSlider from "@/components/WebsiteComponents/BlogDetail/RecommendedBlogSlider";
import dynamic from "next/dynamic";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });
// import JoditEditor from "jodit-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import SwiperCore from "swiper";
import { Image_URL } from "@/config/constants";
import Banner from "@/components/WebsiteComponents/BlogDetail/Banner";
import NotFound from "../not-found";
import { getBlogCategories } from "@/lib/api/blogs.server";

const BlogDetailClient = ({blog, tags, recommendedBlogs}) => {
  const router = useRouter();
  const { slug } = useParams();

  const swiperRef = useRef(null);

//   const [tags, setTags] = useState([]);
//   const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
//   const [recommendedBlogs, setRecommendedBlogs] = useState([]);
  const [swiperKey, setSwiperKey] = useState(0);

  const feature_images = [
    { image: "/feature3.png", url: "/community/palm-jebel-ali-properties-for-sale/" },
    { image: "/feature2.webp", url: "/property/velora-2-at-the-valley-phase-2/" },
    { image: "/feature4.png", url: "/property/grand-polo-club-resort-dubai-investment-park-2/" }
  ];

  useEffect(() => {
    (async () => {
      const categories = await getBlogCategories();
      setCategories(categories);
  
    })();
  }, []);

  // Fetch categories
//   const fetchCategories = async () => {
//     try {
//       const response = await axios.public.get("user/blog-categories");
//       setCategories(response.data.data.filter((item) => item.status !== 2) || []);
//     } catch (err) {
//       console.error("Error fetching categories:", err);
//       setError("Failed to load categories");
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   // Fetch blog details when slug changes
//   useEffect(() => {
//     if (!slug) return;

//     const fetchBlogDetails = async () => {
//       setIsLoading(true);
//       try {
//         const response = await axios.public.post(`user/blogs/showBySlug`, { slug });

//         if (response.data.status === "success") {
//           const blogData = response.data.data.blog;
//           setBlog(blogData);

//           const rawTags = blogData.blogTagArray;
//           if (typeof rawTags === "string") {
//             setTags(JSON.parse(rawTags));
//           } else {
//             setTags(rawTags || []);
//           }

//           setRecommendedBlogs(response.data.data.recommended_blogs);
//           setSwiperKey((prev) => prev + 1);
//         } else {
//           setError("Blog not found or API did not return success");
//         }
//       } catch (err) {
//         console.error("Error fetching blog details:", err);
//         setError("Blog not found or API did not return success");
//       }
//       setIsLoading(false);
//     };

//     fetchBlogDetails();
//   }, [slug]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  SwiperCore.use([Autoplay]);

  const editorConfig = {
    readonly: true,
    toolbar: false,
    showCharsCounter: false,
    showWordsCounter: false,
    showXPathInStatusbar: false,
    showPoweredBy: false,
  };

  if (error) {
    return <NotFound />;
  }

  if (isLoading || !blog) {
    return <Loader />;
  }

  return (
    <>
      <Banner
        title={blog?.blog_title}
        image={`${Image_URL}${blog?.blog_image}`}
        status={true}
      />

      <div className="px-5 md:px-10 py-6 md:py-8">
        <div className="flex md:flex-row flex-col mt-4">
          <div
            className={`fixed lg:static lg:flex top-0 left-0 w-2/3 lg:w-[20%] flex-col gap-[20px] h-auto overflow-y-scroll bg-white pr-4 lg:rounded-lg transition-transform duration-300 ease-in-out z-10 ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } lg:translate-x-0`}
          >
            <div className="lg:hidden flex justify-end">
              <button onClick={toggleSidebar} className="text-xl p-2">
                <RxCross2 />
              </button>
            </div>

            <div>
              <h2 className="text-lg font-normal md:text-[20px] font-montserrat text-[#8F8F8F] mb-4">
                Categories
              </h2>
              {error ? (
                <div className="text-[#8F8F8F] font-montserrat">{error}</div>
              ) : (
                <div
                  className={`grid gap-3 border border-[#555555] rounded-[10px] p-3 ${
                    categories.length > 5 ? "max-h-[300px] overflow-y-auto" : ""
                  }`}
                  style={{ scrollbarWidth: "thin" }}
                >
                  {categories?.map((category) => (
                    <div
                      key={category.id}
                      className="relative cursor-pointer pb-2 md:pb-8 border-b border-[#D9D9D9]"
                      onClick={() => {}}
                    >
                      <div className="w-full object-cover rounded-lg bg-white" />
                      <span className="font-montserrat absolute inset-0 text-[15px] text-[#8F8F8F] flex items-center">
                        {category.name}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h2 className="text-lg font-normal md:text-[23px] font-montserrat text-[#8F8F8F] mb-4">
                Popular Tags
              </h2>
              <div className="flex flex-wrap gap-[10px] gap-y-[30px] items-center">
                {Array.isArray(tags) && tags.length > 0 ? (
                  tags.map((tag, index) => (
                    <div key={index}>
                      <span className="border border-[#A39D9D] text-[#555555] font-semibold p-2 rounded-[5px]">
                        {tag.name}
                      </span>
                    </div>
                  ))
                ) : (
                  <p>No tags available</p>
                )}
              </div>
            </div>

            <div className="mt-10 flex flex-col items-start">
              <h2 className="text-lg font-normal md:text-[23px] font-montserrat text-[#8F8F8F] mb-4">
                Follow Us
              </h2>
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/nextleveldubai"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebookF
                    size={35}
                    className="text-[#A39D9D] border border-[#A39D9D] p-[7px] rounded-[5px]"
                  />
                </a>
                <a
                  href="https://www.instagram.com/Nextlevelrealestate.ae/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram
                    size={35}
                    className="text-[#A39D9D] border border-[#A39D9D] p-[7px] rounded-[5px]"
                  />
                </a>
                <a
                  href="https://www.linkedin.com/company/next-level-real-estate-dubai"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedinIn
                    size={35}
                    className="text-[#A39D9D] border border-[#A39D9D] p-[7px] rounded-[5px]"
                  />
                </a>
                <a
                  href="https://www.youtube.com/channel/UCtNFEfB4qPfMejiNKvRN1rA"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaYoutube
                    size={35}
                    className="text-[#A39D9D] border border-[#A39D9D] p-[7px] rounded-[5px]"
                  />
                </a>
              </div>
            </div>
          </div>

          <div className="md:w-[65%] md:p-8">
            <h1 className="text-4xl font-newsLetter font-bold mb-6">
              {blog?.blog_title || "Lorem Ipsum is simply dummy text"}
            </h1>

            <div className="w-full md:w-[90%] jodit-editor">
              <JoditEditor
                value={blog?.blog_body?.replace(/www\.www\./g, "www.")}
                config={editorConfig}
              />
            </div>
          </div>

          <div className="flex flex-col items-center md:w-[15%]">
            <h2 className="text-lg font-normal md:text-[20px] font-montserrat text-[#8F8F8F] mb-4">
              Feature Properties
            </h2>

            <Swiper
              key={swiperKey}
              slidesPerView={1}
              spaceBetween={10}
              className="w-full"
              loop={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: true,
              }}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
            >
              {feature_images.map((img, index) => (
                <SwiperSlide
                  key={index}
                  onMouseEnter={() => swiperRef.current?.autoplay.stop()}
                  onMouseLeave={() => swiperRef.current?.autoplay.start()}
                >
                  <Link href={img.url}>
                    <img
                      src={img.image}
                      alt={`Slide ${index + 1}`}
                      className="w-full h-auto"
                    />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        <div className="py-10">
          <RecommendedBlogSlider recommededBlogs={recommendedBlogs} />
        </div>
      </div>
    </>
  );
};

export default BlogDetailClient;
