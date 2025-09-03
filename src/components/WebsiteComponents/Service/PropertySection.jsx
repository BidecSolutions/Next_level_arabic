"use client";

import { useState, useEffect } from "react";
import { useParams, usePathname } from "next/navigation";
// import { getPropertyManagementDetail } from "@/lib/api/service.server";
// import { Image_Url } from "@/utils/const";
// import RegisterForm from "../RegisterForm";
import { Image_NotFound, Image_URL } from "@/config/constants";
import RegisterForm from "../Forms/RegisterForm";
import { getPropertyManagementDetail } from "@/lib/api/sevice.server";

export default function PropertySection({ pmId: pmIdProp, propData: propDataProp }) {
  const [data, setData] = useState(propDataProp || {});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const params = useParams();
  const pathname = usePathname();
  const pmId = pmIdProp || params?.slug;

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
          console.error("❌ Error fetching property data:", error);
        }
      })();
    } else {
      setData(propDataProp);
    }
  }, [pmId, pathname, propDataProp]);

  return (
    <div className="w-full relative flex my-24 justify-center">
      <div
        className="bg-cover bg-center rounded-[30px] md:overflow-hidden md:w-[80%] macbook:w-[70%] h-[400px] md:h-[400px] macbook:h-[600px] mb-16"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${Image_URL}${
            data?.property_management_image || "/Areas/banner.png"
          })`,
        }}
      >
        {/* Top Circle */}
        <div className="absolute top-[-10px] left-1/2 bg-[#8F8F8F] p-1 z-10 border-2 border-white w-5 h-5 rounded-full"></div>

        {/* Overlay */}
        <div className="flex flex-col justify-center h-[100%] items-center text-center">
          {/* Heading */}
          <h3 className="text-white font-newsLetter text-[23px] md:text-[34px] md:leading-[53px] md:w-[60%]">
            {data?.property_management_heading || "من نحن؟"}
          </h3>

          {/* Description */}
          <p
            className="text-white font-montserrat mt-4 text-[13px] leading-[19px] md:leading-[24px] md:text-[15px] w-[94%] md:w-[70%]"
            dangerouslySetInnerHTML={{
              __html:
                data?.property_management_description ||
                "اكتشف خدماتنا العقارية المتخصصة، المصممة خصيصًا لمساعدتك في العثور على العقار المثالي بكل سهولة وثقة",
            }}
          />

          {/* Buttons */}
          <div className="mt-6 flex items-center flex-row px-2 gap-[5px] md:gap-[12px]">
            <button
              className="bg-white border text-[12px] w-[90px] md:w-[200px] font-montserrat border-white text-[#555555] py-2 md:px-4 rounded-[8.8px] hover:bg-transparent hover:text-white"
              onClick={() => (window.location.href = "tel:+97144542828")}
            >
             اتصل بنا
            </button>
            <button
              className="bg-transparent font-montserrat w-[190px] md:w-[250px] text-[11px] border border-white text-white py-2 md:px-4 rounded-[8.8px]"
              onClick={() => setIsModalOpen(true)}
            >
              حدد موعدًا
            </button>
          </div>
        </div>
      </div>

      {/* Modal Form */}
      <RegisterForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
