"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { RiFilter3Line } from "react-icons/ri";
// import { Loader } fr om "../webComponents/Loader/Loader";
import { Image_NotFound, Image_URL } from "@/config/constants";
// import axios from "../../Utils/axios";
import { Loader } from "@/components/WebsiteComponents/Loader";
import { fetchBlogsAPI } from "@/lib/api/blogs.server";
import Banner from "@/components/WebsiteComponents/Blog/Banner";
import BlogSidebar from "@/components/WebsiteComponents/Blog/BlogSidebar";
// import CustomSeo from "../webComponents/CustomSeo";

function page() {
  const [blogs, setBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMoreBlogs, setHasMoreBlogs] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Redirect if URL does not end with '/'
  useEffect(() => {
    if (!pathname.endsWith("/")) {
      router.replace(pathname + "/");
    }
  }, [pathname, router]);

  // Handle initial category from query
  useEffect(() => {
    const slug = searchParams.get("category");
    if (slug) {
      setSelectedCategory(slug);
      fetchBlogs(currentPage, slug, selectedTag);
    }
  }, [searchParams]);

//   const fetchBlogs = async (page = 1, category = null, tag = null) => {
//     setIsLoading(true);
//     setError(null);

//     try {
//       let url;
//       if (category && typeof category !== "object") {
//         url = `user/blogs/category_wise/${category}`;
//       } else if (tag) {
//         url = `user/blog-tags/blog-list-using-blog-tag-slug/${tag}`;
//       } else {
//         url = "user/blogs";
//       }

//       const response = await axios.public.get(url, { params: { page } });

//       let newBlogs;
//       if (tag && typeof response.data === "string" && response.data.startsWith("3")) {
//         const jsonString = response.data.slice(1);
//         const parsedResponse = JSON.parse(jsonString);
//         newBlogs = parsedResponse?.data || [];
//       } else {
//         newBlogs = response.data?.data || [];
//       }

//       const updatedBlogs = page === 1 ? newBlogs : [...blogs, ...newBlogs];
//       const uniqueBlogs = updatedBlogs.filter(
//         (newBlog, index, self) => index === self.findIndex((blog) => blog.id === newBlog.id)
//       );

//       setBlogs(uniqueBlogs);
//       setHasMoreBlogs(newBlogs.length > 0 && newBlogs.length >= 1);
//     } catch (err) {
//       console.error("Error fetching blogs:", err);
//       setError("No Blogs available");
//     } finally {
//       setIsLoading(false);
//     }
//   };
const fetchBlogs = async (page = 1, category = null, tag = null) => {
    setIsLoading(true);
    setError(null);

    try {
      const { blogs: newBlogs, hasMore } = await fetchBlogsAPI(
        page,
        category,
        tag,
        blogs
      );
      setBlogs(newBlogs);
      setHasMoreBlogs(hasMore);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedTag(null);
    setCurrentPage(1);
    setBlogs([]);
    router.push(`?category=${categoryId}`);
  };

  const handleTagChange = (tagId) => {
    setSelectedTag(tagId);
    setSelectedCategory(null);
    setCurrentPage(1);
    setBlogs([]);
  };

  const handleClearCategory = () => {
    setSelectedCategory(null);
    setSelectedTag(null);
    setCurrentPage(1);
    setBlogs([]);
    router.push(pathname);
  };

  const handleLoadMore = () => {
    if (hasMoreBlogs) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    fetchBlogs(currentPage, selectedCategory, selectedTag);
  }, [currentPage, selectedCategory, selectedTag]);

  if (isLoading && currentPage === 1) return <Loader />;

  return (
    <div className="relative pb-10">
      {/* <CustomSeo id={12} /> */}
      <Banner
        title="Check Out the Latest Dubai Real Estate Blogs & Insights"
        image="/Areas/banner.png"
        status={false}
      />

      {/* Mobile Sidebar Button */}
      <div className="lg:hidden flex items-center justify-start p-4">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-[#8F8F8F] border border-[#8F8F8F] text-xl font-montserrat flex justify-center items-center p-2 rounded-[5px]"
        >
          <RiFilter3Line />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex justify-center w-full mt-8 md:mt-16">
        {/* Sidebar */}
        <div className="md:w-[25%] w-3/2">
          <BlogSidebar
            onCategorySelect={handleCategoryChange}
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            isSidebarOpen={isSidebarOpen}
            selectedCategory={selectedCategory}
            onClearCategory={handleClearCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onTagSelect={handleTagChange}
            selectedTag={selectedTag}
          />
        </div>

        {/* Blog Cards */}
        <div
          className={`w-[70%] md:w-[65%] grid grid-cols-1 md:grid-cols-2 gap-x-2 ${
            blogs.length <= 4
              ? "md:ml-20 place-items-start"
              : "md:ml-20 place-items-center"
          }`}
        >
          {isLoading && currentPage > 1 ? (
            <Loader />
          ) : error ? (
            <div className="text-center w-full text-[#8F8F8F]">{error}</div>
          ) : blogs.length > 0 ? (
            blogs
              .filter((blog) => blog.status === 1)
              .filter((blog) => {
                if (!searchQuery) return true;
                const title = blog?.title || blog?.blog_title || "";
                return title.toLowerCase().includes(searchQuery.toLowerCase());
              })
              .sort((a, b) => {
                const dateA = new Date(a.date || a.blog_date);
                const dateB = new Date(b.date || b.blog_date);
                return dateB - dateA;
              })
              .slice(0, currentPage * 6)
              .map((data, index) => (
                <div className="w-[270px] h-auto md:w-[350px]" key={data.id}>
                  <Link
                    href={`/${data.slug}`}
                    className="flex flex-col gap-2 py-4 items-start"
                  >
                    <img
                      className={`rounded-xl w-[270px] h-[270px] md:w-[369px] md:h-[317px] object-cover ${
                        index % 2 === 0
                          ? "rounded-tl-[60px] md:rounded-tl-[100px]"
                          : "rounded-tr-[60px] md:rounded-tr-[100px]"
                      }`}
                      src={
                        data.blog_image
                          ? `${Image_URL}${data.blog_image}`
                          : "/background.png"
                      }
                      alt={data.title}
                    />
                    <p className="md:text-[18px] font-montserrat leading-[28.8px] text-xs font-semibold">
                      {data?.title || data?.blog_title}
                    </p>
                    <p className="md:text-[10px] font-montserrat text-[#000000] font-thin text-[11px]">
                      {new Date(
                        data.date || data.blog_date
                      ).toLocaleDateString("en-GB")}
                    </p>
                  </Link>
                </div>
              ))
          ) : (
            <div className="text-center font-montserrat w-full">
              No blogs found for {selectedTag}
            </div>
          )}
        </div>
      </div>

      {/* Load More Button */}
      <div className="flex justify-center w-full mt-8">
        {hasMoreBlogs && blogs.length >= currentPage * 6 && (
          <button
            onClick={handleLoadMore}
            className="bg-[#8F8F8F] text-white py-2 px-6 rounded-full w-fit flex justify-center items-center"
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
}

export default page;
