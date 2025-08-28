// "use client";

// import { useState } from "react";
// import { FaEnvelope, FaWhatsapp } from "react-icons/fa";
// import { BiSolidPhoneCall } from "react-icons/bi";
// import axios from "@/utils/axios";
// import { Image_Url } from "@/utils/const";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import CustomDetailSeo from "@/components/AgentPanel/Components/CustomDetailSeo";
// import ReactCountryDropdown from "react-country-dropdown";
// import { isValidPhoneNumber } from "libphonenumber-js";

// const DetailSection = ({ data }) => {
//   const [code, setCode] = useState("971");
//   const [formData, setFormData] = useState({
//     full_name: "",
//     phone: "",
//     email: "",
//     message: "",
//   });
//   const [feedback, setFeedback] = useState("");

//   // handle form changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // handle inquiry submit
//   const handleInquiry = async () => {
//     const fullPhone = `+${code}${formData.phone.replace(/\s+/g, "")}`;
//     const isValid = isValidPhoneNumber(fullPhone, code);

//     if (!isValid) {
//       toast.error("Invalid phone number.");
//       return;
//     }

//     try {
//       await axios.public.post("user/inquiry-forms/store", formData);
//       setFeedback("Inquiry sent successfully!");
//       toast.success("Inquiry sent successfully!");
//       setFormData({ full_name: "", phone: "", email: "", message: "" });
//       setTimeout(() => setFeedback(""), 2000);
//     } catch (error) {
//       setFeedback("Error sending inquiry. Please try again.");
//       toast.error("Error sending inquiry.");
//       setTimeout(() => setFeedback(""), 2000);
//     }
//   };

//   return (
//     <div className="flex flex-col h-full items-center py-5 md:py-12">
//       <CustomDetailSeo
//         title={data?.meta_title}
//         des={data?.meta_description}
//         focuskey={data?.focus_keyword}
//         canonicalUrl={data?.canonical_url}
//         schema={data?.schema}
//       />

//       <ToastContainer autoClose={1000} />
//       <div className="flex md:flex-row flex-col gap-10 w-full md:pt-24 items-center">
//         {/* Profile Section */}
//         <div className="md:w-[60%] flex flex-col border-b border-[#8F8F8F] pb-12">
//           <div className="flex flex-col md:flex-row gap-6 md:gap-20">
//             {/* Profile Image */}
//             <div className="md:w-[50%]">
//               <img
//                 src={`${Image_Url}${data?.profile_image}`}
//                 alt="Agent Profile"
//                 className="max-w-[750px] h-[480px] rounded-br-[250px] object-contain"
//               />
//             </div>

//             {/* Info */}
//             <div className="flex flex-col md:w-[50%] gap-4 md:mt-20">
//               <h2 className="text-3xl font-semibold text-[#6B6B6B]">{data?.name}</h2>
//               <p
//                 className="text-[#6B6B6B]"
//                 dangerouslySetInnerHTML={{ __html: data?.introduction }}
//               />

//               {/* Contact */}
//               <div className="flex flex-col gap-3">
//                 <div className="flex gap-3 items-center">
//                   <a href={`mailto:${data?.email}`} className="border rounded-md p-2">
//                     <FaEnvelope className="text-xl text-[#A39D9D]" />
//                   </a>
//                   <span>{data?.email}</span>
//                 </div>

//                 <div className="flex gap-3 items-center">
//                   <a href={`tel:${data?.phone_no}`} className="border rounded-md p-2">
//                     <BiSolidPhoneCall className="text-xl text-[#A39D9D]" />
//                   </a>
//                   <span>{data?.phone_no}</span>
//                 </div>

//                 <div className="flex gap-3 items-center">
//                   <a
//                     href={`https://wa.me/${data?.whatsapp_no}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="border rounded-md p-2"
//                   >
//                     <FaWhatsapp className="text-xl text-[#A39D9D]" />
//                   </a>
//                   <span>{data?.whatsapp_no}</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Overview */}
//           <div className="mt-10">
//             <h2 className="text-2xl font-semibold text-[#6B6B6B]">Overview</h2>
//             <p
//               className="text-[#6B6B6B] mt-4"
//               dangerouslySetInnerHTML={{ __html: data?.description }}
//             />
//           </div>
//         </div>

//         {/* Inquiry Form */}
//         <div className="max-w-[420px] md:w-[25%]">
//           <div className="p-4 border-2 rounded-md">
//             <h1 className="text-2xl font-semibold text-[#6B6B6B]">Contact</h1>
//             <div className="flex flex-col gap-3 mt-4">
//               <input
//                 type="text"
//                 name="full_name"
//                 value={formData.full_name}
//                 onChange={handleChange}
//                 placeholder="Full Name"
//                 className="border p-2 rounded-md"
//               />
//               <div className="flex gap-2">
//                 <ReactCountryDropdown
//                   defaultCountry="AE"
//                   onSelect={(country) => setCode(country.callingCodes[0])}
//                 />
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   placeholder="Phone"
//                   className="border p-2 rounded-md w-full"
//                 />
//               </div>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Email"
//                 className="border p-2 rounded-md"
//               />
//               <textarea
//                 name="message"
//                 value={formData.message}
//                 onChange={handleChange}
//                 placeholder="Message"
//                 className="border p-2 rounded-md"
//               />
//               <button
//                 onClick={handleInquiry}
//                 className="bg-[#8F8F8F] text-white py-2 rounded-md"
//               >
//                 Send Inquiry
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DetailSection;
"use client";

