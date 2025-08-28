// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { GoSearch } from "react-icons/go";

// import { RiArrowDropDownLine } from "react-icons/ri";

// // Swiper styles
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import { Pagination, Navigation, Autoplay } from "swiper/modules";

// import "./BestProperty.css"; // Adjust path as per your folder
// import { Image_NotFound, Image_URL } from "@/config/constants";
// import { getAreas, getPropertyList, getPropertyTypes } from "@/lib/api/areas.server";
// import AdvanceFilterModal from "./AdvanceFilterModal";

// export default function BestProperty({ heading }) {
//     const router = useRouter();

//     const [isOpenLocation, setIsOpenLocation] = useState(false);
//     const [isOpenProperty, setIsOpenProperty] = useState(false);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [filter, setFilter] = useState({
//         searchProperty: "",
//         selectedLocation: "",
//         selectedProperty: "",
//     });
//     const [areas, setAreas] = useState([]);
//     const [pType, setpType] = useState([]);
//     const [properties, setProperties] = useState([]);
//     const [selectedDeveloper, setSelectedDeveloper] = useState("");
//     const [selectedArea, setSelectedArea] = useState("");
//     const [selectedCommunity, setSelectedCommunity] = useState("");
//     const [selectedAmenities, setSelectedAmenities] = useState("");
//     const [minPrice, setMinPrice] = useState(0);
//     const [maxPrice, setMaxPrice] = useState(500000000);

//     // Fetch property list
//     //   useEffect(() => {
//     //     axios.public
//     //       .post("user/areas/propertyList", { area_id: "" })
//     //       .then((res) => {
//     //         const filtered = res.data.data.filter((p) => p.status === 1);
//     //         setProperties(filtered);
//     //       })
//     //       .catch((err) => console.error("Property List Error:", err));
//     //   }, []);
//     useEffect(() => {
//         getPropertyList().then(filtered =>
//             setProperties(filtered.filter(p => p.status === 1))
//         );
//     }, []);
//     // Fetch areas
//     // 
//     useEffect(() => {
//         getAreas().then(setAreas);
//     }, []);

//     // Fetch property types
//     //   useEffect(() => {
//     //     axios.public
//     //       .get("user/property-types/1")
//     //       .then((res) => setpType(res.data.data))
//     //       .catch((err) => console.error("Property Types Error:", err));
//     //   }, []);

//     useEffect(() => {
//         getPropertyTypes().then(setpType);
//     }, []);
//     //   const handleSubmit = () => {
//     //     axios.public
//     //       .post("user/areas/propertyList", {
//     //         area_id: filter.selectedLocation?.id || selectedArea,
//     //         property_type_id: filter.selectedProperty?.id,
//     //         property_name: filter.searchProperty,
//     //         community_id: selectedCommunity,
//     //         developer_id: selectedDeveloper,
//     //         feature_id: selectedAmenities,
//     //         to_price: maxPrice,
//     //         from_price: minPrice,
//     //       })
//     //       .then((res) => setProperties(res.data.data))
//     //       .catch((err) => console.error("Filter Search Error:", err));
//     //   };

//     const handleSubmit = () => {
//         getPropertyList({
//             area_id: filter.selectedLocation?.id || selectedArea,
//             property_type_id: filter.selectedProperty?.id,
//             property_name: filter.searchProperty,
//             community_id: selectedCommunity,
//             developer_id: selectedDeveloper,
//             feature_id: selectedAmenities,
//             to_price: maxPrice,
//             from_price: minPrice,
//         }).then(setProperties);
//     };
//     const handleLocationSelect = (location) => {
//         setFilter((prev) => ({ ...prev, selectedLocation: location }));
//         setIsOpenLocation(false);
//     };

//     const handlePropertySelect = (property) => {
//         setFilter((prev) => ({ ...prev, selectedProperty: property }));
//         setIsOpenProperty(false);
//     };

