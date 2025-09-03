// "use client";

// import { useState, useEffect } from "react";
// import { FaWhatsapp, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
// // import { Image_NotFound } from "@/config/constants";
// import Link from "next/link";
// import { Image_NotFound, Image_URL } from "@/config/constants";
// import { getOwnerDetails } from "@/lib/api/sevice.server";
// // import ParseBody from "../PropertyDetails/ParseBody";
// // import { getOwnerDetails, getPropertyManagementDetail } from "@/services/api";

// export default function EfficientProperty({ pmId, propData, heading, des }) {
//   const [data, setData] = useState([]);
//   const [info, setInfo] = useState([]);
//   const [details, setDetails] = useState([]);
//   const [isExpanded, setIsExpanded] = useState(false);

//   // Fetch Owner Details
//   useEffect(() => {
//     const fetchOwner = async () => {
//       try {
//         if (!propData) {
//           const result = await getOwnerDetails();
//           const ownerList = result?.data || [];
//           if (Array.isArray(ownerList) && ownerList.length > 0) {
//             const latestOwner = ownerList.sort(
//               (a, b) => new Date(b.created_date) - new Date(a.created_date)
//             )[0];
//             setInfo(latestOwner);
//           }
//         } else {
//           const latestOwner = propData.sort(
//             (a, b) => new Date(b.created_date) - new Date(a.created_date)
//           )[0];
//           setInfo(latestOwner);
//         }
//       } catch (error) {
//         console.error("Error fetching owner details:", error);
//       }
//     };
//     fetchOwner();
//   }, [pmId, propData]);

//   // Fetch Property Management Detail
//   useEffect(() => {
//     const fetchPropertyDetails = async () => {
//       try {
//         const result = await getPropertyManagementDetail(pmId);
//         if (result?.status === 1) {
//           setData(result?.data || {});
//           if (result?.data?.who_we_are_details) {
//             setDetails(JSON.parse(result.data.who_we_are_details));
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching property details:", error);
//       }
//     };
//     fetchPropertyDetails();
//   }, [pmId]);

//   // Contact Handlers
//   const handleEmailClick = (email) => {
//     window.location.href = `mailto:${email}`;
//   };
//   const handleWhatsAppClick = (phone, message) => {
//     window.open(`https://wa.me/${phone.replace("+", "")}?text=${encodeURIComponent(message)}`, "_blank");
//   };
//   const handleCallClick = (phone) => {
//     window.location.href = `tel:${phone}`;
//   };

//   const description = des || "";

//   return (
//     <div className="flex justify-center mt-16 md:mt-24">
//       <div className="flex flex-col-reverse w-full macbook:justify-center md:justify-around macbook:w-[100%] md:flex-row items-center gap-8">

