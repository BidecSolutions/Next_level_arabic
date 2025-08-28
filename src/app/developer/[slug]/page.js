import NotFound from "@/components/WebsiteComponents/NotFound";
import DeveloperClient from "./DeveloperClient";
import { getDeveloperPage } from "@/lib/api/developer.server";

export default async function Page({ params }) {
  const { slug } = params;

  try {
    const developerData = await getDeveloperPage(slug);

    if (!developerData) {
      return <NotFound />;
    }

    return (
      <DeveloperClient
        developer={developerData}
      />
    );
  } catch (error) {
    console.error("Error loading Developer page:", error);
    return <NotFound />;
  }
}