//     return (
//         <div className="flex justify-center py-10 md:py-20 w-full">
//             <div className="w-full macbook:w-[100%]">
//                 <h2
//                     className="text-center font-newsLetter text-[#8F8F8F] uppercase text-xl font-normal md:text-2xl my-14"
//                     onClick={() => {
//                         setIsOpenLocation(false);
//                         setIsOpenProperty(false);
//                     }}
//                 >
//                     {heading || "Best Property Sale in Dubai"}
//                 </h2>

//                 {/* Background Section */}
//                 <div
//                     style={{
//                         backgroundImage: 'url("/Areas/Best_Property.png")',
//                         backgroundRepeat: "no-repeat",
//                     }}
//                     className="h-[400px] rounded-t-[50px] md:rounded-t-[150px] bg-center bg-cover macbook:h[450px]"
//                 >
//                     <div className="relative container mx-auto pb-10">
//                         {/* Search Section */}
                        // <div className="flex relative flex-wrap justify-center">
                        //     <div className="absolute -top-10 md:-top-6 px-4 flex flex-col md:flex-row items-center justify-center gap-4 bg-white rounded-lg py-4 shadow-md md:w-full max-w-4xl">
                        //         {/* Search Input */}
                        //         <div className="flex flex-col w-[100px] md:w-[150px]">
                        //             <label className="text-[#8F8F8F] text-[10px] md:text-[17px] font-medium">
                        //                 Search Property
                        //             </label>
                        //             <input
                        //                 type="text"
                        //                 className="py-2 px-1 rounded-md text-gray-500 text-[8px] md:text-[10px] w-[100px] md:w-[180px] focus:outline-none"
                        //                 placeholder="Search by Property"
                        //                 value={filter.searchProperty}
                        //                 onChange={(e) =>
                        //                     setFilter((prev) => ({
                        //                         ...prev,
                        //                         searchProperty: e.target.value,
                        //                     }))
                        //                 }
                        //             />
                        //         </div>

                        //         {/* Location Dropdown */}
                        //         <div className="flex flex-col relative">
                        //             <div
                        //                 className="flex items-start cursor-pointer"
                        //                 onClick={() => {
                        //                     setIsOpenLocation(!isOpenLocation);
                        //                     setIsOpenProperty(false);
                        //                 }}
                        //             >
                        //                 <label className="text-[#8F8F8F] text-[12px] md:text-[17px] font-medium">
                        //                     Location
                        //                 </label>
                        //                 <RiArrowDropDownLine className="md:mt-1 text-md md:text-2xl" />
                        //             </div>
                        //             <p className="text-[8px] md:text-[12px] text-[#8F8F8F] py-2">
                        //                 {filter.selectedLocation?.name || "Select a location"}
                        //             </p>
                        //             {isOpenLocation && (
                        //                 <ul className="absolute z-10 top-12 mt-2 w-[180px] bg-white border rounded-md shadow-lg text-xs max-h-40 overflow-y-auto">
                        //                     {areas.map((loc) => (
                        //                         <li
                        //                             key={loc.id}
                        //                             className="p-2 hover:bg-gray-100 cursor-pointer"
                        //                             onClick={() => handleLocationSelect(loc)}
                        //                         >
                        //                             {loc.name}
                        //                         </li>
                        //                     ))}
                        //                 </ul>
                        //             )}
                        //         </div>

                        //         {/* Property Type Dropdown */}
                        //         <div className="flex flex-col relative">
                        //             <div
                        //                 className="flex items-start cursor-pointer"
                        //                 onClick={() => {
                        //                     setIsOpenProperty(!isOpenProperty);
                        //                     setIsOpenLocation(false);
                        //                 }}
                        //             >
                        //                 <label className="text-[#8F8F8F] text-[10px] md:text-[17px] font-medium">
                        //                     Property Type
                        //                 </label>
                        //                 <RiArrowDropDownLine className="md:mt-1 text-md md:text-2xl" />
                        //             </div>
                        //             <p className="text-[8px] md:text-[12px] text-[#8F8F8F] py-2">
                        //                 {filter.selectedProperty?.name || "Select a Property Type"}
                        //             </p>
                        //             {isOpenProperty && (
                        //                 <ul className="absolute z-10 top-12 mt-2 w-[180px] bg-white border rounded-md shadow-lg text-xs max-h-40 overflow-y-auto">
                        //                     {pType.map((type) => (
                        //                         <li
                        //                             key={type.id}
                        //                             className="p-2 hover:bg-gray-100 cursor-pointer"
                        //                             onClick={() => handlePropertySelect(type)}
                        //                         >
                        //                             {type.name}
                        //                         </li>
                        //                     ))}
                        //                 </ul>
                        //             )}
                        //         </div>

                        //         {/* Buttons */}
                        //         <div className="flex gap-1">
                        //             <button
                        //                 className="flex items-center text-[12px] md:text-[15px] bg-[#8F8F8F] text-white px-4 py-2 rounded-md"
                        //                 onClick={handleSubmit}
                        //             >
                        //                 <GoSearch className="mr-2" size={20} />
                        //                 Search
                        //             </button>
                        //             <button
                        //                 className="border border-gray-300 text-[12px] md:text-[15px] text-gray-500 px-4 py-2 rounded-md"
                        //                 onClick={() => setIsModalOpen(true)}
                        //             >
                        //                 Advanced Search
                        //             </button>
                        //         </div>
                        //     </div>
                        // </div>

