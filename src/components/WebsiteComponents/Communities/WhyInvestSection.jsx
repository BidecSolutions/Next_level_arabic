"use client";

import { Image_NotFound, Image_URL } from "@/config/constants";

const WhyInvestSection = ({ data }) => {
  // 🔹 Parse why_invests string into array
  let invest = [];
  try {
    if (data?.why_invests) {
      invest = JSON.parse(data.why_invests);
    }
  } catch (error) {
    console.error("Error parsing why_invests JSON:", error);
  }

  return (
    <div
      className="bg-cover bg-center py-10 md:py-24 flex flex-col items-center macbook:gap-[35px] text-white"
      style={{ backgroundImage: `url(/community/bg.png)` }}
    >
     <h2 className="text-center font-newsLetter text-[18px] md:text-[24px] font-semibold mb-12 uppercase  macbook:text-[44px] ">
        {data ? data?.why_invest_heading : " لماذا الاستثمار؟ "}
      </h2>
      <div className="grid  grid-cols-2 lg:grid-cols-4 gap-x-32 gap-1 gap-y-4 px-2 md:gap-8 md:px-8    ">
        {Array.isArray(invest) && invest?.length > 0 ? (
          invest?.map((feature, index) => (
            <div
              key={index}
              className="text-center flex flex-col items-center  "
            >
              <div className=" bg-white font-montserrat text-[#6b6b6b] w-16 h-16 macbook:h-24 macbook:w-24 rounded-full mx-auto flex items-center justify-center text-[28px] macbook:text-[40px]  ">
                {/* <FontAwesomeIcon icon={`${feature.icon}`} /> */}
                {/* {features[0]?.icon} */}
                <img
                  src={`${Image_URL}/${feature?.image}`}
                  alt=""
                  className="w-10 h-10"
                />
              </div>
              <p className="mt-4   text-[12px] md:text-[16px]  macbook:text-[25px]  md:w-[85%] text-center font-montserrat text-[#FFFFFF] ">
                {feature?.title}
              </p>
            </div>
          ))
        ) : (
          <p>لا توجد ميزات متاحة.</p> // Optionally handle the empty array case
        )}
      </div>
    </div>
  );
};

export default WhyInvestSection;
