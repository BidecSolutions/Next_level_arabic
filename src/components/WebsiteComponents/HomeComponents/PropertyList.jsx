"use client";
import { useEffect, useState } from "react";
import { FaWhatsapp, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import axios from "axios";
import { Image_NotFound, Image_URL } from "@/config/constants";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { getTopProjectsForInvesting } from "@/lib/api/home.server";

const PropertyList = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const data = await getTopProjectsForInvesting();
      setProperties(data);
      setIsLoading(false);
    }
    fetchData();
  }, [pathname]);

  return (
    <div className="ms:py24 flex my-12 md:my-20 flex-col items-center">
      <h2 className="text-[18px] font-newsLetter md:text-[34px] uppercase macbook:text-[48px] font-semibold text-[#8F8F8F] mb-4 text-center">
        Prime Investment Opportunities in Dubai Top Projects
      </h2>

      {properties?.length === 0 && !isLoading && (
        <p className="text-center text-[16px] md:text-[20px] mt-6 font-montserrat w-full flex justify-center text-gray-500">
          No Property available at this moment
        </p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-5 macbook:grid-cols-6 gap-4 md:gap-4">
        {properties?.map((property, index) => (
          <div
            key={property.id}
            className={`bg-white md:p-[6px] ${
              index === 4
                ? "hidden  md:block"
                : index === 5
                ? "hidden macbook:block"
                : index >= 6
                ? "hidden"
                : ""
            }`}
          >
            <div
              className={`relative w-[150px] h-[300px] overflow-hidden md:w-full md:h-auto ${
                index % 2 === 0
                  ? "rounded-tl-[60px] md:rounded-tl-[100px]"
                  : "rounded-br-[60px] md:rounded-br-[100px]"
              }`}
            >
              <Image
                src={
                  property?.meadias?.[0]?.main_image
                    ? `${Image_URL}/${JSON.parse(
                        property.meadias[0].main_image
                      )[0]}`
                    : "/home/p2.png"
                }
                alt={property?.property_name || "Property Image"}
                width={500}
                height={500}
                className="w-full h-[320px] md:h-[500px] macbook:h-[700px] object-cover"
                onError={(e) => {
                  e.currentTarget.src = Image_NotFound;
                }}
              />
            </div>

            <h2 className="text-[13px] font-montserrat text-center md:text-left md:text-[16px] font-bold mt-4 text-[#8F8F8F]">
              {property?.property_name?.substring(0, 20)}
            </h2>
            <p className="text-[#8F8F8F] font-montserrat text-[13px] md:text-[16px] text-center md:text-left">
              Starting From
            </p>
            <p className="flex gap-1 text-[#8F8F8F] font-montserrat font-bombay font-semibold text-[14px] md:text-[18px] text-center md:text-left">
              {property?.starting_price}{" "}
              <Image
                src="/dirham.PNG"
                alt="Dirham"
                width={10}
                height={6}
                className="mt-1.5 w-4 h-3.5"
              />
            </p>

            {/* Button and Icons */}
            <div className="flex items-center justify-between mt-4">
              <button
                onClick={() =>
                  router.push(
                    `/property/${property.slug}?url=user/properties/property_detail_using_slug`
                  )
                }
                className="bg-[#8F8F8F] hover:bg-transparent hover:text-[#8F8F8F] border hover:border-[#8F8F8F] font-montserrat w-[80px] md:w-[110px] text-[10px] md:text-[14px] text-white py-1 md:px-4 rounded-[9px] flex justify-center items-center"
              >
                View More
              </button>

              <div className="flex gap-[5px]">
                <div className="bg-[#8F8F8F] p-[3px] rounded-[5px]">
                  <a
                    href={`https://wa.me/+971552588870`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaWhatsapp className="text-white text-[10px] md:text-[16px] cursor-pointer" />
                  </a>
                </div>

                <div className="bg-[#8F8F8F] p-[3px] rounded-[5px]">
                  <a href={`tel:+97144542828`}>
                    <FaPhoneAlt className="text-white text-[10px] md:text-[14px] cursor-pointer" />
                  </a>
                </div>

                <div className="bg-[#8F8F8F] p-[3px] rounded-[5px]">
                  <a
                    href={`mailto:media@nextlevelrealestate.ae`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaEnvelope className="text-white text-[10px] md:text-[14px] cursor-pointer" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyList;
