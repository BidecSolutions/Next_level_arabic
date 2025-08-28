import { Banner } from '@/components/WebsiteComponents/Career/Banner'
import FaqsSection from '@/components/WebsiteComponents/Faqs/FaqsSection'
import SubmitQuestion from '@/components/WebsiteComponents/Faqs/SubmitQuestion'
import React from 'react'

const page = () => {
    return (
        <div>
            <Banner
                heading="Frequent Asked Question"
                breadcrumb="Home \ Faq"
            />
            <FaqsSection/>
            <SubmitQuestion/>
        </div>
    )
}

export default page