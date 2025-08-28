// "use client";

// import { useState, useEffect } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import Image from "next/image";
// import { GoSearch } from "react-icons/go";
// import { RiArrowDropDownLine } from "react-icons/ri";
// // import AdvanceFilterModal from "../AreaDetails/AdvanceFilterModal";
// import { Image_NotFound, Image_URL } from "@/config/constants";
// // import { Loader } from "../../webComponents/Loader/Loader";

// // 🔹 Import API functions

// import { Loader } from "../Loader";
// import AdvanceFilterModal from "../Areas/AdvanceFilterModal";
// import { getAreas, getCommunityBySlug, getPropertyList, getPropertyStatuses, getPropertyTypes } from "@/lib/api/communities.server";

// const LatestProject = () => {
//   const [isOpenLocation, setIsOpenLocation] = useState(false);
//   const [isOpenProperty, setIsOpenProperty] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedProperty, setSelectedProperty] = useState("All Type");
//   const [activeTab, setActiveTab] = useState("Buy");
//   const [properties, setproperties] = useState([]);
//   const [filter, setFilter] = useState({
//     activeTab: "Buy",
//     searchProperty: "",
//     selectedLocation: "",
//     selectedProperty: "",
//   });
//   const [areas, setAreas] = useState([]);
//   const [pType, setpType] = useState([]);
//   const [pStatus, setpStatus] = useState([]);
//   const [visibleProperties, setVisibleProperties] = useState(8);
//   const [isLoading, setIsLoading] = useState(false);

//   const router = useRouter();
//   const pathname = usePathname();
//   const communityId = pathname?.split("/community/")[1];

//   const [community, setCommunity] = useState();
//   const [selectedDeveloper, setSelectedDeveloper] = useState("");
//   const [selectedArea, setSelectedArea] = useState("");
//   const [selectedCommunity, setSelectedCommunity] = useState("");
//   const [selectedAmenities, setSelectedAmenities] = useState("");
//   const [minPrice, setMinPrice] = useState(0);
//   const [maxPrice, setMaxPrice] = useState(500000000);

//   // 🔹 Fetch Community
//   useEffect(() => {
//     if (!communityId) return;
//     (async () => {
//       try {
//         const data = await getCommunityBySlug(communityId);
//         setCommunity(data);
//         setSelectedCommunity(data?.id);
//       } catch (err) {
//         console.error("Community fetch error", err);
//       }
//     })();
//   }, [communityId]);

//   // 🔹 Fetch Areas
//   useEffect(() => {
//     (async () => {
//       try {
//         const data = await getAreas();
//         setAreas(data);
//       } catch (err) {
//         console.error("Areas fetch error", err);
//       }
//     })();
//   }, [pathname]);

//   // 🔹 Fetch Property Types
//   useEffect(() => {
//     (async () => {
//       try {
//         const data = await getPropertyTypes();
//         setpType(data);
//       } catch (err) {
//         console.error("Property types error", err);
//       }
//     })();
//   }, [pathname]);

//   // 🔹 Fetch Property Status
//   useEffect(() => {
//     (async () => {
//       try {
//         const data = await getPropertyStatuses();
//         setpStatus(data);
//       } catch (err) {
//         console.error("Property status error", err);
//       }
//     })();
//   }, [pathname]);

//   // 🔹 Fetch Properties
//   useEffect(() => {
//     if (!community?.id) return;
//     (async () => {
//       setIsLoading(true);
//       try {
//         const data = await getPropertyList({
//           community_id: community?.id,
//           property_type_id: filter.selectedProperty?.id,
//           property_name: filter?.searchProperty,
//           property_status: filter?.activeTab?.id,
//         });
//         const filtered = data.filter((p) => p.status === 1);
//         setproperties(filtered);
//       } catch (err) {
//         console.error("Properties fetch error", err);
//       } finally {
//         setIsLoading(false);
//       }
//     })();
//   }, [community?.id]);

