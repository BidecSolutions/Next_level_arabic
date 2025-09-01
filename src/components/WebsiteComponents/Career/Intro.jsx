
import React from "react";
import { IoCloudDownloadOutline } from "react-icons/io5";

export const Intro = () => {
  return (
    <div className="flex justify-center mt-16  mb-16 ">
      <div className="max-w-5xl w-[90%] md:w-[100%] flex flex-wrap-reverse sm:gap-10 gap-3">
        <img
          src="/career.jpg"
          alt=""
          className="h-[400px] w-[450px] md:h-[400px] rounded-br-[200px]"
        />
        <div className="max-w-[500px] flex flex-col gap-2 my-10">
          <h3 className=" text-2xl text-[#555555]  font-newsLetter  ">
           فرصة وظيفية
          </h3>
          <h1 className=" md:text-[26px] md:mb-2 leading-[30px] uppercase text-[#8F8F8F] ">
            ابنِ مستقبلك مع نيكست ليفل للعقارات - خبراء العقارات الرائدون في دبي
          </h1>
          <p className="text-[12px] text-[#555555]   font-montserrat ">
            هل أنت مستعد لترك بصمتك في سوق العقارات المتسارع في دبي؟ في نيكست ليفل للعقارات، لا نوفر فرص عمل فحسب، بل نوفر أيضًا مسارات مهنية طويلة الأمد مدفوعة بالشغف والهدف والأداء.<br/>

بصفتنا إحدى وكالات العقارات الرائدة في دبي، نزود فريقنا بالأدوات والتدريب والدعم اللازمين للنجاح في سوق العقارات المتطور باستمرار في المدينة. سواء كنت خبيرًا متمرسًا أو مبتدئًا، ستجد نفسك محاطًا بالابتكار والتعاون وفرص النمو اللامحدودة.<br/>

نؤمن بأهمية إطلاق العنان لإمكاناتك وإمكانات عملائنا. إذا كنت طموحًا، وطموحًا، ومستعدًا للعمل في طليعة قطاع العقارات في دبي، يسعدنا مقابلتك.<br/>

اتخذ الخطوة التالية. انضم إلى الفريق الذي يُعيد تعريف قطاع العقارات في دبي.
          </p>
        </div>
      </div>
    </div>
  );
};