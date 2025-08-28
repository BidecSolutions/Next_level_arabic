import React from "react";
import { Image_NotFound, Image_URL } from "@/config/constants";

const ImageContainer2 = ({ firstImage, secondImage, thirdImage }) => {
  const images = [
    {
      src: "/c1.png", // Replace with your first image path
      style:
        "rounded-tl-[100px] w-[400px] h-[300px] absolute top-0 left-0 z-20",
    },
    {
      src: "/c2.png", // Replace with your second image path
      style:
        "rounded-bl-[100px] w-[400px] h-[300px] absolute bottom-0 left-10 z-10",
    },
    {
      src: "/c3.png", // Replace with your third image path
      style:
        "rounded-br-[100px] w-[300px] h-[250px] absolute top-10 right-0 z-30 border-4 border-white",
    },
  ];

  return (
    <div className="relative w-[500px] h-[270px] md:h-[500px] max-w-[100%] mx-auto">
      {/* Top-left Image */}
      <img
        src={firstImage} // Replace with the first image path
        alt="Image 1"
        className="absolute top-6  left-0 w-[200px] h-[270px] md:w-[250px] md:h-[500px] rounded-tl-[50px] md:rounded-tl-[100px] object-cover"
        onError={(e) => {
          e.currentTarget.src = Image_NotFound; // Path to your dummy image
        }}
      />

      {/* Bottom-left Image */}
      <img
        src={thirdImage} // Replace with the second image path
        alt="Image 2"
        className="absolute -bottom-7 right-0 w-[155px] h-[140px] md:w-[250px] md:h-[250px] rounded-br-[50px] md:rounded-br-[100px] border-[6px] border-white object-cover"
        onError={(e) => {
          e.currentTarget.src = Image_NotFound; // Path to your dummy image
        }}
      />

      {/* Right Image */}
      <img
        src={secondImage} // Replace with the third image path
        alt="Image 3"
        className="absolute top-0 right-0 w-[155px] h-[165px] md:w-[250px] md:h-[280px] border-[6px] border-white object-cover"
        onError={(e) => {
          e.currentTarget.src = Image_NotFound; // Path to your dummy image
        }}
      />
    </div>
  );
};

export default ImageContainer2;