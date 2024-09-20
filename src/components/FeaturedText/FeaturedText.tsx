import Image from "next/image";
import { FeaturedTextData } from "./types";

export const FeaturedText = ({ title, description, imageSrc }: FeaturedTextData) => {
  return (
    <section className="relative ">
      <Image width={1440} height={720} className="w-full h-[720px] object-cover object-center" src={imageSrc} alt="Imagem" />
      <div className="w-full h-full absolute top-0 left-0 bg-opacity-60 bg-sky-900">

      </div>
      <div className="max-w-6xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-gray-50">
        <h2 className="text-5xl font-bold mb-4 lg:text-6xl">{title}</h2>
        <p className="text-xl font-medium lg:text-2xl">{description}</p>
      </div>
    </section>
  );
};
