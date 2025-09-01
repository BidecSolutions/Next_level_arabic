"use client";

import { useState } from "react";
import Link from "next/link";
// import ParseBody from "../PropertyDetails/ParseBody";
import { Image_NotFound, Image_URL } from "@/config/constants";
import RegisterForm from "../Forms/RegisterForm";
import ParseBody from "../HomeComponents/ParseBody";

export const HowToBuy = ({ howToBuyData, page, pageName }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const description =
    page?.description ||
    `استكشف كل ركن من أركان دبي مع قوائمنا العقارية الشاملة في جميع المناطق. من أحياء وسط المدينة النابضة بالحياة إلى المناطق الساحلية الهادئة، نقدم لك نظرة ثاقبة على العقارات المتنوعة المتاحة في جميع أنحاء دبي. سواء كنت تتطلع إلى الاستثمار في شقة عصرية، أو فيلا عائلية، أو عقار تجاري، فإن أدلة كل منطقة لدينا تُفصّل مزايا كل موقع، بما في ذلك المرافق المحلية، وخطوط النقل، وميزات المجتمع. صُممت كل قائمة لتزويد مالكي المنازل والمستثمرين المحتملين بالمعلومات اللازمة لاتخاذ قرارات مدروسة في سوق العقارات الديناميكي في دبي.`;

  return (
    <div className="flex justify-center w-full py-10 macbook:py-48">
      <div className="flex items-center md:items-start flex-col-reverse md:flex-row md:justify-center macbook:justify-center gap-20">
        <div className="flex justify-end lg:w-[35%] macbook:w-[40%]">
          <div className="relative w-full lg:w-full macbook:w-[80%]">
            <img
              src={`${Image_URL}/${howToBuyData?.buy_image}`}
              alt={howToBuyData?.buy_image_alt || "Buy Image"}
              className="w-[300px] lg:w-full md:h-[450px] md:w-[400px] macbook:w-[600px] macbook:h-[550px] rounded-br-[150px] md:rounded-br-[100px]"
              onError={(e) => {
                e.currentTarget.src = "/offplan/off.jpg"; // fallback image path inside public folder
              }}
            />
          </div>
        </div>

        <div className="md:w-[40%] lg:w-[45%] macbook:w-[50%] flex flex-col items-center md:items-start gap-3">
          <h3 className="text-3xl md:text-5xl font-newsLetter macbook:text-[60px] text-[#A39D9D] text-center md:text-start">
            {howToBuyData?.heading || "شراء عقارات قيد الإنشاء في دبي"}
          </h3>

          {howToBuyData?.description &&
          howToBuyData?.description.length > 500 ? (
            <>
              <div
                className={`${
                  isExpanded
                    ? "h-[140px] md:h-[240px] macbook:h-[300px] overflow-y-auto transition-all duration-300"
                    : "h-[140px] md:h-[240px] macbook:h-[300px] overflow-hidden"
                }`}
              >
                <div className="text-sm text-gray-700 font-montserrat">
                  <ParseBody body={howToBuyData.description} />
                </div>
              </div>

              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-2 text-gray-600 text-xs macbook:text-lg font-medium hover:underline"
              >
                {isExpanded ? "اقرأ أقل" : "اقرأ المزيد"}
              </button>
            </>
          ) : (
            <div className="text-sm text-gray-700 font-montserrat">
              <ParseBody body={howToBuyData?.description} />
            </div>
          )}

          <button
            onClick={() => setIsModalOpen(true)}
            className="p-2 px-4 macbook:py-4 font-montserrat macbook:text-[20px] rounded-md text-md text-white bg-[#A39D9D] hover:bg-transparent hover:text-[#A39D9D] border hover:border-[#A39D9D] w-fit flex justify-center items-center gap-2"
          >
            احصل على دليل المناطق مجانًا
          </button>
        </div>
      </div>

      <RegisterForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        page={pageName}
      />
    </div>
  );
};

export default HowToBuy;
