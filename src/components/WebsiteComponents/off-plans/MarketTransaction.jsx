"use client";

import { fetchMarketData } from "@/lib/api/offplan.server";
import { useState, useEffect } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

const MarketTransaction = ({ page }) => {
  const [data, setData] = useState(null);

//   useEffect(() => {



//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           `${process.env.NEXT_PUBLIC_API_BASE_URL}user/market-transactions/pages_wise`,
//           {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ type: 2 }),
//           }
//         );
//         const result = await response.json();
//         setData(result?.data?.[0]);
//         console.log("Market Values -->", result.data);
//       } catch (error) {
//         console.log("Market Values Error:", error);
//       }
//     };
//     fetchData();
//   }, []);

  // Helper function to format numbers without unnecessary zeros
  useEffect(() => {
    fetchMarketData()
      .then(setData)
      .catch((err) => console.log(err));
  }, []);
  const formatNumber = (value) => parseFloat(value).toString();

  return (
    <div className="flex flex-col items-center py-10 md:py-16 ">
      <h2 className="text-center font-newsLetter text-[#8F8F8F] macbook:text-[48px] text-3xl w-[296px] md:w-full md:text-[34px] font-semibold mb-8">
        {data?.heading ? data.heading : "Market Transactions"}
      </h2>
      <p className="text-center text-[#8F8F8F] font-montserrat md:max-w-[44rem] macbook:max-w-[70%] macbook:text-[40px] mb-8">
        {data?.sub_heading
          ? data.sub_heading
          : "Explore the latest off-plan property transactions in Dubai, showcasing emerging developments, price trends, and sales volume."}
      </p>

      {data && (
        <div className="flex gap-14 md:flex-row flex-col macbook:mt-12  ">
          <div className="bg-white shadow-lg rounded-lg p-6  macbook:px-32 macbook:py-8  flex flex-col items-center text-center">
            <h3 className="text-[45px] macbook:text-[65px] font-montserrat font-semibold text-[#919090]">
              {data?.sales_value ? data.sales_value : "0"}
            </h3>
            <p className="text-gray-400 mt-1  font-montserrat macbook:text-[35px]  ">
              {data?.sales_value_text_one
                ? data.sales_value_text_one
                : "Sales Value (AED)"}
            </p>
            <div className="flex items-center gap-1 mt-2">
              {parseFloat(
                String(data?.sales_value_text_two).replace(/[^0-9.-]/g, "")
              ) > 0 ? (
                <FaArrowUp className="text-[#1E871C]" />
              ) : (
                <FaArrowDown className="text-[#b32624]" />
              )}
              <span className="font-medium font-montserrat  md:text-[25px]  ">
                {data?.sales_value_text_two ? data.sales_value_text_two : "0%"}
              </span>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 macbook:px-32 macbook:py-8  flex flex-col items-center text-center">
            <h3 className="text-[45px] macbook:text-[65px] font-montserrat font-semibold text-[#919090]">
              {data?.sales_transactions ? data.sales_transactions : "0"}
            </h3>
            <p className="text-gray-400 mt-1 font-montserrat macbook:text-[35px]  ">
              {data?.sales_transactions_text_one
                ? data.sales_transactions_text_one
                : "Sales Transactions (Volume)"}
            </p>
            <div className="flex items-center gap-1 mt-2">
              {parseFloat(
                String(data?.sales_transactions_text_two).replace(/[^0-9.-]/g, "")
              ) > 0 ? (
                <FaArrowUp className="text-[#1E871C]" />
              ) : (
                <FaArrowDown className="text-[#b32624]" />
              )}
              <span className="font-medium  md:text-[25px]  font-montserrat ">
                {data?.sales_transactions_text_two
                  ? data.sales_transactions_text_two
                  : "0%"}
              </span>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 macbook:px-32 macbook:py-8 flex flex-col items-center text-center">
            <h3 className="text-[45px] macbook:text-[65px] font-montserrat font-semibold text-[#919090]">
              {data?.price_per_sqft ? data.price_per_sqft : "0"}
            </h3>
            <p className="text-gray-400 mt-1 macbook:text-[35px]  font-montserrat ">
              {data?.price_per_sqft_text_one
                ? data.price_per_sqft_text_one
                : "Price per sqft (AED)"}
            </p>
            <div className="flex items-center gap-1 mt-2">
              {parseFloat(
                String(data?.price_per_sqft_text_two).replace(/[^0-9.-]/g, "")
              ) > 0 ? (
                <FaArrowUp className="text-[#1E871C]" />
              ) : (
                <FaArrowDown className="text-[#b32624]" />
              )}
              <span className="font-medium  md:text-[25px] font-montserrat  ">
                {data?.price_per_sqft_text_two
                  ? data.price_per_sqft_text_two
                  : "0%"}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketTransaction;
