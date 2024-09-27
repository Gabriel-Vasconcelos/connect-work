"use client";

import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export const ContactForm = () => {
  const { handleSubmit, register, formState: { errors }, clearErrors } = useForm<ContactFormData>();
  const { toast } = useToast();

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    // Aqui você pode adicionar a lógica para envio do formulário, como uma API call
    console.log(data);
    toast({
      title: "Mensagem enviada com sucesso!",
      description: "Obrigado por entrar em contato.",
    });
  };

  const onError: SubmitErrorHandler<ContactFormData> = (errors) => {
    clearErrors();
    const firstError = Object.values(errors)[0];
    if (firstError) {
      toast({
        variant: "destructive",
        title: "Erro no formulário",
        description: firstError.message || "Por favor, verifique os campos preenchidos.",
      });
    }
    console.error(errors);
  };

  return (
    <section className="site--container py-10">
      <form onSubmit={handleSubmit(onSubmit, onError)} className="grid gap-y-5 w-full border border-gray-200 rounded-md p-10">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Ainda ficou com dúvida?</h2>
          <p className="text-lg mb-8 opacity-60">Entre em contato conosco! Estamos aqui para ajudar.</p>
        </div>

        <div>
          <Label htmlFor="name">Nome*</Label>
          <Input
            id="name"
            {...register("name", { required: "Preencha o campo Nome" })}
            type="text"
            placeholder="Digite seu nome"
            className="w-full"
          />
          {errors.name && <span className="text-red-500">{errors.name.message}</span>}
        </div>

        <div>
          <Label htmlFor="email">Email*</Label>
          <Input
            id="email"
            {...register("email", {
              required: "Preencha o campo Email",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Preencha um email válido",
              },
            })}
            type="email"
            placeholder="Digite seu email"
            className="w-full"
          />
          {errors.email && <span className="text-red-500">{errors.email.message}</span>}
        </div>

        <div>
          <Label htmlFor="message">Mensagem*</Label>
          <Textarea
            id="message"
            {...register("message", { required: "Preencha o campo Mensagem" })}
            placeholder="Digite sua mensagem"
            className="w-full"
          />
          {errors.message && <span className="text-red-500">{errors.message.message}</span>}
        </div>

        <Button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-700 transition duration-300">Enviar</Button>
      </form>
    </section>
  );
};