//                         {/* Properties Slider */}
//                         <div className="mt-[10rem] md:mt-20">
//                             {properties.length > 0 ? (
//                                 <Swiper
//                                     spaceBetween={0}
//                                     slidesPerView={1}
//                                     centeredSlides
//                                     allowTouchMove={true} // swipe enable
//                                     breakpoints={{
//                                         1024: { slidesPerView: 3, spaceBetween: 5 },
//                                         768: { slidesPerView: 3, spaceBetween: 5 },
//                                         640: { slidesPerView: 3, spaceBetween: 5 },
//                                         0: { slidesPerView: 1, spaceBetween: 8 },
//                                     }}
//                                     navigation={{
//                                         nextEl: ".custom-next",
//                                         prevEl: ".custom-prev",
//                                     }}
//                                     modules={[Pagination, Navigation, Autoplay]} // yahan add kiya
//                                     loop
//                                     autoplay={{ delay: 1500, disableOnInteraction: false }}
//                                 >
//                                     {properties.map((property, index) => (
//                                         <SwiperSlide key={index}>
//                                             <div className="bg-white w-[280px] md:w-[320px] px-[10px] border rounded-[13px] flex flex-col items-center">
//                                                 <Image
//                                                     src={
//                                                         property?.meadias?.[0]?.main_image
//                                                             ? `${Image_URL}/${JSON.parse(
//                                                                 property.meadias[0].main_image
//                                                             )[0]}`
//                                                             : "/home/p2.png"
//                                                     }
//                                                     alt={property.property_name}
//                                                     width={300}
//                                                     height={200}
//                                                     className="m-2 w-full h-32 object-cover"
//                                                     onError={(e) => (e.target.src = Image_NotFound)}
//                                                 />
//                                                 <h3 className="text-[16px] font-semibold text-[#8F8F8F] text-center">
//                                                     {property.property_name.substring(0, 25)}
//                                                 </h3>
//                                                 <p className="text-gray-500 text-[14px]">
//                                                     Starting From {property?.starting_price}
//                                                 </p>
//                                                 <button
//                                                     className="w-[200px] text-[11px] my-1 py-1 bg-[#8F8F8F] text-white rounded-[5px] hover:bg-transparent border hover:border-[#8F8F8F] hover:text-[#8F8F8F]"
//                                                     onClick={() =>
//                                                         router.push(
//                                                             `/property/${property.slug}?slug=${property.slug}`
//                                                         )
//                                                     }
//                                                 >
//                                                     View more detail
//                                                 </button>
//                                             </div>
//                                         </SwiperSlide>
//                                     ))}
//                                 </Swiper>
//                             ) : (
//                                 <p className="text-white text-center">No property found</p>
//                             )}
//                         </div>
//                     </div>
//                 </div>

