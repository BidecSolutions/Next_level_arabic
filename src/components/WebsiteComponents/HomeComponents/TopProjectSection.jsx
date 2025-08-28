"use client";

import { useState, useEffect } from "react";
import { Image_NotFound, Image_URL } from "@/config/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import less from "/public/lesser.png";
import great from "/public/greater.png";
import bedIcon from "/public/bed.png";
import feetIcon from "/public/feet.png";
import dirham from "/public/dirham.PNG";
import { fetchTopProjects } from "@/lib/api/home.server";

const TopProjectSection = () => {
  const pathname = usePathname();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const loadProjects = async () => {
      setIsLoading(true);
      const data = await fetchTopProjects();
      setProjects(data);
      setIsLoading(false);
    };

    loadProjects();
  }, [pathname]);



  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    if (projects.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === projects.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [projects]);

  useEffect(() => {
    if (projects.length > 0) {
      const imagesToPreload = new Set();
      imagesToPreload.add(currentIndex);

      const nextIndex = (currentIndex + 1) % projects.length;
      const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
      imagesToPreload.add(nextIndex);
      imagesToPreload.add(prevIndex);

      imagesToPreload.forEach((idx) => {
        const project = projects[idx];
        if (project && project.meadias?.length && project.meadias[0].main_image) {
          const imageUrl = `${Image_URL}${JSON.parse(project.meadias[0].main_image)[0]}`;
          const img = new window.Image();
          img.src = imageUrl;
          img.onerror = () => console.warn(`Failed to preload image: ${imageUrl}`);
        }
      });
    }
  }, [currentIndex, projects]);

  return (
    <div className="min-w-full flex flex-col items-center my-12 md:my-20">
      <h3 className="text-center font-newsLetter text-[#8F8F8F] uppercase macbook:text-[48px] text-[18px] md:text-[34px] font-semibold my-4 md:mb-8">
        Top Projects in Dubai
      </h3>

      {isLoading && projects.length === 0 ? (
        <div className="text-gray-500">Loading top projects...</div>
      ) : projects.length === 0 ? (
        <div className="text-gray-500">No top projects found.</div>
      ) : (
        <div className="relative w-full flex flex-col items-center">
          {projects.map((item, index) => (
            <div
              key={item.id || index}
              className={`flex flex-col-reverse w-full py-[10px] md:flex-row flex-wrap justify-center gap-10 items-center transition-opacity duration-500 ${
                index === currentIndex
                  ? "opacity-100"
                  : "opacity-0 absolute top-0 left-0 w-full"
              }`}
              style={{
                pointerEvents: index === currentIndex ? "auto" : "none",
                zIndex: index === currentIndex ? 1 : 0,
              }}
            >
              <button
                className="hidden md:block border-2 p-3 m-1 hover:text-white duration-300"
                onClick={handlePrev}
              >
                <Image src={less} alt="Previous" />
              </button>

              <div className="bg-white shadow-lg w-full md:w-[40%] rounded-[20px] px-8 pb-4 pt-0">
                <div className="flex justify-between items-center mb-4">
                  <span className="bg-[#222222] font-montserrat mt-[10px] text-[30px] text-white text-xs font-bold px-3 py-1 rounded-[5px]">
                    FEATURED
                  </span>
                  <div className="text-white bg-[#222222] py-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                </div>

                <h3 className="text-[22px] capitalize font-newsLetter md:text-[30px] font-semibold mb-2">
                  {item.property_name || "Property Name"}
                </h3>

                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <p className="text-[#8F8F8F] font-montserrat text-[14px] macbook:text-[24px]">
                      Starting From
                    </p>
                    <p className="flex gap-1 text-[#222222] text-[20px] font-montserrat macbook:text-[27px] font-bold mb-6">
                      {item.starting_price}
                      <Image src={dirham} alt="dirham" className="w-4 h-3.5 mt-2" />
                    </p>
                  </div>
                </div>

                <p
                  className="text-[#222222] font-medium font-montserrat text-[16px] macbook:text-[23px] mb-6"
                  dangerouslySetInnerHTML={{
                    __html: `${item?.property_introduction?.substring(0, 70)}...`,
                  }}
                ></p>

                <div className="flex items-center gap-4 mb-8">
                  <div className="flex items-center gap-2 pr-[10px] border-r border-[#8F8F8F]">
                    <Image src={bedIcon} alt="bed icon" className="w-[28px] h-[35.9px]" />
                    <span className="text-[#8F8F8F] font-montserrat text-[13px] macbook:text-[27px] font-bold">
                      {item.no_of_bedrooms}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Image src={feetIcon} alt="sqft icon" className="w-[28px] h-[35.9px]" />
                    <span className="text-[#8F8F8F] font-montserrat text-[13px] macbook:text-[27px] font-bold">
                      {item.land_area}
                    </span>
                  </div>
                </div>

                <div className="md:my-[20px]">
                  <Link href={`/property/${item.slug}`}>
                    <button className="w-[150px] h-[40px] text-[16px] px-4 py-1 bg-[#222222] text-white hover:bg-transparent hover:text-black border hover:border-[#8F8F8F] rounded-[8px]">
                      See Property
                    </button>
                  </Link>
                </div>
              </div>

              <div className="flex md:w-[40%] items-start">
                <Image
                  src={
                    item.meadias?.length && item.meadias[0].main_image
                      ? `${Image_URL}${JSON.parse(item.meadias[0].main_image)[0]}`
                      : Image_NotFound
                  }
                  alt={item.property_name || "Property Image"}
                  width={500}
                  height={400}
                  className="w-[390px] h-[250px] md:w-[500px] md:h-[400px] macbook:h-[500px] macbook:w-full rounded-lg object-cover"
                  onError={(e) => (e.currentTarget.src = Image_NotFound)}
                />
              </div>

              <button
                className="hidden md:block border-2 p-3 m-1 hover:text-white duration-300"
                onClick={handleNext}
              >
                <Image src={great} alt="Next" />
              </button>
            </div>
          ))}
        </div>
      )}

      {!isLoading && projects.length > 0 && (
        <div className="md:hidden flex justify-center md:justify-end w-full">
          <button
            className="block md:hidden border-2 p-3 m-1 hover:text-white duration-300"
            onClick={handlePrev}
          >
            <Image src={less} alt="Previous" />
          </button>
          <button
            className="border-2 p-3 m-1 hover:text-white duration-300"
            onClick={handleNext}
          >
            <Image src={great} alt="Next" />
          </button>
        </div>
      )}
    </div>
  );
};

export default TopProjectSection;
