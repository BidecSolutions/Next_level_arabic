import React, { useEffect, useState } from "react";
// import axios from "../../../Utils/axios";
// import { useLocation, useParams } from "react-router-dom";

const TopNotch = ({pmId, propData}) => {
//   const [data, setData] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
//   const location = useLocation();
  // Extract slug from the pathname
  // const pmId = location.pathname.split("/")[1];
 const data = propData || {};
 console.log(data,"topnotch")


  const description =
    data?.top_notch_description ||
    `سواء كنت تملك عقارًا سكنيًا أو تجاريًا وترغب في تأجيره، تفضل بزيارة شركة نيكست ليفل للعقارات. نقدم خدمات إدارة عقارات عالية الجودة مقابل رسوم سنوية مميزة. يختلف استئجار العقارات التجارية عن استئجار العقارات السكنية. فالعقار التجاري المُصمم لاستيعاب الشركات يتطلب جهدًا أكبر وأكثر دقة للعثور على المستأجر المناسب.`;

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

//         // Check the status directly
//         if (responseData.status === 1) {
//           setData(responseData);
//         }
//       } catch (error) {
//         console.log("Categories Page", error);
//       }
//     };
//     fetchData();
//   }else{
//     setData(propData);
//   }
//   }, [location.pathname,pmId, propData]);

  return (
    <div className="flex justify-center macbook: w-full md:w-[70%]    gap-4 flex-col bg-transparent">
      <h3 className="md:text-5xl   macbook:text-[55px] font-newsLetter text-2xl text-[#555555] py-2 uppercase">
        {data
          ? data?.top_notch_heading
          : " عقارات للإيجار من الدرجة الأولى <br /> خبراء الإدارة "}
      </h3>

      <div className="md:w-[70%]">
        <div className=" ">
          <div
            className={`text-[16px] font-montserrat text-[#555555] md:leading-[23px] macbook:text-[35px] macbook:leading-[38px] text-center md:text-start ${
              isExpanded
                ? "max-h-[28rem] overflow-y-auto"
                : "max-h-[30rem]   overflow-hidden"
            } transition-all duration-300`}
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          />
          {description.length > 600 && (
            <p
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-gray-500 md:text-start font-montserrat text-center mt-2 underline cursor-pointer text-[14px]"
            >
              {isExpanded ? "عرض أقل" : "عرض المزيد"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopNotch;