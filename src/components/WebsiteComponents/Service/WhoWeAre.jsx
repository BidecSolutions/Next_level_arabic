"use client";

import { useState, useEffect } from "react";
import { useParams, usePathname } from "next/navigation";
// import { getPropertyManagementDetail } from "@/lib/api/service.server";
import { Image_NotFound, Image_URL } from "@/config/constants";
import { getPropertyManagementDetail } from "@/lib/api/sevice.server";

export default function WhoWeAre({ pmId: pmIdProp, propData: propDataProp }) {
  const [data, setData] = useState(propDataProp || {});
  const [isExpanded, setIsExpanded] = useState(false);
  const params = useParams();
  const pathname = usePathname();

  const pmId = pmIdProp || params?.slug; // Prefer prop, else dynamic route slug

  useEffect(() => {
    if (!propDataProp && pmId) {
      (async () => {
        try {
          const res = await getPropertyManagementDetail(pmId);
          const responseData = res?.data?.data || res?.data || res;

          if (responseData?.status === 1) {
            setData(responseData);
          }
        } catch (error) {
          console.error("❌ Error fetching WhoWeAre data:", error);
        }
      })();
    } else {
      setData(propDataProp);
    }
  }, [pmId, pathname, propDataProp]);

  const displayData =
    data?.who_we_are_details?.length > 0
      ? JSON.parse(data.who_we_are_details)
      : [];

  const description =
    data?.who_we_are_description ||
    `سواء كنت تملك عقارًا سكنيًا أو تجاريًا وترغب في تأجيره، تفضل بزيارة شركة نيكست ليفل للعقارات. نقدم خدمات إدارة عقارات عالية الجودة مقابل رسوم سنوية مميزة. يختلف استئجار العقارات التجارية عن استئجار العقارات السكنية. فالعقار التجاري المُصمم لاستيعاب الشركات يتطلب جهدًا أكبر وأكثر دقة للعثور على المستأجر المناسب..`;

  return (
    <div className="flex flex-col-reverse md:flex-row items-center gap-[40px] macbook:gap-[60px] justify-center w-full my-24">
      {/* Left Side */}
      <div className="md:w-[40%] flex flex-col justify-center">
        <div className="mb-8">
          <h3 className="text-[17px] font-newsLetter md:text-[34px] text-center md:text-start text-[#8F8F8F]">
            {data?.who_we_are_heading || "من نحن؟"}
          </h3>
          <div className="md:w-[70%]">
            <div>
              <div
                className={`text-[16px] font-montserrat text-[#555555] md:leading-[23px] macbook:text-[35px] macbook:leading-[38px] text-center md:text-start ${
                  isExpanded
                    ? "max-h-[4rem] overflow-y-auto"
                    : "max-h-[4rem] overflow-hidden"
                } transition-all duration-300`}
                dangerouslySetInnerHTML={{
                  __html: description,
                }}
              />
              {description.length > 100 && (
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

        {/* Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayData?.map((detail, index) => (
            <div
              key={index}
              className="flex flex-col items-center md:items-start gap-[10px]"
            >
              <img src="/about/icon1.png" alt="Icon" className="w-10 h-10" />
              <div className="flex flex-col items-center md:items-start gap-[2px] md:w-52">
                <h4 className="text-[16px] font-montserrat md:text-[16px] text-center md:text-start font-semibold text-[#555555]">
                  {detail?.title || "العنوان الافتراضي"}
                </h4>
                <p
                  className="mt-1 text-[13px] font-montserrat text-center md:text-start text-[#555555]"
                  dangerouslySetInnerHTML={{
                    __html:
                      detail?.description ||
                      "Lorem Ipsum هو ببساطة نص شكلي (بلا معنى) يستخدم في صناعة الطباعة والتنضيد.",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side */}
      <div className="md:w-[40%]">
        <img
          src={
            data?.who_we_are_image
              ? `${Image_URL}/${data?.who_we_are_image}`
              : Image_NotFound
          }
          alt={data?.who_we_are_image_alt || "من نحن"}
          className="w-[550px] h-[450px] max-h-[30rem] rounded-tl-[150px]"
        />
      </div>
    </div>
  );
}