//         {/* Right Side */}
//         <div className="flex flex-col items-center md:items-start py-8 gap-4 md:w-[45%] macbook:w-[30%]">
//           <p className="text-2xl md:text-[34px] text-[#8F8F8F]">{heading}</p>
//           <div className="mb-4">
//             <div
//               className={`text-[16px] text-[#555555] ${
//                 isExpanded ? "max-h-[32rem]" : "max-h-[20rem] overflow-hidden"
//               } transition-all`}
//             >
//               <ParseBody body={description} />
//             </div>
//             {description.length > 500 && (
//               <button
//                 onClick={() => setIsExpanded(!isExpanded)}
//                 className="border bg-[#8F8F8F] text-white px-4 py-2 rounded-md"
//               >
//                 {isExpanded ? "Read Less" : "Read More"}
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Left Side */}
//         <div className="md:w-[30%]">
//           <img
//             src="/GetInTouch.jpg"
//             alt={info?.owner_image_alt || "Owner"}
//             className="max-h-[600px] object-cover rounded-br-[150px] md:rounded-br-[200px]"
//             onError={(e) => {
//               e.currentTarget.src = Image_NotFound;
//             }}
//           />
//           <div className="mt-2 flex flex-col items-center md:items-start">
//             <p className="text-[26px] text-[#6B6B6B] font-montserrat">
//               {info?.name || "Salwa Arafoui"}
//             </p>
//           </div>
//           <div className="flex items-center gap-[20px] mt-2">
//             <button className="px-6 py-2 bg-[#8F8F8F] text-white rounded-md">
//               <Link href={`/agent/salwa-arfaoui/`}>View Profile</Link>
//             </button>
//             <div className="flex gap-[10px]">
//               <div
//                 className="border p-[7px] rounded cursor-pointer"
//                 onClick={() => handleWhatsAppClick("+971552588870", "Hello, I want to connect!")}
//               >
//                 <FaWhatsapp className="text-[#A39D9D]" />
//               </div>
//               <div
//                 className="border p-[7px] rounded cursor-pointer"
//                 onClick={() => handleCallClick("+97144542828")}
//               >
//                 <FaPhoneAlt className="text-[#A39D9D]" />
//               </div>
//               <div
//                 className="border p-[7px] rounded cursor-pointer"
//                 onClick={() => handleEmailClick("media@nextlevelrealestate.ae")}
//               >
//                 <FaEnvelope className="text-[#A39D9D]" />
//               </div>
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { FaWhatsapp, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

import Link from "next/link";
import { getOwnerDetails } from "@/lib/api/sevice.server";
import ParseBody from "../HomeComponents/ParseBody";
import { Image_NotFound, Image_URL } from "@/config/constants";
// import { getOwnerDetails } from "@/lib/api/sevice.server"; // Second API function

export default function EfficientProperty({ propData, heading, des }) {
    const [owner, setOwner] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);

    // Fetch owner details
    useEffect(() => {
        const fetchOwner = async () => {
            try {
                const res = await getOwnerDetails();
                if (res?.data?.length > 0) {
                    // Sort by created_date descending and take the latest
                    const latest = res.data.sort(
                        (a, b) => new Date(b.created_date) - new Date(a.created_date)
                    )[0];
                    setOwner(latest);
                }
            } catch (err) {
                console.error("Error fetching owner details:", err);
            }
        };
        fetchOwner();
    }, []);

    const description =
        des || propData?.known_for_efficient_description || "نحن معروفون بالكفاءة.";

    const imageSrc = propData?.owner_image
        ? `${Image_URL}${propData.owner_image}`
        : Image_NotFound;

    const handleEmailClick = (email) => {
        window.location.href = `mailto:${email}`;
    };

    const handleWhatsAppClick = (phoneNumber, message) => {
        const whatsappUrl = `https://wa.me/${phoneNumber.replace("+", "")}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, "_blank");
    };

    const handleCallClick = (phoneNumber) => {
        window.location.href = `tel:${phoneNumber}`;
    };

    return (
        <div className="flex justify-center mt-16 md:mt-24">
            <div className="flex flex-col-reverse w-full macbook:justify-center md:justify-around macbook:w-[100%] md:flex-row items-center md:items-center gap-8 rounded-lg">
                {/* Right Side: Content */}
                <div className="flex flex-col items-center md:items-start py-8 md:py-1 text-center md:text-start gap-4 md:w-[45%] macbook:w-[30%] md:h-[100%]">
                    <p className="text-2xl font-newsLetter md:text-[34px] md:pb-4 text-[#8F8F8F]">
                        {heading || propData?.known_for_efficient_heading || "معروف بالكفاءة"}
                    </p>
                    {/* <div className={`text-gray-600 mb-6 leading-relaxed ${isExpanded ? "max-h-[32rem] overflow-y-auto" : "max-h-[20rem] overflow-hidden"} transition-all duration-300`}>
            <ParseBody body={description} />
          </div>
          {description.length > 500 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="border bg-gray-800 text-white px-4 py-2 rounded-md"
            >
              {isExpanded ? "Read Less" : "Read More"}
            </button>
          )} */}
                    <div className="mb-4">
                        <div
                            className={`text-[16px] font-montserrat text-[#555555] md:leading-[23px] macbook:text-[35px] macbook:leading-[38px] text-center md:text-start ${isExpanded
                                ? "max-h-[32rem] macbook:max-h-[44rem] overflow-y-auto"
                                : "max-h-[20rem] macbook:max-h-[44rem] overflow-hidden"
                                } transition-all duration-300`}
                        >
                            <ParseBody body={description} />
                        </div>
                        {description.length > 500 && (
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="border bg-[#8F8F8F] font-montserrat text-white w[120px] px-4 py-2 rounded-md"
                            >
                                {isExpanded ? "اقرأ المزيد" : "اقرأ أقل"}
                            </button>
                        )}
                    </div>

                </div>

                {/* Left Side: Image + Owner Contact */}
                <div className="md:w-[30%]">
                    <img
                        // src={`${Image_URL}${owner?.owner_image}`}
                        // alt={propData?.known_for_efficient_image_alt || "Efficient Property"}
                        src="/GetInTouch.jpg"

                        className="max-h-[600px] w-full object-cover rounded-br-[150px] md:rounded-br-[200px]"
                        onError={(e) => (e.currentTarget.src = Image_NotFound)}
                    />
                    <div className="mb-2 flex items-center md:items-start flex-col md:mt-1 gap-1">
                        <p className="text-[26px] text-[#6B6B6B] text-center md:text-start font-montserrat">
                            {/* {owner?.name || "Salwa Arafoui"} */}
                            سلوى عرفاوي
                        </p>
                    </div>

                    {/* Contact Buttons */}
                    <div className="flex items-center justify-center md:justify-start gap-[20px]">
                        <Link
                            href={`/agent/salwa-arfaoui`}
                            className="flex items-center font-montserrat text-[11px] gap-2 px-2 md:px-6 py-2 bg-[#8F8F8F] border border-[#8F8F8F] text-white hover:bg-transparent hover:text-[#8F8F8F] rounded-md"                        >
                            عرض الملف الشخصي
                        </Link>
                        <div className="flex gap-2">
                            <button
                                className="p-2 border rounded"
                                onClick={() => handleWhatsAppClick(owner?.mobile_no || "+971552588870", "مرحبًا، أريد الاتصال!")}
                            >
                                <FaWhatsapp />
                            </button>
                            <button
                                className="p-2 border rounded"
                                onClick={() => handleCallClick(owner?.mobile_no || "+97144542828")}
                            >
                                <FaPhoneAlt />
                            </button>
                            <button
                                className="p-2 border rounded"
                                onClick={() => handleEmailClick(owner?.email || "media@nextlevelrealestate.ae")}
                            >
                                <FaEnvelope />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
