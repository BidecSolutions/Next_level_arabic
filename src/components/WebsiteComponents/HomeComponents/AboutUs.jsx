"use client"; // Required for client-side hooks in Next.js App Router

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
// import axios from "@/Utils/axios"; // Adjust path according to your Next.js folder structure
// import ParseBody from "@/components/PropertyDetails/ParseBody"; // Update path
import { Image_NotFound, Image_URL } from "@/config/constants";
import AboutImage from "/public/aboutsection.png"; // Store image in /public
import { fetchAboutSection } from "@/lib/api/home.server";
import ParseBody from "./ParseBody";

const AboutUs = () => {
  const [about, setAbout] = useState({});
  const [details, setDetails] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

 useEffect(() => {
    const getData = async () => {
      const { about, details } = await fetchAboutSection();
        console.log("Fetched About:", about);
    console.log("Fetched Details:", details);
      setAbout(about);
      setDetails(details);
    };

    getData();
  }, []);

  return (
    <section className="about-us my-12 md:my-20 min-w-full flex justify-center bg-white">
      <div className="flex flex-col-reverse lg:flex-row md:justify-between macbook:w-[80%] items-center gap-12">
        {/* Left Column */}
        <div className="lg:w-[50%] macbook:w-[50%]">
          <h3 className="text-[18px] font-newsLetter md:text-[34px] macbook:text-[60px] mb-4 macbook:mb-4 font-semibold text-[#8F8F8F]">
            {about?.title || "عقارات المستوى التالي"}
          </h3>

          {about?.description && about?.description.length > 500 ? (
            <>
              <div
                className={`${
                  isExpanded
                    ? "h-[140px] overflow-y-auto transition-all duration-300"
                    : "h-[140px] overflow-hidden"
                }`}
              >
                <div className="text-[#8F8F8F] font-montserrat macbook:text-[20px] mb-4">
                  <ParseBody body={about?.description} />
                </div>
              </div>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-2 text-[#8F8F8F] font-montserrat text-sm hover:underline"
              >
                {isExpanded ? "اقرأ أقل" : "اقرأ المزيد"}
              </button>
            </>
          ) : (
            <div className="text-sm text-gray-700 font-montserrat">
              <ParseBody body={about?.description} />
            </div>
          )}

          <div className="w-full flex justify-center md:justify-start">
            <Link
              href="/about-us"
              className="px-4 py-2 w-[110px] mt-2 font-montserrat block md:hidden macbook:text-[19px] macbook:px-8 macbook:py-2 text-[13px] bg-[#616161B5] text-white rounded-[6px]"
            >
              اقرأ المزيد
            </Link>
          </div>

          {/* Statistics Section */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6">
            {details.map((element, index) => (
              <div key={index}>
                <h3 className="text-[23px] font-montserrat font-bold text-[#555555] macbook:text-[27px]">
                  {element.quantity}
                </h3>
                <p className="md:text-[16px] font-montserrat mt-[2px] mb-[7px] font-medium macbook:text-[25px] text-[#555555]">
                  {element.title}
                </p>
                <span className="text-gray-500 font-montserrat text-sm macbook:text-[21px]">
                  {element.description}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Image */}
        <div className="lg:w-[40%] macbook:w-[40%]">
          <Image
            src={
              about?.home_about_section_image
                ? `${Image_URL}/${about?.home_about_section_image}`
                : AboutImage
            }
            alt="About Us"
            width={600}
            height={400}
            className="rounded-bl-[150px] md:rounded-bl-[200px] object-contain md:object-cover w-full h-auto"
            onError={(e) => {
              e.currentTarget.src = Image_NotFound;
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
