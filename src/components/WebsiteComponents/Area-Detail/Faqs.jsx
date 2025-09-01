"use client";

import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Faqs = ({ faqs, heading }) => {
  let parsedFaqs = [];

  try {
    if (typeof faqs === "string") {
      // First parse
      let parsed = JSON.parse(faqs || "[]");

      // Handle double-encoded JSON
      if (typeof parsed === "string") {
        parsed = JSON.parse(parsed);
      }

      parsedFaqs = Array.isArray(parsed) ? parsed : [];
    } else if (Array.isArray(faqs)) {
      parsedFaqs = faqs;
    } else {
      parsedFaqs = [];
    }
  } catch (err) {
    console.error("❌ Invalid FAQ data:", faqs, err);
    parsedFaqs = [];
  }

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="flex justify-center w-full md:w-[60%] gap-4 flex-col bg-transparent text-white">
      <h4 className="md:text-5xl macbook:text-[55px] font-newsLetter text-2xl text-gray-500 py-8">
        {heading || "الأسئلة الشائعة"}
      </h4>

      {parsedFaqs.length === 0 && (
        <p className="text-[25px] font-montserrat w-full flex justify-center text-gray-500">
          لا توجد أسئلة شائعة متاحة
        </p>
      )}

      {parsedFaqs.slice(0, 5).map((faq, index) => (
        <div key={index} className="w-full border-b mb-2">
          <div className="transition duration-300">
            <div
              className="flex justify-between items-center rounded-xl cursor-pointer"
              onClick={() => toggleAccordion(index)}
            >
              <p className="md:text-xl font-semibold font-bombay text-lg macbook:text-[26px] text-gray-600 py-4">
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

export default Faqs;
