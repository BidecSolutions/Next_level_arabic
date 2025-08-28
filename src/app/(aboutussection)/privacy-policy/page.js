import { Banner } from '@/components/WebsiteComponents/Career/Banner'
import React from 'react'

const page = () => {
    return (
        <div>
            <Banner
                heading=" Privacy Policy"
                // breadcrumb="Home \ Career Opportunity"
            /> 
            
      <div className="container mx-auto px-4 lg:px-16 py-[10rem]">
        <div className="bg-white rounded-lg p-8 space-y-6">
          {/* Introduction Section */}
          <section>
            <h2 className="text-2xl font-montserrat font-semibold mb-4 text-gray-700">
              Introduction
            </h2>
            <p className="text-gray-600 font-montserrat  ">
              Welcome to Next Level. We value your privacy and are committed to
              protecting your personal information. This privacy policy will
              explain how we manage your personal data, your privacy rights, and
              how the law safeguards you.
            </p>
          </section>

          {/* Information We Collect Section */}
          <section>
            <h2 className="text-2xl font-montserrat font-semibold mb-4 text-gray-700">
              Information We Collect
            </h2>
            <p className="text-gray-600 font-montserrat  ">
              When you browse our website or inquire about properties, we may
              collect the following information:
            </p>
            <ul className="list-disc pl-6 font-montserrat space-y-2 text-gray-600">
              <li>
                Personal Information: Name, email address, phone number, and
                mailing address.
              </li>
              <li>
                Property Preferences: Information about the type, location, and
                budget for properties you are interested in.
              </li>
              <li>
                Communication Data: Details about your inquiries, messages, and
                interactions with us.
              </li>
              <li>
                Technical Data: IP address, browser type, and website usage data
                to improve our services.
              </li>
            </ul>
          </section>

          {/* How We Use Your Information Section */}
          <section>
            <h2 className="text-2xl font-semibold font-montserrat mb-4 text-gray-700">
              How We Use Your Information
            </h2>
            <p className="text-gray-600 font-montserrat  ">
              We use your personal data to offer, maintain, and enhance our real
              estate services. This includes:
            </p>
            <ul className="list-disc pl-6 font-montserrat space-y-2 text-gray-600">
              <li>Helping you find properties that meet your requirements.</li>
              <li>
                Providing information on available properties and scheduling
                viewings.
              </li>
              <li>
                Communicating with you about your inquiries and assisting with
                the purchase or rental process.
              </li>
              <li>
                Personalizing your experience on our website to show you
                relevant property listings.
              </li>
            </ul>
          </section>

          {/* Sharing Your Information Section */}
          <section>
            <h2 className="text-2xl font-montserrat font-semibold mb-4 text-gray-700">
              Sharing Your Information
            </h2>
            <p className="text-gray-600 font-montserrat   ">
              We may share your personal data with third parties to facilitate
              our services, including:
            </p>
            <ul className="list-disc pl-6 font-montserrat space-y-2 text-gray-600">
              <li>
                Real estate agents and brokers to assist with property viewings
                and transactions.
              </li>
              <li>Service providers for website analytics and improvements.</li>
            </ul>
            <p className="text-gray-600">
              We do not sell your personal information to third parties.
            </p>
          </section>

          {/* Your Rights Section */}
          <section>
            <h2 className="text-2xl font-montserrat font-semibold mb-4 text-gray-700">
              Your Rights
            </h2>
            <p className="text-gray-600 font-montserrat  ">
              You have the following rights regarding your personal information:
            </p>
            <ul className="list-disc font-montserrat pl-6 space-y-2 text-gray-600">
              <li>Right to access your personal data.</li>
              <li>Right to request corrections to inaccurate data.</li>
              <li>Right to request deletion of your personal data.</li>
              <li>Right to object to or limit our use of your data.</li>
            </ul>
          </section>

          {/* Data Security Section */}
          <section>
            <h2 className="text-2xl font-montserrat font-semibold mb-4 text-gray-700">
              Data Security
            </h2>
            <p className="text-gray-600  font-montserrat ">
              We employ reasonable security measures to protect your personal
              data from unauthorized access, disclosure, or loss. However, no
              method of internet transmission is entirely secure, and we cannot
              guarantee absolute security.
            </p>
          </section>

          {/* Changes to This Policy Section */}
          <section>
            <h2 className="text-2xl font-montserrat font-semibold mb-4 text-gray-700">
              Changes to This Policy
            </h2>
            <p className="text-gray-600  font-montserrat ">
              We may occasionally update this privacy policy to reflect changes
              in our practices or legal requirements. We recommend checking this
              page periodically for updates.
            </p>
          </section>

          {/* Contact Us Section */}
          <section>
            <h2 className="text-2xl font-montserrat font-semibold mb-4 text-gray-700">
              Contact Us
            </h2>
            <p className="text-gray-600 font-montserrat ">
              If you have any questions about this privacy policy or our privacy
              practices, please contact us at:
            </p>
            <p className="text-gray-600 font-montserrat  ">
              <strong>Email:</strong> media@nextlevelrealestate.ae <br />
              <strong>Phone:</strong> +97144542828
            </p>
          </section>
        </div>
      </div>
    </div>
    )
}

export default page