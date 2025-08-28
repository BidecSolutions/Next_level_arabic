"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaWhatsapp, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

import { getExcellentAgents } from "@/lib/api/agent.server";


import "./AgentSlider.css";
import { Image_NotFound, Image_URL } from "@/config/constants";

const AgentSlider = ({ data }) => {
  const [agents, setAgents] = useState([]);
  const [swiperKey, setSwiperKey] = useState(0);

  useEffect(() => {
    async function fetchAgents() {
      const result = await getExcellentAgents();
      setAgents(result);
      setSwiperKey((prev) => prev + 1);
    }
    fetchAgents();
  }, []);

  const handleWhatsAppClick = (phoneNumber, message) => {
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(
      "+",
      ""
    )}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleCallClick = (phoneNumber) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleEmailClick = (email) => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <div className="my-12 md:my-20">
      <p className="text-center font-newsLetter uppercase text-[#8F8F8F] text-[23px] md:text-4xl macbook:text-[48px] mb-8">
        {data?.agent_heading || "OUR TEAM"}
      </p>

      <div className="relative">
        <Swiper
          key={swiperKey}
          modules={[Pagination, Navigation, Autoplay]}
          spaceBetween={15}
          slidesPerView={1.5}
          centeredSlides={true}
          breakpoints={{
            1524: { slidesPerView: 3, spaceBetween: 1 },
            1024: { slidesPerView: 3, spaceBetween: 15 },
            768: { slidesPerView: 3, spaceBetween: 15 },
            640: { slidesPerView: 1, spaceBetween: 5 },
            0: { slidesPerView: 1, spaceBetween: 8 },
          }}
          navigation={{
            nextEl: ".agent-custom-next",
            prevEl: ".agent-custom-prev",
          }}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          loop={true}
          className="agent-slider"
        >
          {agents?.map((agent) => (
            <SwiperSlide key={agent.id}>
              <div className="flex flex-col items-center">
                <Link href={`/agent/${agent.slug}`}>
                  <div className="relative w-[250px] h-[300px] macbook:h-[450px] macbook:w-[350px]">
                    <Image
                      src={
                        agent.profile_image
                          ? `${Image_URL}${agent.profile_image}`
                          : Image_NotFound
                      }
                      alt={agent.name}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        e.currentTarget.src = Image_NotFound;
                      }}
                      unoptimized
                    />
                  </div>
                </Link>
                <p className="text-center font-montserrat text-[#0E1625] mt-4 text-[24px] font-semibold">
                  {agent.name}
                </p>
                <p className="text-center font-montserrat text-[#969AA5] text-[16px]">
                  {agent.department_name}
                </p>
                <div className="flex items-center justify-between mt-4 gap-[5px]">
                  <div
                    className="bg-[#8F8F8F] p-[5px] rounded-[5px] cursor-pointer"
                    onClick={() =>
                      handleWhatsAppClick(
                        (agent.whatsapp_no || "+971552588870").replace(
                          /[\s-]+/g,
                          ""
                        ),
                        "Hello, I want to connect!"
                      )
                    }
                  >
                    <FaWhatsapp className="text-white text-[10px] md:text-[15px]" />
                  </div>
                  <div
                    className="bg-[#8F8F8F] p-[5px] rounded-[5px] cursor-pointer"
                    onClick={() =>
                      handleCallClick(
                        (agent.phone_no || "+97144542828").replace(
                          /[\s-]+/g,
                          ""
                        )
                      )
                    }
                  >
                    <FaPhoneAlt className="text-white text-[10px] md:text-[15px]" />
                  </div>
                  <div
                    className="bg-[#8F8F8F] p-[5px] rounded-[5px] cursor-pointer"
                    onClick={() => handleEmailClick(agent.email)}
                  >
                    <FaEnvelope className="text-white text-[10px] md:text-[15px]" />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="absolute z-10 w-full hidden lg:block">
          <div
            className="agent-custom-prev swiper-button-prev px-4"
            style={{
              color: "red",
              top: "-220px",
              left: "6px",
              width: "1rem",
            }}
          ></div>
          <div
            className="agent-custom-next swiper-button-next px-4"
            style={{
              color: "red",
              top: "-220px",
              right: "6px",
              width: "1rem",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default AgentSlider;
