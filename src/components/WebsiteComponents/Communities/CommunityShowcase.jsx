"use client";

import { useState } from "react";
import { CiCircleCheck } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa";
import { Image_NotFound, Image_URL } from "@/config/constants";
import Link from "next/link";
import RegisterForm from "../Forms/RegisterForm";
// import RegisterForm from "../RegisterForm";

const CommunityShowcase = ({ propertiesData, images, features }) => {
  const [visibleProperties, setVisibleProperties] = useState(4);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadMore = () => {
    setVisibleProperties((prev) => prev + 2);
  };

  const handleWhatsAppClick = (phoneNumber, message) => {
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(
      "+",
      ""
    )}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section className="py-10 md:py-24 w-full flex flex-col macbook:gap-[60px]">
      {propertiesData.length === 0 && (
        <div className="flex justify-center items-center h-[300px] w-full">
          <p className="text-[#8F8F8F] font-newsLetter text-[20px]">
            No communities available.
          </p>
        </div>
      )}

      {propertiesData?.slice(0, visibleProperties).map((property, index) => (
        <div
          key={property.id}
          className={`flex flex-col reverse md:flex-row justify-center macbook:justify-around items-center mt-8 gap-[40px] md:gap-[60px] xl:gap-[80px] w-[100%] mb-12 md:mb-24 ${
            index % 2 !== 0 ? "md:flex-row-reverse" : ""
          }`}
        >
          {/* Image Section */}
          <div
            className={`flex w-[100%] justify-center md:w-[40%] macbook:w-[35%]`}
          >
            <div
              className={`relative max-w-fit w[100%] justify-center h-[100%] flex ${
                index % 2 !== 0 ? "justify-center" : "justify-start"
              }`}
            >
              <img
                src={`${Image_URL}/${property.community_images[0]?.image}`}
                alt={property.name}
                className="h-[300px] w-[290px] md:w-[400px] md:h-[420px] macbook:w-[550px] macbook:h-[500px] rounded-tl-[150px]"
                onError={(e) => {
                  e.currentTarget.src = Image_NotFound;
                }}
              />
            </div>
          </div>

          {/* Info Section */}
          <div className="flex flex-col items-center md:items-start md:w-[30%] macbook:w-[25%] md:h-[100%]">
            <h3 className="text-[19px] font-newsLetter uppercase font-semibold text-[#8F8F8F] mb-4 macbook:mb-8 macbook:text-[60px]">
              {property.name}
            </h3>

            {/* Sizes / Price / Beds */}
            <div className="flex gap-[20px] macbook:gap-[40px] mb-4">
              <div>
                <p className="font-semibold font-montserrat macbook:text-[22px] text-[#8F8F8F] text-[12px] md:text-[16px]">
                  Starting Sizes
                </p>
                <p className="text-[#8F8F8F] font-montserrat text-[10px] macbook:text-[19px]">
                  {property.starting_size}
                </p>
              </div>
              <div>
                <p className="font-semibold font-montserrat text-[#8F8F8F] macbook:text-[22px] text-[14px] md:text-[16px]">
                  Starting Price
                </p>
                <p className="flex gap-1 text-[#8F8F8F] font-montserrat text-[10px] macbook:text-[19px]">
                  {property.starting_price}{" "}
                  <img src="/dirham.PNG" className="w-2 h-2 mt-1" alt="AED" />
                </p>
              </div>
              <div>
                <p className="font-semibold font-montserrat macbook:text-[22px] text-[#8F8F8F] text-[14px] md:text-[16px]">
                  Beds
                </p>
                <p className="text-[#8F8F8F] font-montserrat text-[10px] macbook:text-[19px]">
                  {property.beds}
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="w-[100%] flex flex-col items-center md:items-start">
              <h4 className="font-semibold w-full font-montserrat text-[#8F8F8F] text-[18px] mb-2 macbook:text-[28px]">
                Key Features
              </h4>
              {property.key_features?.length > 0 ? (
                property.key_features.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-[10px] items-start w-[100%]"
                  >
                    <CiCircleCheck className="macbook:text-[22px]" />
                    <p className="text-[#8F8F8F] font-montserrat text-[14px] macbook:text-[25px]">
                      {item?.title}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-[#8F8F8F] font-newsLetter text-[15px]">
                  No features available.
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex gap-2">
              <button
                className="bg-[#8F8F8F] font-newsLetter text-white px-8 py-2 rounded-md text-[10px] md:text-[13px] macbook:text-[20px]"
                onClick={() => setIsModalOpen(true)}
              >
                Inquiry Now
              </button>
   <Link
  href={`/community/${property.slug}`}
  className="border border-[#8F8F8F] text-[#8F8F8F] px-8 py-2 rounded-md text-[10px] md:text-[13px] macbook:text-[20px] font-newsLetter"
>
  View more
</Link>

              <button
                className="flex items-center gap-2 px-2 py-2 macbook:px-4 macbook:py-3 border border-[#A39D9D] rounded-md"
                onClick={() =>
                  handleWhatsAppClick(
                    (property.whatsapp_no
                      ? property.whatsapp_no
                      : "+971552588870"
                    ).replace(/[\s-]+/g, ""),
                    "Hello, I want to connect!"
                  )
                }
              >
                <FaWhatsapp className="text-[#A39D9D] text-[20px] macbook:text-[30px]" />
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Load More */}
      {visibleProperties < propertiesData?.length && (
        <div className="text-center mt-8">
          <button
            onClick={loadMore}
            className="border border-[#8F8F8F] font-newsLetter text-[#8F8F8F] px-8 py-2 rounded-md"
          >
            Load More
          </button>
        </div>
      )}

      <RegisterForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default CommunityShowcase;