import { useState } from "react";
import { FaEnvelope, FaWhatsapp } from "react-icons/fa";
import { BiSolidPhoneCall } from "react-icons/bi";
import { Image_NotFound, Image_URL } from "@/config/constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import CustomDetailSeo from "@/components/AgentPanel/Components/CustomDetailSeo";
// import ReactCountryDropdown from "react-country-dropdown";
import { isValidPhoneNumber } from "libphonenumber-js";
import { sendInquiry } from "@/lib/api/agent.server";
import { Inquiry } from "../off-plans/Inquiry";
// import { sendInquiry } from "@/utils/api"; // ✅ yahan apka function import hoga

const DetailSection = ({ data }) => {
  const [code, setCode] = useState("971");
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [feedback, setFeedback] = useState("");

  // handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // handle inquiry submit
  const handleInquiry = async () => {
    const fullPhone = `+${code}${formData.phone.replace(/\s+/g, "")}`;
    const isValid = isValidPhoneNumber(fullPhone, code);

    if (!isValid) {
      toast.error("Invalid phone number.");
      return;
    }

    try {
      const payload = {
        ...formData,
        phone: fullPhone, // ✅ properly formatted phone bhejna
      };

      const res = await sendInquiry(payload);

      if (res.success) {
        setFeedback("Inquiry sent successfully!");
        toast.success("Inquiry sent successfully!");
        setFormData({ full_name: "", phone: "", email: "", message: "" });
        setTimeout(() => setFeedback(""), 2000);
      } else {
        setFeedback("Error sending inquiry. Please try again.");
        toast.error(res.error || "Error sending inquiry.");
        setTimeout(() => setFeedback(""), 2000);
      }
    } catch (error) {
      setFeedback("Unexpected error occurred.");
      toast.error("Unexpected error occurred.");
      setTimeout(() => setFeedback(""), 2000);
    }
  };

  return (
    <div className="flex flex-col h-full items-center py-5 md:py-12">
      {/* <CustomDetailSeo
        title={data?.meta_title}
        des={data?.meta_description}
        focuskey={data?.focus_keyword}
        canonicalUrl={data?.canonical_url}
        schema={data?.schema}
      /> */}

      <ToastContainer autoClose={1000} />
      <div className="flex md:flex-row flex-col gap-10 w-full md:pt-24 items-center">
        {/* Profile Section */}
        <div className="md:w-[60%] flex flex-col border-b border-[#8F8F8F] pb-12">
          <div className="flex flex-col md:flex-row gap-6 md:gap-20">
            {/* Profile Image */}
            <div className="md:w-[50%]">
              <img
                src={`${Image_URL}${data?.profile_image}`}
                alt="Agent Profile"
                className=" h-[480px] rounded-br-[250px] object-contain"
              />
            </div>

            {/* Info */}
            <div className="flex flex-col md:w-[50%] gap-4 md:mt-20">
              <h2 className="text-3xl font-semibold text-[#6B6B6B]">
                {data?.name}
              </h2>
              <p
                className="text-[#6B6B6B]"
                dangerouslySetInnerHTML={{ __html: data?.introduction }}
              />

              {/* Contact */}
              <div className="flex flex-col gap-3">
                <div className="flex gap-3 items-center">
                  <a
                    href={`mailto:${data?.email}`}
                    className="border rounded-md p-2"
                  >
                    <FaEnvelope className="text-xl text-[#A39D9D]" />
                  </a>
                  <span>{data?.email}</span>
                </div>

                <div className="flex gap-3 items-center">
                  <a
                    href={`tel:${data?.phone_no}`}
                    className="border rounded-md p-2"
                  >
                    <BiSolidPhoneCall className="text-xl text-[#A39D9D]" />
                  </a>
                  <span>{data?.phone_no}</span>
                </div>

                <div className="flex gap-3 items-center">
                  <a
                    href={`https://wa.me/${data?.whatsapp_no}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border rounded-md p-2"
                  >
                    <FaWhatsapp className="text-xl text-[#A39D9D]" />
                  </a>
                  <span>{data?.whatsapp_no}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Overview */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold text-[#6B6B6B]">Overview</h2>
            <p
              className="text-[#6B6B6B] mt-4"
              dangerouslySetInnerHTML={{ __html: data?.description }}
            />
          </div>
        </div>

        {/* Inquiry Form */}
        <div className="max-w-[420px] md:w-[25%]">
          {/* <div className="p-4 border-2 rounded-md">
            <h1 className="text-2xl font-semibold text-[#6B6B6B]">Contact</h1>
            <div className="flex flex-col gap-3 mt-4">
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                placeholder="Full Name"
                className="border p-2 rounded-md"
              />
              <div className="flex gap-2">
              
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  className="border p-2 rounded-md w-full"
                />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="border p-2 rounded-md"
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
                className="border p-2 rounded-md"
              />
              <button
                onClick={handleInquiry}
                className="bg-[#8F8F8F] text-white py-2 rounded-md"
              >
                Send Inquiry
              </button>
            </div>
          </div> */}
          <Inquiry />
        </div>
      </div>
    </div>
  );
};

export default DetailSection;
