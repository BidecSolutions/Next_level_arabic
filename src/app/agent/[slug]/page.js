
"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Loader } from "@/components/WebsiteComponents/Loader";
import NotFound from "@/components/WebsiteComponents/NotFound";
// import Banner from "@/components/WebsiteComponents/Agents/Banner"; // apna sahi path lagao
import { fetchAgentDetails } from "@/lib/api/agent.server";
import BannerSlider from "@/components/WebsiteComponents/Communities/BannerSlider";
import DetailSection from "@/components/WebsiteComponents/Agent-Detail/DetailSection";
import PropertyListing from "@/components/WebsiteComponents/Agent-Detail/PropertyListing";
import AreaSpecialization from "@/components/WebsiteComponents/Agent-Detail/AreaSpecialization";
// import { fetchAgentDetails } from "@/services/agentApi";

const Page = () => {
  const pathname = usePathname();
  const agentId = pathname?.split("/agent/")[1];

  const [agentDetails, setAgentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!agentId) return;

    const getAgentDetails = async () => {
      setLoading(true);
      const res = await fetchAgentDetails(agentId);
      console.log(res,"respso")

      if (res.success) {
        setAgentDetails(res.data);
      } else {
        setHasError(true);
      }

      setLoading(false);
    };

    getAgentDetails();
  }, [agentId]);

  if (loading) return <Loader />;
  if (hasError) return <NotFound />;

  return (
    <div>
      <BannerSlider  data={agentDetails} type="agent" />
        <div className="px-5 md:px-20">
            <DetailSection data={agentDetails}/>
        <PropertyListing agentId={agentDetails?.id} />
<AreaSpecialization heading={agentDetails?.area_of_specialization_heading} data={agentDetails}/>
        </div>
    </div>
  );
};

export default Page;
