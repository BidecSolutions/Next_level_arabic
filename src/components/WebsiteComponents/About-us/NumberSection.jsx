const NumberSection = () => {
  const numbers = [
    {
      title: "We sell over AED 2 Billion worth of properties every year",
      num: "AED 2B+",
    },
    {
      title: "We have over 120 realtors and marketing professionals",
      num: "100+",
    },
    {
      title: "We have been in the real estate business since 2013",
      num: "15 Years+",
    },
  ];

  return (
    <div className=" flex justify-center w-full flex-wrap md:flex-nowrap gap-[15px] md:gap-[60px] my-10 md:my-20 ">
      {numbers.map((item, index) => (
        <div
          key={index}
          className={` flex flex-col items-center justify-center`}
        >
          <p className=" text-[#555555] font-montserrat text-[30px]  md:text-[32px] font-semibold ">
            {item.num}{" "}
          </p>
          <p className=" text-[13px] md:text-[16px] font-montserrat w-52 md:w-96 text-center ">
            {item.title}
          </p>
        </div>
      ))}
    </div>
  );
};

export default NumberSection;