"use client";

import React, { useState } from "react";
import Link from "next/link";
import RegisterInterestModal from "../Forms/RegisterInterestModal";

const ConsultancySection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="h-[500px] macbook:h-[600px] w-full md:mt-[100px] my-12 md:my-20 flex justify-center">
      <div
        className="flex flex-col w-full macbook:w-[80%] bg-[url('')] bg-right md:bg-center bg-cover items-center justify-center rounded-br-[120px] md:rounded-br-[0px] md:rounded-tl-[160px]"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/home/cc.webp)`,
        }}
      >
        <div className="flex flex-col justify-center mt-10 w-[90%] gap-[20px]">
          <h3 className="text-[20px] md:text-[40px] macbook:text-[48px] md:leading-[35.5px] font-normal md:w-[776px]">
            <span className="text-white font-newsLetter uppercase macbook:text-[48px] text-[18px] md:text-[34px]">
              شاطئ فاخر على الشاطئ <br />
              فلل في نخلة جبل علي
            </span>
          </h3>
          <p className="text-white text-[11px] md:text-[18px] font-newsLetter macbook:text-[28px] md:w-2/3">
            تمتد جزيرة نخلة جبل علي على مساحة هائلة تبلغ 13.4 كيلومترًا مربعًا، أي ضعف مساحة نخلة جميرا. وتهدف إلى إضافة 110 كيلومترات من الشريط الساحلي إلى دبي، مما يعزز جاذبية المدينة كواجهة بحرية.
          </p>

          <div className="flex md:w-[206px] macbook:w-[250px]">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-white hover:bg-transparent hover:text-white macbook:text-[17px] font-montserrat text-[#8F8F8F] py-3 px-4 rounded-[7.21px] border border-white text-[11px]"
            >
              الاتصال للاستكشاف
            </button>
          </div>
        </div>
      </div>

      <RegisterInterestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        page="Home Consultancy Section"
      />
    </section>
  );
};

export default ConsultancySection;
