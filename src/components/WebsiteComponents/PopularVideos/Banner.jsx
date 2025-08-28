"use client"; // If you want to use this inside App Router pages

import Image from "next/image";
import React from "react";
import { GoSearch } from "react-icons/go";

export const Banner = () => {
  return (
    <div className="flex justify-center text-white">
      <div
        className="relative h-[34rem] md:h-[600px] w-[90%] md:w-[95%] md:pt-[140px] bg-cover bg-center rounded-bl-[50px] rounded-br-[50px] md:rounded-bl-[90px] md:rounded-br-[90px] flex flex-col items-center justify-center"
        style={{
          backgroundImage: "url('/Areas/banner.png')",
        }}
      >
        <h1 className="text-2xl md:text-5xl">Property Video</h1>
        <p className="text-lg md:text-xl">Home \ Property Video</p>
      </div>
    </div>
  );
};
