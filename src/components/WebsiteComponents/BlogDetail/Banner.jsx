export const Banner = ({ title, image, status }) => {
  return (
    <div className="flex justify-center text-white">
      <div
        className={`relative h-[34rem] md:h-[450px] ${
          status === true ? "md:mt-32 md:w-[65%]" : "md:w-[95%]"
        } w-[90%]  md:pt-[140px] bg-cover bg-center rounded-bl-[50px] rounded-br-[50px]  md:rounded-bl-[90px] gap-[10px] md:rounded-br-[90px] flex flex-col items-center justify-center`}
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        {/* Black Overlay */}
        <div className="absolute inset-0 bg-black opacity-50 rounded-bl-[50px] rounded-br-[50px]  md:rounded-bl-[90px] md:rounded-br-[90px]"></div>
        {status === false ? (
          <h1 className="relative z-10 text-2xl md:text-5xl text-center font-newsLetter w-[90%] md:w-[70%] ">
            {title}
          </h1>
        ) : null}
      </div>
    </div>
  );
};

export default Banner;