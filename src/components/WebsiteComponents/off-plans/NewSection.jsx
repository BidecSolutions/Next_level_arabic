"use client";

import { useState } from "react";
// import ParseBody from "../PropertyDetails/ParseBody";
// import RegisterForm from "../RegisterForm";
// import { Image_Url } from "../../../Utils/const";
import { Image_NotFound, Image_URL } from "@/config/constants";
import RegisterForm from "../Forms/RegisterForm";
import ParseBody from "../HomeComponents/ParseBody";

export const NewSection = ({ howToBuyData, pageName }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const description = `
  <h2>عائد الاستثمار من المشاريع قيد الإنشاء في دبي</h2>
  <p>
    يواصل الاستثمار في مشاريع البيع على الخارطة في دبي إظهار إمكانات قوية لتحقيق عائد استثمار مرتفع. وقد شكلت مبيعات البيع على الخارطة 55% من إجمالي المعاملات في النصف الأول من عام 2024.
  </p>
  <p>
    حقق المستثمرون عوائد تتراوح بين ٢٥٪ و٣٥٪ عند اكتمال المشروع، بفضل الأسعار الجذابة وخطط السداد المرنة. وارتفعت قيم العقارات في المواقع المميزة بنسبة تصل إلى ٤٥٪ مقارنةً بأسعار ما قبل الإنشاء.
  </p>

  <h3>ماذا تتوقع في دبي؟</h3>
  <p>
   تُقدّم دبي أسلوب حياة عالمي يجمع بين الحداثة والتراث. ويستمتع السكان بتجربة تسوق ومطاعم وترفيه عالمية المستوى، إلى جانب مرافق رعاية صحية وتعليمية رفيعة المستوى.
  </p>
  <p>
موقع المدينة الاستراتيجي بين الشرق والغرب يعزز جاذبيتها العالمية. وتواصل مشاريع البنية التحتية الجارية تعزيز قطاع العقارات.
  </p>

  <h3>أسباب الاستثمار في عقارات دبي قيد الإنشاء</h3>
  <ul>
    <li><strong>عائد استثمار أعلى:</strong> انخفاض الأسعار الأولية وإمكانية ارتفاع القيمة بشكل كبير (كولييرز، 2024)</li>
    <li><strong>خطط الدفع المرنة:</strong> يقدم المطورون خططًا منظمة لتسهيل التمويل</li>
    <li><strong>وسائل الراحة الحديثة:</strong> تتميز التطورات الجديدة بمرافق حديثة</li>
  </ul>

  <h3>أهم فوائد شراء العقارات على الخريطة في دبي</h3>
  <ul>
    <li><strong>انخفاض سعر الشراء:</strong> تكلفة العقارات على المخطط أقل من الوحدات الجاهزة</li>
    <li><strong>التخصيص:</strong> يمكن للمشترين تخصيص جوانب ممتلكاتهم</li>
    <li><strong>ارتفاع قيمة رأس المال:</strong> ترتفع الأسعار بشكل كبير عند الانتهاء</li>
  </ul>

  <h3>مواقع مميزة ووسائل راحة فاخرة</h3>
  <p>
    تقع العقارات قيد الإنشاء في دبي في مواقع مرغوبة مثل وسط مدينة دبي،
    <a href="https://www.nextlevelrealestate.ae/area/business-bay/" target="_blank" rel="noreferrer" style="color: #1B66C9;">الخليج التجاري</a>, ونخلة جميرا.
تتميز هذه المشاريع بميزات راقية مثل المسابح والصالات الرياضية والحدائق، بالإضافة إلى خدمات الأمن على مدار الساعة.
توفر نمط حياة فاخر مع سهولة الوصول إلى مراكز الأعمال والترفيه.
  </p>

  <h3>القيمة طويلة الأجل: نمو الاستثمار في دبي</h3>
  <p>
   يُعزز النمو الاقتصادي المستمر في دبي ومشاريع البنية التحتية المدعومة حكوميًا قيمة العقارات على المدى الطويل. وقد أظهرت أسعار العقارات مرونةً وارتفاعًا مطردًا خلال العقد الماضي. ولا تزال المدينة مركزًا استثماريًا رئيسيًا، مع طلب قوي على الإيجار.
  </p>

  <h3>التنبؤ بالاتجاهات المستقبلية: ما ينبغي للمشترين معرفته</h3>
  <p>
    سيحافظ النمو السكاني والتوسع الاقتصادي في دبي على الطلب على العقارات قيد الإنشاء.

تواصل المشاريع الكبرى، بما فيها مشاريع إكسبو 2020، دفع أسعار العقارات إلى الارتفاع.

ينبغي على المشترين التركيز على المشاريع ذات المواقع الجيدة والسمعة الطيبة لتحقيق أقصى عائد استثمار.
  </p>
`;

  return (
    <div className="flex justify-center w-full py-10 md:pt-20">
      <div className="flex justify-center items-center w-full flex-wrap macbook:justify-center gap-10">
        <div className="capitalize md:w-[40%] macbook:w-[38%] flex flex-col items-center md:items-start gap-3 my-4">
          <h3 className="text-3xl md:text-5xl font-newsLetter text-[#A39D9D] text-center md:text-start">
            {howToBuyData?.heading_s2}
          </h3>
          <div className="text-[16px] macbook:text-[25px] macbook:leading-[40px] text-[#555555] md:leading-[23px] text-center md:text-start">
            {description && description.length > 500 ? (
              <>
                <div
                  className={`${
                    isExpanded
                      ? "h-[240px] overflow-y-auto transition-all duration-300"
                      : "h-[240px] overflow-hidden"
                  }`}
                >
                  <div className="text-[16px] font-montserrat text-[#555555] md:leading-[22px] macbook:text-[35px] macbook:leading-[38px] text-center md:text-start">
                    <ParseBody body={howToBuyData?.description_s2} />
                  </div>
                </div>
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="mt-2 text-gray-600 text-xs font-medium hover:underline"
                >
                  {isExpanded ? "اقرأ أقل" : "اقرأ المزيد"}
                </button>
              </>
            ) : (
              <div className="text-sm text-gray-700 font-montserrat">
                <ParseBody body={howToBuyData?.description} />
              </div>
            )}
          </div>
          <button
            className="p-2 px-4 macbook:py-4 mt-4 macbook:text-[20px] rounded-md text-md text-white bg-[#A39D9D] hover:bg-transparent hover:text-[#A39D9D] border hover:border-[#A39D9D] w-fit flex justify-center items-center gap-2"
            onClick={() => setIsModalOpen(true)}
          >
            احصل على دليل المناطق مجانًا
          </button>
        </div>

        <div className="flex w-full md:w-[40%] macbook:w-[40%] justify-start">
          <div className="relative w-full flex justify-start">
            <img
              src={`${Image_URL}/${howToBuyData?.buy_image_s2}`}
              alt=""
              className="w-[310px] lg:w-[650px] md:h-[500px] md:w-[400px] macbook:w-full macbook:h-auto rounded-br-[50px] md:rounded-br-[100px]"
              onError={(e) => {
                e.currentTarget.src = "/offplan-new.png";
              }}
            />
          </div>
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
