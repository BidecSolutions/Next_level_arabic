"use client";

import { useState, useEffect } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export default function Faqs({ faq_details }) {
  const [faqs, setFaqs] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    if (faq_details) {
      try {
        const parsedFaqs = JSON.parse(faq_details);
        setFaqs(parsedFaqs);
        console.log("Parsed FAQs:", parsedFaqs);
      } catch (error) {
        console.error("Error parsing FAQ details:", error);
      }
    }
  }, [faq_details]);

  return (
    <div className="flex justify-center macbook:w-full md:w-[60%] gap-4 flex-col bg-transparent text-white">
      <h3 className="md:text-5xl macbook:text-[55px] font-newsLetter text-2xl text-gray-500 py-8">
        Frequently asked questions
      </h3>

      {faqs.length === 0 && (
        <p className="text-center text-[25px] font-montserrat w-full flex justify-center text-gray-500">
          No Faqs available
        </p>
      )}

      {faqs?.slice(0, 3).map((faq, index) => (
        <div key={index} className="w-full border-b mb-2">
          <div className="transition duration-300">
            <div
              className="flex justify-between items-center rounded-xl cursor-pointer"
              onClick={() => toggleAccordion(index)}
            >
              <h5 className="md:text-xl font-semibold font-montserrat text-lg macbook:text-[26px] text-gray-600 py-4">
                {faq?.question}
              </h5>
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
                <p
                  className="text-sm md:text-lg font-montserrat macbook:text-xl px-4"
                  dangerouslySetInnerHTML={{ __html: faq?.answer }}
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
