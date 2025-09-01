import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen">
      <div className="flex justify-center text-white">
        <div
          className="relative h-[34rem] md:h-[600px] w-[90%] md:w-[95%] md:pt-[140px] bg-cover bg-center rounded-bl-[50px] rounded-br-[50px] md:rounded-bl-[90px] gap-[10px] md:rounded-br-[90px] flex flex-col items-center justify-center"
          style={{
            backgroundImage: "url('/Areas/banner.png')",
          }}
        >
          <h1 className="text-2xl md:text-5xl text-center font-bold uppercase">
            عذرًا! هذه الصفحة أفلتت
          </h1>
        </div>
      </div>

      <div className="w-full flex flex-col justify-center items-center gap-4 py-20">
        <Image
          src="/NotFound.PNG"
          alt="Not Found"
          width={500}
          height={500}
          priority
        />
        <p className="w-full lg:w-1/2 text-center text-2xl px-6 lg:px-0 py-2">
          يبدو أن العقار أو الصفحة التي تبحث عنها قد تم نقلها أو لم تعد موجودة. لكن لا تقلق، لدينا الكثير من الخيارات الرائعة لتستكشفها  </p>
        <Link
          href="/"
          className="text-white bg-[#8F8F8F] rounded-md py-3 px-4"
        >
         اذهب إلى الصفحة الرئيسية
        </Link>
      </div>
    </div>
  );
}
