import { LoginForm } from "@/components/LoginForm"
import Image from "next/image";

const LoginPage = () => {
  return (
    <main className="site--container grid grid-cols-2 gap-x-32 my-20">
      <section className="">
        <LoginForm />
      </section>
      <section>
        <div className="flex flex-col items-center justify-center gap-y-10 bg-sky-300 p-14 px-16 rounded-2xl">
          <Image src="/assets/Saly-10.png" alt="Imagem" width={423} height={423} className="" />
          <h2 className="heading--2 font-bold text-sky-950">Bem vindo de volta!</h2>
        </div>
      </section>
    </main>
  )
}

export default LoginPage;