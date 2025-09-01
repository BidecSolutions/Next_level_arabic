"use client";

import React from "react";
import Image from "next/image";

const StaticCards = () => {
  return (
    <div className="w-full flex flex-col sm:gap-5 gap-2 md:bottom-[-35px] macbook:bottom-[-70px] absolute pb-10 -bottom-4 items-center justify-center">
      <div className="xl:w-3/4 lg:w-11/12 w-[92%] flex flex-row xl:gap-10 sm:gap-5 gap-2 justify-center">
        
        {/* Card 1 */}
        <div
          className="w-full shadow-lg rounded-xl rounded-tl-[70px] md:rounded-tl-[6rem] bg-cover bg-center pb-1"
          style={{ backgroundImage: "url('/owner/img01.png')" }}
        >
          <div className="flex flex-col justify-center sm:gap-3 md:gap-3 pl-[20px] pr-[10px] macbook:gap-5 macbook:pl-12 macbook:pt-12 gap-2 lg:pt-16 pt-10">
            <Image
              src="/owner/imgIcon01.png"
              width={48}
              height={48}
              className="lg:w-12 w-6"
              alt="Market Insight Icon"
            />
            <h1 className="lg:text-2xl macbook:text-[40px] font-newsLetter macbook:leading-[50px] text-[#555555] text-[14px]">
             رؤى السوق والاتجاهات
            </h1>
            <p className="lg:text-md text-[10px] text-[#555555] font-montserrat macbook:text-[30px]">
              بفضل قدرة عبدول الاستثنائية على التنبؤ باتجاهات السوق العقارية والاستفادة منها، أصبحت شركة نيكست ليفل للعقارات رائدةً في سوق دبي. وتستند استراتيجياته إلى تحليل معمق للسوق ونهج استشرافي يستبق التغيرات المستقبلية.
            </p>
          </div>
        </div>

        {/* Card 2 (Desktop Only) */}
        <div
          className="w-full md:flex hidden shadow-lg rounded-xl bg-cover bg-center pb-5"
          style={{ backgroundImage: "url('/owner/img02.png')" }}
        >
          <div className="flex flex-col sm:gap-3 md:gap-3 macbook:gap-5 macbook:pl-12 macbook:pt-12 gap-2 sm:px-5 px-3 justify-center lg:pt-16 pt-10">
            <Image
              src="/owner/imgIcon02.png"
              width={48}
              height={48}
              className="lg:w-12 w-8"
              alt="Strategic Growth Icon"
            />
            <h1 className="lg:text-2xl font-montserrat macbook:text-[40px] macbook:leading-[50px] text-[#555555] sm:text-xl text-md">
             نمو الأعمال الاستراتيجية
            </h1>
            <p className="lg:text-md text-[10px] font-montserrat text-[#555555] macbook:text-[30px]">
              تحت قيادة عبدول، شهدت شركة نيكست ليفل العقارية نموًا هائلًا، حيث توسّعت محفظتها الاستثمارية وحضورها في السوق. تُركّز مبادراته الاستراتيجية على ممارسات الأعمال المستدامة والاستفادة من التطورات التكنولوجية لتعزيز الكفاءة التشغيلية.
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div
          className="w-full shadow-lg rounded-xl rounded-tr-[6rem] bg-cover bg-center pb-5"
          style={{ backgroundImage: "url('/owner/img03.png')" }}
        >
          <div className="flex flex-col sm:gap-3 md:gap-3 macbook:gap-5 macbook:pl-12 macbook:pt-12 gap-2 sm:px-5 px-3 justify-center lg:pt-16 pt-10">
            <Image
              src="/owner/imgIcon03.png"
              width={48}
              height={48}
              className="lg:w-12 w-8"
              alt="Client Satisfaction Icon"
            />
            <h1 className="lg:text-2xl font-montserrat macbook:text-[40px] macbook:leading-[50px] text-[#555555] sm:text-xl text-md">
              الالتزام برضا العملاء
            </h1>
            <p className="lg:text-md text-[10px] font-montserrat text-[#555555] macbook:text-[30px]">
             يُولي عبدول رضا العملاء الأولوية القصوى، ويضمن إتمام كل معاملة بأعلى درجات الاحترافية والشفافية. وقد ساهم نهجه في بناء قاعدة عملاء قوية وسمعة طيبة في سوق العقارات التنافسي بدبي.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Version of Card 2 */}
      <div
        className="w-[90%] md:hidden flex shadow-lg rounded-xl bg-cover bg-center pb-5"
        style={{ backgroundImage: "url('/owner/img02.png')" }}
      >
        <div className="flex flex-col sm:gap-3 gap-2 sm:px-5 px-3 justify-center lg:pt-16 pt-10">
          <Image
            src="/owner/imgIcon02.png"
            width={48}
            height={48}
            className="lg:w-12 w-8"
            alt="Dubai Property Market Icon"
          />
          <h1 className="lg:text-2xl font-montserrat macbook:text-[40px] macbook:leading-[50px] text-[#555555] sm:text-xl text-md">
            معرفة عميقة بسوق العقارات في دبي
          </h1>
          <p className="lg:text-md font-montserrat text-[#555555] text-[10px]">
            لوريم إيبسوم هو ببساطة نص شكلي (أي شكل غير واضح) يُستخدم في صناعة الطباعة والتنضيد. وقد كان لوريم إيبسوم النص الشكلي القياسي لهذه الصناعة على الإطلاق.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StaticCards;
