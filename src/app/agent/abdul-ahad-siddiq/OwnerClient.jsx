import React from "react";
import OwnerBanner from "@/components/WebsiteComponents/OwnerDetail/OwnerBanner";
import StaticCards from "@/components/WebsiteComponents/OwnerDetail/StaticCards";
import OwnerOverview from "@/components/WebsiteComponents/OwnerDetail/OwnerOverview";
import AreaSpecialization from "@/components/WebsiteComponents/OwnerDetail/AreaSpecialization";
import PropertyListing from "@/components/WebsiteComponents/Agent-Detail/PropertyListing";


function OwnerClient({ data }) {
    console.log("vbn",data)
  return (
    <div className="pb-10">
      <div className="relative">
        <OwnerBanner ownerDetails={data} />
        <StaticCards />
      </div>
      <div className=" px-5 md:px-20">
         <OwnerOverview ownerDetails={data} />
       <PropertyListing agentId={9} />
        <AreaSpecialization />
      </div>
    </div>
  );
}

export default OwnerClient;
