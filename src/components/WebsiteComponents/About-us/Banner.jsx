export const Banner = () => {
  return (
    <div className="flex justify-center text-white">
      <div
        className="relative h-[34rem] md:h-[600px] w-[90%] md:w-[95%] md:pt-[140px] bg-cover bg-center rounded-bl-[50px] rounded-br-[50px]  md:rounded-bl-[90px] gap-[10px] md:rounded-br-[90px] flex flex-col items-center justify-center"
        style={{
          backgroundImage: "url('/Areas/banner.png')",
        }}
      >
        <h1 className="text-5xl md:text-5xl font-newsLetter  ">معلومات عنا</h1>
        <p className="text-2xl md:text-xl font-newsLetter ">بيت \ معلومات عنا  </p>
      </div>
    </div>
  );
};