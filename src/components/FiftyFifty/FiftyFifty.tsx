import Image from "next/image";
import { FiftyFiftyData } from "./types";

export const FiftyFifty = ({ title, subtitle, description, imagePosition, image, ...props }: FiftyFiftyData) => {
  imagePosition || "right";

  return (
    <div className={`${props.className || ''}`}>
      <section className={`max-lg:flex-col flex justify-between items-center gap-10 pt-10 site--container w-full`}>
        <div className={`w-full max-w-xl ${imagePosition === "left" ? "order-2" : ""}`}>
          <h2 className="text-5xl font-bold">{title}</h2>
          {subtitle && (<h3 className="text-3xl mt-2 font-bold text-sky-600 uppercase">{subtitle}</h3>)}
          <p className="text-lg mt-4">{description}</p>
        </div>

        <div className="">
          <Image className="w-full" alt="Hero Image" src={image} width="388" height="537" />
        </div>
      </section>
    </div>
  )
}
