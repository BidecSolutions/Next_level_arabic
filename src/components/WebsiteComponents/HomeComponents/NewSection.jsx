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
            Your Trusted Dubai Real Estate Agency for Market Insights & Investment Opportunities
          </h3>

          <div
            className={`${
              isExpanded
                ? "h-[250px] overflow-y-auto transition-all duration-300"
                : "h-[250px] overflow-hidden"
            }`}
          >
            <div className="space-y-4 text-[#555] font-montserrat text-sm md:text-base leading-relaxed">
              <p>
                Dubai’s property market is among the world’s most vibrant,
                attracting investors and homebuyers with its innovation,
                luxury lifestyle, and world-class infrastructure. The right
                real estate partner can make all the difference. We keep you
                ahead with regular market updates, off-plan opportunities, and
                expert guidance for both locals and overseas investors.
              </p>

              <h3 className="text-md font-semibold text-[#8F8F8F]">
                Why You Should Invest in Dubai Real Estate
              </h3>
              <p>
                Dubai’s real estate market presents a wealth of opportunities
                for investors, thanks to its high rental yields, tax-free
                environment, and strong demand for luxury and off-plan
                properties. With a growing economy, world-class infrastructure,
                and expat-friendly ownership laws, the city continues to attract
                global investors seeking stable, profitable returns. Whether
                you’re a seasoned investor or looking to diversify your portfolio,
                Dubai’s real estate sector offers unmatched potential. Partnering
                with trusted real estate brokers in Dubai, like Next Level Real
                Estate, ensures that you make informed decisions in this dynamic
                market, unlocking the full value of your investment.
              </p>

              <h3 className="text-md font-semibold text-[#8F8F8F]">FAQs</h3>

              <p>
                <strong>
                  How do I verify if a real estate agent or brokerage in Dubai is licensed and trustworthy?
                </strong>
                <br />
                All agents are registered with the Dubai Land Department (DLD) and RERA. We encourage clients
                to ask for an agent’s license number and check their credentials through the DLD’s official portal.
              </p>

              <p>
                <strong>
                  What are the benefits of working with a real estate company instead of independent agents?
                </strong>
                <br />
                Partnering with an established real estate company in Dubai like ours means you gain access to
                a network of vetted properties, legal support, up-to-date market data, and comprehensive after-sales
                services that independent agents might not offer.
              </p>

              <p>
                <strong>
                  How can I assess the ROI and potential growth of my property in Dubai?
                </strong>
                <br />
                Our team offers in-depth market analysis, rental yield reports, and forecasts on upcoming developments,
                helping you make informed decisions to maximize your returns.
              </p>

              <p>
                <strong>
                  Do you provide support for corporate clients or bulk property purchases?
                </strong>
                <br />
                Yes, we offer dedicated corporate real estate services, including portfolio management, site acquisition,
                and tailored solutions for bulk or multi-unit investments.
              </p>

              <p>
                <strong>
                  Can you assist with relocation and community guidance for newcomers to Dubai?
                </strong>
                <br />
                Of course! Our relocation specialists not only help with finding homes but also offer advice on schools,
                healthcare, and amenities in different communities to ensure you feel at home in Dubai.
              </p>

              <p>
                <strong>
                  What real estate services do Next Level Real Estate offer?
                </strong>
                <br />
                Next Level Real Estate offers a full suite of services including property buying, selling, leasing, and
                management. We also provide expert investment consulting, market analysis, legal and financial assistance,
                and relocation services, ensuring a seamless real estate experience for our clients.
              </p>
            </div>
          </div>

          {/* Read More Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 text-[#8F8F8F] font-montserrat text-sm hover:underline"
          >
            {isExpanded ? "Read Less" : "Read More"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewSection;
