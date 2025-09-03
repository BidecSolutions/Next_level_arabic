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
      title: "حضور رقمي لا مثيل له",
      description:
        "لقد بذلنا في Next Level الكثير من الجهد للحفاظ على حضور رقمي لا مثيل له، مما يساعدنا على اكتساب رؤى السوق في الوقت الفعلي وتقديم خدمة عملاء لا مثيل لها.",
    },
    {
      id: 2,
      icon: "/home/agent.png",
      title: "خدمة شخصية",
      description:
        "مع نيكست ليفل للعقارات، لا يقتصر عملاؤنا على مجرد معاملة عادية. وكلاء متخصصون يخصصون الوقت الكافي لفهم احتياجات كل عميل وتفضيلاته وتطلعاته الفريدة، مما يضمن حلولاً مصممة خصيصاً لتتناسب مع أهدافه الشخصية.",
    },
    {
      id: 3,
      icon: "/home/hand.png",
      title: "الاستثمار الآمن",
      description:
        "شركة نكست ليفل العقارية من أكثر شركات العقارات ثقةً واعتماديةً في الشرق الأوسط فيما يتعلق بالاستثمار العقاري. حقق أهدافك العقارية باستثمار آمن مع نكست ليفل العقارية.",
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col items-center max-w-full my-12 md:my-20">
      {/* Section Heading */}
      <div className="flex md:items-center md:w-[70%] macbook:w-[60%] md:mb-16 flex-col mb-8 md:flex-row-reverse justify-between">
        <h2 className="text-[17px] md:w-[90%] font-newsLetter text-center md:text-right md:text-[30px] macbook:text-[40px] font-semibold mb-4">
          لماذا تختار شركة نيكست ليفل العقارية؟
        </h2>
        {/* Inquiry Button */}
        <div className="text-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-2 font-montserrat bg-[#8F8F8F] hover:bg-transparent hover:text-[#8F8F8F] border hover:border-[#8F8F8F] text-white macbook:text-[16px] rounded-[6.5px]"
          >
            سؤال
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