//   // 🔹 Search Submit
//   const handleSubmit = async () => {
//     setIsLoading(true);
//     try {
//       const data = await getPropertyList({
//         community_id: community?.id,
//         property_type_id: filter.selectedProperty?.id,
//         property_name: filter?.searchProperty,
//         property_status: filter?.activeTab?.id,
//         area_id: selectedArea,
//         developer_id: selectedDeveloper,
//         feature_id: selectedAmenities,
//         to_price: maxPrice,
//         from_price: minPrice,
//       });
//       const filtered = data.filter((p) => p.status === 1);
//       setproperties(filtered);
//     } catch (err) {
//       console.error("Filter search error", err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleLoadMore = () => setVisibleProperties((prev) => prev + 18);

//   if (isLoading) return <Loader />;

//   return (
//    <div className=" md:py-20  ">
//       {/* Tab Section */}
//       <div className="flex justify-center   mb-6 space-x-2">
//         {pStatus.slice(0, 1).map((tab) => (
//           <button
//             key={tab}
//             onClick={() => handleTabClick(tab)}
//             className={`px-4 py-2 font-montserrat  w-[110px] text-lg rounded-t-[14px] transition-colors duration-200 ${filter.activeTab === tab
//               ? "bg-[#8F8F8F] text-white shadow-lg"
//               : "bg-white text-[#8F8F8F] shadow-md"
//               }`}
//             style={{
//               boxShadow:
//                 filter.activeTab === tab
//                   ? "0px 4px 36px 0px rgba(0, 0, 0, 0.1)"
//                   : "0px 4px 36px 0px rgba(0, 0, 0, 0.06)",
//             }}
//           >
//             {tab?.name}
//           </button>
//         ))}
//       </div>

//       {/* Search Section */}
//       <div className="flex relative flex-wrap justify-center">
//         <div className="absolute -top-6 px-4 flex flex-col md:flex-row items-center justify-center gap-4 bg-white rounded-lg  py-4 shadow-md md:w-full max-w-4xl  ">
//           {/* Search Property Input */}
//           <div className="flex flex-wrap items-start md:items-center  md:justify-start gap-[15px] md:gap-[30px] ">
//             <div className="flex flex-col justify-center w-[100px] md:w-[150px] ">
//               <label className="text-[#8F8F8F] font-montserrat text-[10px] md:text-[17px] font-medium">
//                 Search Property
//               </label>
//               <input
//                 type="text"
//                 className="py-2 px-1 rounded-md text-gray-500 font-montserrat text-[8px] md:text-[12px] w-[100px] md:w-[180px] focus:outline-none"
//                 placeholder="Search by Property"
//                 value={filter.searchProperty}
//                 onChange={(e) =>
//                   setFilter((prev) => ({
//                     ...prev,
//                     searchProperty: e.target.value,
//                   }))
//                 }
//               />
//             </div>

//             {/* Location Dropdown */}
//             <div className="flex flex-col">
//               <div
//                 className="flex justify-start items-start text-[#8F8F8F] textxl"
//                 onClick={() => {
//                   setIsOpenLocation(!isOpenLocation);
//                   setIsOpenProperty(false);
//                 }}
//               >
//                 <label className="text-[#8F8F8F] font-montserrat text-[12px] md:text-[17px] font-medium">
//                   Location
//                 </label>
//                 {/* <div className="mt-1">
//                   <RiArrowDropDownLine className="text-md md:text-2xl" />
//                 </div> */}
//               </div>
//               <p className="text-[8px] md:text-[12px] font-montserrat text-[#8F8F8F] pb-2 py-2">
//                 {"Select a location"}
//               </p>
//               {/* Dropdown Menu */}
//               {/* {isOpenLocation && (
//                 <div className="absolute z-10 top-12 mt-2 w-[180px] bg-white border border-gray-300 rounded-md shadow-lg">
//                   <ul className="text-gray-800 text-xs max-h-40 overflow-y-auto">
//                     {areas?.map((location) => (
//                       <li
//                         key={location?.id}
//                         className="p-2 hover:bg-gray-100 cursor-pointer"
//                         onClick={() => {
//                           setSelectedLocation(location);
//                           setIsOpenLocation(false);
//                           handleLocationSelect(location);
//                         }}
//                       >
//                         {location?.name}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )} */}
//             </div>

