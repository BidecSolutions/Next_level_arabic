"use client";

import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
// import PriceRangeFilter from "../PriceRangeFilter/PriceRangeFilter";
// import FeatureProperties from "../FeatureProperties/FeatureProperties";
import Link from "next/link";
import { Image_NotFound, Image_URL } from "@/config/constants";

import { getPropertyStatuses } from "@/lib/api/communities.server";
import { getAgentPropertyList } from "@/lib/api/agent.server";
import PriceRangeFilter from "./PriceRangeFilter";
import FeatureProperties from "./FeatureProperties";
// import { getPropertyStatuses, getAgentPropertyList } from "@/utils/property";

const PropertyListing = ({ agentId }) => {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(50000000);
  const [minPrice, setMinPrice] = useState(min);
  const [maxPrice, setMaxPrice] = useState(max);
  const [sortBy, setSortBy] = useState(null);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  const [propertyStatuses, setPropertyStatuses] = useState([]);
  const [properties, setProperties] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [visibleCards, setVisibleCards] = useState(8);

  // Property Statuses
  useEffect(() => {
    const fetchStatuses = async () => {
      const data = await getPropertyStatuses();
      setPropertyStatuses(data);
    };
    fetchStatuses();
  }, []);

  // Property list (based on filters)
  useEffect(() => {
    const fetchProperties = async () => {
      if (!agentId) return;

      const data = await getAgentPropertyList({
        agent_id: agentId,
        from_amount: minPrice,
        to_amount: maxPrice,
        property_status: selectedStatuses.join(","),
        sort_by: sortBy,
      });

      const filtered = data.filter((p) => p.status === 1);
      setProperties(filtered);
    };

    fetchProperties();
  }, [agentId, minPrice, maxPrice, selectedStatuses, sortBy]);

  const toggleFilterMenu = () => setIsFilterMenuOpen(!isFilterMenuOpen);

  const handleStatusChange = (id) => {
    setSelectedStatuses((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleLoadMore = () => setVisibleCards((prev) => prev + 18);

  return (
    <div className="flex justify-center">
      {/* Filters */}
      {isFilterMenuOpen && (
        <div className="fixed top-0 left-0 w-3/4 h-full bg-white shadow-lg z-50 p-4 overflow-y-auto lg:hidden">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Filters</h2>
            <button onClick={toggleFilterMenu}>
              <RxCross2 />
            </button>
          </div>
          <h2 className="text-lg font-semibold mb-2">Select Price Range</h2>
          <PriceRangeFilter />
        </div>
      )}

      {/* Main Layout */}
      <div className="w-full flex justify-center">
        <div className="border-b border-[#555555] macbook:w-[90%] grid grid-cols-1 lg:grid-cols-4 md:gap-8 pb-8">
          {/* Left Column */}
          <div className="py-4 w-full flex flex-col gap-2 items-center rounded-lg">
            <div className="hidden md:flex flex-col gap-[20px] w-full">
              <h2 className="text-[24px] font-semibold text-[#6B6B6B]">Select Price Range</h2>
              <PriceRangeFilter
                setMinPrice={setMinPrice}
                setMaxPrice={setMaxPrice}
                minPrice={minPrice}
                maxPrice={maxPrice}
                min={min}
                max={max}
              />

              <h2 className="text-[24px] font-semibold text-[#6B6B6B]">Status of Property</h2>
              <div className="flex flex-col gap-[10px] p-4 border border-[#555555] rounded-[10px]">
                {propertyStatuses.map((status) => (
                  <div key={status.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-[10px]">
                      <input
                        type="checkbox"
                        checked={selectedStatuses.includes(status.id)}
                        onChange={() => handleStatusChange(status.id)}
                      />
                      <h3 className="text-[#6B6B6B]">{status.name}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              className="block md:hidden w-[100px] bg-[#8F8F8F] text-white rounded-[5px]"
              onClick={toggleFilterMenu}
            >
              Filter
            </button>

            {/* Featured */}
            <div className="w-full">
              <h2 className="text-[24px] font-semibold text-[#6B6B6B]">Featured Properties</h2>
              <FeatureProperties agentDetails={ agentId} />
            </div>
          </div>

          {/* Right Column */}
          <div className="col-span-3">
            <h2 className="text-[18px] font-semibold text-[#6B6B6B]">
              Search Result's: <span>{properties.length} Listings</span>
            </h2>

            <select
              value={sortBy ?? ""}
              onChange={(e) => setSortBy(Number(e.target.value))}
              className="p-2 rounded-md"
            >
              <option value={null}>Sort By: All</option>
              <option value={2}>Des to Asc</option>
              <option value={1}>Asc to Des</option>
            </select>

            {/* Property Cards */}
             <div className="w-full flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-3 macbook:grid-cols-3 gap-[20px] mt-8">
            {properties
              ?.slice(0, visibleCards) // Restrict cards to the first 6 for larger screens
              .map((property, index) => (
                <div
                  key={index}
                  className={`bg-white w-[300px] h-[370px] md:w-[300px] md:h-auto border-[1px] border-[#0B0B0B] px-[10px] rounded-[13px] overflow-hidden flex flex-col  items-center   ${index === 4 || index === 5
                    ? "hidden md:hidden macbook:flex"
                    : ""
                    }`}
                >
                  <img
                    src={(() => {
                      try {
                        // Check if `main_image` is a valid JSON string, then parse it
                        return `${Image_URL}${JSON.parse(property?.meadias[0].main_image)}`;
                      } catch (e) {
                        // If parsing fails, fallback to a default image or an empty string
                        return property?.main_image || '/default-image.png';
                      }
                    })()}
                    alt={property?.title}
                    className={`m-2 w-full h-44 md:48 object-cover`}
                    onError={(e) => {
                      e.currentTarget.src = Image_NotFound; // Path to your dummy image
                    }}
                  />

                  <div className="flex flex-col items-center justify-between min-h-[170px] md:min-h-[210px] w-full md:p-[10px] pt-[0px]">
                    <h3 className="text-[16px] md:text-[17px] macbook:text[28px]  text-center font-semibold mb-1 md:mb-2 text-[#8F8F8F]">
                      {`${property.property_name.substring(0, 25)}..`}
                    </h3>
                    <div className="text-gray-500 text-[11px] flex flex-col items-center mb-2 md:mb-4">
                      <p className="text-[16px] md:text-[15px] macbook:text[25px]  ">
                      Starting From
                      </p>
                      <p className="flex gap-1 text-[14px] md:text-[14px] macbook:text[30px] font-bold text-[#8F8F8F]">
                         <img src='/dirham.PNG' className="w-3 h-3 mt-1"/> {property?.starting_price}
                      </p>
                    </div>

                    <div className="flex flex-col md:flex-row justify-center items-center md:justify-evenly mt2 mb-2 md:w-[80%] text-sm text-gray-500  ">
                      <div className="flex items-center gap-2 pr-[10px] md:border-r md:border-gray-300">
                        <img
                          src="/bed.png"
                          alt="bed icon"
                          className="w-[8.9px] md:w-[16px]  macbook:w[25px]  "
                        />
                        <span className="text-[10px] md:text-xs  macbook:text[28px] ">
                          Beds {property?.no_of_bathrooms}
                        </span>
                      </div>
                      <div className="flex items-center ml-[5px] gap-2">
                        <img
                          src="/feet.png"
                          alt="sqft icon"
                          className="w-[8.9px] md:w-[16px]  macbook:w[30px]"
                        />
                        <span className="text-[10px] md:text-xs  macbook:text[28px] ">
                          {property?.land_area}  
                        </span>
                      </div>
                    </div>
                    <Link href={`/property/${property?.slug}`}>
                      <button className="w-[200px] md:w-[202px] text-[11px] macbook:text[18px] my-1 py-1 bg-[#8F8F8F] text-white rounded-[5px] hover:bg-gray-500">
                        View more detail
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
          </div>

            {visibleCards < properties.length && (
              <div className="text-center mt-4">
                <button
                  onClick={handleLoadMore}
                  className="px-4 py-2 bg-[#8F8F8F] text-white rounded-[5px]"
                >
                  Load More
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyListing;
