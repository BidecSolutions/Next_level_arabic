
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
            Career Opportunity
          </h3>
          <h1 className=" md:text-[26px] md:mb-2 leading-[30px] uppercase text-[#8F8F8F] ">
            Build Your Future with Next Level Real Estate – Dubai’s Premier Property Experts
          </h1>
          <p className="text-[12px] text-[#555555]   font-montserrat ">
            Are you ready to make your mark in Dubai’s fast-paced real estate market? At Next Level Real Estate, we don’t just offer jobs—we offer long-term careers fueled by passion, purpose, and performance.<br/>

As one of Dubai’s leading property agencies, we empower our team with the tools, training, and support to thrive in the city’s ever-evolving real estate landscape. Whether you're a seasoned expert or just starting out, you'll be surrounded by innovation, collaboration, and endless opportunities to grow.<br/>

We believe in unlocking potential—yours and our clients’. If you’re ambitious, driven, and ready to work at the forefront of Dubai’s property scene, we’d love to meet you.<br/>

Take the next step. Join the team that’s redefining real estate in Dubai.
          </p>
        </div>
      </div>
    </div>
  );
};