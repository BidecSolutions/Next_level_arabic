"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // App Router hook
import { Banner } from "@/components/WebsiteComponents/Our-Team/Banner";
import ProfileSection from "@/components/WebsiteComponents/Our-Team/ProfileSection";
import DepartmentSection from "@/components/WebsiteComponents/Our-Team/DepartmentSection";

export default function AgentsPageClient({ ownerData }) {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
console.log('ownerData', ownerData);
  useEffect(() => {
    // Ensure trailing slash
    if (!window.location.pathname.endsWith("/")) {
      router.replace(window.location.pathname + "/");
    }
  }, [router]);

  return (
    <div className="bg-gray-50">
      <Banner
        data={{
      banner_title: "وكلائنا",
      banner_description: "",
      image_path: null,
    }}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={() => {}}
      />
      <div className="px-5 md:px-20">
        {!searchTerm && <ProfileSection info={ownerData}/>}
        <DepartmentSection searchTerm={searchTerm} />
      </div>
    </div>
  );
}