//                 {/* Advanced Search Modal */}
//                 <AdvanceFilterModal
//                     isOpen={isModalOpen}
//                     onClose={() => setIsModalOpen(false)}
//                     setSelectedAmenities={setSelectedAmenities}
//                     setSelectedDeveloper={setSelectedDeveloper}
//                     setSelectedArea={setSelectedArea}
//                     setSelectedCommunity={setSelectedCommunity}
//                     selectedDeveloper={selectedDeveloper}
//                     selectedArea={selectedArea}
//                     selectedCommunity={selectedCommunity}
//                     selectedAmenities={selectedAmenities}
//                     minPrice={minPrice}
//                     setMinPrice={setMinPrice}
//                     maxPrice={maxPrice}
//                     setMaxPrice={setMaxPrice}
//                     handleSubmit={handleSubmit}
//                     hide={"null"}
//                 />
//             </div>
//         </div>
//     );
// }
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { RiArrowDropDownLine } from "react-icons/ri";
import { GoSearch } from "react-icons/go";

import { Swiper, SwiperSlide, } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import {
    getAreas,
    getPropertyList,
    getPropertyTypes,
} from "@/lib/api/areas.server";

import { Image_NotFound, Image_URL } from "@/config/constants";
import AdvanceFilterModal from "./AdvanceFilterModal";

