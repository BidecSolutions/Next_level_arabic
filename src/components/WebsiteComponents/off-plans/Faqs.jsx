"use client";

import { useState, useEffect } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
// import axios from "../../../Utils/axios";
import { Image_NotFound, Image_URL } from "@/config/constants";
import { fetchFaqs } from "@/lib/api/offplan.server";

export const Faqs = ({ page, heading }) => {
  const [faqs, setfaqs] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.public.post("user/pages-faqs/pages_wise", {
//           type: page ? page : "",
//         });
//         setfaqs(response.data.data);
//         console.log(response.data.data);
//       } catch (error) {
//         console.log("Categories Page", error);
//       }
//     };
//     fetchData();
//   }, [page]);

useEffect(() => {
    fetchFaqs(page).then((data) => {
      setfaqs(data);
    });
  }, [page]);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="flex justify-center w-full md:w-[60%] gap-4 flex-col bg-transparent text-white">
      <h4
        className="md:text-5xl macbook:text-[55px] font-newsLetter text-2xl text-gray-500 py-8"
        dangerouslySetInnerHTML={{
          __html: heading ? heading : "Frequently Asked Questions",
        }}
      />
      {faqs.length === 0 && (
        <h4 className="text-center text-[25px] font-montserrat w-full flex justify-center text-gray-500">
          No Faqs available
        </h4>
      )}
      {faqs?.slice(0, 3).map((faq, index) => (
        <div key={index} className="w-full border-b mb-2">
          <div className="transition duration-300">
            <div
              className="flex justify-between items-center roundedxl cursor-pointer"
              onClick={() => toggleAccordion(index)}
            >
              <h5 className="md:text-xl fontsemibold font-montserrat text-lg macbook:text-[26px] text-gray-600 py-4">
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
                <p className="text-sm md:text-lg font-montserrat macbook:text-xl px-4">
                  {faq?.answer}
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
