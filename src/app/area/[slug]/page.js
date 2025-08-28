
import { getAreaBySlug } from "@/lib/api/areas.server";
import AreaDetail from "./AreaDetail";
import NotFound from "@/components/WebsiteComponents/NotFound";

export default async function Page({ params }) {
  const { slug } = params; // ✅ no need for await here

  console.log("Area slug:", slug);

  try {
    const areaData = await getAreaBySlug(slug);

    if (!areaData) {
      return <NotFound />;
    }

    return <AreaDetail data={areaData} />;
  } catch (error) {
    console.error("Error loading AreaDetail page:", error);
    return <NotFound />;
  }
}
