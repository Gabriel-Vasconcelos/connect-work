import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";

export const Hero = () => {
  return (
    <section className="max-xl:text-center grid gap-x-10 items-center xl:grid-cols-2">
      <div className="max-xl:items-center site--container flex flex-col">
        <h1 className="max-xl:items-center flex flex-col justify-center text-8xl font-bold -translate-x-2">
          <span className="text-sky-600">Conecte.</span>
          <span className="text-sky-600">Simplifique.</span>
          <span className="text-sky-950">Cresça.</span>
        </h1>
        <p className="mt-10 text-xl max-w-[450px]">
          Na <span className="text-sky-600">Connect Work</span>,
          nossa missão é conectar empresas e simplificar a busca por serviços, criando um ecossistema eficiente e confiável que impulsiona parcerias valiosas e duradouras.</p>
        <Link className="w-full" href="/register" title="Cadastre-se"><Button size="lg" className="mt-6 w-full max-w-72 text-2xl py-7 bg-cyan-500 hover:bg-cyan-700 transition duration-200">Cadastrar</Button></Link>
      </div>

      <div>
        <Image className="max-xl:hidden w-full h-screen object-cover" alt="Hero Image" src="/assets/hero-image.png" width="1000" height="1753" />
      </div>
    </section>
  )
}
