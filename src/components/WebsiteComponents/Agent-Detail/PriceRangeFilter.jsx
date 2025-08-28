import React, { useCallback, useState } from "react";
import "./PriceRangeFilter.css";
import { debounce } from "lodash";

const PriceRangeFilter = ({  setMinPrice, setMaxPrice, minPrice, maxPrice, min, max  }) => {

  const debouncedSetMinPrice = useCallback(
    debounce((value) => setMinPrice(value), 300),
    []
  );
  const debouncedSetMaxPrice = useCallback(
    debounce((value) => setMaxPrice(value), 300),
    []
  );

  const handleMinPriceChange = (e) => {
    const value = Math.min(Number(e.target.value), maxPrice - 1);
    debouncedSetMinPrice(value);
  };

  const handleMaxPriceChange = (e) => {
    const value = Math.max(Number(e.target.value), minPrice + 1);
    debouncedSetMaxPrice(value);
  };

  return (
    <div className="border border-black p-2 macbook:px-4 rounded-[10px]">
      <section>
        {/* Price range display */}
        <div className="flex justify-center gap-[20px] py-3">
          <h1 className="text-[#555555] text-[18px]">AED {minPrice}</h1>-
          <h1 className="text-[#555555] text-[18px]">AED {maxPrice}</h1>
        </div>

        {/* Range slider */}
        <div className="relative mb-3 h-6">
          {/* Min price input */}
          <input
            type="range"
            min={min}
            max={max}
            value={minPrice}
            onChange={handleMinPriceChange}
            className="absolute w-full h-[2px] appearance-none slider-thumb-custom min-thumb"
            style={{ zIndex: minPrice > maxPrice ? 5 : 3 }}
          />

          {/* Max price input */}
          <input
            type="range"
            min={min}
            max={max}
            value={maxPrice}
            onChange={handleMaxPriceChange}
            className="absolute w-full h-[2px] appearance-none slider-thumb-custom max-thumb"
            style={{ zIndex: minPrice < maxPrice ? 5 : 3 }}
          />

          {/* Track for the range sliders */}
          <div className="absolute top-0 h-[2px] w-full bg-gray-300 rounded"></div>

          {/* Filled range between min and max */}
          <div
            className="absolute top-0 h-[2px] bg-[#555555] rounded"
            style={{
              left: `${((minPrice - min) / (max - min)) * 100}%`,
              right: `${100 - ((maxPrice - min) / (max - min)) * 100}%`,
            }}
          ></div>
        </div>
      </section>
    </div>
  );
};

export default PriceRangeFilter;