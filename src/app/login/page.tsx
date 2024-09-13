import { LoginForm } from "@/components/LoginForm"
import Image from "next/image";

const LoginPage = () => {
  return (
    <main className="grid gap-x-24 my-20 lg:grid-cols-2 md:px-20 px-10">
      <section className="">
        <LoginForm />
      </section>
      <section>
        <div className="max-lg:hidden flex flex-col items-center justify-center gap-y-10 bg-sky-300 p-14 px-16 rounded-2xl">
          <Image src="/assets/Saly-10.png" alt="Imagem" width={423} height={423} className="" />
          <h2 className="heading--2 font-bold text-sky-950 text-center">Bem vindo de volta!</h2>
        </div>
      </section>
    </main>
  )
}

export default LoginPage;