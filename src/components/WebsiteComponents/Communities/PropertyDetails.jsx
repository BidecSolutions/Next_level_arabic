// "use client";

// import React, { useEffect, useState } from "react";
// import { useParams, usePathname } from "next/navigation";
// import { CiCircleCheck } from "react-icons/ci";
// import { FaWhatsapp } from "react-icons/fa";
// import { Image_NotFound, Image_URL } from "@/config/constants";
// import RegisterForm from "../Forms/RegisterForm";
// import { fetchCommunityBySlug } from "@/lib/api/communities.server";

// // import { Image_Url } from "@/Utils/const"; // ✅ apne project ka sahi path
// // import CustomDetailSeo from "@/AgentPanel/Components/CustomDetailSeo";
// // import RegisterForm from "../RegisterForm";
// // import { fetchCommunityBySlug } from "@/Utils/api"; // ✅ yahi tumhara new function

// const PropertyDetails = () => {
//   const pathname = usePathname();
//   const params = useParams();
//   const slug = params?.slug || pathname.split("/community/")[1];

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [data, setData] = useState({});
//   const [feature, setFeature] = useState([]);
//   const [images, setImages] = useState([]);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       const response = await fetchCommunityBySlug(slug);
// //       if (!response?.data) return;

// //       setData(response.data);

// //       // ✅ Features parse
// //       try {
// //         const parsedFeatures = JSON.parse(JSON.parse(response.data.key_features));
// //         setFeature(parsedFeatures);
// //       } catch (e) {
// //         console.error("Feature parse error", e);
// //       }

// //       // ✅ Community images parse
// //       try {
// //         const parsedImages = JSON.parse(response.data.community_images);
// //         setImages(parsedImages);
// //       } catch (e) {
// //         console.error("Images parse error", e);
// //       }
// //     };

// //     if (slug) fetchData();
// //   }, [slug]);
// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       console.log("Fetching for slug:", slug); // 🔍 Slug check karne ke liye

//       const response = await fetchCommunityBySlug(slug);
//       console.log("API Response:", response); // 🔍 Response check karo

//       if (!response?.data) {
//         console.warn("⚠️ No data found in response");
//         return;
//       }

//       setData(response.data);
//       console.log("Community Data:", response.data); // 🔍 Final Data

//       // ✅ Features parse
//       try {
//         const parsedFeatures = JSON.parse(
//           JSON.parse(response.data.key_features)
//         );
//         setFeature(parsedFeatures);
//         console.log("Parsed Features:", parsedFeatures); // 🔍
//       } catch (e) {
//         console.error("Feature parse error", e);
//       }

//       // ✅ Community images parse
//       try {
//         const parsedImages = JSON.parse(response.data.community_images);
//         setImages(parsedImages);
//         console.log("Parsed Images:", parsedImages); // 🔍
//       } catch (e) {
//         console.error("Images parse error", e);
//       }
//     } catch (error) {
//       console.error("❌ Fetch error:", error);
//     }
//   };

//   if (slug) fetchData();
// }, [slug]);

//   const handleWhatsAppClick = (phoneNumber, message) => {
//     const whatsappUrl = `https://wa.me/${phoneNumber.replace(
//       "+",
//       ""
//     )}?text=${encodeURIComponent(message)}`;
//     window.open(whatsappUrl, "_blank");
//   };

//   return (
//     <div className="pt-5 md:pt-24">
//       {/* <CustomDetailSeo
//         title={data?.meta_title || ""}
//         des={data?.meta_description}
//         focuskey={data?.focus_keyword}
//         canonicalUrl={data?.canonical_url}
//         schema={data?.schema}
//       /> */}

//       {/* Content Section */}
//       <div className="flex flex-col-reverse md:flex-row justify-center items-center mt-8 gap-[40px] xl:gap-[80px] w-full mb-14">
//         {/* Left Image */}
//         <div className="flex w-full justify-center md:w-[40%] macbook:w-[35%]">
//           <div className="relative w-full justify-center h-full flex md:justify-center">
//             <img
//               src={`${Image_URL}${data?.image_path}`}
//               alt={data?.name || "community"}
//               className="h-[300px] w-[290px] md:w-[400px] md:h-[420px] macbook:w-[550px] macbook:h-[500px] rounded-tl-[150px]"
//             />
//           </div>
//         </div>

