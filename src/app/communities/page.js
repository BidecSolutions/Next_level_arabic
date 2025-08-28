// import Banner from '@/components/WebsiteComponents/Communities/Banner'
// import React from 'react'
// import { useState } from 'react';

// const page = () => {
//     const [trending, setTrending] = useState([]);
//     const [images, setImages] = useState([]);
//     const [features, setFeatures] = useState([]);
//     const location = useLocation();
//     const [pageData, setPageData] = useState([]);
//     const [data, setData] = useState();
//     const navigate = useNavigate();
//     const [searchTerm, setSearchTerm] = useState("");
//       useEffect(() => {
//     // Redirect if URL does not end with '/'
//     if (!location.pathname.endsWith("/")) {
//       navigate(location.pathname + "/", { replace: true });
//     }
//   }, [location.pathname, navigate]);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.public.get("user/communities");

//                 // Filter communities with status === 1
//                 const filteredCommunities = response.data.data.filter(
//                     (item) => item.status === 1
//                 );

//                 // Parse 'community_images' and 'key_features'
//                 const parsedCommunities = filteredCommunities.map((community) => {
//                     let images = [];
//                     let features = [];
//                     let updatefeatures = [];
//                     try {
//                         if (community.community_images) {
//                             images = JSON.parse(community.community_images);
//                         }
//                     } catch (e) {
//                         console.error("Error parsing community_images:", e);
//                     }

//                     try {
//                         if (community.key_features) {
//                             features = JSON.parse(community.key_features);
//                             updatefeatures = JSON.parse(features);
//                         }
//                     } catch (e) {
//                         console.error("Error parsing key_features:", e);
//                     }

//                     return {
//                         ...community,
//                         community_images: images,
//                         key_features: updatefeatures,
//                     };
//                 });

//                 setCommunity(parsedCommunities);
//             } catch (error) {
//                 console.error("Community Page Error:", error);
//             }
//         };

//         fetchData();
//     }, [location.pathname]);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.public.post(
//                     "user/off-plan-properties-and-projects/off-plan-property-list",
//                     {
//                         trending_type: 1,
//                         community_id: null,
//                         developer_id: null,
//                         property_type_id: null,
//                         area_id: null,
//                     }
//                 );

//                 // Filter communities with status === 1
//                 const filteredTrending = response.data.data.filter(
//                     (item) => item.status === 1
//                 );

//                 setTrending(filteredTrending);
//             } catch (error) {
//                 console.error("Trending Projects Error:", error);
//             }
//         };

//         fetchData();
//     }, [location.pathname]);


//     // Filter communities by search term
//     const filteredCommunities = community.filter((item) =>
//         item.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.public.get(
//                     `user/community-list-settings/community-list-details/1`
//                 );
//                 const responseData = response.data.data;
//                 console.log('resposde', response)

//                 setData(response.data.data);
//                 console.log("Community Faq's  Page", response.data.data);
//             } catch (error) {
//                 console.log("Community List  Page", error);
//             }
//         };
//         fetchData();
//     }, [location.pathname]);


//     return (
//         <div>
//             <Banner searchTerm={searchTerm}
//                 setSearchTerm={setSearchTerm}
//                 data={data} />
//         </div>
//     )
// }

// export default page

"use client";

import React, { useState, useEffect } from "react";
import Banner from "@/components/WebsiteComponents/Communities/Banner";
import { usePathname, useRouter } from "next/navigation";
import { fetchCommunitiesAPI, fetchCommunityListSettingsAPI, fetchTrendingAPI } from "@/lib/api/communities.server";
import PropertyList from "@/components/WebsiteComponents/HomeComponents/PropertyList";
import { Faqs } from "@/components/WebsiteComponents/off-plans/Faqs";
import { Inquiry } from "@/components/WebsiteComponents/off-plans/Inquiry";
import Overview from "@/components/WebsiteComponents/Communities/Overview";
import Overview2 from "@/components/WebsiteComponents/Communities/Overview2";
import CommunityShowcase from "@/components/WebsiteComponents/Communities/CommunityShowcase";

