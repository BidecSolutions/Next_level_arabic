"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
// import axios from "@/utils/axios"; // apna sahi path lagao
import { Image_NotFound, Image_URL } from "@/config/constants";
// import { Loader } from "@/components/WebsiteComponents/Loader/Loader";
// import { fetchExperienceLuxury } from "@/lib/api/home.server";
import { Loader } from "../Loader";
import { fetchExperienceLuxury } from "@/lib/api/home.server";

const PropertySection = () => {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       try {
//         const response = await axios.public.get(
//           "user/general-functions/experience-the-luxury"
//         );
//         const filteredProperties = response.data.data
//           .filter((property) => property.status === 1)
//           .slice(0, 4);

//         setProperties(filteredProperties);
//       } catch (error) {
//         console.log("Property Error: ", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchData();
//   }, [pathname]);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const { data } = await fetchExperienceLuxury();
      setProperties(data);
      console.log(data,"efrf")
      setIsLoading(false);
    };

    loadData();
  }, [pathname]);


  if (isLoading) return <Loader />;

  return (
    <div className="min-w-full md:my-20 flex justify-center flex-col items-center">
      <h2 className="text-center font-newsLetter text-[#8F8F8F] macbook:text-[48px] text-[18px] w-[296px] md:w-full md:text-[34px] font-semibold md:mb-8">
        Experience luxury off-plan properties for sale
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 macbook:grid-cols-3 gap-[20px] md:gap-[20px] mb-4 md:mb-8 mt-8">
        {properties?.map((property, index) => (
          <div
            key={index}
            className={`bg-white w-[300px] h-[370px] md:h-auto md:w-[300px] border border-[#0B0B0B] px-[10px] rounded-[13px] overflow-hidden flex flex-col items-center ${
              index === 3 || index === 5 ? "md:hidden" : ""
            }`}
          >
            <Image
              src={
                property?.meadias?.[0]?.main_image
                  ? `${Image_URL}/${JSON.parse(property.meadias[0].main_image)[0]}`
                  : "/home/p2.png"
              }
              alt={property?.property_name || "Property"}
              width={300}
              height={200}
              className={`m-2 w-full h-44 md:h-48 object-cover ${
                index === 0
                  ? "md:rounded-bl-[74px]"
                  : index === 2
                  ? "md:rounded-br-[74px]"
                  : ""
              }`}
              onError={(e) => {
                e.currentTarget.src = Image_NotFound;
              }}
            />
            <div className="flex flex-col justify-between items-center min-h-[170px] md:min-h-[210px] w-full md:p-[10px] pt-[0px]">
              <h3 className="text-[18px] font-montserrat md:text-[17px] macbook:text[28px] text-center font-semibold mb-1 md:mb-2 text-[#8F8F8F]">
                {property?.property_name?.substring(0, 25)}
              </h3>

              <div className="text-gray-500 text-[11px] flex flex-col items-center mb-2 md:mb-4">
                <p className="text-[16px] font-montserrat md:text-[15px] macbook:text[25px]">
                  Starting From
                </p>
                <p className="flex gap-1 text-[14px] font-montserrat md:text-[18px] macbook:text[30px] font-bold text-[#8F8F8F]">
                  {property?.starting_price}
                  <Image src="/dirham.PNG" alt="AED" width={16} height={14} className="mt-1.5 w-4 h-3.5"/>
                </p>
              </div>

              <div className="flex flex-col md:flex-row justify-center items-center md:gap-1 mt-2 mb-2 w-full md:w-[80%] text-sm text-gray-500">
                <div className="flex items-center gap-2 pr-[10px] md:border-r md:border-gray-300">
                  <Image
                    src="/bed.png"
                    alt="bed icon"
                    width={16}
                    height={16}
                  />
                  <span className="text-[10px] font-montserrat md:text-xs macbook:text[20px]">
                    {property?.no_of_bedrooms}
                  </span>
                </div>
                <div className="flex items-center ml-[5px] gap-2">
                  <Image
                    src="/feet.png"
                    alt="sqft icon"
                    width={16}
                    height={16}
                  />
                  <span className="text-[10px] font-montserrat md:text-xs macbook:text[20px]">
                    {property?.land_area}
                  </span>
                </div>
              </div>

              <div
                onClick={() =>
                  router.push(
                    `/property/${property.slug}?url=user/properties/property_detail_using_slug`
                  )
                }
              >
                <button className="w-[200px] md:w-[202px] text-[11px] macbook:text[18px] my-1 py-1 bg-[#8F8F8F] text-white rounded-[5px] hover:bg-transparent border hover:border-[#8F8F8F] hover:text-[#8F8F8F]">
                  View more detail
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-[20px]">
        <Link href="/off-plan">
          <button className="mt4 md:mt-0 px-4 py-1 macbook:text-[19px] macbook:px-8 macbook:py-2 text-[16px] bg-[#616161B5] text-white hover:bg-transparent border hover:border-[#8F8F8F] hover:text-[#8F8F8F] rounded-[8px]">
            See All Properties
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PropertySection;
