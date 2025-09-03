// "use client";

// import { useState, useEffect } from "react";
// import { FaWhatsapp } from "react-icons/fa";
// import { useParams } from "next/navigation";
// // import { Image_NotFound, Image_Url } from "@/Utils/const";
// // import ParseBody from "../PropertyDetails/ParseBody";
// // import RegisterForm from "../RegisterForm";
// import { Image_NotFound, Image_URL } from "@/config/constants";
// import ParseBody from "../HomeComponents/ParseBody";
// import RegisterForm from "../Forms/RegisterForm";

// export default function GallerySection({ pmId: pmIdProp, propData, page }) {
//   const params = useParams();
//   const pmId = pmIdProp || params?.slug;

//   const [data, setData] = useState(propData || {});
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const description =
//     data?.highly_professional_description ||
//     "AR Properties is founded by Mohamed Alabbar - a UAE-based leading developer in 1997. With vast years of experience, the developer has set up six business segments and 60 active companies in several regions like The Middle East, North Africa, Asia, Europe and North.";

//   // If you really need client-side fetch when propData not passed (not recommended in Next.js)
//   // useEffect(() => {
//   //   if (!propData && pmId) {
//   //     const fetchData = async () => {
//   //       try {
//   //         const res = await fetch(
//   //           `${process.env.NEXT_PUBLIC_API_BASE_URL}user/property-managements/propertyManagementDetailUsingSlug`,
//   //           {
//   //             method: "POST",
//   //             headers: { "Content-Type": "application/json" },
//   //             body: JSON.stringify({ slug: `${pmId}/` }),
//   //           }
//   //         );
//   //         const result = await res.json();
//   //         if (result?.status === 1) {
//   //           setData(result.data);
//   //         }
//   //       } catch (err) {
//   //         console.error("Error fetching property data:", err);
//   //       }
//   //     };
//   //     fetchData();
//   //   }
//   // }, [pmId, propData]);

//   return (
//     <div className="flex w-full justify-center pb-16 md:py-24">
//       <div className="flex flex-col md:flex-row macbook:w-[80%] md:h-[500px] justify-center gap-[20px] md:gap-[25px]">
        
//         {/* Left Photo */}
//         <div className="flex justify-center md:w-[40%] macbook:w-[30%] gap-[10px]">
//           <img
//             src={`${Image_URL}${data?.highly_professional_image}`}
//             alt={data?.highly_professional_image_alt || "Gallery Image"}
//             className="w-full md:w-[500px] md:h-[500px] macbook:w-[450px] rounded-tl-[150px]"
//             onError={(e) => {
//               e.currentTarget.src = Image_NotFound;
//             }}
//           />
//         </div>

//         {/* Right Content */}
//         <div className="w-full md:h-[450px] md:w-[40%] gap-[12px] macbook:w-[50%] flex flex-col items-center md:items-start">
//           <h3 className="text-[20px] font-newsLetter md:text-[34px] text-center md:text-start text-[#8F8F8F] mb-1">
//             {data?.highly_professional_heading
//               ? data.highly_professional_heading.substring(0, 50)
//               : "Printing and typesetting industry."}
//           </h3>

//           <div className="mb-1">
//             <div
//               className={`text-[16px] font-montserrat text-[#555555] md:leading-[23px] macbook:text-[35px] macbook:leading-[38px] text-center md:text-start ${
//                 isExpanded
//                   ? "max-h-[17rem] overflow-y-auto"
//                   : "max-h-[17rem] overflow-hidden"
//               } transition-all duration-300`}
//             >
//               <ParseBody body={description} />
//             </div>
//             {description.length > 600 && (
//               <button
//                 onClick={() => setIsExpanded(!isExpanded)}
//                 className="text-[11px] font-montserrat text-[#8F8F8F] px-2 py-1 rounded-md"
//               >
//                 {isExpanded ? "Read Less" : "Read More"}
//               </button>
//             )}
//           </div>

//           <div className="flex flex-row items-center justify-center">
//             <button
//               className="px-6 py-2 font-montserrat bg-[#8F8F8F] hover:bg-transparent hover:text-[#8F8F8F] border hover:border-[#8F8F8F] text-white rounded-[6.5px]"
//               onClick={() => setIsModalOpen(true)}
//             >
//               Book a Valuation
//             </button>

//             <button className="ml-2 p-1.5 border-2 border-[#555555] text-xl text-[#555555] rounded-[3.5px]">
//               <a
//                 href="https://wa.me/+971552588870"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <FaWhatsapp />
//               </a>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Modal */}
//       <RegisterForm
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         page={page}
//       />
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { Image_NotFound, Image_URL } from "@/config/constants";
import ParseBody from "../HomeComponents/ParseBody";
import RegisterForm from "../Forms/RegisterForm";

export default function GallerySection({ propData, page }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const description = propData?.highly_professional_description || "";

  return (
    <div className="flex w-full justify-center pb-16 md:py-24">
      <div className="flex flex-col md:flex-row macbook:w-[80%] md:h-[500px] justify-center gap-[20px] md:gap-[25px]">
        
        {/* Left Photo */}
        <div className="flex justify-center md:w-[40%] macbook:w-[30%] gap-[10px]">
          <img
            src={propData?.highly_professional_image ? `${Image_URL}${propData.highly_professional_image}` : Image_NotFound}
            alt={propData?.highly_professional_image_alt || "Gallery Image"}
            className="w-full md:w-[500px] md:h-[500px] macbook:w-[450px] rounded-tl-[150px]"
            onError={(e) => {
              e.currentTarget.src = Image_NotFound;
            }}
          />
        </div>

        {/* Right Content */}
        <div className="w-full md:h-[450px] md:w-[40%] gap-[12px] macbook:w-[50%] flex flex-col items-center md:items-start">
          <h3 className="text-[20px] font-newsLetter md:text-[34px] text-center md:text-start text-[#8F8F8F] mb-1">
            {propData?.highly_professional_heading || ""}
          </h3>

          <div className="mb-1">
            <div
              className={`text-[16px] font-montserrat text-[#555555] md:leading-[23px] macbook:text-[35px] macbook:leading-[38px] text-center md:text-start ${
                isExpanded
                  ? "max-h-[17rem] overflow-y-auto"
                  : "max-h-[17rem] overflow-hidden"
              } transition-all duration-300`}
            >
              <ParseBody body={description} />
            </div>
            {description.length > 600 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-[11px] font-montserrat text-[#8F8F8F] px-2 py-1 rounded-md"
              >
                {isExpanded ? "اقرأ أقل" : "اقرأ المزيد"}
              </button>
            )}
          </div>

          <div className="flex flex-row items-center justify-center">
            <button
              className="px-6 py-2 font-montserrat bg-[#8F8F8F] hover:bg-transparent hover:text-[#8F8F8F] border hover:border-[#8F8F8F] text-white rounded-[6.5px]"
              onClick={() => setIsModalOpen(true)}
            >
             حجز التقييم
            </button>

            <button className="ml-2 p-1.5 border-2 border-[#555555] text-xl text-[#555555] rounded-[3.5px]">
              <a
                href="https://wa.me/+971552588870"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp />
              </a>
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <RegisterForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        page={page}
      />
    </div>
  );
}
