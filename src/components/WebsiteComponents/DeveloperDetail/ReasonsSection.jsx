"use client"
import React, { useEffect, useState } from "react";

const ReasonsSection = ({developer}) => {
  const [reason, setReason] = useState([]);


  useEffect(() => {

        // Parse the `aboutSectionImages` field if it exists
        if (developer.reasonInvests) {
          const parsedImages = JSON.parse(developer.reasonInvests);
          setReason(parsedImages);
        } else {
          setReason([]);
        }

  }, [developer]);

  return (
    <section className="  flex flex-col items-center macbook:gap-[30px] py-10 md:py-24 ">
      <div className="flex flex-col w-[90%] items-center gap-[6x] justify-center">
        <h3 className="text-center font-newsLetter text-[22px] md:text-[30px] macbook:text-[55px] font-semibold text-[#8F8F8F] macbook:mb-8">
          أسباب للاستثمار مع {developer?.name?.toUpperCase()} 
        </h3>
        <p
          className="text-center text-[12px] font-montserrat md:text-[13px] md:w-[65%] lg:w-[75%] macbook:text-[28px] text-[#8F8F8F] mt-2 mb-12"
          dangerouslySetInnerHTML={{
            __html:
              developer?.reason_to_invest_description ||
              "لوريم إيبسوم دولور سيت أميت، consectetur adipiscing إيليت. بروين نيكي",
          }}
        ></p>
      </div>
      {reason.length === 0 ? (
        <p className="text-center text-[25px] font-montserrat w-full flex justify-center text-gray-500">
          لا يوجد سبب متاح
        </p>
      ) : (
        ""
      )}

      <div className="flex md:flex-row flex-col items-center gap-[40px] macbook:gap-[64px] md:gap-[15px] ">
        {reason.slice(0, 4).map((reason, index) => (
          <div
            key={index}
            className="bg-[#EFEFEF] pt-24 md:pt-0 w-[300px] md:w-[250px] min-h-[300px] md:min-h-[250px] macbook:w-[350px] macbook:min-h-[350px] p-6 relative rounded-b-[87px] flex flex-col justify-center items-center text-center"
          >
            <div className="  w-[100px] h-[100px] md:w-[70px] md:h-[70px] macbook:w-[110px] macbook:h-[110px] macbook:top-[-50px] absolute top-[-30px]  rounded-full  bg-white  border border-[#EFEFEF] flex items-center justify-center mb-4">
              <span className=" text-[45px] font-montserrat md:text-[30px] font-semibold text-[#8F8F8F]">
                {index + 1 < 10 ? `0${index + 1}` : index + 1}
              </span>
            </div>
            <p className="text-[#555555] font-montserrat text-[11px] md:text-[12px] macbook:text-[25px] items-center">
              {reason.description }
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReasonsSection;
