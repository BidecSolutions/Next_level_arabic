// app/our-team/page.js (Server Component)

import { fetchOwnerDetails, getAgentListBannerDetails } from "@/lib/api/agent.server";
import AgentsPageClient from "./AgentsPageClient";

export default async function OurTeamPage() {
  // const bannerData = await getAgentListBannerDetails();
  const ownerData = await fetchOwnerDetails();

  return <AgentsPageClient
  ownerData={ownerData} 
  />;
}
