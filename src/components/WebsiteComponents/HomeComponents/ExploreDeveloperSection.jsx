"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Image_NotFound, Image_URL } from "@/config/constants";
import { getDevelopers } from "@/lib/api/developer.server";
import Image from "next/image";

export default function ExploreDeveloperSection() {
  const [developers, setDevelopers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getDevelopers();
      setDevelopers(data);
    }
    fetchData();
  }, []);

  const targetDevelopers = ["Emaar", "Danube", "Nakheel", "DAMAC"];

  const filteredDevelopers = developers.filter((developer) =>
    targetDevelopers.includes(developer.name.split(" ")[0])
  );

  return (
    <div className="flex justify-center w-full my-12 md:my-20 flex-col items-center">
      <h3 className="text-center font-newsLetter font-semibold text-[#8F8F8F] text-[24px] md:text-3xl macbook:text-[55px] md:mb8">
        UAE Top Real Estate Developers
      </h3>

      <div className="flex mt-5 mb-5 md:mt-16 md:mb-16 w-full justify-center flex-wrap md:flex-nowrap gap-[5px] md:gap-6">
        {filteredDevelopers.slice(0, 4).map((developer, index) => (
          <div key={developer.id} className="relative">
            <div
              className={`overflow-hidden ${
                index === 0
                  ? "md:rounded-bl-[150px]"
                  : index === 3
                  ? "rounded-br-[75px] md:rounded-br-[150px]"
                  : ""
              }`}
            >
              <Image
                src={`${Image_URL}${developer.image_path}`}
                alt={developer.name}
                loading="lazy"
                className={`w-[155px] h-[240px] md:w-[400px] md:h-[400px] object-cover ${
                  index === 0
                    ? "md:rounded-bl-[150px]"
                    : index === 3
                    ? "rounded-br-[75px] md:rounded-br-[150px]"
                    : index === 2
                    ? "rounded-bl-[75px] md:rounded-bl-none"
                    : ""
                }`}
                width={400}
  height={300}
                onError={(e) => {
                  e.currentTarget.src = Image_NotFound;
                }}
              />
              <Link href={`/developer/${developer.slug}`}>
                <div
                  className={`absolute inset-0 flex items-end pb-6 md:pb-20 justify-center bg-black/20 bg-opacity-50 ${
                    index === 0
                      ? "md:rounded-bl-[150px]"
                      : index === 3
                      ? "rounded-br-[75px] md:rounded-br-[150px]"
                      : index === 2
                      ? "rounded-bl-[75px] md:rounded-bl-none"
                      : ""
                  }`}
                >
                  <h3 className="text-white font-montserrat text-[13px] text-center w-20 md:w-52 md:text-[15px] lg:text-2xl font-semibold">
                    {developer.name}
                  </h3>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <Link
          href="/developers/"
          className="px-6 py-2 font-montserrat bg-[#8F8F8F] text-white hover:bg-transparent hover:text-[#8F8F8F] border hover:border-[#8F8F8F] macbook:text-[16px] rounded-[6.5px]"
        >
          View All Developers
        </Link>
      </div>
    </div>
  );
}
