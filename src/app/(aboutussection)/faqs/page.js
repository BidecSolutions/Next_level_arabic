import { Banner } from '@/components/WebsiteComponents/Career/Banner'
import FaqsSection from '@/components/WebsiteComponents/Faqs/FaqsSection'
import SubmitQuestion from '@/components/WebsiteComponents/Faqs/SubmitQuestion'
import React from 'react'

const page = () => {
    return (
        <div>
            <Banner
                heading="الأسئلة الشائعة"
                breadcrumb="بيت \ الأسئلة الشائعة"
            />
            <FaqsSection/>
            <SubmitQuestion/>
        </div>
    )
}

export default page