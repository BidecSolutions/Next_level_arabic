"use client";

import React from "react";
import { useParams } from "next/navigation";

export default function ChooseState({ pmId: pmIdProp, data }) {
  const params = useParams();
  const pmId = pmIdProp || params?.slug;

  const landlordData = [
    {
      img: "/property/landlordIcon-1.png",
      name: "Professionalism",
    },
    {
      img: "/property/landlordIcon-2.png",
      name: "To keep Properties in safe hands",
    },
    {
      img: "/property/landlordIcon-3.png",
      name: "To put the right price of Property",
    },
    {
      img: "/property/landlordIcon-4.png",
      name: "To put Tenant Screening",
    },
    {
      img: "/property/landlordIcon-5.png",
      name: "Stress - free passive income",
    },
    {
      img: "/property/landlordIcon-6.png",
      name: "Tenant Retention",
    },
  ];

  // Default display data
  let displayData = landlordData;

  if (data?.why_landlord_details) {
    try {
      const parsed =
        typeof data.why_landlord_details === "string"
          ? JSON.parse(data.why_landlord_details)
          : data.why_landlord_details;

      if (Array.isArray(parsed) && parsed.length > 0) {
        displayData = parsed.slice(0, 6);
      }
    } catch (e) {
      console.warn("Failed to parse why_landlord_details", e);
    }
  }

  return (
    <div className="w-full flex flex-col items-center justify-center my-24">
      <h4 className="font-newsLetter uppercase text-[22px] md:text-[34px] text-[#8F8F8F] text-center mb-6">
        {data?.why_landlord_heading || "Why Choose Us?"}
      </h4>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 grid-flow-row py-5">
        {displayData.map((service, index) => (
          <div
            key={index}
            className="flex flex-col py-4 w-[150px] md:w-60 macbook:w-96 text-center gap-4 items-center justify-center border border-[#0B0B0B] rounded-xl p-2 md:p-4"
          >
            <img
              className="w-8 md:w-12"
              src={landlordData?.[index]?.img || "/property/default.png"}
              alt={service.name || service.title || "Default"}
            />
            <p className="text-[#8F8F8F] font-montserrat text-[13px] md:text-xl">
              {service.title || service.name || "Professionalism"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
