import { Banner } from '@/components/WebsiteComponents/About-us/Banner'
import GallerySection from '@/components/WebsiteComponents/About-us/GallerySection'
import NumberSection from '@/components/WebsiteComponents/About-us/NumberSection'
import PrincipleSection from '@/components/WebsiteComponents/About-us/PrincipleSection'
import ProfileSection from '@/components/WebsiteComponents/About-us/ProfileSection'
import PropertySection from '@/components/WebsiteComponents/About-us/PropertySection'
import ServicesSection from '@/components/WebsiteComponents/About-us/ServicesSection'
import TestimonialSection from '@/components/WebsiteComponents/About-us/TestimonialSection'
import AgentSlider from '@/components/WebsiteComponents/HomeComponents/AgentSlider'
import DeveloperSlider from '@/components/WebsiteComponents/off-plans/DeveloperSlider'
import React from 'react'
import { Faqs } from "@/components/WebsiteComponents/off-plans/Faqs";

const page = () => {
    const propertySectionPara = `سواء كنت تبحث عن منزل أحلامك أو مستعدًا للبيع، فإن فريق الخبراء لدينا موجود هنا لإرشادك خلال كل خطوة من خطوات العملية`;
    const propertySectionHeading =
        "هل تبحث عن شراء عقار جديد أو بيع عقار موجود؟";
    const p1 = `تأسست شركة نيكست ليفل للعقارات عام ٢٠١٣، وكانت المحرك الرئيسي وراء بعضٍ من أبرز القطاعات العقارية في دبي، سواءً كانت شركات أو مؤسسات أو أراضي سكنية خاصة أو تجارية. تقدم شركتنا حلولاً فعّالة للمشكلات العقارية. إذا كنتم ترغبون في شراء أو استئجار عقار، فإن خدماتنا العقارية المثالية ستوفر لكم جميع الحلول اللازمة. نبذل قصارى جهدنا، بمهاراتنا الحديثة وخبرتنا التسويقية وفريقنا المتفاني، لجعل عقاركم معروفًا للجميع. نحن ندرك أهمية التواصل بين الناس وعقاراتهم، وهذا ما يدفعنا إلى بذل المزيد من الجهود لتوفير أماكن مناسبة للغاية مع ضمان أمن كافٍ لعملائنا الكرام.`;
    const p2 = `نساعدكم على الوصول إلى المزيد من الناس بفضل قدرتنا على تسويق العقارات على المستويات المحلية والإقليمية والوطنية والدولية. تُنشر قوائمنا على العديد من مواقع العقارات التجارية المختلفة التي يزورها العملاء المحتملون والوسطاء من جميع أنحاء العالم. من خلال الإنترنت، يُعرَض عقاركم على جميع وسطاء العقارات الإقليميين والوطنيين والدوليين، بالإضافة إلى المصرفيين الاستثماريين. بالإضافة إلى ذلك، تُعرِّض استراتيجيتنا التسويقية عقاركم للعملاء المحتملين عالميًا.`;

    return (
        <div>
            <Banner />
            <div className="w-full px-5 md:px-20">
            <ProfileSection />
            <ServicesSection />
            <PrincipleSection />
            <PropertySection
                Heading={propertySectionHeading}
                para={propertySectionPara}
                btn1=""
                btn2=""
                btn1Text="اكتشف المزيد"
                btn2Text="اتصل بنا"
            />
            <NumberSection />
            <TestimonialSection />
            <GallerySection
                head="نبذة عن شركة نيكست ليفل العقارية"
                para01={p1}
                para02={p2}
                btnName="الاستفسار الآن"
                btnLink=""
                iswhatsappbtn={false}
                page='About Us'
            />
            <DeveloperSlider />
            {/* <Faqs/> */}
            <div className=" flex md:flex-row flex-col items-center py-2 md:justify-between macbook:justify-center ">
                <Faqs page={7} />
                {/* <Inquiry page={`OffPlan`} /> */}

            </div>
            <AgentSlider />
            </div>
        </div>
    )
}

export default page