//         {/* Right Info */}
//         <div className="flex flex-col items-center md:items-start md:gap-2 md:w-[35%] macbook:w-[25%]">
//           <h1 className="text-[20px] uppercase md:text-[30px] macbook:text-[60px] font-semibold text-[#8F8F8F]">
//             {data?.name}
//           </h1>

//           {/* Sizes / Price / Beds */}
//           <div className="flex gap-[20px] macbook:gap-[40px] mb-4">
//             <div>
//               <p className="font-semibold text-[#8F8F8F] text-[12px] md:text-[15px] macbook:text-[22px]">
//                 Starting Sizes
//               </p>
//               <p className="text-[#8F8F8F] text-[10px] md:text-[13px] macbook:text-[19px]">
//                 {data?.starting_size}
//               </p>
//             </div>
//             <div>
//               <p className="font-semibold text-[#8F8F8F] text-[12px] md:text-[15px] macbook:text-[22px]">
//                 Starting Price
//               </p>
//               <p className="flex gap-1 text-[#8F8F8F] text-[10px] md:text-[13px] macbook:text-[19px]">
//                 <img src="/dirham.PNG" className="w-3 h-2.5 mt-0.5 md:mt-1" />
//                 {data?.starting_price}
//               </p>
//             </div>
//             <div>
//               <p className="font-semibold text-[#8F8F8F] text-[12px] md:text-[15px] macbook:text-[22px]">
//                 Bedrooms
//               </p>
//               <p className="text-[#8F8F8F] text-[10px] md:text-[13px] macbook:text-[19px]">
//                 {data?.beds}
//               </p>
//             </div>
//           </div>

//           {/* Features */}
//           <div className="w-full flex flex-col items-center text-center md:items-start md:text-start">
//             <h4 className="font-bold text-[#8F8F8F] text-[18px] mb-2 macbook:text-[28px]">
//               Key Features
//             </h4>
//             {Array.isArray(feature) && feature.length > 0 ? (
//               feature.map((item, index) => (
//                 <div key={index} className="flex gap-[10px] items-center w-full">
//                   <CiCircleCheck className="macbook:text-[22px]" />
//                   <p className="text-[#8F8F8F] text-[13px] md:text-[15px] macbook:text-[25px]">
//                     {item?.title}
//                   </p>
//                 </div>
//               ))
//             ) : (
//               <p className="text-[#8F8F8F] text-[15px]">No features available.</p>
//             )}
//           </div>

//           {/* Actions */}
//           <div className="mt-6 flex gap-2">
//             <button
//               className="bg-[#8F8F8F] text-white px-8 py-2 rounded-md text-[10px] macbook:text-[20px]"
//               onClick={() => setIsModalOpen(true)}
//             >
//               Inquiry Now
//             </button>
//             <div className="flex items-center cursor-pointer gap-2 px-2 py-2 macbook:px-4 macbook:py-3 border border-[#A39D9D] rounded-md">
//               <FaWhatsapp
//                 className="text-[#A39D9D] text-[24px] cursor-pointer macbook:text-[30px]"
//                 onClick={() =>
//                   handleWhatsAppClick(
//                     (data.whatsapp_no || "+971552588870").replace(/[\s-]+/g, ""),
//                     "Hello, I want to connect!"
//                   )
//                 }
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Description */}
//       <div className="flex flex-col md:pt-24 w-full items-center mb-4">
//         <h2 className="text-[18px] md:text-[34px] macbook:text-[65px] font-semibold text-[#8F8F8F] mb-4 text-center">
//           {data?.name}
//         </h2>
//         <p
//           className="text-center md:w-[70%] text-[#555555] text-[17px] macbook:text-[30px]"
//           dangerouslySetInnerHTML={{
//             __html: data?.description?.substring(0, 800) || "",
//           }}
//         />
//       </div>

