"use client"

import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { LoginFormData } from "./types";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export const LoginForm = () => {
  const { handleSubmit, register, formState: { errors } } = useForm<LoginFormData>(
    {
      mode: "onSubmit"
    }
  );

  const onSubmit: SubmitHandler<LoginFormData> = (data: LoginFormData) => {

  }

  const onError: SubmitErrorHandler<LoginFormData> = (errors) => {

  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className="">
      <div>
        <Label>Email</Label>
        <Input {...register("email", { required: "Preencha o campo E-Mail" })} type="email" placeholder="Digitei seu E-mail" />
        {errors.email && (
          <span>{errors.email.message}</span>
        )}
      </div>
      <div>
        <Label>Password</Label>
        <Input {...register("password", { required: "Preencha o campo de Senha" })} type="password" placeholder="Digitei sua Senha" />
        {errors.password && (
          <span>{errors.password.message}</span>
        )}
      </div>
      <Button>Entrar</Button>
    </form>
  )
}