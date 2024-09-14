"use client";

import  Menu  from "@/components/Menu/Menu";
import Image from "next/image";
import { UserRound, Upload, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { RegisterFormData } from "./types";

export default function New() {

    const { handleSubmit, register, formState: { errors } } = useForm<RegisterFormData>();

    const [showPassword, setShowPassword] = useState(false);

    const onSubmit: SubmitHandler<RegisterFormData> = (data: RegisterFormData) => {
        // Handle form submission
    }

    const onError: SubmitErrorHandler<RegisterFormData> = (errors) => {
        // Handle errors
    }

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    }


    return (
        <>
            <Menu />

            <div className="pt-28 md:pt-6 md:ml-64 md:mt-0 p-6 bg-[#082F49] min-h-screen overflow-x-hidden">
                <div className="max-w-4xl mx-auto">
                    {/* Título com Ícone e Linha Centralizado */}
                    <div className="flex flex-col items-center mb-12 md:mt-8">
                        <div className="flex items-center mb-2">
                            <UserRound className="text-white mr-2" size={26} /> {/* Ícone ao lado do título */}
                            <h1 className="text-3xl font-bold text-white">
                                Editar Perfil
                            </h1>
                        </div>
                        {/* Linha abaixo do título */}
                        <div className="w-1/2 md:w-1/4 border-b-2 border-white"></div>
                    </div>

                    <div className="relative mt-10 w-44 h-44 mx-auto">
                        <Image src="/assets/Saly-10.png" alt="Imagem" width={180} height={180} className="block mx-auto shadow-[2px_3px_6px_#121212] rounded-full object-cover" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Upload className="text-white opacity-75 hover:opacity-100 cursor-pointer" size={40} />
                        </div>
                    </div>

                    {/* Inputs */}
                    <form onSubmit={handleSubmit(onSubmit, onError)} className="flex flex-col md:grid md:grid-cols-2 gap-5 gap-x-12 mb-4 mt-14">

                        <div>
                            <Label htmlFor="companyName" className="block text-sm font-medium text-white">Nome da Empresa</Label>
                            <Input id="companyName" {...register("companyName")} type="companyName" placeholder="Digite o nome da empresa" className="mt-1 p-2 rounded w-full" />
                            <p className="error--message mt-1">
                                {errors.companyName && errors.companyName.message}
                            </p>
                        </div>
                        <div>
                            <Label htmlFor="contact" className="block text-sm font-medium text-white">Contato</Label>
                            <Input id="contact" {...register("contact")} type="contact" placeholder="Forma de contato" className="mt-1 p-2 rounded w-full" />
                            <p className="error--message mt-1">
                                {errors.contact && errors.contact.message}
                            </p>
                        </div>
                        <div>
                            <Label htmlFor="city" className="block text-sm font-medium text-white">Cidade</Label>
                            <Input id="city" {...register("city")} type="city" placeholder="Cidade da sua empresa" className="mt-1 p-2 rounded w-full" />
                            <p className="error--message mt-1">
                                {errors.city && errors.city.message}
                            </p>
                        </div>
                        <div>
                            <Label htmlFor="state" className="block text-sm font-medium text-white">Estado</Label>
                            <Input id="state" {...register("state")} type="state" placeholder="Estado da sua empresa" className="mt-1 p-2 rounded w-full" />
                            <p className="error--message mt-1">
                                {errors.state && errors.state.message}
                            </p>
                        </div>
                        <div>
                            <Label htmlFor="email" className="block text-sm font-medium text-white">Email</Label>
                            <Input id="email" {...register("email")} type="email" placeholder="Digite seu novo email" className="mt-1 p-2 rounded w-full" />
                            <p className="error--message mt-1">
                                {errors.email && errors.email.message}
                            </p>
                        </div>
                        <div>
                            <Label htmlFor="password" className="block text-sm font-medium text-white">Senha</Label>
                            <div className="relative">
                                <Input id="password" {...register("password")} type={showPassword ? "text" : "password"} placeholder="Digite sua nova senha" className="mt-1 p-2 rounded w-full" />

                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    {showPassword ? (
                                        <EyeOff className="text-gray-400 cursor-pointer" size={20} onClick={togglePasswordVisibility} />
                                    ) : (
                                        <Eye className="text-gray-400 cursor-pointer" size={20} onClick={togglePasswordVisibility} />
                                    )}
                                </div>

                            </div>
                            <p className="error--message mt-1">
                                {errors.password && errors.password.message}
                            </p>
                        </div>
                        <div className="col-span-2">
                            <Label htmlFor="services" className="block text-sm font-medium text-white">Serviços</Label>
                            <Input id="services" {...register("services")} type="services" placeholder="Escreva os serviços que sua empresa realiza" className="mt-1 p-2 rounded w-full" />
                            <p className="error--message mt-1">
                                {errors.password && errors.password.message}
                            </p>
                        </div>
                        <div className="col-span-2">
                            <Label htmlFor="companyDescription" className="block text-sm font-medium text-white">Descrição da empresa</Label>
                            <textarea id="description" {...register("companyDescription")} placeholder="Fale sobre sua empresa (missão, visão, valores...)" className="mt-1 p-2 border rounded w-full placeholder-gray-500 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" rows={4}></textarea>
                            <p className="error--message mt-1">
                                {errors.companyDescription && errors.companyDescription.message}
                            </p>
                        </div>

                        <div className="col-span-2 flex justify-center mt-8">
                            <Button type="submit" className="bg-cyan-500 text-white w-full max-w-md py-3 rounded-full text-lg md:text-2xl font-semibold hover:bg-cyan-700 transition duration-200">
                                Editar perfil
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}