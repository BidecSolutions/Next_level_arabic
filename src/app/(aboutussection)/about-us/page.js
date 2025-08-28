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
    const propertySectionPara = `Whether you're searching for your dream home or ready to sell, our
            expert team is here to guide you through every step of the process.`;
    const propertySectionHeading =
        "Looking to Buy a New Property or Sell an Existing One?";
    const p1 = `Next Level Real Estate was established in 2013 and has been the driving force behind some of the
greatest: corporate, institutional, private residential land, commercial sectors across Dubai. Our
company provides incredible solutions to property-related concerns. If you are looking to buy or rent
property, our ideal property-related services will give you all the answers to your problems. Our up-todate skills, marketing experience, and dedicated team make maximum efforts to let your property be
known to all. We understand the value of connections between people and their properties. This
propels us to go the extra mile and provide highly suitable places with sufficient security for our valued
clients.
`;

    const p2 = `We help you reach more people with our ability to market property on local, regional, national, and
international levels. Our listings are posted on many different commercial real estate websites that are
visited by prospects and brokers from all over the world. Through the internet, your property is exposed
to all regional, national, and international real estate brokers, as well as investment bankers. In addition,
our marketing strategy exposes your property to prospects globally.`;

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
                btn1Text="Discover More"
                btn2Text="Contact US"
            />
            <NumberSection />
            <TestimonialSection />
            <GallerySection
                head="About Next Level Real Estate"
                para01={p1}
                para02={p2}
                btnName="Inquiry Now"
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