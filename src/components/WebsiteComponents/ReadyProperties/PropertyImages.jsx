import { useState } from "react";
import Image from "next/image";
import { Image_NotFound, Image_URL } from "@/config/constants";

export default function PropertyImages({ property }) {
  let images = [];

  try {
    if (Array.isArray(property.images)) {
      images = property.images;
    } else if (typeof property.images === "string") {
      images = JSON.parse(property.images);
    }
  } catch (err) {
    console.warn("Invalid images format:", property.images);
  }

  // ✅ first valid image
  const firstImage = images.find((img) => img?.path);

  const [src, setSrc] = useState(
    firstImage ? `${Image_URL}${firstImage.path}` : Image_NotFound
  );

  return (
    <Image
      src={src}
      alt={firstImage?.alt_name || property.name || "property"}
      width={500}
      height={300}
      className="m-2 w-full h-44 md:h-48 object-cover rounded-bl-[74px]"
      onError={() => setSrc(Image_NotFound)} // ✅ fallback
    />
  );
}
