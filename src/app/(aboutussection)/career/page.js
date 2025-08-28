"use client";
import { Banner } from '@/components/WebsiteComponents/Career/Banner'
import { Intro } from '@/components/WebsiteComponents/Career/Intro'
import JobSection from '@/components/WebsiteComponents/Career/JobSection'
// import JobSection from '@/components/WebsiteComponents/Career/JobSection'
import React from 'react'

const page = () => {
    return (
        <div>
            <Banner
                heading="Career Opportunity"
                breadcrumb="Home \ Career Opportunity"
            />    <Intro />
            {/* <JobSection/> */}
            <JobSection />
        </div>
    )
}

export default page