"use client"; // if you’re using Next.js 13+ App Router

import { useRouter } from "next/navigation";
import ParseBody from "../HomeComponents/ParseBody";
import { Image_URL } from "@/config/constants";

export const Banner = ({ page }) => {
  const router = useRouter();

  return (
    <div className="flex justify-center text-white">
      <div
        className="relative h-[34rem] md:h-[600px] w-[90%] md:w-[95%] md:pt-[140px] bg-cover bg-center rounded-bl-[50px] rounded-br-[50px]  md:rounded-bl-[90px] gap-[10px] md:rounded-br-[90px] flex flex-col items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${
            page?.banner_image
              ? `${Image_URL}${page?.banner_image}`
              : "/Areas/banner.png"
          })`,
        }}
      >
        <h1 className="text-2xl md:text-5xl text-center font-newsLetter">
          {page?.banner_heading
            ? page?.banner_heading
            : "Ready To Move-In Projects"}
        </h1>

        {page?.banner_description ? (
          <div className="mx-5 text-center">
            <ParseBody body={page?.banner_description.substring(0, 200)} />
          </div>
        ) : (
          <p className="text-lg md:text-xl font-montserrat">
            Home \ Ready Projects
          </p>
        )}
      </div>
    </div>
  );
};
