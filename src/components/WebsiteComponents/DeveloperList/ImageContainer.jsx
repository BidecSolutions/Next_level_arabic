"use client";

import { Image_NotFound } from "@/config/constants";
import Image from "next/image"; 
import { useState } from "react";

export default function ImageContainer({ firstImage, secondImage, thirdImage }) {
  // State to handle fallback image when error occurs
  const [img1Src, setImg1Src] = useState(firstImage);
  const [img2Src, setImg2Src] = useState(thirdImage);
  const [img3Src, setImg3Src] = useState(secondImage);

  return (
    <div className="relative w-[500px] h-[330px] md:h-[500px] max-w-full mx-auto">
      {/* Top-left Image */}
      <Image
        src={img1Src || Image_NotFound}
        alt="Image 1"
        width={250}
        height={250}
        className="absolute top-0 md:top-10 left-16 md:left-32 w-[180px] h-[180px] md:w-[250px] md:h-[250px] rounded-tl-[50px] md:rounded-tl-[100px] object-cover"
        onError={() => setImg1Src(Image_NotFound)}
      />

      {/* Bottom-left Image */}
      <Image
        src={img2Src || Image_NotFound}
        alt="Image 2"
        width={250}
        height={250}
        className="absolute bottom-2 left-2 md:left-8 w-[180px] h-[180px] md:w-[250px] md:h-[250px] rounded-tl-[50px] md:rounded-tl-[100px] border-[6px] border-white object-cover"
        onError={() => setImg2Src(Image_NotFound)}
      />

      {/* Right Image */}
      <Image
        src={img3Src || Image_NotFound}
        alt="Image 3"
        width={250}
        height={250}
        className="absolute top-20 md:top-36 right-0 md:right-0 w-[180px] h-[180px] md:w-[250px] md:h-[250px] rounded-br-[50px] md:rounded-br-[100px] border-[6px] border-white object-cover"
        onError={() => setImg3Src(Image_NotFound)}
      />
    </div>
  );
}
