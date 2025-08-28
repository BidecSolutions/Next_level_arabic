import MarketTransaction from "@/components/WebsiteComponents/Area-Detail/MarketTransaction";
import BannerSlider from "@/components/WebsiteComponents/Buy/BannerSlider";
import Faqs from "@/components/WebsiteComponents/Buy/Faqs";
import HowToBuy from "@/components/WebsiteComponents/Buy/HowToBuy";
import { NewSection } from "@/components/WebsiteComponents/Buy/NewSection";
import PropertyList from "@/components/WebsiteComponents/HomeComponents/PropertyList";
import DeveloperSlider from "@/components/WebsiteComponents/off-plans/DeveloperSlider";
import GetInTouch from "@/components/WebsiteComponents/off-plans/GetInTouch";
import { Inquiry } from "@/components/WebsiteComponents/off-plans/Inquiry";
import LatestProject from "@/components/WebsiteComponents/off-plans/LatestProject";
import { Image_URL } from "@/config/constants";

const BuyClient = ({ data }) => {


  const {
    popular_search,
    top_heading_before_search_bar,
    market_transaction_title,
    market_transaction_description,
    mt_sv_value,
    mt_sv_title,
    mt_sv_text,
    mt_st_value,
    mt_st_title,
    mt_st_text,
    mt_ppsqft_value,
    mt_ppsqft_title,
    mt_ppsqft_text,
    top_about_section_image,
    top_about_section_heading,
    top_about_section_description,
    bottom_about_section_image,
    bottom_about_section_heading,
    bottom_about_section_description,
    faq_details,
  } = data;
console.log('buy', data);
  return (
    <div>
      { popular_search && 
      <BannerSlider 
      area={popular_search?.area?.id} 
      property_type={popular_search?.property_type_id} 
      page={top_heading_before_search_bar} 
      breadcrumb1={`Buy / ${popular_search?.name}`}
      />
    }
      <div className="px-4 md:px-20">
        <LatestProject
          area={popular_search?.area}
          heading={top_heading_before_search_bar}
          property_type={popular_search?.property_type_id}
        />
        <MarketTransaction
         data={data}
        />
       <HowToBuy
          image={`${Image_URL}/${top_about_section_image}`}
          heading={top_about_section_heading}
          description={top_about_section_description}
          page={top_heading_before_search_bar}
        />
         <NewSection
          image={`${Image_URL}/${bottom_about_section_image}`}
          heading={bottom_about_section_heading}
          description={bottom_about_section_description}
          page={top_heading_before_search_bar}
        />
        <div className="flex md:flex-row flex-col items-center md:py-4 md:justify-between macbook:justify-center">
          <Faqs faq_details={faq_details} />
          <Inquiry page={`Project Deatil Of ${data?.popular_search?.name}`}/>
        </div>
        <PropertyList />
        <DeveloperSlider />
        <GetInTouch pageName={top_heading_before_search_bar}/>
      </div>
    </div>
  );
};

export default BuyClient;
