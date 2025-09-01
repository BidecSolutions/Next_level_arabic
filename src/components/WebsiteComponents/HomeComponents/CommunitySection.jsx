"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Image_NotFound, Image_URL } from "@/config/constants";
import { fetchPopularCommunities } from "@/lib/api/home.server";

const CommunitySection = () => {
  const [communities, setCommunities] = useState([]);
  const pathname = usePathname();

  useEffect(() => {
    const getCommunities = async () => {
      const data = await fetchPopularCommunities();
      setCommunities(data);
      console.log(data, "get")
    };

    getCommunities();
  }, [pathname]);

  return (
    <div className="bg-white   my-12 md:my-20 flex flex-col w-full  items-center">
      <h3 className="text-center font-newsLetter text-[#8F8F8F] macbook:text-[48px] text-[18px] md:text-[34px] font-semibold mb-1">
        المجتمعات الشعبية في دبي
      </h3>
      <p className="text-center font-montserrat text-[#8F8F8F] mb-4 md:mb-16 text-[11px] macbook:text-[28px]  w-[90%] md:text-[14px]">
        استكشف أفضل مجتمعات دبي. مثالية للعائلات والمهنيين. تنتظرك وسائل راحة فاخرة وأنماط حياة نابضة بالحياة.  </p>
      <div className="flex   gap-[10px] justify-center">
        <div className="flex justify-center  flex-col items-center">
          {/* First Row */}
          <div className="flex justify-center flex-wrap md:flex-nowrap w-[100%] gap-[10px] mb-[10px]">
            {communities?.slice(0, 3).map((community, index) => (
              <div
                key={community?.id}
                className={`relative w-[45%] md:w-[50%] macbook:w-[500px] macbook:h-[320px] h-[174px] md:h-[284px] ${index === 0
                    ? " rounded-tl-[61px]   md:rounded-tl-[100px]"
                    : index === 2
                      ? " rounded-bl-[61px] md:rounded-bl-[100px] md:w-[30%] w-[93%] "
                      : "w-[45%]"
                  }`}
              >
                <img
                  src={`${Image_URL}${community.image_path}`}
                  alt={`Community ${community?.id}`}
                  loading="lazy"
                  className={`object-cover w-[100%] h-[100%] ${index === 0
                      ? " rounded-tl-[61px]   md:rounded-tl-[100px]"
                      : index === 2
                        ? " rounded-bl-[61px] md:rounded-bl-[50px]   "
                        : ""
                    }`}
                />
                <Link href={`/community/${community?.slug}`}>
                  <div className="absolute inset-0 bg-gradient-to-t  via-transparent to-transparent" />
                </Link>
                <p className="absolute font-montserrat text-center bottom-4 w-full text-[17px] md:text-xl text-white ">
                  {community?.name}
                </p>
              </div>
            ))}
          </div>

          {/* Second Row */}
          <div className="w-[100%] hidden md:flex gap-[10px] justify-center">
            {communities?.slice(3, 5).map((community, index) => (
              <div
                key={community?.id}
                className={`relative ${index === 0
                    ? " md:w-[67%] macbook:w-[67%]"
                    : " md:w-[33%] macbook:w-[33%]"
                  }`}
              >
                <div
                  className={`relative ${community?.wide ? "w-[620px]" : "w-[100%]"
                    } h-[280px] ${index === 0
                      ? "rounded-bl-[61px] md:rounded-bl-[100px]"
                      : "rounded-tr-[61px] md:rounded-tr-[50px]"
                    } overflow-hidden`}
                >
                  <img
                    src={`${Image_URL}${community.image_path}`}
                    alt={`Community ${community?.id}`}
                    loading="lazy"
                    className="object-cover w-full h-full macbook:h-[320px]"
                  />
                  <Link href={`/community/${community?.slug}`}>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090919] via-transparent to-transparent" />
                  </Link>
                  <p className="absolute font-montserrat bottom-4 w-full text-center text-[17px] md:text-xl text-white fontbold">
                    {community?.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tall Image */}
        <div className="hidden md:block">
          {communities?.slice(4, 5).map((community) => (
            <div key={community.id} className="relative w-[254px]">
              <img
                src={`${Image_URL}${community.image_path}`}
                alt={`Community ${community.id}`}
                loading="lazy"
                className="object-cover w-[254px] h-[580px] macbook:h-[610px] rounded-tr-[100px] rounded-br-[100px]"
              />
              {/* <div className="absolute inset-0 bg-gradient-to-t from-[#090919] via-transparent to-transparent" /> */}
              <Link href={`/community/${community?.slug}`}>
                <div className="absolute inset-0 bg-gradient-to-b from-[#8d8d8d] via-transparent to-transparent w-[254px] h-[580px] macbook:h-[610px] rounded-tr-[100px] rounded-br-[100px]" />
              </Link>
              <p className="absolute font-montserrat  top-14 w-full text-center text-white text-[17px] md: text-xl fontbold">
                {community.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-4 md:mt-16">
        <Link href="/communities/">
          <button className="px-6 py-2 font-montserrat bg-[#8F8F8F] hover:bg-transparent hover:text-[#8F8F8F] border hover:border-[#8F8F8F] macbook:text-[16px] text-white rounded-md">
            عرض جميع المجتمعات
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CommunitySection;
