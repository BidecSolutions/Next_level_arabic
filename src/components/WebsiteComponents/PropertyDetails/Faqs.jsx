'use client';

import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export const Faqs = ({ faqs }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="flex justify-center w-full md:w-[60%] gap-4 flex-col bg-transparent text-white">
      <h3 className="text-2xl md:text-3xl mb-4 text-[#8F8F8F] py-8 font-newsLetter">
        Frequently asked questions
      </h3>
      {faqs?.slice(0, 5).map((faq, index) => (
        <div key={index} className="w-full border-b mb-2">
          <div className="transition duration-300">
            <div
              className="flex justify-between items-center roundedxl cursor-pointer"
              onClick={() => toggleAccordion(index)}
            >
              <p className="md:text-xl fontsemibold font-bombay text-lg macbook:text-[26px] text-gray-600 py-4">
                {faq.question}
              </p>
              <span className="md:text-2xl text-xl px-4 text-gray-600">
                {activeIndex === index ? (
                  <IoIosArrowUp className="animate-bounce" />
                ) : (
                  <IoIosArrowDown />
                )}
              </span>
            </div>
            {activeIndex === index && (
              <div className="p-4 text-gray-500 rounded-b-xl">
                <p className="text-sm md:text-lg macbook:text-xl px-4">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
