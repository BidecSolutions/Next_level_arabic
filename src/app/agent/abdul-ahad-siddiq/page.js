
import { getAreaBySlug } from "@/lib/api/areas.server";
import OwnerClient from "./OwnerClient";
import NotFound from "@/components/WebsiteComponents/NotFound";
import { getOwnerDetails } from "@/lib/api/owner.server";

export default async function Page() {
  try {
    const Data = await getOwnerDetails();

    if (!Data) {
      return <NotFound />;
    }

    return <OwnerClient data={Data} />;
  } catch (error) {
    console.error("Error loading Owner Client page:", error);
    return <NotFound />;
  }
}