//       <RegisterForm
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         page={"Community Detail Of " + data?.name}
//       />
//     </div>
//   );
// };

// export default PropertyDetails;
"use client";

import React, { useState, useEffect } from "react";
import { CiCircleCheck } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa";
import { Image_NotFound, Image_URL } from "@/config/constants";
import RegisterForm from "../Forms/RegisterForm";

const PropertyDetails = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feature, setFeature] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (!data) return;

    // ✅ Features parse
    try {
      const parsedFeatures = JSON.parse(JSON.parse(data.key_features));
      setFeature(parsedFeatures);
    } catch (e) {
      console.error("Feature parse error", e);
    }

    // ✅ Community images parse
    try {
      const parsedImages = JSON.parse(data.community_images);
      setImages(parsedImages);
    } catch (e) {
      console.error("Images parse error", e);
    }
  }, [data]);

  const handleWhatsAppClick = (phoneNumber, message) => {
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(
      "+",
      ""
    )}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  if (!data) return null; // Agar data hi na ho to kuch mat dikhana

  return (
    // <div className="pt-5 md:pt-24">
    //   {/* Content Section */}
    //   <div className="flex flex-col-reverse md:flex-row justify-center items-center mt-8 gap-[40px] xl:gap-[80px] w-full mb-14">
    //     {/* Left Image */}
    //     <div className="flex w-full justify-center md:w-[40%] macbook:w-[35%]">
    //       <div className="relative w-full justify-center h-full flex md:justify-center">
    //         <img
    //           src={`${Image_URL}${data?.image_path}`}
    //           alt={data?.name || "community"}
    //           className="h-[300px] w-[290px] md:w-[400px] md:h-[420px] macbook:w-[550px] macbook:h-[500px] rounded-tl-[150px]"
    //         />
    //       </div>
    //     </div>

    //     {/* Right Info */}
    //     <div className="flex flex-col items-center md:items-start md:gap-2 md:w-[35%] macbook:w-[25%]">
    //       <h1 className="text-[20px] uppercase md:text-[30px] macbook:text-[60px] font-semibold text-[#8F8F8F]">
    //         {data?.name}
    //       </h1>

    //       {/* Sizes / Price / Beds */}
    //       <div className="flex gap-[20px] macbook:gap-[40px] mb-4">
    //         <div>
    //           <p className="font-semibold text-[#8F8F8F] text-[12px] md:text-[15px] macbook:text-[22px]">
    //             Starting Sizes
    //           </p>
    //           <p className="text-[#8F8F8F] text-[10px] md:text-[13px] macbook:text-[19px]">
    //             {data?.starting_size}
    //           </p>
    //         </div>
    //         <div>
    //           <p className="font-semibold text-[#8F8F8F] text-[12px] md:text-[15px] macbook:text-[22px]">
    //             Starting Price
    //           </p>
    //           <p className="flex gap-1 text-[#8F8F8F] text-[10px] md:text-[13px] macbook:text-[19px]">
    //             <img src="/dirham.PNG" className="w-3 h-2.5 mt-0.5 md:mt-1" />
    //             {data?.starting_price}
    //           </p>
    //         </div>
    //         <div>
    //           <p className="font-semibold text-[#8F8F8F] text-[12px] md:text-[15px] macbook:text-[22px]">
    //             Bedrooms
    //           </p>
    //           <p className="text-[#8F8F8F] text-[10px] md:text-[13px] macbook:text-[19px]">
    //             {data?.beds}
    //           </p>
    //         </div>
    //       </div>

    //       {/* Features */}
    //       <div className="w-full flex flex-col items-center text-center md:items-start md:text-start">
    //         <h4 className="font-bold text-[#8F8F8F] text-[18px] mb-2 macbook:text-[28px]">
    //           Key Features
    //         </h4>
    //         {Array.isArray(feature) && feature.length > 0 ? (
    //           feature.map((item, index) => (
    //             <div key={index} className="flex gap-[10px] items-center w-full">
    //               <CiCircleCheck className="macbook:text-[22px]" />
    //               <p className="text-[#8F8F8F] text-[13px] md:text-[15px] macbook:text-[25px]">
    //                 {item?.title}
    //               </p>
    //             </div>
    //           ))
    //         ) : (
    //           <p className="text-[#8F8F8F] text-[15px]">No features available.</p>
    //         )}
    //       </div>

    //       {/* Actions */}
    //       <div className="mt-6 flex gap-2">
    //         <button
    //           className="bg-[#8F8F8F] text-white px-8 py-2 rounded-md text-[10px] macbook:text-[20px]"
    //           onClick={() => setIsModalOpen(true)}
    //         >
    //           Inquiry Now
    //         </button>
    //         <div className="flex items-center cursor-pointer gap-2 px-2 py-2 macbook:px-4 macbook:py-3 border border-[#A39D9D] rounded-md">
    //           <FaWhatsapp
    //             className="text-[#A39D9D] text-[24px] cursor-pointer macbook:text-[30px]"
    //             onClick={() =>
    //               handleWhatsAppClick(
    //                 (data.whatsapp_no || "+971552588870").replace(/[\s-]+/g, ""),
    //                 "Hello, I want to connect!"
    //               )
    //             }
    //           />
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    //   {/* Description */}
    //   <div className="flex flex-col md:pt-24 w-full items-center mb-4">
    //     <h2 className="text-[18px] md:text-[34px] macbook:text-[65px] font-semibold text-[#8F8F8F] mb-4 text-center">
    //       {data?.name}
    //     </h2>
    //     <p
    //       className="text-center md:w-[70%] text-[#555555] text-[17px] macbook:text-[30px]"
    //       dangerouslySetInnerHTML={{
    //         __html: data?.description?.substring(0, 800) || "",
    //       }}
    //     />
    //   </div>

    //   <RegisterForm
    //     isOpen={isModalOpen}
    //     onClose={() => setIsModalOpen(false)}
    //     page={"Community Detail Of " + data?.name}
    //   />
    // </div>
    <div className="  pt-5 md:pt-24 ">
      {/* <CustomDetailSeo
        title={data?.meta_title ? data?.meta_title : ""}
        des={data?.meta_description}
        focuskey={data?.focus_keyword}
        canonicalUrl={data?.canonical_url}
        schema={data?.schema}
      /> */}

      {/* {propertiesData.map((property, index) => ( */}
      <div
        className={`flex flex-col-reverse    md:flex-row justify-center macbook:justify-center items-center mt-8 gap-[40px] xl:gap-[80px]  w-[100%] mb-14  `}
      >
        {/* Left/Right Image(s) */}
        <div
          className={`flex w-[100%] justify-center md:w-[40%] macbook:w-[35%] `}
        >
          <div
            className={`relative w-[100%] justify-center h-[100%] flex md:justify-center    `}
          >
            <img
              src={`${Image_URL}${data?.image_path}`}
              alt=""
              className="h-[300px] w-[290px] md:w-[400px] md:h-[420px] macbook:w-[550px] macbook:h-[500px] rounded-tl-[150px] "
            />
            {/* <img
              src={`${Image_Url}${images[0]?.image}`}
              className="w-[200px] absolute h-[200px] right-[5%]   md:w-[250px] md:h-[270px]   md:right-[2%] macbook:w-[350px] macbook:h-[400px]  macbook:right-[5%]     md:right-[20%]md:bottom-[-15%]  bottom-[-15%] z-10 rounded-tr-[150px]  macbook:rounded-tr-[200px]"
              alt=""
            /> */}
          </div>
        </div>
        {/* Property Info */}
        <div className="flex  flex-col items-center md:items-start md:gap-2 md:w-[35%] macbook:w-[25%]  md:h-[100%] ">
          <h1 className="text-[20px] items-center font-newsLetter uppercase md:items-start md:text-[30px] font-semibold text-[#8F8F8F]   macbook:mb-8   macbook:text-[60px] ">
            {data?.name}
          </h1>
          <div className="flex gap-[20px] macbook:gap-[40px] mb-4 ">
            <div>
              <p className="font-semibold font-montserrat macbook:text-[22px] text-[#8F8F8F] text-[12px] md:text-[15px] ">
                Starting Sizes
              </p>
              <p className="text-[#8F8F8F] font-montserrat text-[10px] md:text-[13px] macbook:text-[19px] text-center md:text-start">
                {data?.starting_size}
              </p>
            </div>
            <div>
              <p className="font-semibold font-montserrat macbook:text-[22px] text-[#8F8F8F] text-[12px] md:text-[15px]">
                Starting Price 
              </p>
              <p className="flex gap-1 text-[#8F8F8F] font-montserrat text-[10px] md:text-[13px] macbook:text-[19px] text-center md:text-start">
                <img src='/dirham.PNG' className="w-3 h-2.5 mt-0.5 md:mt-1"/> {data?.starting_price} 
              </p>
            </div>
            <div>
            <p className="font-semibold font-montserrat macbook:text-[22px] text-[#8F8F8F] text-[12px] md:text-[15px]">
                Bedrooms
              </p>
              <p className="text-[#8F8F8F] text-[10px] md:text-[13px] macbook:text-[19px] text-center md:text-start">
                {data?.beds}
              </p>
            </div>
          </div>
          <div className="w-[100%] flex flex-col items-center text-center md:items-start md:text-start ">
            <h4 className="font-bold font-montserrat w-full  text-[#8F8F8F] text-[18px] mb-2 macbook:text-[28px] ">
              Key Features{" "}
            </h4>
            {Array.isArray(feature) && feature.length > 0 ? (
              feature.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-[10px] items-center md: justify-start justifycenter w-[100%] text-center"
                >
                  <CiCircleCheck className="macbook:text-[22px]" />
                  <p className="text-[#8F8F8F] font-montserrat text-[13px] md:text-[15px] macbook:text-[25px]">
                    {item?.title}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-[#8F8F8F] font-montserrat text-[15px]">
                No features available.
              </p>
            )}
          </div>

          <div className="mt-6 flex gap-2">
            <button className="bg-[#8F8F8F] text-white font-montserrat px-8 py-2 rounded-md text-[10px]   macbook:text-[20px] "
            onClick={() => setIsModalOpen(true)}>
              Inquiry Now 
            </button>
            {/* <button
              className="border border-[#8F8F8F] font-montserrat text-[#8F8F8F] px-8 py-2 rounded-md text-[10px]   macbook:text-[20px]"
              // onClick={() => {
              //   navigate(`/property/${data.slug}`, {
              //     state: {
              //       url: `user/communities/propertyDetailUsingSlug`,
              //       id: data.id,
              //       slug: data.slug,
              //     },
              //   });
              // }}
            >
              See Profile
            </button> */}
            <div className="flex items-center cursor-pointer gap-2 px-2 py-2 macbook:px-4 macbook:py-3  border border-[#A39D9D]  rounded-md">
              <FaWhatsapp
                className="text-[#A39D9D] text-[24px] cursor-pointer  macbook:text-[30px]  "
                onClick={() =>
                  handleWhatsAppClick(
                    (data.whatsapp_no ? data.whatsapp_no : "+971552588870").replace(/[\s-]+/g, ""),
                    "Hello, I want to connect!"
                  )
                }
              />
            </div>
          </div>
        </div>
      </div>
      {/* ))} */}

      <div className="flex flex-col md:pt-24 w-full items-center mb-4 ">
        <h2 className="text-[18px] md:text-[34px]  font-newsLetter uppercase macbook:text-[65px] font-semibold text-[#8F8F8F] mb-4 text-center">
          {data?.name}
        </h2>

        <p
          className=" text-center md:w-[70%] font-montserrat text-[#555555] text-[17px]  macbook:text-[30px] "
          dangerouslySetInnerHTML={{
            __html: data?.description?.substring(0, 800),
          }}
        />
      </div>
      <RegisterForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        page={'Community Detail Of '+ data?.name}
      />
    </div>
  );
};

export default PropertyDetails;