export const BestProperty = ({ heading }) => {
    const router = useRouter();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filter, setFilter] = useState({
        searchProperty: "",
        selectedLocation: "",
        selectedProperty: "",
    });

    const [pType, setPType] = useState([]);
    const [properties, setProperties] = useState([]);
    const [areas, setAreas] = useState([]);
    const [isOpenLocation, setIsOpenLocation] = useState(false);
    const [isOpenProperty, setIsOpenProperty] = useState(false);

    const [selectedDeveloper, setSelectedDeveloper] = useState("");
    const [selectedArea, setSelectedArea] = useState("");
    const [selectedCommunity, setSelectedCommunity] = useState("");
    const [selectedAmenities, setSelectedAmenities] = useState("");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(500000000);

    // Fetch initial property list
    useEffect(() => {
        getPropertyList({ area_id: "" })
            .then((data) => setProperties(data.filter((p) => p.status === 1)))
            .catch((err) => console.error(err));
    }, []);

    // Fetch areas
    useEffect(() => {
        getAreas().then(setAreas);
    }, []);

    // Fetch property types
    useEffect(() => {
        getPropertyTypes().then(setPType);
    }, []);

    const handleSubmit = () => {
        getPropertyList({
            area_id: filter.selectedLocation?.id || selectedArea,
            property_type_id: filter.selectedProperty?.id,
            property_name: filter.searchProperty,
            community_id: selectedCommunity,
            developer_id: selectedDeveloper,
            feature_id: selectedAmenities,
            to_price: maxPrice,
            from_price: minPrice,
        }).then(setProperties);
    };

    return (
        <div className="flex justify-center py-10 md:py-20 w-full">
            <div className="w-full macbook:w-[100%]">
                <h2 className="text-center font-newsLetter text-[#8F8F8F] uppercase text-xl font-normal md:text-2xl my-14">
                    {heading || "Best Property Sale in Dubai"}
                </h2>

                <div
                    style={{
                        backgroundImage: 'url("/Areas/Best_Property.png")',
                        backgroundRepeat: "no-repeat",
                    }}
                    className="h-[400px] rounded-t-[50px] md:rounded-t-[150px] bg-center bg-cover macbook:h[450px]"
                >
                    <div className="relative container mx-auto max-w[92%] pb-10">
                        <div className="flex relative flex-wrap justify-center">
                            <div className="absolute -top-10 md:-top-6 px-4 flex flex-col md:flex-row items-center justify-center gap-4 bg-white rounded-lg py-4 shadow-md md:w-full max-w-4xl">
                                {/* Search Input */}
                                <div className="flex flex-col w-[100px] md:w-[150px]">
                                    <label className="text-[#8F8F8F] text-[10px] md:text-[17px] font-medium">
                                        Search Property
                                    </label>
                                    <input
                                        type="text"
                                        className="py-2 px-1 rounded-md text-gray-500 text-[8px] md:text-[10px] w-[100px] md:w-[180px] focus:outline-none"
                                        placeholder="Search by Property"
                                        value={filter.searchProperty}
                                        onChange={(e) =>
                                            setFilter((prev) => ({
                                                ...prev,
                                                searchProperty: e.target.value,
                                            }))
                                        }
                                    />
                                </div>

                                {/* Location Dropdown */}
                                <div className="flex flex-col relative">
                                    <div
                                        className="flex items-start cursor-pointer"
                                        onClick={() => {
                                            setIsOpenLocation(!isOpenLocation);
                                            setIsOpenProperty(false);
                                        }}
                                    >
                                        <label className="text-[#8F8F8F] text-[12px] md:text-[17px] font-medium">
                                            Location
                                        </label>
                                        <RiArrowDropDownLine className="md:mt-1 text-md md:text-2xl" />
                                    </div>
                                    <p className="text-[8px] md:text-[12px] text-[#8F8F8F] py-2">
                                        {filter.selectedLocation?.name || "Select a location"}
                                    </p>
                                    {isOpenLocation && (
                                        <ul className="absolute z-10 top-12 mt-2 w-[180px] bg-white border rounded-md shadow-lg text-xs max-h-40 overflow-y-auto">
                                            {areas.map((loc) => (
                                                <li
                                                    key={loc.id}
                                                    className="p-2 hover:bg-gray-100 cursor-pointer"
                                                    onClick={() => handleLocationSelect(loc)}
                                                >
                                                    {loc.name}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>

                                {/* Property Type Dropdown */}
                                <div className="flex flex-col relative">
                                    <div
                                        className="flex items-start cursor-pointer"
                                        onClick={() => {
                                            setIsOpenProperty(!isOpenProperty);
                                            setIsOpenLocation(false);
                                        }}
                                    >
                                        <label className="text-[#8F8F8F] text-[10px] md:text-[17px] font-medium">
                                            Property Type
                                        </label>
                                        <RiArrowDropDownLine className="md:mt-1 text-md md:text-2xl" />
                                    </div>
                                    <p className="text-[8px] md:text-[12px] text-[#8F8F8F] py-2">
                                        {filter.selectedProperty?.name || "Select a Property Type"}
                                    </p>
                                    {isOpenProperty && (
                                        <ul className="absolute z-10 top-12 mt-2 w-[180px] bg-white border rounded-md shadow-lg text-xs max-h-40 overflow-y-auto">
                                            {pType.map((type) => (
                                                <li
                                                    key={type.id}
                                                    className="p-2 hover:bg-gray-100 cursor-pointer"
                                                    onClick={() => handlePropertySelect(type)}
                                                >
                                                    {type.name}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>

                                {/* Buttons */}
                                <div className="flex gap-1">
                                    <button
                                        className="flex items-center text-[12px] md:text-[15px] bg-[#8F8F8F] text-white px-4 py-2 rounded-md"
                                        onClick={handleSubmit}
                                    >
                                        <GoSearch className="mr-2" size={20} />
                                        Search
                                    </button>
                                    <button
                                        className="border border-gray-300 text-[12px] md:text-[15px] text-gray-500 px-4 py-2 rounded-md"
                                        onClick={() => setIsModalOpen(true)}
                                    >
                                        Advanced Search
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="mt-[10rem] md:mt-20">
                            {properties.length > 0 ? (
                                <Swiper
                                    spaceBetween={0}
                                    slidesPerView={1}
                                    centeredSlides
                                    allowTouchMove={true} // swipe enable
                                    breakpoints={{
                                        1024: { slidesPerView: 3, spaceBetween: 5 },
                                        768: { slidesPerView: 3, spaceBetween: 5 },
                                        640: { slidesPerView: 3, spaceBetween: 5 },
                                        0: { slidesPerView: 1, spaceBetween: 8 },
                                    }}
                                    navigation={{
                                        nextEl: ".custom-next",
                                        prevEl: ".custom-prev",
                                    }}
                                    modules={[Pagination, Navigation, Autoplay]} // yahan add kiya
                                    loop
                                    autoplay={{ delay: 1500, disableOnInteraction: false }}
                                >
                                    {properties.map((property, index) => (
                                        <SwiperSlide key={index}>
                                            <div className="bg-white w-[280px] md:w-[320px] px-[10px] border border-black rounded-[13px] overflow-hidden flex flex-col items-center">
                                                <Image
                                                    src={
                                                        property?.meadias?.[0]?.main_image
                                                            ? `${Image_URL}/${JSON.parse(property.meadias[0].main_image)[0]}`
                                                            : "/home/p2.png"
                                                    }
                                                    alt={property?.property_name}
                                                    width={300}
                                                    height={150}
                                                    className="m-2 w-full h-32 object-cover"
                                                    onError={(e) => {
                                                        e.currentTarget.src = Image_NotFound;
                                                    }}
                                                />
                                                <div className="flex flex-col justify-between min-h-[210px] items-center w-full p-[10px] pt-[0px]">
                                                    <h3 className="text-[16px] font-montserrat text-center font-semibold mb-1 md:mb-2 text-[#8F8F8F]">
                                                        {property.property_name.substring(0, 25)}
                                                    </h3>
                                                    <div className="text-gray-500 text-[11px] flex flex-col items-center mb-2 md:mb-4">
                                                        <p className="text-[16px] font-montserrat">Starting From</p>
                                                        <p className="flex gap-1 text-[14px] font-montserrat font-bold text-[#8F8F8F]">
                                                            {property?.starting_price}
                                                            <Image src="/dirham.PNG" width={15} height={15} alt="dirham" />
                                                        </p>
                                                    </div>
                                                    <button
                                                        onClick={() => router.push(`/property/${property.slug}`)}
                                                        className="w-[200px] text-[11px] my-1 py-1 bg-[#8F8F8F] text-white rounded-[5px] hover:bg-transparent border hover:border-[#8F8F8F] hover:text-[#8F8F8F]"
                                                    >
                                                        View more detail
                                                    </button>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            ) : (
                                <div className="flex justify-center items-center h-[200px] rounded-lg">
                                    <p className="text-white font-montserrat md:text-[36px]">No property found</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <AdvanceFilterModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    setSelectedAmenities={setSelectedAmenities}
                    setSelectedDeveloper={setSelectedDeveloper}
                    setSelectedArea={setSelectedArea}
                    setSelectedCommunity={setSelectedCommunity}
                    selectedDeveloper={selectedDeveloper}
                    selectedArea={selectedArea}
                    selectedCommunity={selectedCommunity}
                    selectedAmenities={selectedAmenities}
                    minPrice={minPrice}
                    setMinPrice={setMinPrice}
                    maxPrice={maxPrice}
                    setMaxPrice={setMaxPrice}
                    handleSubmit={handleSubmit}
                    hide={"null"}
                />
            </div>
        </div>
    );
};