//             {/* Property Type Dropdown */}
//             <div className="flex flex-col">
//               <div
//                 className="flex justify-start items-start text-[#8F8F8F] textxl"
//                 onClick={() => {
//                   setIsOpenProperty(!isOpenProperty);
//                   setIsOpenLocation(false);
//                 }}
//               >
//                 <label className="text-[#8F8F8F] font-montserrat text-[10px] md:text-[17px] font-medium">
//                   Property Type
//                 </label>
//                 <div className="mt-1">
//                   <RiArrowDropDownLine className="text-md md:text-2xl" />
//                 </div>
//               </div>
//               <p className="text-[8px] md:text-[12px] text-[#8F8F8F] font-montserrat pb-2 py-2">
//                 {filter.selectedProperty?.name || "Select a Property Type"}
//               </p>
//               {/* Dropdown Menu */}

//               {isOpenProperty && (
//                 <div className="absolute z-10 top-12 mt-2 w-[180px] bg-white border border-gray-300 rounded-md shadow-lg">
//                   <ul className="  text-xs max-h-40 overflow-y-auto">
//                     {pType?.map((type) => (
//                       <li
//                         key={type?.id}
//                         className="p-2 hover:bg-gray-100 font-montserrat cursor-pointer"
//                         onClick={() => {
//                           setSelectedProperty(type);
//                           setIsOpenProperty(false);
//                           handlePropertySelect(type);
//                         }}
//                       >
//                         {type?.name}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="flex gap-1">
//             {/* Search Button */}
//             <button
//               className="flex items-center font-montserrat bg-[#8F8F8F] text-white px-4 py-2 rounded-md text-[10px] md:text-[20px]"
//               onClick={handleSubmit}
//             >
//               <GoSearch className="mr-2 text-[10px] md:text-[20px]" />
//               Search
//             </button>

//             {/* Advanced Search Button */}
//             <button
//               className="border font-montserrat border-gray-300 text-gray-500 px-4 py-2 rounded-md text-[10px] md:text-[20px]"
//               onClick={() => setIsModalOpen(true)}
//             >
//               Advanced Search
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Modal for Advanced Filter */}
//       <AdvanceFilterModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         setSelectedAmenities={setSelectedAmenities}
//         setSelectedDeveloper={setSelectedDeveloper}
//         setSelectedArea={setSelectedArea}
//         setSelectedCommunity={setSelectedCommunity}
//         selectedDeveloper={selectedDeveloper}
//         selectedArea={selectedArea}
//         selectedCommunity={selectedCommunity}
//         selectedAmenities={selectedAmenities}
//         minPrice={minPrice}
//         setMinPrice={setMinPrice}
//         maxPrice={maxPrice}
//         setMaxPrice={setMaxPrice}
//         handleSubmit={handleSubmit}
//         hide={'community'}
//       />

//       <div className="w-[100%] mt-16 md:mt-32 pt-12 relative md:pt-0 flex justify-center flex-col items-center">
//         {/* <h1 className="text-center absolute    top-[0px] z-10 text-[#8F8F8F] font-newsLetter macbook:text-[54px] text-[20px] w-[296px] md:w-full md:text-[40px] font-semibold  ">
//           {Area?.name}
//         </h1> */}
//         {/* Property Cards */}
//         {properties.length === 0 ? (
//           <p className="text-center  font-montserrat text-[25px] w-full flex justify-center text-gray-500">
//             No Property available
//           </p>
//         ) : (
//           ""
//         )}
//         <div className="w-full flex mt-0 md:mt-16 justify-center">
//           <div
//             className={`grid ${properties.length === 1 ? "grid-cols-1" : "grid-cols-1"
//               } md:grid-cols-3 macbook:grid-cols4 gap-[10px] md:gap-[20px] macbook:[30px] mb-8 mt-8`}
//           >
//             {properties.slice(0, visibleProperties).map((property, index) => (
//               <div
//                 key={index}
//                 className={`bg-white w-[300px] h-[370px] md:h-auto md:w-[300px] border-[1px] border-[#0B0B0B] px-[10px] rounded-[13px] overflow-hidden flex flex-col  items-center ${index === 4 || index === 5
//                   ? "hidden md:hidden macbook:flex"
//                   : ""
//                   }`}
//               >
//                 {property.meadias?.length > 0 ? (
//                   property.meadias.map((media, mediaIndex) => {
//                     let mainImage;
//                     try {
//                       mainImage = media.main_image
//                         ? JSON.parse(media.main_image)?.[0]
//                         : null;
//                     } catch {
//                       mainImage = null;
//                     }

