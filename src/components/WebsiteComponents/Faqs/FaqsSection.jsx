"use client";

import { getFaqsByTitleId, getFaqTitles } from "@/lib/api/faqs.server";
import { useState, useEffect } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
// import axios from "@/utils/axios"; // update the path for your project

const FaqsSection = () => {
  const [faqs, setFaqs] = useState([]);
  const [titles, setTitles] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  // ✅ Detect screen size safely in Next.js (no SSR window issue)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 700);
    };
    handleResize(); // run once on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Fetch titles on mount
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.public.get("user/faqs/titles");
//         const fetchedTitles = response.data.data || [];

//         setTitles(fetchedTitles);

//         if (fetchedTitles.length > 0) {
//           const first = fetchedTitles[0];
//           setSelectedTitle(first.title);
//           setSelectedId(first.id);
//           fetchFaqsByTitleId(first.id);
//         }
//       } catch (error) {
//         console.error("Error fetching titles:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   const fetchFaqsByTitleId = async (id) => {
//     try {
//       const response = await axios.public.post("user/faqs/type_wise", {
//         title_id: id,
//       });
//       setFaqs(response.data.data || []);
//     } catch (error) {
//       console.error("Error fetching FAQs:", error);
//     }
//   };
useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedTitles = await getFaqTitles();
        setTitles(fetchedTitles);

        if (fetchedTitles.length > 0) {
          const first = fetchedTitles[0];
          setSelectedTitle(first.title);
          setSelectedId(first.id);

          const faqsData = await getFaqsByTitleId(first.id);
          setFaqs(faqsData);
        }
      } catch (error) {
        console.error("Error fetching titles:", error);
      }
    };
    fetchData();
  }, []);

  const handleTitleClick = (title, id) => {
    setSelectedTitle(title);
    setSelectedId(id);
    fetchFaqsByTitleId(id);
  };

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="flex justify-center">
      <div
        className="flex flex-col md:flex-row macbook:justify-center macbook:items-center p-6 lg:p-24 lg:pl-0 gap-[20px] w-[95%] md:w-[80%] macbook:w-[60%]"
        style={{ borderBottom: "1px solid #00000033" }}
      >
        {/* Table of Contents */}
        <div className="md:w-[35%] md:pr-8">
          <p className="text-[24px] md:text-[29px] text-center font-newsLetter md:text-start mb-4 text-[#8F8F8F]">
            Table of Contents
          </p>

          {isMobile ? (
            <div className="relative flex justify-center">
              <button
                onClick={toggleDropdown}
                className="text-[#555555] flex font-montserrat justify-center w-[280px] border border-[#555555] font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center"
                type="button"
              >
                {selectedTitle
                  ? selectedTitle.substring(0, 30)
                  : titles.length > 0
                  ? titles[0].title.substring(0, 30)
                  : "No Titles"}
                <IoIosArrowDown className="w-2.5 h-2.5 ms-3" />
              </button>
              {isDropdownOpen && (
                <div className="z-10 absolute flex justify-center w-[280px] bg-white shadow mt-2">
                  <ul className="py-2 text-sm text-gray-700">
                    {titles.map(({ id, title }) => (
                      <li
                        key={id}
                        className={`font-bold text-[12px] py-2 font-montserrat cursor-pointer ${
                          selectedTitle === title
                            ? "text-[#555555]"
                            : "text-[#B7B7B7]"
                        }`}
                        onClick={() => handleTitleClick(title, id)}
                      >
                        {title.substring(0, 40)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <ul className="space-y-2 flex flex-col gap-[10px] text-gray-500">
              {titles.map(({ id, title }) => (
                <li
                  key={id}
                  className={`font-montserrat cursor-pointer ${
                    selectedTitle === title
                      ? "text-[#555555] font-bold md:text-[16px]"
                      : "text-[#B7B7B7] md:text-[17px]"
                  }`}
                  onClick={() => handleTitleClick(title, id)}
                >
                  {title.substring(0, 28)}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* No FAQs */}
        {faqs.length === 0 && (
          <p className="text-center text-[25px] font-montserrat w-full flex justify-center text-gray-500">
            No FAQs available
          </p>
        )}

        {/* Right Section: FAQs */}
        <div className="md:w-3/4 macbook:w-[50%]">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4 border-b border-gray-300">
              <div
                className="flex justify-between gap-[10px] items-center cursor-pointer py-4"
                onClick={() => toggleAccordion(index)}
              >
                <h5 className="text-[14px] font-montserrat md:text-[18px] md:font-medium text-[#555555]">
                  {faq.question}
                </h5>
                <span className="text-[#555555]">
                  {activeIndex === index ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </span>
              </div>
              {activeIndex === index && (
                <div className="pl-1 md:pl-4 pb-4 text-[#555555]">
                  <p className="text-[15px] md:text-[13px] font-montserrat">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqsSection;
