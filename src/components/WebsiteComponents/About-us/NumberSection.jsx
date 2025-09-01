const NumberSection = () => {
  const numbers = [
    {
      title: "نبيع عقارات بقيمة تزيد عن 2 مليار درهم إماراتي سنويًا",
      num: "2 مليار درهم إماراتي+",
    },
    {
      title: "لدينا أكثر من 120 من الوكلاء العقاريين ومحترفي التسويق",
      num: "أكثر من 100",
    },
    {
      title: "نحن نعمل في مجال العقارات منذ عام 2013",
      num: "15 سنة",
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