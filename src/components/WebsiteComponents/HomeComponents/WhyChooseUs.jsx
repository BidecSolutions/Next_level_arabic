"use client"; // if you're using Next.js App Router

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import RegisterForm from "../Forms/RegisterForm";

const WhyChooseUs = () => {
  const reasons = [
    {
      id: 1,
      icon: "/home/house.png",
      title: "Unmatched Digital Presence",
      description:
        "We at Next Level have put a lot of effort into maintaining an unmatched digital presence, which helps us gain real-time market insights and provide unparalleled client service.",
    },
    {
      id: 2,
      icon: "/home/agent.png",
      title: "Personalized Service",
      description:
        "With Next Level Real Estate, customers aren’t just another transaction. Dedicated agents take the time to understand each client’s unique needs, preferences, and aspirations, ensuring tailor-made solutions that align with personal goals.",
    },
    {
      id: 3,
      icon: "/home/hand.png",
      title: "Secure Investment",
      description:
        "Next Level Real Estate is one of the most trusted and reliable real estate companies in the Middle East when it comes to property investment. Meet your lifelong goals with a secure investment at Next Level Properties.",
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col items-center max-w-full my-12 md:my-20">
      {/* Section Heading */}
      <div className="flex md:items-center md:w-[70%] macbook:w-[60%] md:mb-16 flex-col mb-8 md:flex-row justify-between">
        <h2 className="text-[17px] md:w-[90%] font-newsLetter text-center md:text-start md:text-[30px] macbook:text-[40px] font-semibold mb-4">
          Why You Choose Next-Level Real Estate?
        </h2>
        {/* Inquiry Button */}
        <div className="text-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-2 font-montserrat bg-[#8F8F8F] hover:bg-transparent hover:text-[#8F8F8F] border hover:border-[#8F8F8F] text-white macbook:text-[16px] rounded-[6.5px]"
          >
            Inquiry
          </button>
        </div>
      </div>

      {/* Reason Cards */}
      <div className="flex flex-col md:flex-row items-center md:justify-center gap-[10px] macbook:gap-[20px] md:w-[100%]">
        {reasons.map((reason) => (
          <div
            key={reason.id}
            className="flex flex-col md:w-[27%] macbook:w-[20%] mb-4 md:pl-[30px] macbook:gap-[30px] items-center md:items-start text-center md:text-left"
          >
            {/* Icon */}
            <div>
              <Image
                src={reason.icon}
                alt={reason.title}
                width={70}
                height={70}
                loading="lazy"
              />
            </div>

            {/* Title */}
            <h3 className="text-xl font-newsLetter font-bold text-[#222222] mb-4 macbook:text-[32px]">
              {reason.title}
            </h3>

            {/* Description */}
            <p className="text-[#222222] font-montserrat macbook:text-[22px] macbook:leading-[36px]">
              {reason.description}
            </p>
          </div>
        ))}
      </div>

      {/* Modal */}
      <RegisterForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        page={"Home Inquiry Section"}
      />
    </div>
  );
};

export default WhyChooseUs;
