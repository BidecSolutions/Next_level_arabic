"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
// import axios from "@/utils/axios"; // apne project structure ke hisaab se path adjust karo
// import { Image_NotFound, Image_Url } from "@/utils/const";
import { usePathname } from "next/navigation";
import { getHomeCategories } from "@/lib/api/home.server";
import { Image_NotFound, Image_URL } from "@/config/constants";

const CategoriesSection = () => {
  const [categories, setCategories] = useState([]);
  const pathname = usePathname();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.public.get("user/home-categories/1");
  //       const filteredcategory = response.data.data
  //         ?.slice(0, 4)
  //         ?.filter((category) => category.status === 1);

  //       setCategories(filteredcategory);
  //       console.log(" Home Categories -->", response.data.data);
  //     } catch (error) {
  //       console.log("Categories Page", error);
  //     }
  //   };
  //   fetchData();
  // }, [pathname]);

  useEffect(() => {
    const fetchData = async () => {
      const categoriesData = await getHomeCategories();
      setCategories(categoriesData);
      console.log(categoriesData,"dddd")
    };
    fetchData();
  }, [pathname]);

  return (
    <div className="hidden md:flex justify-center gap-[20px] my-12 md:my-20 w-full">
      {categories?.slice(0, 4).map((category, index) => (
        <div
          key={index}
          className="w-56 h-56 md:h-72 macbook:w-96 macbook:h-96 flex flex-col items-center justify-center"
        >
          <div
            className={`bg-[#616161B5] h-[215px] w-[223px] macbook:w-[350px] macbook:h-80 flex items-center justify-center ${
              index === 0
                ? "rounded-bl-[90px]"
                : index === categories?.length - 1
                ? "rounded-br-[90px]"
                : ""
            }`}
          >
            <Image
              src={
                category?.home_category_image
                  ? `${Image_URL}${category.home_category_image}`
                  : Image_NotFound
              }
              alt={category?.name || "Category"}
              className="h-16 w-16 md:w-[120px] macbook:w-[150px] macbook:h-96 object-contain"
              width={150}
              height={384}
              onError={(e) => {
                e.currentTarget.src = Image_NotFound;
              }}
            />
          </div>
          <h3 className="mt-4 text-lg font-montserrat macbook:text-[32px] text-[#8F8F8F]">
            {category?.name}
          </h3>
          <Link
            href={`/${category?.slug}`}
            className="mt-4 px-4 py-1 font-montserrat macbook:text-[19px] macbook:px-8 macbook:py-2 text-[16px] bg-[#616161B5] hover:bg-transparent hover:text-[#616161B5] hover:border border-[#616161B5] text-white rounded-[8px]"
          >
            View more detail
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CategoriesSection;
