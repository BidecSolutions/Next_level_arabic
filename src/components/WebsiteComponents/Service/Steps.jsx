import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import SwiperCore from "swiper";

export const Steps = ({ propData }) => {
  const [data, setData] = useState(null);

  SwiperCore.use([Autoplay]);

  useEffect(() => {
    if (propData) {
      setData(propData);
    }
  }, [propData]);

  return (
    <div className="h-[60rem] md:h-[27rem]">
      <div
        className="bg-cover rounded-t-[70px] md:rounded-t-[150px] macbook:rounded-t-[250px] relative h-[600px] md:h-[300px]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("/Areas/Best_Property.png")',
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top",
        }}
      >
        <div className="flex flex-col w-full md:flex-row items-center absolute -bottom-[300px] md:-bottom-[100px] justify-center gap-[10px] md:gap-[20px]">
          
          {/* Step 01 */}
          <StepCard
            stepNumber="01"
            heading={data?.find_the_right_tenant_heading || "Find the Right Tenant"}
            details={data?.find_the_right_tenant_details}
          />

          {/* Step 02 */}
          <StepCard
            stepNumber="02"
            heading={data?.complete_property_inspection_heading}
            details={data?.complete_property_inspection_details}
          />

          {/* Step 03 */}
          <StepCard
            stepNumber="03"
            heading={data?.peace_of_mind_heading}
            details={data?.peace_of_mind_details}
          />
        </div>
      </div>
    </div>
  );
};

const StepCard = ({ stepNumber, heading, details }) => {
  return (
    <div className="w-[90%] md:w-[28%]">
      <p className="text-white font-newsLetter font-bold text-[20px] text-center mb-4">
        {heading?.substring(0, 30)}
      </p>
      <div className="bg-white py-5 border border-black px-[5px] rounded-[13px] overflow-hidden flex flex-col items-center">
        <div className="flex items-center w-full mb-8 justify-between">
          <hr className="bg-[#8F8F8F] h-[3px] w-[30%]" />
          <div className="text-[24px] font-montserrat font-bold text-[#8F8F8F]">
            Step {stepNumber}
          </div>
          <hr className="bg-[#8F8F8F] h-[3px] w-[30%]" />
        </div>
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={10}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop
          slidesPerView={1}
          className="w-full"
        >
          {details
            ? JSON.parse(details).map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="p-4 text-center">
                    <p
                      className="text-[11px] font-montserrat text-center md:text-[14px] font-semibold mb-1 md:mb-2 text-[#8F8F8F]"
                      dangerouslySetInnerHTML={{
                        __html: item.description.substring(0, 180),
                      }}
                    ></p>
                  </div>
                </SwiperSlide>
              ))
            : "Lorem Ipsum is simply dummy text of the printing and typesetting industry."}
        </Swiper>
      </div>
    </div>
  );
};
