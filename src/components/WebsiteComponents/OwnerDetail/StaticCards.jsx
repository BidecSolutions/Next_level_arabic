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
              Market Insight and Trends
            </h1>
            <p className="lg:text-md text-[10px] text-[#555555] font-montserrat macbook:text-[30px]">
              Abdul's exceptional ability to forecast and capitalize on real
              estate trends has positioned Next Level Real Estate as a market
              leader in Dubai. His strategies are informed by deep market
              analysis and a forward-thinking approach that anticipates future
              movements.
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
              Strategic Business Growth
            </h1>
            <p className="lg:text-md text-[10px] font-montserrat text-[#555555] macbook:text-[30px]">
              Under Abdul's stewardship, Next Level Real Estate has seen
              exponential growth, expanding both its portfolio and market
              presence. His strategic initiatives focus on sustainable business
              practices and leveraging technological advancements to enhance
              operational efficiency.
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
              Commitment to Client Satisfaction
            </h1>
            <p className="lg:text-md text-[10px] font-montserrat text-[#555555] macbook:text-[30px]">
              Abdul prioritizes client satisfaction above all, ensuring that
              each transaction is handled with utmost professionalism and
              transparency. His approach has cultivated a strong client base and
              a reputation for reliability in the competitive Dubai real estate
              market.
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
            Deep knowledge of Dubai’s Property Market
          </h1>
          <p className="lg:text-md font-montserrat text-[#555555] text-[10px]">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever
          </p>
        </div>
      </div>
    </div>
  );
};

export default StaticCards;
