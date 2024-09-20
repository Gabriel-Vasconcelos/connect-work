import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";

export const Hero = () => {
  return (
    <section className="max-xl:text-center max-xl:mt-10 grid gap-x-10 items-center xl:grid-cols-2">
      <div className="max-xl:items-center site--container flex flex-col">
        <h1 className="max-xl:items-center flex flex-col justify-center text-5xl font-bold -translate-x-2 lg:text-8xl">
          <span className="text-sky-600">Conecte.</span>
          <span className="text-sky-600">Simplifique.</span>
          <span className="text-sky-950">Cresça.</span>
        </h1>
        <p className="mt-10 text-lg max-w-[450px] lg:text-xl">
          Conecte-se ao futuro dos negócios com a <span className="text-sky-600">Connect Work</span>. Encontre parcerias valiosas e serviços com facilidade.
        </p>
        <Link className="w-full" href="/register" title="Cadastre-se">
          <Button size="lg" className="mt-6 w-full max-w-72 text-2xl py-7 bg-cyan-500 hover:bg-cyan-700 transition duration-200">
            Cadastre-se agora!
          </Button>
        </Link>
      </div>

      <div>
        <Image className="max-xl:hidden w-full h-screen object-cover" alt="Hero Image" src="/assets/hero-image.png" width="1000" height="1753" />
      </div>
    </section>
  )
}