const Page = () => {
    const [trending, setTrending] = useState([]);
    const [images, setImages] = useState([]);
    const [features, setFeatures] = useState([]);
    const [pageData, setPageData] = useState([]);
    const [data, setData] = useState();
    const [searchTerm, setSearchTerm] = useState("");
    const [community, setCommunity] = useState([]); // FIX: Missing state in original code

    const pathname = usePathname();
    const router = useRouter();

    // Redirect if URL does not end with "/"
    useEffect(() => {
        if (!pathname.endsWith("/")) {
            router.replace(pathname + "/");
        }
    }, [pathname, router]);

    // Fetch communities
    //   useEffect(() => {
    //     const fetchCommunities = async () => {
    //       try {
    //         const response = await axios.public.get("user/communities");

    //         const filteredCommunities = response.data.data.filter(
    //           (item) => item.status === 1
    //         );

    //         const parsedCommunities = filteredCommunities.map((community) => {
    //           let images = [];
    //           let updatefeatures = [];

    //           try {
    //             if (community.community_images) {
    //               images = JSON.parse(community.community_images);
    //             }
    //           } catch (e) {
    //             console.error("Error parsing community_images:", e);
    //           }

    //           try {
    //             if (community.key_features) {
    //               const features = JSON.parse(community.key_features);
    //               updatefeatures = JSON.parse(features);
    //             }
    //           } catch (e) {
    //             console.error("Error parsing key_features:", e);
    //           }

    //           return {
    //             ...community,
    //             community_images: images,
    //             key_features: updatefeatures,
    //           };
    //         });

    //         setCommunity(parsedCommunities);
    //       } catch (error) {
    //         console.error("Community Page Error:", error);
    //       }
    //     };

    //     fetchCommunities();
    //   }, [pathname]);
    useEffect(() => {
        fetchCommunitiesAPI()
            .then((res) => setCommunity(res))
            .catch((err) => console.error("Community Page Error:", err));
    }, [pathname]);

    // Fetch trending projects
    //   useEffect(() => {
    //     const fetchTrending = async () => {
    //       try {
    //         const response = await axios.public.post(
    //           "user/off-plan-properties-and-projects/off-plan-property-list",
    //           {
    //             trending_type: 1,
    //             community_id: null,
    //             developer_id: null,
    //             property_type_id: null,
    //             area_id: null,
    //           }
    //         );

    //         const filteredTrending = response.data.data.filter(
    //           (item) => item.status === 1
    //         );

    //         setTrending(filteredTrending);
    //       } catch (error) {
    //         console.error("Trending Projects Error:", error);
    //       }
    //     };

    //     fetchTrending();
    //   }, [pathname]);
    // useEffect(() => {
    //     fetchTrendingAPI()
    //         .then((res) => setTrending(res))
    //         .catch((err) => console.error("Trending Projects Error:", err));
    // }, [pathname]);

    // Filter communities by search term
    const filteredCommunities = community.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Fetch community list settings
    //   useEffect(() => {
    //     const fetchListSettings = async () => {
    //       try {
    //         const response = await axios.public.get(
    //           `user/community-list-settings/community-list-details/1`
    //         );
    //         setData(response.data.data);
    //         console.log("Community Faq's Page", response.data.data);
    //       } catch (error) {
    //         console.log("Community List Page", error);
    //       }
    //     };
    //     fetchListSettings();
    //   }, [pathname]);
    useEffect(() => {
        fetchCommunityListSettingsAPI()
            .then((res) => setData(res))
            .catch((err) => console.error("Community List Page", err));
    }, [pathname]);

    return (
        <div>
            <Banner
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                data={data}
            />
            <div className="px-4 md:px-20">
                <CommunityShowcase
                    propertiesData={filteredCommunities}
                    images={images}
                    features={features}
                />
                <Overview
                    heading={data?.section_one_heading}
                    description={data?.section_one_description}
                    img1={data?.section_one_image_one}
                    img2={data?.section_one_image_two}
                    img3={data?.section_one_image_three}
                    page={'Community List'} />
                <Overview2
                    heading={data?.section_two_heading}
                    description={data?.section_two_description}
                    img1={data?.section_two_image_one}
                    img2={data?.section_two_image_two}
                    img3={data?.section_two_image_three}
                    page={'Community List'}
                />
                <div className=" flex md:flex-row flex-col items-center py-2 md:justify-between macbook:justify-center ">
                    <Faqs page={11} heading={data?.faqs_heading} />
                    <Inquiry page={`Community List`} />

                </div>
                <PropertyList />
            </div>
        </div>
    );
};

export default Page;
