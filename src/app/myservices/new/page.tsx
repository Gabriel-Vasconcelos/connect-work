"use client";

import Cookies from 'js-cookie';
import { getAuth } from 'firebase/auth';
import  Menu  from "@/components/Menu/Menu";
import { NotebookPen } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { ServiceFormData } from "./types";
import { db } from "@/services/firebase.config";
import { addDoc, collection } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";

export default function New() {
  const { handleSubmit, register, formState: { errors }, reset } = useForm<ServiceFormData>();

  const { toast } = useToast();

  // Lógica para enviar os dados ao Firestore
  const onSubmit: SubmitHandler<ServiceFormData> = async (data: ServiceFormData) => {
    try {
      // Recupera o token do cookie
      const authToken = Cookies.get("auth-token");

      if (!authToken) {
        toast({
          variant: "destructive",
          title: "Acesso negado!",
          description: "Faça login e tente novamente.",
        })
        return;
      }

      // Obtém a instância de autenticação do Firebase
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        toast({
          variant: "destructive",
          title: "Acesso negado!",
          description: "Faça login e tente novamente.",
        })
        return;
      }

      const uid = user.uid;  // Pega o UID do usuário autenticado

      // Verifica se `data.tags` é uma string e transforma em array
      const tagsArray = typeof data.tags === "string" ? data.tags.split(",").map((tag: string) => tag.trim()) : [];

      // Adiciona o serviço ao Firestore, incluindo o UID do usuário
      await addDoc(collection(db, "services"), {
        ...data,
        tags: tagsArray, // Salvar o array de tags no Firestore
        createdAt: new Date(),
        userId: uid  // Associa o serviço ao usuário logado
      });

      toast({
        title: "Serviço criado com sucesso!",
      })
      reset();

    } catch (error) {
      console.error("Erro ao criar o serviço: ", error);
      toast({
        variant: "destructive",
        title: "Erro ao criar o serviço!",
        description: "Verifique as informações e tente novamente.",
      })
    }
  };

  // Tratamento de erros de submissão
  const onError: SubmitErrorHandler<ServiceFormData> = (errors) => {
    console.log("Errors: ", errors);
  };

  return (
    <>
      <Menu />

      <div className="pt-28 md:pt-6 md:ml-64 md:mt-0 p-6 bg-[#082F49] min-h-screen overflow-x-hidden">
        <div className="max-w-4xl mx-auto">
          {/* Título com Ícone e Linha Centralizado */}
          <div className="flex flex-col items-center mb-6">
            <div className="flex items-center mb-2">
              <NotebookPen className="text-white mr-2" size={26} /> {/* Ícone ao lado do título */}
              <h1 className="text-3xl font-bold text-white">Criar Serviço</h1>
            </div>
            {/* Linha abaixo do título */}
            <div className="w-1/2 md:w-1/4 border-b-2 border-white"></div>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit(onSubmit, onError)} className="flex flex-col md:grid md:grid-cols-2 gap-5 mb-4 mt-14">
            {/* Input Título do Serviço */}
            <div className="col-span-2 md:col-span-1">
              <Label htmlFor="serviceTitle" className="block text-sm font-medium text-white">
                Título do Serviço
              </Label>
              <Input
                id="serviceTitle"
                {...register("serviceTitle", { required: "Preencha o campo com o título do serviço" })}
                type="text"
                placeholder="Digite o título do serviço"
                className="mt-1 p-2 rounded w-full"
              />
              <p className="error--message mt-1 text-red-500">
                {errors.serviceTitle && errors.serviceTitle.message}
              </p>
            </div>

            {/* Outros inputs */}
            <div>
              <Label htmlFor="companySector" className="block text-sm font-medium text-white">
                Setor da sua empresa
              </Label>
              <Input
                id="companySector"
                {...register("companySector", { required: "Preencha o campo com o setor da sua empresa" })}
                type="text"
                placeholder="Tecnologia, saúde, financeiro..."
                className="mt-1 p-2 rounded w-full"
              />
              <p className="error--message mt-1 text-red-500">
                {errors.companySector && errors.companySector.message}
              </p>
            </div>

            {/* Campo Modelo */}
            <div>
              <Label htmlFor="model" className="block text-sm font-medium text-white">
                Modelo (presencial ou remoto)
              </Label>
              <Input
                id="model"
                {...register("model", { required: "Preencha o campo com o modelo do serviço" })}
                type="text"
                placeholder="Presencial ou remoto"
                className="mt-1 p-2 rounded w-full"
              />
              <p className="error--message mt-1 text-red-500">
                {errors.model && errors.model.message}
              </p>
            </div>

            {/* Campo Cidade */}
            <div>
              <Label htmlFor="city" className="block text-sm font-medium text-white">
                Cidade
              </Label>
              <Input
                id="city"
                {...register("city", { required: "Preencha o campo com a cidade da sua empresa" })}
                type="text"
                placeholder="Cidade da sua empresa"
                className="mt-1 p-2 rounded w-full"
              />
              <p className="error--message mt-1 text-red-500">
                {errors.city && errors.city.message}
              </p>
            </div>

            {/* Campo Estado */}
            <div>
              <Label htmlFor="state" className="block text-sm font-medium text-white">
                Estado
              </Label>
              <Input
                id="state"
                {...register("state", { required: "Preencha o campo com o estado da sua empresa" })}
                type="text"
                placeholder="Estado da sua empresa"
                className="mt-1 p-2 rounded w-full"
              />
              <p className="error--message mt-1 text-red-500">
                {errors.state && errors.state.message}
              </p>
            </div>

            {/* Campo Contato */}
            <div>
              <Label htmlFor="contact" className="block text-sm font-medium text-white">
                Contato
              </Label>
              <Input
                id="contact"
                {...register("contact", { required: "Preencha o campo com alguma forma de contato" })}
                type="text"
                placeholder="Forma de contato"
                className="mt-1 p-2 rounded w-full"
              />
              <p className="error--message mt-1 text-red-500">
                {errors.contact && errors.contact.message}
              </p>
            </div>

            {/* Campo Tags */}
            <div className="col-span-2">
              <Label htmlFor="tags" className="block text-sm font-medium text-white">
                Tags
              </Label>
              <Input
                id="tags"
                {...register("tags", { required: "Preencha o campo com palavras relacionadas ao serviço que você necessita" })}
                type="text"
                placeholder="Escreva palavras relacionadas ao serviço que você necessita"
                className="mt-1 p-2 rounded w-full"
              />
              <p className="error--message mt-1 text-red-500">
                {errors.tags && errors.tags.message}
              </p>
            </div>

            {/* Campo Descrição */}
            <div className="col-span-2">
              <Label htmlFor="description" className="block text-sm font-medium text-white">
                Descrição do serviço
              </Label>
              <textarea
                id="description"
                {...register("description", { required: "Preencha o campo com a descrição detalhada do serviço que necessita" })}
                placeholder="Descreva o serviço"
                className="mt-1 p-2 border rounded w-full"
                rows={4}
              ></textarea>
              <p className="error--message mt-1 text-red-500">
                {errors.description && errors.description.message}
              </p>
            </div>

            {/* Botão de enviar */}
            <div className="col-span-2 flex justify-center mt-8">
              <Button type="submit" className="bg-cyan-500 text-white w-full max-w-md py-3 rounded-full text-2xl font-semibold hover:bg-cyan-700 transition duration-200">
                Criar Serviço
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
