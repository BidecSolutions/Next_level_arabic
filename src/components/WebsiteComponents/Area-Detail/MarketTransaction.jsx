"use client";

import React, { useState, useEffect } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

const MarketTransaction = ({ data }) => {

//   const formatNumber = (value) => parseFloat(value).toString();

  return (
    <div className="flex items-center flex-col py-10 md:py-20">
      <h3 className="text-center text-[#8F8F8F] font-newsLetter macbook:text-[48px] text-2xl md:text-3xl w-[296px] md:w-full font-semibold mb-4">
        {data?.market_transaction_title || "معاملات السوق"}
      </h3>

      <p
        className="text-center text-[13px] text-[#8F8F8F] font-montserrat md:max-w-[54rem] macbook:max-w-[70%] macbook:text-[40px] mb-8"
        dangerouslySetInnerHTML={{
          __html:
            data?.market_transaction_description ||
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin neque purus, rutrum in orci eu, euismod bibendum leo. Suspendisse vehicula a nulla vel tempor."
              .split(" ")
              .slice(0, 50)
              .join(" ") + "...",
        }}
      />

      <div className="flex gap-14 justify-center md:flex-row flex-col">
        {/* Sales Value */}
        <MetricCard
          value={data?.mt_sv_value}
          title={data?.mt_sv_title || "قيمة المبيعات (درهم إماراتي)"}
          changeText={data?.mt_sv_text}
        />

        {/* Sales Transaction */}
        <MetricCard
          value={data?.mt_st_value}
          title={data?.mt_st_title || "قيمة المبيعات (درهم إماراتي)"}
          changeText={data?.mt_st_text}
        />

        {/* PPSQFT Value */}
        <MetricCard
          value={data?.mt_ppsqft_value}
          title={data?.mt_ppsqft_title || "قيمة المبيعات (درهم إماراتي)"}
          changeText={data?.mt_ppsqft_text}
        />
      </div>
    </div>
  );
};

const MetricCard = ({ value = "0", title, changeText = "تغيير سنوي" }) => {
  const numericChange = parseFloat(String(changeText).replace(/[^0-9.-]/g, ""));
  const isPositive = numericChange > 0;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center">
      <p className="text-[45px] macbook:text-[65px] font-montserrat font-semibold text-[#919090]">
        {value}
      </p>
      <p className="text-gray-400 font-montserrat mt-1 macbook:text-[35px]">
        {title}
      </p>
      <div className="flex items-center justify-center gap-1 mt-2">
        {isPositive ? (
          <FaArrowUp className="text-[#1E871C]" />
        ) : (
          <FaArrowDown className="text-[#b32624]" />
        )}
        <span className="font-medium md:text-[20px] font-montserrat">
          {changeText}
        </span>
      </div>
    </div>
  );
};

export default MarketTransaction;
