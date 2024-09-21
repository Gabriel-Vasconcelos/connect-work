import { MarqueeData } from "./types";
import Marquee from "react-fast-marquee";

// Importando ícones de empresas do react-icons
import { SiCocacola, SiGoogle, SiApple, SiSamsung, SiAmazon, SiMicrosoft, SiTesla, SiNike, SiIbm, SiIntel, SiSpotify, SiUber, SiTiktok, SiOracle, SiAdobe } from "react-icons/si";
import { FaMeta, FaFacebookF, FaTwitter, FaAirbnb, FaPaypal, FaAmazon, FaLinkedin } from "react-icons/fa6";
import { RiNetflixFill } from "react-icons/ri";
import { FaSnapchatGhost } from "react-icons/fa";

export const FeaturedEnterprises = ({ direction }: MarqueeData) => {
  direction = direction || "right";

  return (
    <section className="bg-sky-500 py-5">
      <Marquee className="px-5 max-w-screen-2xl mx-auto w-full" direction={direction} speed={50} pauseOnHover={true}>
        <div className="flex  items-center space-x-8">
          <SiCocacola size={100} className="ml-8" />
          <FaMeta size={50} />
          <SiGoogle size={50} />
          <SiApple size={50} />
          <SiSamsung size={50} />
          <SiAmazon size={50} />
          <SiMicrosoft size={50} />
          <SiTesla size={50} />
          <SiNike size={50} />
          <FaFacebookF size={50} />
          <FaTwitter size={50} />
          <FaAirbnb size={50} />
          <FaPaypal size={50} />
          <FaLinkedin size={50} />
          <FaSnapchatGhost size={50} />
          <RiNetflixFill />
          <SiIbm size={50} />
          <SiIntel size={50} />
          <SiSpotify size={50} />
          <SiUber size={50} />
          <SiTiktok size={50} />
          <SiOracle size={50} />
          <SiAdobe size={50} />
        </div>
      </Marquee>
    </section>
  );
};
