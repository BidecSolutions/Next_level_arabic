const ServicesSection = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row items-center gap-[40px] justify-center w-full my-10 md:my-20 ">
      {/* Left Side - Heading, Description, and Services */}
      <div className="md:w-[40%]   flex flex-col justify-center">
        {/* Heading and Description */}
        <div className="mb-8">
          <h2 className="text-3xl font-montserrat text-center md:text-start font-semibold text-[#8F8F8F]">
            اكتشف خدماتنا العقارية المتميزة
          </h2>
          <p className="mt-2 text-[#555555]  font-montserrat text-center md:text-start  md:w-[80%] ">
            اكتشف خدماتنا العقارية المتخصصة، المصممة خصيصًا لمساعدتك في العثور على العقار المثالي بسهولة وثقة.
          </p>
        </div>

        {/* Service Icons and Descriptions */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
          {/* Service 1 */}
          <div className="flex flex-col items-center md:items-start gap-[10px] ">
            <img src="/about/icon1.png" alt="Icon 1" className="w-10 h-10" />
            <div className="flex flex-col items-center md:items-start gap-[5px] ">
              <h4 className=" text-[15px] font-montserrat md:text-xl text-center  md:text-start font-semibold text-[#555555]  ">
                شراء
              </h4>
              <p className="mt-1 text-[12px] md:text-[13px] font-montserrat text-center md:text-start text-[#555555]">
                اعثر على منزلك المثالي مع إرشادات خبرائنا، لضمان عملية شراء سلسة تناسب تفضيلاتك.

              </p>
            </div>
          </div>

          {/* Service 2 */}
          <div className="flex flex-col items-center md:items-start gap-[10px] ">
            <img src="/about/icon2.png" alt="Icon 2" className="w-10 h-10" />
            <div className="flex flex-col items-center md:items-start gap-[5px] ">
              <h4 className=" text-[15px] md:text-xl font-montserrat text-center  md:text-start font-semibold text-[#555555]  ">
                بيع
              </h4>
              <p className="mt-1 text-[13px] font-montserrat  text-center md:text-start text-[#555555]">
                قم بتعزيز قيمة ممتلكاتك من خلال التسويق الاستراتيجي وشبكتنا الواسعة، مما يضمن بيعًا سريعًا ومربحًا.
              </p>
            </div>
          </div>

          {/* Service 3 */}
          <div className="flex flex-col items-center md:items-start gap-[10px] ">
            <img src="/about/icon3.png" alt="Icon 3" className="w-10 h-10" />
            <div className="flex flex-col items-center md:items-start gap-[5px] ">
              <h4 className=" text-[18px] font-montserrat md:text-xl text-center  md:text-start font-semibold text-[#555555]  ">
                تأجير
              </h4>
              <p className="mt-1 text-[13px]   font-montserrat text-center md:text-start text-[#555555]">
                اكتشف أفضل خيارات الإيجار أو اجتذب المستأجرين المثاليين، بفضل دعمنا الشامل ومعرفتنا بالسوق.
              </p>
            </div>
          </div>

          {/* Service 4 */}
          <div className="flex flex-col items-center md:items-start gap-[10px] ">
            <img src="/about/icon1.png" alt="Icon 4" className="w-10 h-10" />
            <div className="flex flex-col items-center md:items-start gap-[5px] ">
              <h4 className=" text-[18px] font-montserrat md:text-xl text-center  md:text-start font-semibold text-[#555555]  ">
                إدارة الممتلكات
              </h4>
              <p className="mt-1 text-[13px] font-montserrat text-center md:text-start text-[#555555]">
                استمتع بإدارة ممتلكاتك دون أي متاعب بفضل خبرتنا الواسعة في التعامل مع جميع الجوانب، بدءًا من الصيانة وحتى علاقات المستأجرين.
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