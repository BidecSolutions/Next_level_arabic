import NotFound from "@/components/WebsiteComponents/NotFound";
import BuyClient from "./BuyClient";
import { getBuyPage } from "@/lib/api/buy.server";

export default async function Page() {
  // const { slug } = await params; 
  try {
    const pageData = await getBuyPage('off-plan-apartment-for-sale/');

    if (!pageData) {
      return <NotFound />;
    }

    return <BuyClient data={pageData} />;
  } catch (error) {
    console.error("Error loading AreaDetail page:", error);
    return <NotFound />;
  }
}
