import { LoginForm } from "@/components/LoginForm"
import Image from "next/image";

const LoginPage = () => {
  return (
    <main className="site--container grid gap-x-24 my-20 lg:grid-cols-2">
      <section className="">
        <LoginForm />
      </section>
      <section className="max-lg:hidden">
        <Image src="/assets/woman-relax.png" alt="Imagem" width={600} height={698} className="w-full h-full object-cover" />
      </section>
    </main>
  )
}

export default LoginPage;