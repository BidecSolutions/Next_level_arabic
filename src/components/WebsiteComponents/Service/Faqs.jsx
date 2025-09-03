// import { useState, useEffect } from "react";
// import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
// // import axios from "../../../Utils/axios";
// import { useLocation, useParams } from "react-router-dom";

// export const Faqs = ({pmId, propData}) => {
//   const [faqs, setfaqs] = useState({});
// //   const location = useLocation();
//    // Extract slug from the pathname
//   //  const pmId = location.pathname.split("/")[1];
// const data = propData || {};
// console.log(data)
//   useEffect(() => {
//     if (!propData) {
//     const fetchData = async () => {
//       try {
//         const response = await axios.public.post(
//                   `user/property-managements/propertyManagementDetailUsingSlug`,
//                   {
//                     slug: `${pmId}/`,
//                   }
//         );
//         const responseData = response.data.data;
//         console.log("responseData -->", responseData);

//         if (responseData.status === 1) {
//           setfaqs(responseData);
//         }
//       } catch (error) {
//         console.log("Categories Page", error);
//       }
//     };
//     fetchData();
//   }else{
//     setfaqs(propData);
//   }
//   }, [location.pathname , pmId, propData]);

//   const [activeIndex, setActiveIndex] = useState(null);

//   const toggleAccordion = (index) => {
//     setActiveIndex(activeIndex === index ? null : index);
//   };

//   const displayData = (() => {
//     try {
//       return faqs?.faq_details ? JSON.parse(faqs.faq_details) : [];
//     } catch (error) {
//       console.error("Error parsing FAQ details:", error);
//       return [];
//     }
//   })();

//   return (
//     <div className="flex justify-center items-start w-full p-6 lg:pb-24 gap-4 flex-col md:w-[90%] bg-transparent text-white">
//       <h4 className="md:text-4xl font-newsLetter text-2xl text-gray-500 py-8">
//         Frequently asked questions
//       </h4>
//       {displayData.length === 0 ? (
//         <p className="text-[25px] font-montserrat w-full flex justify-center text-gray-500">
//           No FAQs available
//         </p>
//       ) : (
//         displayData.map((faq, index) => (
//           <div key={index} className="w-full mb-2">
//             <div className="transition duration-300 ">
//               <div
//                 className={`flex justify-between items-center rounded-xl cursor-pointer`}
//                 onClick={() => toggleAccordion(index)}
//               >
//                 <h5 className="md:text-xl font-montserrat text-lg text-[#8F8F8F] py-4">
//                   {faq.question}
//                 </h5>
//                 <span className="md:text-2xl text-xl px-4 text-gray-600">
//                   {activeIndex === index ? (
//                     <IoIosArrowUp className="animate-bounce" />
//                   ) : (
//                     <IoIosArrowDown />
//                   )}
//                 </span>
//               </div>
//               {activeIndex === index && (
//                 <div className="p-4 text-[#8F8F8F] rounded-b-xl">
//                   <p className="text-sm md:text-lg px-4 font-montserrat ">
//                     {faq.answer}
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };
"use client";

import { useState, useEffect } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export const Faqs = ({ pmId, propData }) => {
  const [faqs, setFaqs] = useState({});
  const [activeIndex, setActiveIndex] = useState(null);

  // Use propData if available, otherwise fallback to empty
  useEffect(() => {
    if (propData) {
      setFaqs(propData);
    } else {
      // If you want, here you could call the API, but you said not to
      setFaqs({});
    }
  }, [propData]);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const displayData = (() => {
    try {
      return faqs?.faq_details ? JSON.parse(faqs.faq_details) : [];
    } catch (error) {
      console.error("Error parsing FAQ details:", error);
      return [];
    }
  })();

  return (
    <div className="flex justify-center items-start w-full p-6 lg:pb-24 gap-4 flex-col md:w-[90%] bg-transparent text-white">
      <h4 className="md:text-4xl font-newsLetter text-2xl text-gray-500 py-8">
        الأسئلة الشائعة
      </h4>

      {displayData.length === 0 ? (
        <p className="text-[25px] font-montserrat w-full flex justify-center text-gray-500">
          لا توجد أسئلة وأجوبة متاحة
        </p>
      ) : (
        displayData.map((faq, index) => (
          <div key={index} className="w-full mb-2">
            <div className="transition duration-300">
              <div
                className="flex justify-between items-center rounded-xl cursor-pointer"
                onClick={() => toggleAccordion(index)}
              >
                <h5 className="md:text-xl font-montserrat text-lg text-[#8F8F8F] py-4">
                  {faq.question}
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
                <div className="p-4 text-[#8F8F8F] rounded-b-xl">
                  <p className="text-sm md:text-lg px-4 font-montserrat">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};
