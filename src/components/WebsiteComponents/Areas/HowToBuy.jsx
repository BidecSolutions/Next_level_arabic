"use client";

import { useState } from "react";
// import { Image_NotFound, Image_Url } from "@/utils/const";
// import ParseBody from "../PropertyDetails/ParseBody";
// import RegisterForm from "../RegisterForm";
import { Image_NotFound, Image_URL } from "@/config/constants";
import ParseBody from "../HomeComponents/ParseBody";
import RegisterForm from "../Forms/RegisterForm";

export const HowToBuy = ({ howToBuyData, page, pageName }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const description =
    howToBuyData?.description ||
    `استكشف كل ركن من أركان دبي مع قوائمنا العقارية الشاملة في جميع المناطق. من أحياء وسط المدينة النابضة بالحياة إلى المناطق الساحلية الهادئة، نقدم لك نظرة ثاقبة على العقارات المتنوعة المتاحة في جميع أنحاء دبي. سواء كنت تتطلع إلى الاستثمار في شقة عصرية، أو فيلا عائلية، أو عقار تجاري، فإن أدلة كل منطقة لدينا تُفصّل مزايا كل موقع، بما في ذلك المرافق المحلية، ووسائل النقل، وميزات المجتمع. صُممت كل قائمة لتزويد مالكي المنازل والمستثمرين المحتملين بالمعلومات اللازمة لاتخاذ قرارات مدروسة في سوق العقارات الديناميكي في دبي.`;

  return (
    <div className="flex justify-center w-full py-10 macbook:py-48">
      <div className="flex items-center md:items-start flex-col-reverse md:flex-row md:justify-center macbook:justify-center gap-20">
        
        {/* Image Section */}
        <div className="flex justify-end lg:w-[35%] macbook:w-[40%]">
          <div className="relative w-full lg:w-[90%] macbook:w-[80%]">
            <img
              src={`${Image_Url}/${page?.how_to_buy_1_image}`}
              alt={page?.how_to_buy_1_image_alt || "كيفية الشراء"}
              className="h-[350px] w-[300px] lg:w-[650px] md:h-[450px] md:w-[400px] macbook:w-[600px] macbook:h-[550px] rounded-br-[150px] md:rounded-br-[100px]"
              onError={(e) => {
                e.currentTarget.src = Image_NotFound;
              }}
            />
          </div>
        </div>

        {/* Text Section */}
        <div className="md:w-[40%] lg:w-[45%] macbook:w-[50%] flex flex-col items-center md:items-start gap-3">
          <h1 className="text-3xl md:text-5xl lg:text-[25px] font-newsLetter macbook:text-[60px] text-[#A39D9D] text-center md:text-start">
            {page?.how_to_buy_1_heading || "كيفية الشراء"}
          </h1>

          {page?.how_to_buy_1_description &&
          page?.how_to_buy_1_description?.length > 500 ? (
            <>
              <div
                className={`${
                  isExpanded
                    ? "h-[140px] md:h-[240px] macbook:h-[300px] overflow-y-auto transition-all duration-300"
                    : "h-[140px] md:h-[240px] macbook:h-[300px] overflow-hidden"
                }`}
              >
                <div className="text-sm text-gray-700 font-montserrat">
                  <ParseBody body={page?.how_to_buy_1_description} />
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
              <ParseBody body={page?.how_to_buy_1_description} />
            </div>
          )}

          <button
            className="p-2 px-4 macbook:py-4 font-montserrat macbook:text-[20px] rounded-md text-md text-white bg-[#A39D9D] hover:bg-transparent hover:text-[#A39D9D] border hover:border-[#A39D9D] w-fit flex justify-center items-center gap-2"
            onClick={() => setIsModalOpen(true)}
          >
            احصل على استشارة مجانية
          </button>
        </div>
      </div>

      {/* Modal Form */}
      <RegisterForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        page={pageName}
      />
    </div>
  );
};
