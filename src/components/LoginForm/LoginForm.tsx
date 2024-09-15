"use client"

import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { LoginFormData } from "./types";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import Link from "next/link";
import { FaApple, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { useSignInWithEmailAndPassword, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "@/services/firebase.config";

import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export const LoginForm = () => {
  const { handleSubmit, register, formState: { errors } } = useForm<LoginFormData>();
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const { toast } = useToast();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);


  // Login com o Google
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      if (result?.user) {
        const idToken = await result.user.getIdToken();
        Cookies.set("auth-token", idToken, { expires: 7 });
        router.push("/feed");
        toast({
          title: "Login bem-sucedido com o Google!",
        });
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
      toast({
        variant: "destructive",
        title: "Erro ao fazer login com Google",
        description: "Tente novamente mais tarde.",
      });
    }
  }

  // Login com Email e Senha
  const onSubmit: SubmitHandler<LoginFormData> = async (data: LoginFormData) => {
    try {
      const res = await signInWithEmailAndPassword(data.email, data.password);
      if (res?.user) {
        const idToken = await res.user.getIdToken();
        Cookies.set("auth-token", idToken, { expires: 7 });
        router.push("/feed");
        toast({
          title: "Login bem-sucedido!",
        })
      } else {
        toast({
          variant: "destructive",
          title: "Falha ao fazer login",
          description: "Verifique suas credenciais e tente novamente.",
        })
      }
    } catch (error) {
      console.error(error);
    }
  }

  const onError: SubmitErrorHandler<LoginFormData> = (errors) => {
    console.error(errors)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className="grid">
      <h1 className="text-4xl mx-auto font-bold">Login</h1>
      <p className="text-lg mt-2 mb-8 flex justify-center items-center flex-wrap gap-x-1">
        <span className="opacity-60">Não possui uma conta? </span>
        <Link href="/register" className="opacity-60 text-sky-600 w-fit lg:hover:opacity-100" title="cadastre-se">Cadastre-se aqui!</Link>
      </p>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" {...register("email", { required: "Preencha o campo E-Mail" })} type="email" placeholder="Digitei seu E-mail" />
          <p className="error--message">
            {errors.email && errors.email.message}
          </p>
        </div>
        <div className="grid gap-2 relative"> {/* Adiciona relative para posicionar o ícone */}
          <Link
            href="/forgot-password"
            className="ml-auto text-sm underline"
          >
            Esqueceu a senha?
          </Link>
          <Label htmlFor="password">Password</Label>
          <div className="flex items-center">
            <Input
              id="password"
              {...register("password", { required: "Preencha o campo de Senha" })}
              type={showPassword ? "text" : "password"}
              placeholder="Digite sua Senha"
              className="flex-1 pr-9"
            />
            <button
              type="button"
              className="absolute right-3" // Posiciona o ícone dentro do Input
              onClick={() => setShowPassword(prev => !prev)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <p className="error--message">{errors.password && errors.password.message}</p>
        </div>
      </div>
      <Button size="lg" className="mt-10 font-semibold bg-cyan-500 hover:bg-cyan-700 transition duration-200 text-xl">Entrar</Button>
      <div className="mt-10">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-x-5">
          <hr />
          <p >ou continue com</p>
          <hr />
        </div>
        <div className="grid grid-flow-col items-center flex-wrap gap-x-4 mt-5">
          <Button size="lg" variant="secondary" className="py-8 group"><FaFacebook color="blue" className="lg:group-hover:size-9" size="28" /></Button>
          <Button
            type="button"
            size="lg"
            variant="secondary"
            className="py-8 group"
            onClick={() => handleGoogleSignIn()}
          >
            <FcGoogle size="28" className="lg:group-hover:size-9" />
          </Button>
          <Button size="lg" variant="secondary" className="py-8 group"><FaApple size="28" className="lg:group-hover:size-9" /></Button>
        </div>
      </div>
    </form>
  )
}