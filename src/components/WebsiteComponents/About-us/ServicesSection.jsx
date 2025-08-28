const ServicesSection = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row items-center gap-[40px] justify-center w-full my-10 md:my-20 ">
      {/* Left Side - Heading, Description, and Services */}
      <div className="md:w-[40%]   flex flex-col justify-center">
        {/* Heading and Description */}
        <div className="mb-8">
          <h2 className="text-3xl font-montserrat text-center md:text-start font-semibold text-[#8F8F8F]">
          Explore Our Premier Real Estate Services
          </h2>
          <p className="mt-2 text-[#555555]  font-montserrat text-center md:text-start  md:w-[80%] ">
            Discover our expert real estate services, tailored to help you find
            the perfect property with ease and confidence.
          </p>
        </div>

        {/* Service Icons and Descriptions */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
          {/* Service 1 */}
          <div className="flex flex-col items-center md:items-start gap-[10px] ">
            <img src="/about/icon1.png" alt="Icon 1" className="w-10 h-10" />
            <div className="flex flex-col items-center md:items-start gap-[5px] ">
              <h4 className=" text-[15px] font-montserrat md:text-xl text-center  md:text-start font-semibold text-[#555555]  ">
              Buying
              </h4>
              <p className="mt-1 text-[12px] md:text-[13px] font-montserrat text-center md:text-start text-[#555555]">
              Find your perfect home with our expert guidance, ensuring a smooth buying process tailored to your
preferences.

              </p>
            </div>
          </div>

          {/* Service 2 */}
          <div className="flex flex-col items-center md:items-start gap-[10px] ">
            <img src="/about/icon2.png" alt="Icon 2" className="w-10 h-10" />
            <div className="flex flex-col items-center md:items-start gap-[5px] ">
              <h4 className=" text-[15px] md:text-xl font-montserrat text-center  md:text-start font-semibold text-[#555555]  ">
              Selling
              </h4>
              <p className="mt-1 text-[13px] font-montserrat  text-center md:text-start text-[#555555]">
              Maximize your property's value with our strategic marketing and extensive network, ensuring a swift
              and profitable sale.
              </p>
            </div>
          </div>

          {/* Service 3 */}
          <div className="flex flex-col items-center md:items-start gap-[10px] ">
            <img src="/about/icon3.png" alt="Icon 3" className="w-10 h-10" />
            <div className="flex flex-col items-center md:items-start gap-[5px] ">
              <h4 className=" text-[18px] font-montserrat md:text-xl text-center  md:text-start font-semibold text-[#555555]  ">
              Renting
              </h4>
              <p className="mt-1 text-[13px]   font-montserrat text-center md:text-start text-[#555555]">
              Explore top rental options or attract ideal tenants, facilitated by our comprehensive support and market
knowledge.
              </p>
            </div>
          </div>

          {/* Service 4 */}
          <div className="flex flex-col items-center md:items-start gap-[10px] ">
            <img src="/about/icon1.png" alt="Icon 4" className="w-10 h-10" />
            <div className="flex flex-col items-center md:items-start gap-[5px] ">
              <h4 className=" text-[18px] font-montserrat md:text-xl text-center  md:text-start font-semibold text-[#555555]  ">
              Property Management
              </h4>
              <p className="mt-1 text-[13px] font-montserrat text-center md:text-start text-[#555555]">
              Experience hassle-free property management with our expert handling of all aspects, from maintenance
to tenant relations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className=" w-[300px]  md:w-[30%] ">
        <img
          src="/about/service.png"
          alt="Real Estate"
          className="w-full h[300px] md:h[400px] rounded-tl-[150px] shadow-lg"
        />
      </div>
    </div>
  );
};

export default ServicesSection;