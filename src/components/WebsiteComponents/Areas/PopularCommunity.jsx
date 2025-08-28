// "use client";

// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// // import ParseBody from "../PropertyDetails/ParseBody";
// import { Image_NotFound, Image_URL } from "@/config/constants";
// import { getCommunities } from "@/lib/api/areas.server";

// const PopularCommunity = ({ heading, description }) => {
//   const [areas, setAreas] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await getCommunities();
//         setAreas(data);
//       } catch (error) {
//         console.error("Popular Communities Error:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   return (
//     <div className="flex flex-col w-full items-center py-10 md:py-24">
//       <h2 className="text-3xl text-[#8F8F8F] macbook:text-[48px] text-center mb-2 font-newsLetter">
//         {heading ? heading : "POPULAR COMMUNITIES IN DUBAI`s"}
//       </h2>
//       <p className="text-center w-[90%] md:w-[80%] text-gray-700 macbook:text-[28px] mb-16">
//         {description ? (
//           <ParseBody body={description} />
//         ) : (
//           "Next Level Real Estate was established in 2013 and has been the driving force behind some of the greatest"
//         )}
//       </p>

//       {areas.length === 0 && (
//         <p className="text-center text-[25px] font-montserrat w-full flex justify-center text-gray-500">
//           No Areas available
//         </p>
//       )}

//       <div className="flex w-full macbook:w-[80%] gap-[10px] justify-center">
//         <div className="flex justify-center w-full flex-col items-center">
//           {/* First Row */}
//           <div className="flex justify-center flex-wrap md:flex-nowrap w-full gap-[10px] mb-[10px]">
//             {areas?.slice(0, 3).map((area, index) => (
//               <div
//                 key={area.id}
//                 className={`relative h-[224px] md:h-[284px] ${
//                   index === 0
//                     ? "w-full md:w-[50%]"
//                     : index === 1
//                     ? "hidden md:block md:w-[25%]"
//                     : index === 2
//                     ? "hidden md:block md:w-[25%]"
//                     : ""
//                 }`}
//               >
//                 <Link href={`/community/${area.slug}`}>
//                   <div className="relative w-full md:w-[100%] h-[220px] md:h-[280px] rounded-[18px] overflow-hidden">
//                     <Image
//                       src={
//                         area.image_path
//                           ? `${Image_Url}${area.image_path}`
//                           : Image_NotFound
//                       }
//                       alt={`area ${area.id}`}
//                       fill
//                       className="object-cover rounded-[18px]"
//                       onError={(e) => {
//                         e.currentTarget.src = Image_NotFound;
//                       }}
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-transparent" />
//                   </div>
//                   <p className="absolute font-montserrat bottom-4 w-full text-center text-white text-md md:text-lg">
//                     {area.name}
//                   </p>
//                 </Link>
//               </div>
//             ))}
//           </div>

//           {/* Second Row */}
//           <div className="w-[100%] flex gap-[8px] justify-center">
//             {areas?.slice(3, 7).map((area, index) => (
//               <div
//                 key={index}
//                 className={`relative md:w-[25%] flex gap-[5px] ${
//                   index === 2 ? "hidden md:block" : index === 3 ? "hidden md:block" : ""
//                 }`}
//               >
//                 <div className="relative w-[160px] md:w-[100%] h-[220px] md:h-[280px] rounded-[18px] overflow-hidden">
//                   <Image
//                     src={
//                       area.image_path
//                         ? `${Image_Url}${area.image_path}`
//                         : Image_NotFound
//                     }
//                     alt={`area ${area.id}`}
//                     fill
//                     className="object-cover rounded-[18px]"
//                   />
//                   <Link href={`/area/${area.slug}`}>
//                     <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-transparent" />
//                   </Link>
//                 </div>
//                 <p className="absolute font-montserrat bottom-4 w-full text-center text-white text-[10px] md:text-lg">
//                   {area.name}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* View All Areas Button */}
//       <div className="text-center mt-8">
//         <Link href="/areas">
//           <button className="px-6 py-2 font-montserrat bg-[#8F8F8F] text-white hover:bg-transparent hover:text-[#8F8F8F] border hover:border-[#8F8F8F] macbook:text-[16px] rounded-[6.5px]">
//             View All Areas
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default PopularCommunity;
"use client";

