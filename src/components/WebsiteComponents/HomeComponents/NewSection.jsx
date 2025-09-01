"use client";

import { useState } from "react";
import Image from "next/image";
import { Image_NotFound, Image_URL } from "@/config/constants";
import AboutImage from "/public/oo.jpg"; // Move oo.jpg into public folder

const NewSection = () => {
  const [about, setAbout] = useState({});
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="about-us my-12 md:my-20 min-w-full flex justify-center bg-white">
      <div className="flex flex-col lg:flex-row md:justify-between macbook:w-[80%] items-center gap-12">
        {/* Left Column - Image */}
        <div className="lg:w-[40%] macbook:w-[40%]">
          <Image
            src={
              about?.home_about_section_image
                ? `${Image_URLma}/${about?.home_about_section_image}`
                : AboutImage
            }
            alt="About Us"
            width={600}
            height={400}
            className="rounded-tr-[100px] rounded-bl-[100px] md:rounded-tr-[200px] md:rounded-bl-[200px] object-contain md:object-cover w-full h-auto"
            onError={(e) => {
              e.currentTarget.src = Image_NotFound;
            }}
          />
        </div>

        {/* Right Column - Text */}
        <div className="lg:w-[50%] macbook:w-[50%]">
          <h3 className="text-[18px] font-newsLetter md:text-[28px] macbook:text-[60px] font-semibold text-[#8F8F8F]">
            وكالتك العقارية الموثوقة في دبي للحصول على رؤى السوق وفرص الاستثمار
          </h3>

          <div
            className={`${isExpanded
              ? "h-[250px] overflow-y-auto transition-all duration-300"
              : "h-[250px] overflow-hidden"
              }`}
          >
            <div className="space-y-4 text-[#555] font-montserrat text-sm md:text-base leading-relaxed">
              <p>
                يُعد سوق العقارات في دبي من أكثر أسواق العالم حيويةً، إذ يجذب المستثمرين ومشتري المنازل بفضل ابتكاراته، وأسلوب حياته الفاخر، وبنيته التحتية عالمية المستوى. الشريك العقاري المناسب يُحدث فرقًا كبيرًا. نُبقيكم على اطلاع دائم بأحدث مستجدات السوق، ونُقدم لكم فرصًا للشراء على الخارطة، ونُقدم لكم إرشادات الخبراء للمستثمرين المحليين والأجانب.
              </p>

              <h3 className="text-md font-semibold text-[#8F8F8F]">
                لماذا يجب عليك الاستثمار في عقارات دبي
              </h3>
              <p>
                يقدم سوق العقارات في دبي فرصًا واعدة للمستثمرين، بفضل عوائد الإيجار المرتفعة، والإعفاء الضريبي، والطلب القوي على العقارات الفاخرة والعقارات قيد الإنشاء. بفضل اقتصادها المتنامي، وبنيتها التحتية عالمية المستوى، وقوانين التملك المريحة للوافدين، تواصل المدينة جذب المستثمرين العالميين الباحثين عن عوائد مستقرة ومربحة. سواء كنت مستثمرًا متمرسًا أو تتطلع إلى تنويع محفظتك الاستثمارية، فإن قطاع العقارات في دبي يوفر إمكانات لا مثيل لها. الشراكة مع وسطاء عقاريين موثوقين في دبي، مثل شركة نكست ليفل العقارية، تضمن لك اتخاذ قرارات مدروسة في هذا السوق الحيوي، مما يُحقق لك أقصى قيمة لاستثمارك.
              </p>

              <h3 className="text-md font-semibold text-[#8F8F8F]">الأسئلة الشائعة</h3>

              <p>
                <strong>
                  كيف يمكنني التأكد من أن الوكيل العقاري أو الوساطة في دبي مرخصة وجديرة بالثقة؟
                </strong>
                <br />
                جميع الوكلاء مسجلون لدى دائرة الأراضي والأملاك في دبي (DLD) ومؤسسة التنظيم العقاري (RERA). نشجع عملاءنا على طلب رقم رخصة الوكيل والتحقق من بياناته عبر البوابة الرسمية لدائرة الأراضي والأملاك.
              </p>

              <p>
                <strong>
                  ما هي فوائد العمل مع شركة عقارية بدلاً من الوكلاء المستقلين؟
                </strong>
                <br />
                إن الشراكة مع شركة عقارية راسخة في دبي مثل شركتنا تعني أنك ستتمكن من الوصول إلى شبكة من العقارات الموثوقة، والدعم القانوني، وبيانات السوق المحدثة، وخدمات ما بعد البيع الشاملة التي قد لا يقدمها الوكلاء المستقلون.
              </p>

              <p>
                <strong>
                  كيف يمكنني تقييم العائد على الاستثمار والنمو المحتمل لعقاري في دبي؟
                </strong>
                <br />
                يقدم فريقنا تحليلات متعمقة للسوق، وتقارير عن عوائد الإيجار، وتوقعات للتطورات القادمة، مما يساعدك على اتخاذ قرارات مدروسة لتحقيق أقصى قدر من العوائد.
              </p>

              <p>
                <strong>
                 هل تقدمون الدعم للعملاء من الشركات أو عمليات شراء العقارات بالجملة؟
                </strong>
                <br />
                نعم، نقدم خدمات عقارية مخصصة للشركات، بما في ذلك إدارة المحافظ الاستثمارية، وشراء المواقع، وحلول مصممة خصيصًا للاستثمارات الجماعية أو متعددة الوحدات.
              </p>

              <p>
                <strong>
                  هل يمكنك المساعدة في نقل وإرشاد الوافدين الجدد إلى دبي؟
                </strong>
                <br />
                بالتأكيد! لا يقتصر عمل متخصصي النقل لدينا على مساعدتك في العثور على منزل فحسب، بل يقدمون أيضًا نصائح حول المدارس والرعاية الصحية والمرافق في مختلف المناطق لضمان شعورك بالراحة في دبي.
              </p>

              <p>
                <strong>
                  ما هي الخدمات العقارية التي تقدمها شركة نيكست ليفل العقارية؟
                </strong>
                <br />
                تقدم شركة نيكست ليفل للعقارات باقة متكاملة من الخدمات، تشمل شراء وبيع وتأجير وإدارة العقارات. كما نقدم استشارات استثمارية متخصصة، وتحليلات للسوق، ومساعدة قانونية ومالية، وخدمات نقل، لضمان تجربة عقارية سلسة لعملائنا.
              </p>
            </div>
          </div>

          {/* Read More Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 text-[#8F8F8F] font-montserrat text-sm hover:underline"
          >
            {isExpanded ? "اقرأ أقل" : "اقرأ المزيد"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewSection;
