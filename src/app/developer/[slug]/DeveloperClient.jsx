"use client";

import BannerSlider from "@/components/WebsiteComponents/Area-Detail/BannerSlider";
import Faqs from "@/components/WebsiteComponents/Buy/Faqs";
import IntroSection from "@/components/WebsiteComponents/DeveloperDetail/IntroSection";
import { Overview } from "@/components/WebsiteComponents/DeveloperDetail/Overview";
import ReasonsSection from "@/components/WebsiteComponents/DeveloperDetail/ReasonsSection";
import ContactSection from "@/components/WebsiteComponents/HomeComponents/ContactSection";
import PopularAreas from "@/components/WebsiteComponents/HomeComponents/PopularAreas";
import PropertyList from "@/components/WebsiteComponents/HomeComponents/PropertyList";
import { Inquiry } from "@/components/WebsiteComponents/off-plans/Inquiry";
import LatestProject from "@/components/WebsiteComponents/off-plans/LatestProject";



export default function DeveloperClient({ developer, trending }) {
  return (
    <div className="pb-10">

      <BannerSlider
        data={developer}
        page={`Developer Detail Page Of ${developer?.name}`}
      />

      <div className="w-full px-5 md:px-20">
        <IntroSection developer={developer} />
        {/* <PropertyCards developer={developer} /> */}
         <LatestProject
          developerId={developer?.id}
          heading={developer?.name}
        />
      </div>

      <ContactSection form={true} page={developer} pageName={`Developer Detail Page Of ${developer?.name}`} />

      <div className="w-full px-5 md:px-24">
      <Overview developer={developer} />
        <ReasonsSection developer={developer} />
        <div className="flex md:flex-row flex-col items-center md:justify-between macbook:justify-around py-10 md:py-24">
          <Faqs
            faq_details={developer.faqs}
            heading={developer?.faq_heading}
          />
          {developer?.name && (
            <Inquiry page={`Developer Detail ${developer?.name}`} />
          )}
        </div>
      <PropertyList />
      <PopularAreas />
    </div>
    </div>
  );
}
