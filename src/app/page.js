// import AuctionGrid from "@/components/WebsiteComponents/HomePageComponents/AuctionGrid";
// import GridLayout from "@/components/WebsiteComponents/HomePageComponents/GridLayout";
// // import TrendingCategories from "@/components/WebsiteComponents/HomePageComponents/TrendingCategories";
// import LatestNews from "@/components/WebsiteComponents/ReuseableComponenets/LatestNews";
// import { fetchListingsByReservePrice } from "@/lib/api/listings.server";

import AboutUs from "@/components/WebsiteComponents/HomeComponents/AboutUs";
import AgentSlider from "@/components/WebsiteComponents/HomeComponents/AgentSlider";
import AwardsSlider from "@/components/WebsiteComponents/HomeComponents/AwardsSlider";
import Banner from "@/components/WebsiteComponents/HomeComponents/Banner";
import CategoriesSection from "@/components/WebsiteComponents/HomeComponents/CategoriesSection";
import CommunitySection from "@/components/WebsiteComponents/HomeComponents/CommunitySection";
import ConsultancySection from "@/components/WebsiteComponents/HomeComponents/ConsultancySection";
import ContactSection from "@/components/WebsiteComponents/HomeComponents/ContactSection";
// import ContactSection from "@/components/WebsiteComponents/HomeComponents/ContactSection";
import ExploreDeveloperSection from "@/components/WebsiteComponents/HomeComponents/ExploreDeveloperSection";
import LifeStyleSection from "@/components/WebsiteComponents/HomeComponents/LifeStyleSection";
import NewSection from "@/components/WebsiteComponents/HomeComponents/NewSection";
import PlatformSlider from "@/components/WebsiteComponents/HomeComponents/PlatformSlider";
import PopularAreas from "@/components/WebsiteComponents/HomeComponents/PopularAreas";
import PropertyList from "@/components/WebsiteComponents/HomeComponents/PropertyList";
import PropertySection from "@/components/WebsiteComponents/HomeComponents/PropertySection";
import ResourceSection from "@/components/WebsiteComponents/HomeComponents/ResourceSection";
import TopProjectSection from "@/components/WebsiteComponents/HomeComponents/TopProjectSection";
import WhyChooseUs from "@/components/WebsiteComponents/HomeComponents/WhyChooseUs";

// const dummyCards = [
//   {
//     title: "Charity Auction - signed All",
//     price: "$1,540",
//     tags: "Categories: Marketplace • Closes: Tue 1 Apr",
//     sm: "Reserve met",
//     image:
//       "https://media.istockphoto.com/id/1396856251/photo/colonial-house.jpg?s=612x612&w=0&k=20&c=_tGiix_HTQkJj2piTsilMuVef9v2nUwEkSC9Alo89BM=",
//   },
//   {
//     title: "Paul Henry’s mansion",
//     price: "Deadline sale by 29 May",
//     tags: "Categories: Marketplace • Listed: Tue 1 Apr",
//     image:
//       "https://media.istockphoto.com/id/1396856251/photo/colonial-house.jpg?s=612x612&w=0&k=20&c=_tGiix_HTQkJj2piTsilMuVef9v2nUwEkSC9Alo89BM=",
//   },
//   {
//     title: "Paul Henry’s mansion",
//     price: "Price by negotiation",
//     tags: "Categories: Marketplace • Listed: Tue 1 Apr",
//     image:
//       "https://media.istockphoto.com/id/1396856251/photo/colonial-house.jpg?s=612x612&w=0&k=20&c=_tGiix_HTQkJj2piTsilMuVef9v2nUwEkSC9Alo89BM=",
//   },
//   {
//     title: "Paul Henry’s mansion",
//     price: "Price by negotiation",
//     tags: "Categories: Marketplace • Listed: Tue 1 Apr",
//     image:
//       "https://media.istockphoto.com/id/1396856251/photo/colonial-house.jpg?s=612x612&w=0&k=20&c=_tGiix_HTQkJj2piTsilMuVef9v2nUwEkSC9Alo89BM=",
//   },
// ];

export const metadata = {
  title: "Next-Level",
  description:
    "Browse and discover the best deals on MA3rood Marketplace. Find products, categories, and more.",
  title: "Next-Level",
  description:
    "Browse and discover the best deals on Ma3rood Marketplace. Find products, categories, and more.",
  // openGraph: {
  //   title: "Marketplace | Ma3rood",
  //   description: "Browse and discover the best deals on Ma3rood Marketplace. Find products, categories, and more.",
  //   url: "https://yourdomain.com/marketplace", // to be replaced with the actual domain
  //   siteName: "Ma3rood",
  //   images: [
  //     {
  //       url: "https://yourdomain.com/og-marketplace.jpg",
  //       width: 1200,
  //       height: 630,
  //       alt: "Marketplace | Ma3rood",
  //     },
  //   ],
  //   locale: "en_US",
  //   type: "website",
  // },
  robots: "index, follow",
};

export default async function Home() {
  return (
    <>
      <Banner />
      <div className="px-5 md:px-20">
        <PlatformSlider />
        <CategoriesSection />
        <PropertySection />
        <PropertyList />
        <ConsultancySection />
        <LifeStyleSection />
        <AboutUs />
        <NewSection />
        <CommunitySection />
        <TopProjectSection />
        {/* <ContactSection form={false} page={'Home Contact Section'} /> */}
        {/* <ContactSection /> */}
        <PopularAreas/>
        <AwardsSlider/>
        <WhyChooseUs/>
        <AgentSlider />
        <ExploreDeveloperSection />
        <ResourceSection />
      </div>
    </>
  );
}
