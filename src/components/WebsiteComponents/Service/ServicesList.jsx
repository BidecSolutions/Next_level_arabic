"use client";

import { useState } from "react";
// import ParseBody from "../PropertyDetails/ParseBody";
import { Image_NotFound, Image_URL } from "@/config/constants";
import ParseBody from "../HomeComponents/ParseBody";

export default function ServicesList({ propData }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Use propData or fallback to empty object
  const data = propData || {};

  const description =
    data?.exclusive_list_of_nlre_description ||
    `سواء كنت تملك عقارًا سكنيًا أو تجاريًا وترغب في تأجيره، تفضل بزيارة شركة نيكست ليفل للعقارات. نقدم خدمات إدارة عقارات عالية الجودة مقابل رسوم سنوية مميزة. يختلف استئجار العقارات التجارية عن استئجار العقارات السكنية. فالعقار التجاري المُصمم لاستيعاب الشركات يتطلب جهدًا أكبر وأكثر دقة للعثور على المستأجر المناسب.`;

  return (
    // <div className="flex flex-col-reverse md:flex-row items-center gap-[40px] justify-center w-full">
    //   {/* Right Side - Image */}
    //   <div className="md:w-[35%]">
    //     <img
    //       src={data?.exclusive_list_of_nlre_image ? `${Image_URL}${data.exclusive_list_of_nlre_image}` : Image_NotFound}
    //       alt={data?.exclusive_list_of_nlre_image_alt || "Service Image"}
    //       className="w-full md:h-[500px] macbook:w-[500px] rounded-tl-[150px]"
    //       onError={(e) => {
    //         e.currentTarget.src = Image_NotFound;
    //       }}
    //     />
    //   </div>

    //   {/* Left Side - Heading and Description */}
    //   <div className="md:w-[45%] flex flex-col justify-center md:justify-start">
    //     <h4 className="text-[17px] font-newsLetter lg:text-[32px] text-center md:text-start text-[#8F8F8F]">
    //       {data?.exclusive_list_of_nlre_heading || "Exclusive List Heading"}
    //     </h4>

    //     <div className="mb-1">
    //       <div
    //         className={`text-[16px] font-montserrat text-[#555555] md:leading-[23px] macbook:text-[35px] macbook:leading-[38px] text-center md:text-start ${
    //           isExpanded
    //             ? "max-h-[23rem] overflow-y-auto"
    //             : "max-h-[23rem] overflow-hidden"
    //         } transition-all duration-300`}
    //       >
    //         <ParseBody body={description} />
    //       </div>

    //       {description.length > 600 && (
    //         <button
    //           onClick={() => setIsExpanded(!isExpanded)}
    //           className="text-[11px] font-montserrat text-[#8F8F8F] px-2 py-1 rounded-md"
    //         >
    //           {isExpanded ? "Read Less" : "Read More"}
    //         </button>
    //       )}
    //     </div>
    //   </div>
    // </div>
        <div className="flex flex-col-reverse md:flex-row items-center gap-[40px] justify-center w-full   ">
      {/* Right Side - Image */}
      <div className="md:w-[35%] ">
        <img
          src={`${Image_URL}${data?.exclusive_list_of_nlre_image}`}
          alt={data?.exclusive_list_of_nlre_image_alt}
          className="w-full md:h-[500px]  macbook:w-[500px] rounded-tl-[150px]  "
          onError={(e) => {
            e.currentTarget.src = Image_NotFound; // Path to your dummy image
          }}
        />
      </div>

      {/* Left Side - Heading, Description, and Services */}
      <div className="md:w-[45%]  flex flex-col justify-center md:justify-start ">
        {/* Heading and Description */}
        <div className="   flex flex-col justify-center md:justify-start ">
          <h4 className="text-[17px] font-newsLetter  lg:text-[32px]  text-center md:text-start text-[#8F8F8F]">
            {data ? data?.exclusive_list_of_nlre_heading : "عنوان القائمة الحصرية"}
          </h4>
          <div className="mb-1">
            <div
              className={`text-[16px] font-montserrat text-[#555555] md:leading-[23px] macbook:text-[35px] macbook:leading-[38px] text-center md:text-start ${
                isExpanded
                  ? "max-h-[23rem]   overflow-y-auto"
                  : "max-h-[23rem]  overflow-hidden"
              } transition-all duration-300`}
            >
              <ParseBody body={description} />
            </div>
            {description.length > 600 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="    text-[11px] font-montserrat text-[#8F8F8F]   px-2 py-1 rounded-md"
              >
                {isExpanded ? "اقرأ أقل" : "اقرأ المزيد"}
              </button>
            )}
          </div>
          {/* <div>
            <div className="flex flex-row gap-[10px] mt-4 ">
              <div className="flex items-center gap-[4px] px-1 md:px-2 py-2 border border-[#0B0B0B] rounded-[10px] ">
                <img
                  src="/property-management/support.png"
                  className="  w-[20px] md:w-[40px]  "
                  alt=""
                />
                <p className="text-[#8F8F8F] text-[10px] md:text-[14px]  font-montserrat ">
                  Full support
                </p>
              </div>
              <div className="flex items-center gap-[4px] px-1 md:px-2 py-2 border border-[#0B0B0B] rounded-[10px] ">
                <img
                  src="/property-management/brand.png"
                  className="  w-[20px] md:w-[40px]  "
                  alt=""
                />
                <p className="text-[#8F8F8F] text-[11px] md:text-[14px]  font-montserrat ">
                  Brand New Projects
                </p>
              </div>
              <div className="flex items-center gap-[4px] px-1 md:px-2 py-2 border border-[#0B0B0B] rounded-[10px] ">
                <img
                  src="/property-management/booking.png"
                  className="  w-[20px] md:w-[40px]  "
                  alt=""
                />
                <p className="text-[#8F8F8F] text-[11px] md:text-[14px]  font-montserrat ">
                  Priority Booking
                </p>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
