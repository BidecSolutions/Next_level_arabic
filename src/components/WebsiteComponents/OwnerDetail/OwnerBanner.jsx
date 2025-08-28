"use client";

import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import ParseBody from "../HomeComponents/ParseBody";
import { Image_URL } from "@/config/constants";

const OwnerBanner = ({ ownerDetails }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleEmailClick = (email) => {
    if (email) window.location.href = `mailto:${email}`;
  };

  const handleWhatsAppClick = (phoneNumber, message) => {
    if (!phoneNumber) return;
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(
      "+",
      ""
    )}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const bannerImage = ownerDetails?.banner_image
    ? `${Image_URL}/${ownerDetails.banner_image}`
    : "/Areas/banner.png";

  return (
    <div className="flex justify-center md:pb-60 sm:pb-[22rem] pb-[25rem]">
      <div
        className="h-[40rem] md:h-screen w-[90%] macbook:h-[80vh] md:w-[95%] md:pt-[140px] bg-cover bg-no-repeat bg-center rounded-bl-[50px] rounded-br-[50px] md:rounded-bl-[90px] md:rounded-br-[90px] flex flex-col justify-center sm:py-0 py-16 px-10"
        style={{ backgroundImage: `url(${bannerImage})` }}
      >
        <div className="lg:w-3/6 sm:w-1/2 w-full md:pl-[100px] sm:text-start text-center text-white flex flex-col lg:gap-3 gap-2">
          {/* Name */}
          <h1 className="lg:text-[35px] font-newsLetter uppercase font-semibold text-[24px] macbook:text-[70px]">
            {ownerDetails?.name}
          </h1>

          {/* Description with Read More */}
          {ownerDetails?.description &&
          ownerDetails.description.length > 400 ? (
            <>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isExpanded
                    ? "max-h-[600px]"
                    : "max-h-[140px] md:max-h-[100px] macbook:max-h-[300px]"
                }`}
              >
                <div className="text-sm macbook:text-lg">
                  <ParseBody body={ownerDetails?.description} />
                </div>
              </div>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-2 text-start text-white text-xs macbook:text-lg font-medium hover:underline"
              >
                {isExpanded ? "Read Less" : "Read More"}
              </button>
            </>
          ) : (
            <div className="text-sm font-montserrat">
              <ParseBody body={ownerDetails?.description} />
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-row sm:justify-start justify-center gap-3 pt-3">
            <a href="tel:+97144542828">
              <button className="bg-white font-montserrat rounded text-black px-6 py-2 macbook:text-[25px]">
                Call Now
              </button>
            </a>
            {ownerDetails?.email && (
              <button
                onClick={() => handleEmailClick(ownerDetails.email)}
                className="border border-white rounded text-white p-1.5 px-2"
              >
                <IoIosMail size={30} />
              </button>
            )}
            {ownerDetails?.mobile_no && (
              <button
                onClick={() =>
                  handleWhatsAppClick(
                    ownerDetails.mobile_no,
                    "Hello, I want to connect!"
                  )
                }
                className="border border-white rounded text-white p-1.5 px-2"
              >
                <FaWhatsapp size={30} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerBanner;
