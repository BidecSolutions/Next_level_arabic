"use client"
import PropertyList from '@/components/WebsiteComponents/HomeComponents/PropertyList'
import Banner from '@/components/WebsiteComponents/off-plans/Banner'
import DeveloperSlider from '@/components/WebsiteComponents/off-plans/DeveloperSlider'
import { Faqs } from '@/components/WebsiteComponents/off-plans/Faqs'
import GetInTouch from '@/components/WebsiteComponents/off-plans/GetInTouch'
import HowToBuy from '@/components/WebsiteComponents/off-plans/HowToBuy'
import { Inquiry } from '@/components/WebsiteComponents/off-plans/Inquiry'
import LatestProject from '@/components/WebsiteComponents/off-plans/LatestProject'
import MarketTransaction from '@/components/WebsiteComponents/off-plans/MarketTransaction'
import { NewSection } from '@/components/WebsiteComponents/off-plans/NewSection'
import { fetchHowToBuyData } from '@/lib/api/offplan.server'
import React, { useEffect, useState } from 'react'

const page = () => {
    const [howToBuyData, setHowToBuyData] = useState(null);
    // useEffect(() => {

    //     const fetchHowToBuyData = async () => {
    //         try {
    //             const response = await axios.public.post("user/how-to-buys/detail", {
    //                 page_id: 2,
    //             }); // Adjust the endpoint based on your API
    //             if (response.data.status === "success") {
    //                 setHowToBuyData(response.data.data);
    //             }
    //         } catch (error) {
    //             console.error("Error fetching How to Buy data:", error);
    //         }
    //     };

    //     fetchHowToBuyData();
    // }, []);

    useEffect(() => {
        fetchHowToBuyData(2)
            .then(setHowToBuyData)
            .catch((err) => {
            });
    }, []);
    return (
        <div>
            <Banner page={'offPlan'} />
            <div className="px-4 md:px-20">

                <LatestProject/>

                <MarketTransaction />
                <HowToBuy howToBuyData={howToBuyData} pageName={'OffPlan'} />
                <NewSection howToBuyData={howToBuyData} pageName={'OffPlan'} />
                <div className=" flex md:flex-row flex-col items-center py-2 md:justify-between macbook:justify-center ">
                    <Faqs page={7} />
                    <Inquiry page={`OffPlan`} />
                </div>
                <PropertyList />
                <DeveloperSlider />
                <GetInTouch />
            </div>
        </div>
    )
}

export default page