import { useState, useEffect } from "react";
// import { Image_NotFound, Image_Url } from "@/utils/const";
// import ParseBody from "../PropertyDetails/ParseBody";
import Link from "next/link";
// import { getPopularCommunities } from "@/lib/api/communities";
import { Image_NotFound, Image_URL } from "@/config/constants";
import { getPopularCommunities } from "@/lib/api/areas.server";
import ParseBody from "../HomeComponents/ParseBody";

export default function PopularCommunity({ heading, description }) {
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    getPopularCommunities().then(setAreas);
  }, []);

  return (
    <div className="flex flex-col w-full items-center py-10 md:py-24">
      <h2 className="text-3xl text-[#8F8F8F] macbook:text-[48px] text-center mb-2 font-newsLetter">
        {heading || "POPULAR COMMUNITIES IN DUBAI`s"}
      </h2>
      <div className="text-center w-[90%] md:w-[80%] text-gray-700 macbook:text-[28px] mb-16">
        {description ? (
          <ParseBody body={description} />
        ) : (
          "Next Level Real Estate was established in 2013 and has been the driving force behind some of the greatest"
        )}
      </div>

      {areas.length === 0 && (
        <p className="text-center text-[25px] font-montserrat w-full flex justify-center text-gray-500">
          No Areas available
        </p>
      )}

      <div className="flex w-full macbook:w-[80%] gap-[10px] justify-center">
        <div className="flex justify-center w-full flex-col items-center">
          <div className="flex justify-center flex-wrap md:flex-nowrap w-full gap-[10px] mb-[10px]">
            {areas.slice(0, 3).map((area, index) => (
              <div
                key={area.id}
                className={`relative h-[224px] md:h-[284px] ${
                  index === 0
                    ? "w-full md:w-[50%]"
                    : index === 1
                    ? "hidden md:block md:w-[25%]"
                    : index === 2
                    ? "hidden md:block md:w-[25%]"
                    : ""
                }`}
              >
                <Link href={`/community/${area.slug}`}>
                  <div className="relative w-full md:w-[100%] h-[220px] md:h-[280px] rounded-[18px] overflow-hidden">
                    <img
                      src={`${Image_URL}${area.image_path}`}
                      alt={`area ${area.id}`}
                      className="object-cover rounded-[18px] w-full h-full"
                      onError={(e) => (e.currentTarget.src = Image_NotFound)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-transparent" />
                  </div>
                  <p className="absolute font-montserrat bottom-4 w-full text-center text-white text-md md:text-lg">
                    {area.name}
                  </p>
                </Link>
              </div>
            ))}
          </div>

          <div className="w-full flex gap-[8px] justify-center">
            {areas.slice(3, 7).map((area, index) => (
              <div
                key={index}
                className={`relative md:w-[25%] flex gap-[5px] ${
                  index >= 2 ? "hidden md:block" : ""
                }`}
              >
                <div className="relative w-[160px] md:w-[100%] h-[220px] md:h-[280px] rounded-[18px] overflow-hidden">
                  <img
                    src={`${Image_URL   }${area.image_path}`}
                    alt={`area ${area.id}`}
                    className="object-cover rounded-[18px] w-full h-full"
                    onError={(e) => (e.currentTarget.src = Image_NotFound)}
                  />
                  <Link href={`/area/${area.slug}`}>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-transparent" />
                  </Link>
                </div>
                <p className="absolute font-montserrat bottom-4 w-full text-center text-white text-[10px] md:text-lg">
                  {area.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center mt-8">
        <Link
          href="/areas/"
          className="px-6 py-2 font-montserrat bg-[#8F8F8F] text-white hover:bg-transparent hover:text-[#8F8F8F] border hover:border-[#8F8F8F] macbook:text-[16px] rounded-[6.5px]"
        >
          View All Areas
        </Link>
      </div>
    </div>
  );
}
