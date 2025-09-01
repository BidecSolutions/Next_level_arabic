import { useState, useEffect } from "react";
import { GoSearch } from "react-icons/go";
import { RiArrowDropDownLine } from "react-icons/ri";
import AdvanceFilterModal from "../AreaDetails/AdvanceFilterModal";
import axios from "../../../Utils/axios";
import { Image_NotFound, Image_Url } from "../../../Utils/const";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Loader } from "../../webComponents/Loader/Loader";

const LatestProject = ({ heading, area, property_type }) => {
  const [isOpenLocation, setIsOpenLocation] = useState(false);
  const [isOpenProperty, setIsOpenProperty] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Buy"); // Track active tab
  const [properties, setproperties] = useState([]);
  const { propertyType } = useParams();
  const location = useLocation();
  const HomeFilters = location.state;
  const searchTerm = location.state;
  const [selectedDeveloper, setSelectedDeveloper] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedCommunity, setSelectedCommunity] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500000000);

  // const [filter, setFilter] = useState({
  //   activeTab: "Buy",
  //   searchProperty: "",
  //   selectedLocation: "",
  //   selectedProperty: propertyType === 'appartment' ? {id: 2, name:'Apartment'} : '',
  // });
  // const [filter, setFilter] = useState(() => {
  //   let selectedProperty = "";
  //   switch (propertyType) {
  //     case "Villa":
  //       selectedProperty = { id: 1, name: "Villa" };
  //       break;
  //     case "Apartment":
  //       selectedProperty = { id: 2, name: "Apartment" };
  //       break;
  //     case "Mansion":
  //       selectedProperty = { id: 5, name: "Mansion" };
  //       break;
  //     case "Duplex":
  //       selectedProperty = { id: 4, name: "Duplex" };
  //       break;
  //     case "Apartment for Sale":
  //       selectedProperty = { id: 3, name: "Townhouse" };
  //       break;
  //     default:
  //       selectedProperty = "";
  //   }
  //   return {
  //     activeTab: "",
  //     searchProperty: "",
  //     selectedLocation: "",
  //     selectedProperty,
  //   };
  // });
  const [filter, setFilter] = useState({
    activeTab: HomeFilters ? HomeFilters?.propertyType : "",
    searchProperty: HomeFilters ? HomeFilters?.PropertyName : "",
    selectedLocation: "",
    selectedProperty:
      propertyType === "appartment" ? { id: 2, name: "Apartment" } : "",
  });
  const [areas, setAreas] = useState([]);
  const [pType, setpType] = useState([]);
  const [pStatus, setpStatus] = useState([]);
  const [visibleProperties, setVisibleProperties] = useState(3);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setFilter((prev) => ({
      ...prev,
      // selectedLocation: area,
      selectedProperty: pType.find((item) => item.id === property_type) || null,
    }));
  }, [area, property_type, pType]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.public.get("user/areas");
        // setAreas(response.data.data);
        const filteredProperties = response.data.data.filter(
          (property) => property.status === 1
        );

        // Set the filtered properties to state
        setAreas(filteredProperties);
        // console.log("Areas", areas);
      } catch (error) {
        console.log("Areas ", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.public.get("user/property-types/1");
        // setpType(response.data.data);
        const filteredProperties = response.data.data.filter(
          (property) => property.status === 1
        );

        // Set the filtered properties to state
        setpType(filteredProperties);
        // console.log("Property Types fetched:", response.data.data); // Log fetched data
      } catch (error) {
        console.log("Property Types Error: ", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.public.get("user/property-statuses/1");
        // setpStatus(response.data.data);
        const filteredProperties = response.data.data.filter(
          (property) => property.status === 1
        );

        // Set the filtered properties to state
        setpStatus(filteredProperties);
        // console.log("Property Status fetched:", response.data.data); // Log fetched data
      } catch (error) {
        console.log("Property Status Error: ", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await axios.public.post(
          "user/off-plan-properties-and-projects/off-plan-property-list",
          {
            area_id: filter.selectedLocation.id,
            property_type_id: filter.selectedProperty.id,
            property_name: filter ? filter.searchProperty : "",
            property_status: filter ? filter.activeTab : "",
          }
        );
        // setproperties(response.data.data);
        // Filter the data where status is 1
        const filteredProperties = response.data.data.filter(
          (property) => property.status === 1
        );

        // Set the filtered properties to state
        setproperties(filteredProperties);
        // console.log("Ready Properties ", properties);
      } catch (error) {
        console.log("Property Error: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [filter]);
  // console.log("new", filter);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setFilter((prev) => ({ ...prev, activeTab: tab }));
  };

  const handleLocationSelect = (location) => {
    setFilter((prev) => ({ ...prev, selectedLocation: location }));
    // console.log(filter.selectedLocation.id);
    setIsOpenLocation(false);
  };

  const handlePropertySelect = (property) => {
    setFilter((prev) => ({ ...prev, selectedProperty: property }));
    setIsOpenProperty(false);
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const response = await axios.public.post(
        "user/off-plan-properties-and-projects/off-plan-property-list",
        {
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
        }
      );
      // setproperties(response.data.data);
      const filteredProperties = response.data.data.filter(
        (property) => property.status === 1
      );

      // Set the filtered properties to state
      setproperties(filteredProperties);
      // console.log("Filter  Data --> ", response);
      // console.log("Community  ID -->", cId);
    } catch (error) {
      console.log("Filter Search", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    setVisibleProperties((prev) => prev + 17); // Increase visible properties by 6
  };

  if (isLoading) return <Loader />;

  return (
    <div className=" py-10 md:py-24 ">
      <h1 className="uppercase text-center font-newsLetter text-[#8F8F8F] macbook:text-[48px] text-[17px] md:w-full md:text-[34px] font-semibold mb-8">
        {heading ? heading : "أحدث المشاريع"}
      </h1>
      {/* Tab Section */}
      <div className="flex justify-center mb-6 space-x-2">
        {pStatus.slice(0, 1).map((tab) => (
          <button
            key={tab}
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

      {/* Search Section */}
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
                className="py-2 px-1 rounded-md text-gray-500 font-montserrat text-[8px] md:text-[10px] w-[100px] md:w-[180px] focus:outline-none"
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
              {isOpenLocation && (
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
                {filter?.selectedProperty?.name || "اختر نوع العقار"}
              </p>
              {/* Dropdown Menu */}

              {isOpenProperty && (
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
              يبحث
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

      {/* Modal for Advanced Filter */}
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
      />

      <div className="w-[100%] mt-32 pt24 md:pt-0 flex justify-center flex-col items-center">
        {/* Property Cards */}
        {properties.length === 0 ? (
          <p className="text-center text-[25px] font-montserrat w-full flex justify-center text-gray-500">
            لا يوجد عقار متاح
          </p>
        ) : (
          ""
        )}
        <div className="w-full flex justify-center">
          <div
            className={`grid ${
              properties.length === 1 ? "grid-cols-1" : "grid-cols-1"
            } md:grid-cols-3 macbook:grid-cols4 gap-[10px] md:gap-[20px] macbook:[30px]    mb-8 mt-8`}
          >
            {properties.slice(0, visibleProperties).map((property, index) => (
              <div
                key={index}
                className={`bg-white w-[300px] h-[370px] md:h-auto md:w-[300px] border-[1px] border-[#0B0B0B] px-[10px] rounded-[13px] overflow-hidden flex flex-col items-center ${
                  index === 4 || index === 5
                    ? "hidden md:hidden macbook:flex"
                    : ""
                }`}
              >
                {property.meadias?.length > 0 ? (
                  property.meadias.map((media, mediaIndex) => {
                    let mainImage;
                    try {
                      mainImage = JSON.parse(media.main_image)?.[0];
                    } catch {
                      mainImage = null;
                    }

                    return mainImage ? (
                      <img
                        key={mediaIndex}
                        src={`${Image_Url}${mainImage}`}
                        alt={property.property_name}
                        className={`m-2 w-full h-44 macbook:h-44 object-cover ${
                          mediaIndex === 0
                            ? "rounded-bl-[34px] md:rounded-bl-[74px]"
                            : mediaIndex === property.meadias.length - 1
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
                        className={`m-2 w-full h-44 macbook:h-44 object-cover ${
                          mediaIndex === 0
                            ? "rounded-bl-[34px] md:rounded-bl-[74px]"
                            : mediaIndex === property.meadias.length - 1
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
                    className="m-2 w-full h-44 macbook:h-44 object-cover rounded-bl-[34px] md:rounded-bl-[74px] "
                  />
                )}

                <div className="flex flex-col items-center justify-between min-h-[170px] md:min-h-[210px] w-full md:p-[10px] pt-[0px]">
                  <h3 className="text-[16px] font-montserrat  md:text-[17px] macbook:text[28px] text-center font-semibold mb-1 md:mb-2 text-[#8F8F8F]">
                    {`${property?.property_name.substring(0, 25)}..`}
                  </h3>
                  <div className="text-gray-500 text-[11px] flex flex-col items-center mb-2 md:mb-4">
                    <p className="text-[16px] font-montserrat md:text-[15px] macbook:text[25px]">
                      ابتداء من
                    </p>
                    <p className="flex gap-1 text-[14px] text-center font-montserrat md:text-[18px] macbook:text[30px] font-bold text-[#8F8F8F]">
                      <img src="/dirham.PNG" className="w-4 h-3.5 mt-0.5 md:mt-1.5" />{" "}
                      {property?.starting_price}
                    </p>
                  </div>

                  <div className="min-h-6 flex flex-col md:flex-row justify-center items-center md:justify-evenly mt2 mb-2 md:w-[100%] text-sm text-gray-500">
                    <div className="flex items-center gap-2 pr-[10px] md:border-r md:border-gray-300">
                      <img
                        src="/bed.png"
                        alt="bed icon"
                        className="w-[8.9px] md:w-[16px] macbook:w[25px]"
                      />
                      <span className="text-[10px] md:text-xs font-montserrat macbook:text[20px]">
                        {property?.no_of_bedrooms}
                      </span>
                    </div>
                    <div className="flex items-center ml-[5px] gap-2">
                      <img
                        src="/feet.png"
                        alt="sqft icon"
                        className="w-[8.9px] md:w-[16px] macbook:w[30px]"
                      />
                      <span className="text-[10px] font-montserrat md:text-xs macbook:text[20px]">
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

        {/* Load More Button */}
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
