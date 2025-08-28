import Developer from "./Developer";
import NotFound from "@/components/WebsiteComponents/NotFound";
import { getDeveloperListPage, getDevelopers } from "@/lib/api/developer.server";

export default async function Page() {

  try {
    const pageData = await getDeveloperListPage();
    const developers = await getDevelopers();

    if (!pageData) {
      return <NotFound />;
    }

    return <Developer developers={developers} pageData={pageData} />;
  } catch (error) {
    console.error("Error loading AreaDetail page:", error);
    return <NotFound />;
  }
}
