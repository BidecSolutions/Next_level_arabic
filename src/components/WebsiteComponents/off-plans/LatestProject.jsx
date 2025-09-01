"use client";
import { Image_URL } from "@/config/constants";
import { getAmenities, getAreas, getCommunities, getPropertyTypes } from "@/lib/api/areas.server";
import { fetchPropertyList } from "@/lib/api/buy.server";
import { getPropertyStatuses } from "@/lib/api/communities.server";
import { getDevelopers } from "@/lib/api/developer.server";
import { useState, useEffect } from "react";
import { GoSearch } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Loader } from "../Loader";
import { useFilters } from "@/lib/stores/useFilters";

const Image_NotFound =
  "https://placehold.co/400x300/e5e7eb/6b7280?text=No+Image";


const AdvanceFilterModal = ({ area, handleSubmit, show, isOpen, onClose, setSelectedAmenities, selectedAmenities, setSelectedCommunity, selectedCommunity, setSelectedArea, selectedArea,setSelectedDeveloper, selectedDeveloper, maxPrice, setMaxPrice, minPrice, setMinPrice, hide }) => {
  if (!isOpen) return null;

  const min = 0;
  const max = 500000000;

  const [selectedBedrooms, setSelectedBedrooms] = useState("");
  const [selectedAreaSize, setSelectedAreaSize] = useState("");
  // const [area, setArea] = useState([]);
  const [community, setCommunity] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [amenities, setAmenities] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const communities = await getCommunities();
        if (communities) {
          setCommunity(communities);
        }
        const developer = await getDevelopers();
        if (developer) {
          setDevelopers(developer);
          console.log("Developers fetched successfully:", developer);
        }
        const amenities = await getAmenities();
        if (amenities) {
          setAmenities(amenities);
        }
console.log(community, "community", developers, "developers", amenities, "amenities");
      } catch (error) {
        console.log("APIs Error", error);
      }
    };
    fetchData();
  }, []);


  const handleMinPriceChange = (e) => {
    const value = Math.min(Number(e.target.value), maxPrice - 1);
    setMinPrice(value);
  };

  const handleMaxPriceChange = (e) => {
    const value = Math.max(Number(e.target.value), minPrice + 1);
    setMaxPrice(value);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-start z-20 overflow-hidden"  onClick={onClose}>
      <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg p-6 relative mx-4  mt-20" onClick={(e) => e.stopPropagation()}>
        <button
          className="absolute z-10 top-4 right-4 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          <IoClose size={24} />
        </button>
        <div className="grid grid-cols-2 gap-4 overflow-hidden">
          <div>
            <label className="block text-gray-600 mb-1">المطور</label>
                     {hide === "developer" ? (
  <div className="w-full border h-10 border-gray-300 rounded p-2 bg-gray-100  overflow-hidden">
    {selectedDeveloper
      ? developers.find((ar) => ar.id === selectedDeveloper)?.name
      : "قائمة المطورين"}
  </div>
) : (
  <select
    className="w-full border border-gray-300 rounded p-2"
    value={selectedDeveloper}
    onChange={(e) => setSelectedDeveloper(e.target.value)}
  >
    <option value="">قائمة المطورين</option>
    {Array.isArray(area) &&
      developers.map((ar) => (
        <option key={ar.id} value={ar.id}>
          {ar.name}
        </option>
      ))}
  </select>
)}

          </div>


          <div>
            <label className="block text-gray-600 mb-1">المناطق</label>
            {hide === "area" ? (
  <div className="w-full border h-10 border-gray-300 rounded p-2 bg-gray-100  overflow-hidden">
    {selectedArea
      ? area.find((ar) => ar.id === selectedArea)?.name
      : "قائمة المناطق"}
  </div>
) : (
  <select
    className="w-full border border-gray-300 rounded p-2"
    value={selectedArea}
    onChange={(e) => setSelectedArea(e.target.value)}
  >
    <option value="">LIST OF AREAS</option>
    {Array.isArray(area) &&
      area.map((ar) => (
        <option key={ar.id} value={ar.id}>
          {ar.name}
        </option>
      ))}
  </select>
)}

          </div>

          <div>
            <label className="block text-gray-600 mb-1">مجتمع</label>
            {hide === "community" ? (
  <div className="w-full border h-10 border-gray-300 rounded p-2 bg-gray-100 overflow-hidden">
    {selectedCommunity
      ? community.find((ar) => ar.id === selectedCommunity)?.name
      : "قائمة المجتمع"}
  </div>
) : (
  <select
    className="w-full border border-gray-300 rounded p-2"
    value={selectedCommunity}
    onChange={(e) => setSelectedCommunity(e.target.value)}
  >
    <option value="">قائمة المجتمع</option>
    {Array.isArray(area) &&
      community.map((com) => (
        <option key={com.id} value={com.id}>
          {com.name}
        </option>
      ))}
  </select>
)}
          </div>

         {!show &&  <div>
            <label className="block text-gray-600 mb-1">وسائل الراحة</label>
            <select
              className="w-full border border-gray-300 rounded p-2"
              value={selectedAmenities}
              onChange={(e) => setSelectedAmenities(e.target.value)}
            >
              <option value="">قائمة المرافق</option>
              {Array.isArray(amenities) &&
                amenities.map((com) => (
                  <option key={com.id} value={com.id}>
                    {com.name}
                  </option>
                ))}
            </select>
          </div>
          }
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-600 mb-1">منخفض إلى مرتفع</label>
            <div className="flex justify-start gap-[20px] py-3">
              <h1 className="text-[#555555] text-[12px] ">AED {minPrice}</h1> -
              <h1 className="text-[#555555]  text-[12px]  ">AED {maxPrice}</h1>
            </div>
            <div className="relative mb-3 h-6">
              <input
                type="range"
                min={min}
                max={max}
                value={minPrice}
                onChange={handleMinPriceChange}
                className="absolute w-full h-[2px] appearance-none slider-thumb-custom min-thumb"
                style={{ zIndex: minPrice > maxPrice ? 5 : 3 }}
              />
              <input
                type="range"
                min={min}
                max={max}
                value={maxPrice}
                onChange={handleMaxPriceChange}
                className="absolute w-full h-[2px] appearance-none slider-thumb-custom max-thumb"
                style={{ zIndex: minPrice < maxPrice ? 5 : 3 }}
              />
              <div className="absolute top-0 h-[2px] w-full bg-gray-300 rounded"></div>
              <div
                className="absolute top-0 h-[2px] bg-[#555555] rounded"
                style={{
                  غادر: `${((minPrice - min) / (max - min)) * 100}%`,
                  يمين: `${100 - ((maxPrice - min) / (max - min)) * 100}%`,
                }}
              ></div>
            </div>
          </div>
          <div className="mb-4 flex flex-col justify-end item-end">
          <button
              className="border h-fit md:w-52 md:ml-20 text-sm md:text-md border-gray-300 bg-[#8F8F8F] hover:bg-transparent font-montserrat text-white hover:text-gray-500 px-4 py-2 rounded-md"
            onClick={() => { handleSubmit(); onClose(); }}>
              بحث متقدم
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


const LatestProject = ({ heading, property_type, areaId, communityId, developerId }) => {
  const { propertyType, searchTerm } = {};
  const { HomeFilters } = useFilters();

  const [isOpenLocation, setIsOpenLocation] = useState(false);
  const [isOpenProperty, setIsOpenProperty] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Buy");
  const [properties, setproperties] = useState([]);
  const [selectedDeveloper, setSelectedDeveloper] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedCommunity, setSelectedCommunity] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500000000);

  const [filter, setFilter] = useState({
    activeTab: HomeFilters ? HomeFilters?.propertyType : "",
    searchProperty: HomeFilters ? HomeFilters?.PropertyName : "",
    selectedAmount: HomeFilters ? HomeFilters?.priceTypeOrSize : "",
    selectedLocation: "",
    selectedProperty: ""
      // propertyType === "appartment" ? { id: 2, name: "Apartment" } : "",
  });

  const [areas, setAreas] = useState([]);
  const [pType, setpType] = useState([]);
  const [pStatus, setpStatus] = useState([]);
  const [visibleProperties, setVisibleProperties] = useState(8);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      // console.log("useEffect ran 🚀");

      try {
        const area = await getAreas();
        const type = await getPropertyTypes();
        const status = await getPropertyStatuses();

        setAreas(area);
        setpType(type);
        setpStatus(status);
        if (property_type !== undefined) {
          const selectedPropertyType = type.find((t) => t.id == property_type);
          setFilter((prev) => ({
            ...prev,
            selectedProperty: selectedPropertyType, // or whichever logic you want (first one / default)
          }));
        }
        if (areaId !== undefined) {
          const selectedArea = area.find((t) => t.id == areaId);
          console.log(`Selected Area: ${selectedArea.name}`); // Debugging log
          setFilter((prev) => ({
            ...prev,
            selectedLocation: selectedArea, // or whichever logic you want (first one / default)
          }));
        }
          if (communityId !== undefined) {
          setSelectedCommunity(communityId);
        }
         if (developerId !== undefined) {
          setSelectedDeveloper(developerId);
        }
console.log(developerId, "developerId", communityId, "community")
        // ✅ Prepare params
        const params = {
          area_id: filter?.selectedLocation?.id || "",
          property_type_id: filter?.selectedProperty?.id || "",
          property_name: filter?.searchProperty || "",
          property_status: filter?.activeTab || "",
          amount: filter?.selectedAmount || "",
          developer_id: developerId || "",
          community_id: communityId || "",
        };

        // ✅ Call real API
        setIsLoading(true);
        const response = await fetchPropertyList(params);

        // ✅ Filter active properties
        const filteredProperties = response.filter(
          (property) => property.status === 1
        );

        setproperties(filteredProperties);
      } catch (error) {
        console.error("Property Error: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setFilter((prev) => ({ ...prev, activeTab: tab }));
  };

  const handleLocationSelect = (location) => {
    setFilter((prev) => ({ ...prev, selectedLocation: location }));
    setIsOpenLocation(false);
  };

  const handlePropertySelect = (property) => {
    setFilter((prev) => ({ ...prev, selectedProperty: property }));
    setIsOpenProperty(false);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // ✅ Prepare params
      const params = {
        area_id: filter.selectedLocation?.id
          ? filter.selectedLocation?.id
          : selectedArea,
        property_type_id: filter.selectedProperty?.id,
        property_name: filter.searchProperty,
        property_status: filter.activeTab?.id,
        community_id: selectedCommunity,
        developer_id: selectedDeveloper,
        feature_id: selectedAmenities,
        to_price: maxPrice,
        from_price: minPrice,
      };

      // ✅ Call real API
      setIsLoading(true);
      const response = await fetchPropertyList(params);

      setproperties(response);
      console.log("Filter Data --> ", response);
    } catch (error) {
      console.error("Filter Search", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    setVisibleProperties((prev) => prev + 18);
  };

  if (isLoading) return <Loader />;

  return (
    <div className=" py-10 md:py-16 ">
      <h1 className="uppercase text-center font-newsLetter text-[#8F8F8F] macbook:text-[48px] text-[17px] md:w-full md:text-[34px] font-semibold mb-8">
        {heading ? heading : "أحدث العقارات قيد الإنشاء"}
      </h1>
      <div className="flex justify-center mb-6 space-x-2">
        {pStatus.slice(0, 1).map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab)}
            className={`px-4 py-2 w-[110px] font-montserrat text-lg rounded-t-[14px] transition-colors duration-200 ${
              filter.activeTab === tab
                ? "bg-[#8F8F8F] text-white shadow-lg"
                : "bg-white text-[#8F8F8F] shadow-md"
            }`}
            style={{
              boxShadow:
                filter.activeTab === tab
                  ? "0px 4px 36px 0px rgba(0, 0, 0, 0.1)"
                  : "0px 4px 36px 0px rgba(0, 0, 0, 0.06)",
            }}
          >
            {tab.name}
          </button>
        ))}
      </div>
      <div className="flex relative flex-wrap justify-center">
        <div className="absolute -top-6 px-4 flex flex-col md:flex-row items-center justify-center gap-4 bg-white rounded-lg  py-4 shadow-md md:w-full max-w-4xl  ">
          {/* Search Property Input */}
          <div className="flex flex-wrap items-start md:items-center  md:justify-start gap-[15px] md:gap-[30px] ">
            <div className="flex flex-col justify-center w-[100px] md:w-[150px] ">
              <label className="text-[#8F8F8F] font-montserrat text-[10px] md:text-[17px] font-medium">
                بحث الملكية
              </label>
              <input
                type="text"
                className="py-2 px-1 rounded-md text-gray-500 font-montserrat text-[8px]  md:text-[12px] w-[100px] md:w-[180px] focus:outline-none"
                placeholder="البحث عن طريق الملكية"
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
            <div className="flex flex-col">
              <div
                className="flex justify-start items-start text-[#8F8F8F] textxl"
                onClick={() => {
                  setIsOpenLocation(!isOpenLocation);
                  setIsOpenProperty(false);
                }}
              >
                <label className="text-[#8F8F8F] font-montserrat text-[12px] md:text-[17px] font-medium">
                  موقع
                </label>
                <div className="md:mt-1">
                  <RiArrowDropDownLine className="text-md md:text-2xl" />
                </div>
              </div>
              <p className="text-[8px] md:text-[12px] font-montserrat text-[#8F8F8F] pb-2 py-2">
                {filter.selectedLocation?.name || "حدد الموقع"}
              </p>
              {/* Dropdown Menu */}
              {(isOpenLocation && !areaId) && (
                <div className="absolute z-10 top-12 mt-2 w-[100px] md:w-[180px] bg-white border border-gray-300 rounded-md shadow-lg">
                  <ul className="text-gray-800 text-xs max-h-40 overflow-y-auto">
                    {areas?.map((location) => (
                      <li
                        key={location?.id}
                        className="p-2 hover:bg-gray-100 font-montserrat cursor-pointer"
                        onClick={() => {
                          // setSelectedLocation(location);
                          setIsOpenLocation(false);
                          handleLocationSelect(location);
                        }}
                      >
                        {location?.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Property Type Dropdown */}
            <div className="flex flex-col">
              <div
                className="flex justify-start items-start text-[#8F8F8F] textxl"
                onClick={() => {
                  setIsOpenProperty(!isOpenProperty);
                  setIsOpenLocation(false);
                }}
              >
                <label className="text-[#8F8F8F] font-montserrat text-[10px] md:text-[17px] font-medium">
                  نوع العقار
                </label>
                <div className="md:mt-1">
                  <RiArrowDropDownLine className="text-md md:text-2xl" />
                </div>
              </div>
              <p className="text-[8px] md:text-[12px] text-[#8F8F8F] font-montserrat pb-2 py-2">
                {filter.selectedProperty?.name || "اختر نوع العقار"}
              </p>
              {/* Dropdown Menu */}

              {(isOpenProperty && !property_type) && (
                <div className="absolute z-10 top-12 mt-2 w-[180px] bg-white border border-gray-300 rounded-md shadow-lg">
                  {pType.length === 0 ? (
                    <p className="text-center text-[25px] font-montserrat w-full flex justify-center text-gray-500">
                      لا يوجد نوع متاح
                    </p>
                  ) : (
                    ""
                  )}
                  <ul className="text-[#8F8F8F] text-xs max-h-40 overflow-y-auto">
                    {pType?.map((type) => (
                      <li
                        key={type?.id}
                        className="p-2 hover:bg-gray-100 font-montserrat cursor-pointer"
                        onClick={() => {
                          setIsOpenProperty(false);
                          handlePropertySelect(type);
                        }}
                      >
                        {type?.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-1">
            {/* Search Button */}
            <button
              className="flex items-center bg-[#8F8F8F] font-montserrat text-white px-4 py-2 rounded-md"
              onClick={handleSubmit}
            >
              <GoSearch className="mr-2" size={20} />
              Search
            </button>

            {/* Advanced Search Button */}
            <button
              className="border border-gray-300 font-montserrat text-gray-500 px-4 py-2 rounded-md"
              onClick={() => setIsModalOpen(true)}
            >
              بحث متقدم
            </button>
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
        area={areas}
        // hide={'area'}
      />
      <div className="w-[100%] md:mt-32 pt-24 md:pt-0 flex justify-center flex-col items-center">
        {/* Property Cards */}
        {properties.length === 0 ? (
          <p className="text-center text-[25px] mt-10 md:mt-0 font-montserrat w-full flex justify-center text-gray-500">
            لا يوجد عقار متاح
          </p>
        ) : (
          ""
        )}
        <div className="w-full flex justify-center">
          <div
            className={`grid  place-content-center  ${
              properties.length === 1 ? "grid-cols-1" : "grid-cols-1"
            } md:grid-cols-3 macbook:grid-cols-3 gap-[20px] md:gap-[20px] macbook:[30px]    mb-8 mt-8
            
            
            `}
          >
            {properties.slice(0, visibleProperties).map((property, index) => (
              <div
                key={index}
                className={`bg-white w-[300px] h-[370px] md:w-[300px] md:h-[380px] border-[1px] border-[#0B0B0B] px-[10px] rounded-[13px] overflow-hidden flex flex-col items-center ${
                  index === 4 || index === 5
                    ? "hidden md:hidden macbook:flex"
                    : ""
                }
                
                `}
              >
                {property.meadias?.length > 0 ? (
                  property.meadias.map((media, mediaIndex) => {
                    let mainImage;
                    try {
                      mainImage = JSON.parse(media.main_image)?.[0];
                    } catch {
                      mainImage = null;
                    }
                    const borderRadiusClass =
                      mediaIndex === 0
                        ? "rounded-bl-[74px]"
                        : mediaIndex === 1
                        ? "rounded-tl-[74px] rounded-tr-[74px]" // Left to right rounded
                        : mediaIndex === 3
                        ? "rounded-bl-[74px] rounded-br-[74px]" // Left to right rounded
                        : mediaIndex === property.meadias.length - 1
                        ? "rounded-br-[74px]"
                        : "";

                    return mainImage ? (
                      <img
                        key={index}
                        src={`${Image_URL}${mainImage}`}
                        alt={property.property_name}
                        className={`m-2   w-full h-44 md:h-48   object-cover   ${
                          index === 0
                            ? "rounded-bl-[74px]"
                            : index === 2
                            ? "rounded-br-[74px]"
                            : ""
                        }`}
                        onError={(e) => {
                          e.currentTarget.src = Image_NotFound; // Path to your dummy image
                        }}
                      />
                    ) : (
                      <img
                        src={Image_NotFound}
                        alt=""
                        className={`m-2   w-full h-44 md:h-48   object-cover ${
                          index === 0
                            ? "rounded-bl-[74px]"
                            : index === 2
                            ? "rounded-br-[74px]"
                            : ""
                        }`}
                      />
                    );
                  })
                ) : (
                  <img
                    src={Image_NotFound}
                    alt="No Media Available"
                    className="m-2  w-full h-44 md:h-48  macbook:h-44 object-cover rounded-bl-[74px] "
                  />
                )}

                <div className="flex flex-col justify-between items-center  min-h-[175px] md:min-h-[80px] w-full p-[10px] pt-[0px]">
                  <h3 className="text-[16px] font-montserrat  md:text-[17px] macbook:text[28px] text-center font-semibold mb-1 md:mb-2 text-[#8F8F8F]">
                    {`${property?.property_name.substring(0, 25)}...`}
                  </h3>
                  <div className="text-gray-500 text-[11px] flex flex-col items-center mb-2 md:mb-4">
                    <p className="text-[16px] font-montserrat md:text-[15px] macbook:text[25px]">
                      ابتداء من
                    </p>
                    <p className="flex gap-1 text-[14px] text-center font-montserrat md:text-[18px] macbook:text[30px] font-bold text-[#8F8F8F]">
                      <img
                        src="/dirham.PNG"
                        className="w-4 h-3.5 mt-0.5 md:mt-1.5"
                      />{" "}
                      {property?.starting_price}
                    </p>
                  </div>

                  <div className="flex flex-col md:flex-row justify-center items-center md:justify-evenly min-h-6 mt2 mb-2 md:w-[100%] text-sm text-gray-500">
                    <div className="flex items-center gap-2 pr-[10px] md:border-r md:border-gray-300">
                      <img
                        src="/bed.png"
                        alt="bed icon"
                        className="w-[8.9px] md:w-[16px] macbook:w[25px]"
                      />
                      <span className="text-[12px] md:text-xs font-montserrat macbook:text[20px]">
                        {property?.no_of_bedrooms}
                      </span>
                    </div>
                    <div className="flex items-center ml-[5px] gap-2">
                      <img
                        src="/feet.png"
                        alt="sqft icon"
                        className="w-[8.9px] md:w-[16px] macbook:w[30px]"
                      />
                      <span className="text-[12px] font-montserrat md:text-xs macbook:tex-[20px]">
                        {property?.land_area}
                      </span>
                    </div>
                  </div>
                  <button
                    className="w-[200px] md:w-[202px] font-montserrat text-[10px] macbook:text[18px] my-1 py-1 bg-[#8F8F8F] text-white rounded-[5px] hover:bg-transparent hover:text-[#8F8F8F] border hover:border-[#8F8F8F]"
                    onClick={() => {
                      navigate(`/property/${property.slug}`, {
                        state: {
                          url: "user/properties/property_detail_using_slug",
                          payload: { slug: property.slug },
                        },
                      });
                    }}
                  >
                   عرض المزيد من التفاصيل
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {properties.length > 6 && visibleProperties < properties.length && (
          <div className="text-center mt-8">
            <button
              onClick={handleLoadMore}
              className="px-6 py-2 bg-[#8F8F8F] text-white rounded-md hover:bg-transparent hover:text-[#8F8F8F] border border-[#8F8F8F]"
            >
              تحميل المزيد
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestProject;