//                     const imageUrl = mainImage
//                       ? `${Image_Url}${mainImage}`
//                       : Image_NotFound;
//                     // console.log(imageUrl);
//                     return (
//                       <img
//                         key={mediaIndex}
//                         src={imageUrl}
//                         alt={property.property_name || "Property Image"}
//                         className={`m-2 w-full h-44 md:h-48 object-cover 
//           ${mediaIndex === 0
//                             ? "rounded-bl-[74px]"
//                             : mediaIndex === property.meadias.length - 1
//                               ? "rounded-br-[74px]"
//                               : ""
//                           }`}
//                         onError={(e) => {
//                           e.currentTarget.src = Image_NotFound;
//                         }}
//                       />
//                     );
//                   })
//                 ) : (
//                   <img
//                     src={Image_NotFound}
//                     alt="No Media Available"
//                     className="m-2 w-full h-44 macbook:h-44 object-cover"
//                   />
//                 )}

//                 <div className="flex flex-col justify-between items-center w-full min-h-[170px] md:min-h-[210px] md:p-[10px] pt-[0px]">
//                   <h3 className="text-[16px] font-montserrat md:text-[16px] macbook:text[28px] text-center font-semibold mb-1 md:mb-2 text-[#8F8F8F]">
//                     {property?.property_name.substring(0, 25)}..
//                   </h3>
//                   <div className="text-gray-500 text-[11px] flex flex-col items-center mb-2 md:mb-4">
//                     <p className="text-[16px] font-montserrat md:text-[15px] macbook:text[25px]">
//                       Starting From
//                     </p>
//                     <p className="flex gap-1 text-[14px] font-montserrat md:text-[18px] macbook:text[30px] font-bold text-[#8F8F8F]">
//                       <img src='/dirham.PNG' className="w-4 h-3.5 mt-0.5 md:mt-1.5"/>{property?.starting_price} 
//                     </p>
//                   </div>

//                   <div className="flex flex-col md:flex-row justify-center items-center md:justify-evenly mt2 mb-2 md:w-[80%] text-sm text-gray-500">
//                     <div className="flex items-center gap-2 pr-[10px] md:border-r md:border-gray-300">
//                       <img
//                         src="/bed.png"
//                         alt="bed icon"
//                         className="w-[8.9px] md:w-[16px] macbook:w[25px]"
//                       />
//                       <span className="text-[14px] font-montserrat md:text-xs macbook:text[28px]">
//                         {property?.no_of_bedrooms}
//                       </span>
//                     </div>
//                     <div className="flex items-center ml-[5px] gap-2">
//                       <img
//                         src="/feet.png"
//                         alt="sqft icon"
//                         className="w-[8.9px] md:w-[16px] macbook:w[30px]"
//                       />
//                       <span className="text-[14px] font-montserrat  md:text-xs macbook:text[28px]">
//                         {property?.land_area}
//                       </span>
//                     </div>
//                   </div>
//                   <button
//                     className="w-[200px] md:w-[202px] font-montserrat text-[9px] macbook:text[18px] my-1 py-1 bg-[#8F8F8F] text-white rounded-[5px] hover:bg-gray-500"
//                     onClick={() => {
//                       navigate(`/property/${property.slug}`, {
//                         state: {
//                           url: "user/properties/property_detail_using_slug",
//                           payload: { slug: property.slug },
//                         },
//                       });
//                     }}
//                   >
//                     View more detail
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Load More Button */}
//         {properties.length > 6 && visibleProperties < properties.length && (
//           <div className="text-center mt-8">
//             <button
//               onClick={handleLoadMore}
//               className="px-6 py-2 font-montserrat bg-[#8F8F8F] text-white rounded-md hover:bg-transparent border hover:border-[#8F8F8F] hover:text-[#8F8F8F]"
//             >
//               Load More
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LatestProject;
