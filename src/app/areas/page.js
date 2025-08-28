// "use Client"
// import { Banner } from '@/components/WebsiteComponents/Areas/Banner'
// import React from 'react'

// const page = () => {
//     const [searchTerm, setSearchTerm] = useState("");
//     const [howToBuyData, setHowToBuyData] = useState(null);
//     const [areas, setAreas] = useState([]);
//     const [trending, setTrending] = useState([]);

//     const [pageData, setPageData] = useState([]);
//     const location = useLocation();
//     const navigate = useNavigate();

//     useEffect(() => {
//         // Redirect if URL does not end with '/'
//         if (!location.pathname.endsWith("/")) {
//             navigate(location.pathname + "/", { replace: true });
//         }
//     }, [location.pathname, navigate]);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.public.get(
//                     `user/area-list-settings/area-list-details/1`
//                 );
//                 const responseData = response.data.data;

//                 // Check the status directly
//                 if (responseData.status == 1) {
//                     setPageData(responseData);
//                 }
//                 console.log("Area Data", pageData);
//             } catch (error) {
//                 console.log("Area List Page Details", error);
//             }
//         };
//         fetchData();
//     }, []);

//     // Fetch "How to Buy" data from the API
//     useEffect(() => {
//         const fetchHowToBuyData = async () => {
//             try {
//                 const response = await axios.public.post("user/how-to-buys/detail", {
//                     page_id: 1,
//                 }); // Adjust the endpoint based on your API
//                 if (response.data.status === "success") {
//                     setHowToBuyData(response.data.data);
//                     console.log("how", howToBuyData);
//                 }
//             } catch (error) {
//                 console.error("Error fetching How to Buy data:", error);
//             }
//         };

//         fetchHowToBuyData();
//     }, []);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.public.get("user/areas");
//                 // setAreas(response.data.data);
//                 // Filter the data where status is 1
//                 const filteredProperties = response.data.data.filter(
//                     (property) => property.status === 1
//                 );

//                 // Set the filtered properties to state
//                 setAreas(filteredProperties);
//                 console.log(response.data.data);
//             } catch (error) {
//                 console.log("Area List Page", error);
//             }
//         };
//         fetchData();
//     }, []);

//     useEffect(() => {
//         const fetchTrendingProjects = async () => {
//             // if (developer?.id) {
//             try {
//                 const response = await axios.public.post(
//                     "user/off-plan-properties-and-projects/off-plan-property-list",
//                     {
//                         trending_type: 1,
//                         community_id: "",
//                         developer_id: "", // Pass correct developer ID
//                         property_type_id: "",
//                         area_id: "",
//                     }
//                 );

//                 // Filter projects with status === 1
//                 const filteredTrending = response.data.data.filter(
//                     (item) => item.status === 1
//                 );

//                 setTrending(filteredTrending);
//             } catch (error) {
//                 console.error("Trending Projects Error:", error);
//             }
//         };

//         fetchTrendingProjects();
//     }, []);

//     return (
//         <div>

//             <Banner
//                 searchTerm={searchTerm}
//                 setSearchTerm={setSearchTerm}
//                 page={pageData}
//             />
//         </div>
//     )
// }

// export default page
"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Banner } from "@/components/WebsiteComponents/Areas/Banner";
import { getAreaListDetails, getAreas, getHowToBuyData, getTrendingProjects } from "@/lib/api/areas.server";
import { AreaList } from "@/components/WebsiteComponents/Areas/AreaList";
import HowToBuy from "@/components/WebsiteComponents/off-plans/HowToBuy";
import PropertyList from "@/components/WebsiteComponents/HomeComponents/PropertyList";
import { BestProperty } from "@/components/WebsiteComponents/Areas/BestProperty";
import GetInTouch from "@/components/WebsiteComponents/off-plans/GetInTouch";
import PopularCommunity from "@/components/WebsiteComponents/Areas/PopularCommunity";
import { Faqs } from "@/components/WebsiteComponents/off-plans/Faqs";
import { Inquiry } from "@/components/WebsiteComponents/off-plans/Inquiry";
import AgentSlider from "@/components/WebsiteComponents/HomeComponents/AgentSlider";
// import {
//   getAreaListDetails,
//   getHowToBuyData,
//   getAreas,
//   getTrendingProjects,
// } from "@/services/areasApi";

const AreasPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [howToBuyData, setHowToBuyData] = useState(null);
    const [areas, setAreas] = useState([]);
    const [trending, setTrending] = useState([]);
    const [pageData, setPageData] = useState([]);

    const pathname = usePathname();
    const router = useRouter();

    // Redirect if URL does not end with "/"
    useEffect(() => {
        if (!pathname.endsWith("/")) {
            router.replace(pathname + "/");
        }
    }, [pathname, router]);

    // Fetch page data
    useEffect(() => {
        getAreaListDetails(1).then((data) => {
            if (data?.status == 1) {
                setPageData(data);
            }
        });
    }, []);

    // Fetch "How to Buy" data
    useEffect(() => {
        getHowToBuyData(1).then((data) => {
            if (data) {
                setHowToBuyData(data);
            }
        });
    }, []);

    // Fetch Areas
    useEffect(() => {
        getAreas().then((data) => {
            if (data) {
                setAreas(data);
            }
        });
    }, []);

    // Fetch Trending Projects
    useEffect(() => {
        getTrendingProjects().then((data) => {
            if (data) {
                setTrending(data);
            }
        });
    }, []);

    return (
        <div>
            <Banner
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                page={pageData}

            />
            <div className="w-full px-5 md:px-24">
                <AreaList searchTerm={searchTerm} />
<HowToBuy
  howToBuyData={{
    heading: pageData?.how_to_buy_1_heading,
    description: pageData?.how_to_buy_1_description,
    buy_image: pageData?.how_to_buy_1_image,
  }}
  pageName="Area List"
  page={{  
    buy_image: pageData?.how_to_buy_1_image,
   }}
/>


                {/* <PropertyList /> */}
                <BestProperty heading={pageData?.property_section_heading} />
                <GetInTouch />
                <PopularCommunity
                    heading={pageData?.communities_section_heading}
                    description={pageData?.communities_section_description}
                />          <div className=" flex md:flex-row flex-col items-center py-2 md:justify-between macbook:justify-center ">
                    <Faqs page={2} heading={pageData?.faqs_heading} />
                    <Inquiry page={`Area List`} />

                </div>
                <AgentSlider />
                <PropertyList />

            </div>
        </div>
    );
};

export default AreasPage;
