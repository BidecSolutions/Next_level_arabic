import React from "react";

export const Loader = () => {
  return (
    <div className="relative flex justify-center items-center min-h-screen  ">
      {/* Spinner with gradient animation */}
      <div className="absolute animate-spin rounded-full h-[7rem] w-[7rem] border-t-4 border-b-4 border-transparent border-gradient-to-r from-blue-400 via-purple-500 to-pink-500"></div>

      {/* Logo with pulsing animation */}
      <img
        src="/next.png"
        className="rounded-full h-24 w-24 animate-pulse  object-contain "
        alt="Loading Logo" // Adding alt attribute for better accessibility
      />

      {/* Glowing ring effect */}
      <div className="absolute rounded-full h-[10rem] w-[10rem] border-2 border-dashed border-[#8F8F8F] opacity-50 animate-ping"></div>
    </div>
  );
};