"use client";

import { useEffect, useState } from "react";
import { FaEnvelope, FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { fetchOwnerDetails } from "@/lib/api/agent.server";
import { Image_NotFound, Image_URL } from "@/config/constants";

const ProfileSection = ({info}) => {
  // const [info, setInfo] = useState({});
  const router = useRouter();
console.log("info", info);
  // useEffect(() => {
  //   const loadOwner = async () => {
  //     const data = await fetchOwnerDetails();
  //     setInfo(data);
  //   };

  //   // if (!info) {
  //     loadOwner();
  //   // }
  // }, []);

  // Handle Email click
  const handleEmailClick = (email) => {
    window.location.href = `mailto:${email}`;
  };

  // Handle WhatsApp click
  const handleWhatsAppClick = (phoneNumber, message) => {
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(
      "+",
      ""
    )}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="flex justify-center py-16 md:py-24">
      <div className="flex flex-col md:flex-row border-b border-black md:border-b-transparent pb-8 items-center md:items-start md:p-16 gap-8 rounded-lg">
        
        {/* Left Side - Banner Image */}
        <div className="relative md:w-[40%] flex justify-end">
          <img
            src={`${Image_URL}${info?.owner_image || ""}`}
            alt={info?.owner_image_alt || "مالك"}
            className="w-[100%] h-64 md:w-[400px] md:h-[100%] object-cover md:rounded-br-[100px]"
            onError={(e) => {
              e.currentTarget.src = Image_NotFound;
            }}
          />
        </div>

        {/* Right Side - Content */}
        <div className="flex flex-col justify-center text-center md:text-start gap-4 md:pl-8 md:w-[40%] md:h-[100%]">
          <h2 className="text-2xl font-newsLetter md:text-[48px] macbook:text-[55px] md:pb-4 text-[#8F8F8F] leading-10">
            {info?.name || "اسم المالك"}
          </h2>

          <p
            className="text-[#555555] w-full break-words md:text-[15px] font-montserrat macbook:text-[35px] macbook:leading-[35px] text-sm md:leading-[26px]"
            dangerouslySetInnerHTML={{
              __html: info?.description || "لا يوجد وصف متاح",
            }}
          ></p>

          {/* Buttons Section */}
          <div className="flex gap-4 justify-center md:justify-start mt-4">
            <Link
              href={`/agent/abdul-ahad-siddiq`}
              className="flex items-center font-montserrat macbook:text-[18px] gap-2 px-6 py-2 bg-[#A39D9D] text-white hover:text-gray-600 hover:bg-gray-300 rounded-md"
            >
              عرض الملف الشخصي
            </Link>

            {/* Email Button */}
            <button
              onClick={() =>
                handleEmailClick(info?.email || "info@nextlevelrealestate.ae")
              }
              className="flex items-center gap-2 px-3 py-2 border border-[#A39D9D] rounded-md"
            >
              <FaEnvelope className="text-[#A39D9D] text-[24px]" />
            </button>

            {/* WhatsApp Button */}
            <button
              onClick={() =>
                handleWhatsAppClick(
                  (info.mobile_no
                    ? info.mobile_no
                    : "+971552588870"
                  ).replace(/[\s-]+/g, ""),
                  "مرحبًا، أريد الاتصال!"
                )
              }
              className="flex items-center gap-2 px-2 py-2 border border-[#A39D9D] rounded-md"
            >
              <FaWhatsapp className="text-[#A39D9D] text-[24px]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
