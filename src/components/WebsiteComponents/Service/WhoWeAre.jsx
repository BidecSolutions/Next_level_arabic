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
    `Whether you own a residential property or a commercial one and wish
    to rent it out, then visit Next Level real estate. We provide
    high-quality property management services for a premium annual
    property management fee. Renting commercial vs residential real
    estate is not the same. A commercial property that is built to
    accommodate businesses requires a little more and more thoughtful
    effort to find the right tenant.`;

  return (
    <div className="flex flex-col-reverse md:flex-row items-center gap-[40px] macbook:gap-[60px] justify-center w-full my-24">
      {/* Left Side */}
      <div className="md:w-[40%] flex flex-col justify-center">
        <div className="mb-8">
          <h3 className="text-[17px] font-newsLetter md:text-[34px] text-center md:text-start text-[#8F8F8F]">
            {data?.who_we_are_heading || "Who We Are?"}
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
                  {isExpanded ? "Show Less" : "Show More"}
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
                  {detail?.title || "Default Title"}
                </h4>
                <p
                  className="mt-1 text-[13px] font-montserrat text-center md:text-start text-[#555555]"
                  dangerouslySetInnerHTML={{
                    __html:
                      detail?.description ||
                      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
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
          alt={data?.who_we_are_image_alt || "Who We Are"}
          className="w-[550px] h-[450px] max-h-[30rem] rounded-tl-[150px]"
        />
      </div>
    </div>
  );
}
