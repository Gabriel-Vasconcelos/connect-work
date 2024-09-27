"use client"

import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import Link from "next/link";

import { auth, db, storage } from "@/services/firebase.config"; // Certifique-se de que os serviços estão configurados
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, setDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Firebase Storage para upload da imagem

import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { RegisterFormData } from "./types";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { CameraIcon, Eye, EyeOff } from "lucide-react";
import Image from "next/image";

export const RegisterForm = () => {
  const { handleSubmit, register, setValue, watch, formState: { errors }, clearErrors } = useForm<RegisterFormData>();
  const { toast } = useToast();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const [states, setStates] = useState<{ id: number, nome: string, sigla: string }[]>([]);
  const [cities, setCities] = useState<{ id: number, nome: string }[]>([]);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);

  // Função para buscar os estados
  const fetchStates = async () => {
    try {
      const res = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados");
      const data = await res.json();
      setStates(data);
    } catch (error) {
      console.error("Erro ao buscar estados:", error);
    }
  };

  // Função para buscar as cidades com base no estado selecionado
  const fetchCities = async (stateAbbreviation: string) => {
    try {
      const res = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateAbbreviation}/municipios`);
      const data = await res.json();
      setCities(data);
    } catch (error) {
      console.error("Erro ao buscar cidades:", error);
    }
  };

  useEffect(() => {
    fetchStates();
  }, []);

  useEffect(() => {
    if (selectedState) {
      fetchCities(selectedState);
    }
  }, [selectedState]);

  const formatPhoneNumber = (value: string) => {
    if (!value) return value;

    // Remove tudo que não for número
    let phoneNumber = value.replace(/\D/g, '');

    // Limita a quantidade de números
    if (phoneNumber.length > 11) {
      phoneNumber = phoneNumber.slice(0, 11);
    }
    if (phoneNumber.length > 11) {
      phoneNumber = phoneNumber.slice(0, 11);
    }

    // Aplica a formatação (XX) XXXXX-XXXX ou (XX) XXXX-XXXX para números menores
    if (phoneNumber.length <= 10) {
      phoneNumber = phoneNumber.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else {
      phoneNumber = phoneNumber.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    }

    setValue("phone", phoneNumber);
  };

  const formatCNPJ = (value: string) => {
    if (!value) return value;

    // Remove tudo que não for número
    let cnpj = value.replace(/\D/g, '');

    // Limita a quantidade de números
    if (cnpj.length > 14) {
      cnpj = cnpj.slice(0, 14);
    }

    // Aplica a formatação
    cnpj = cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');

    setValue("cnpj", cnpj);
  };

  const handleProfileImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setProfileImage(file);
  };

  const onSubmit: SubmitHandler<RegisterFormData> = async (data: RegisterFormData) => {
    try {
      // Criar o usuário no Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      // Upload da imagem de perfil para o Firebase Storage (se houver imagem)
      let profileImageUrl = "";
      if (profileImage) {
        const imageRef = ref(storage, `profiles/${user.uid}/${profileImage.name}`);
        await uploadBytes(imageRef, profileImage);
        profileImageUrl = await getDownloadURL(imageRef);
      }

      // Salvar os dados da empresa no Firestore
      await setDoc(doc(db, "companies", user.uid), {
        cnpj: data.cnpj,
        name: data.name,
        phone: data.phone,
        email: data.email,
        state: data.state,
        city: data.city,
        website: data.website || "",
        linkedin: data.linkedin || "",
        instagram: "",
        whatsapp: "",
        description: data.description,
        profileImageUrl, // URL da imagem de perfil
        isSubscribed: false,
        services: [],
        createdAt: new Date()
      });

      // Feedback de sucesso
      toast({
        title: "Conta criada com sucesso!",
        description: "Sua empresa foi cadastrada com sucesso.",
      });
      router.push("/login"); // Redirecionar para a página de login
    } catch (error: any) {
      console.error("Erro ao criar conta:", error);
      toast({
        variant: "destructive",
        title: "Erro ao criar conta",
        description: error.message || "Ocorreu um erro ao tentar criar sua conta.",
      });
    }
  };

  const onError: SubmitErrorHandler<RegisterFormData> = (errors) => {
    clearErrors()
    const firstError = Object.values(errors)[0];
    if (firstError) {
      toast({
        variant: "destructive",
        title: "Erro no formulário",
        description: firstError.message || "Por favor, verifique os campos preenchidos.",
      });
    }
    console.error(errors)
  }

  return (
    <section className="site--container py-10">
      <div>
        <h1 className="text-4xl font-bold col-span-2">Crie uma Conta!</h1>
        <p className="text-lg mt-2 mb-8 flex justify-start items-center flex-wrap gap-x-1">
          <span className="opacity-60">Já possui? </span>
          <Link href="/login" className="opacity-60 text-sky-600 w-fit lg:hover:opacity-100" title="logar">Entre aqui!</Link>
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit, onError)} className="overflow-y-auto grid gap-y-5 w-full border border-gray-200 rounded-md p-10 lg:max-h-[70vh]">
        <div className="grid lg:grid-cols-[auto_1fr] gap-4">
          <label htmlFor="profileImage" className="group cursor-pointer relative flex items-center justify-center w-36 h-36 rounded-full border-2 border-gray-300 bg-gray-100 text-gray-500">
            <Input
              id="profileImage"
              type="file"
              accept="image/*"
              onChange={handleProfileImageChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            {profileImage && (
              <Image
                src={URL.createObjectURL(profileImage)}
                alt="Profile"
                className="w-full h-full object-cover rounded-full border-2 border-gray-300 transition-all duration-300 group-hover:opacity-80"
              />
            )}
            <div className={`${profileImage ? 'hidden' : 'flex'} absolute w-full h-full items-center justify-center transition-all duration-300 group-hover:flex`}>
              <CameraIcon />
            </div>
          </label>
          <div>
            <Label htmlFor="cnpj">CNPJ*</Label>
            <Input className="w-full max-w-[354px]" id="cnpj" {...register("cnpj", { required: "Preencha o campo CNPJ", onChange: (e) => formatCNPJ(e.target.value) })} type="text" placeholder="Digite o CNPJ da empresa" />
          </div>
        </div>
        <div className="grid gap-2 lg:grid-cols-2">
          <div>
            <Label htmlFor="name">Nome da Empresa*</Label>
            <Input id="name" {...register("name", { required: "Preencha o campo Nome da Empresa" })} type="text" placeholder="Preencha com o nome da empresa" />
          </div>
          <div>
            <Label htmlFor="email">Email*</Label>
            <Input id="email" {...register("email", { required: "Preencha o campo E-Mail" })} type="email" placeholder="Digite seu E-mail" />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-6">
            <Label htmlFor="phone">Telefone*</Label>
            <Input
              id="phone"
              {...register("phone", {
                required: "Preencha o campo Telefone",
                onChange: (e) => formatPhoneNumber(e.target.value),
              })}
              type="tel"
              placeholder="Digite seu Telefone"
            />
          </div>
          <div className="col-span-2">
            <Label htmlFor="state">Estado*</Label>
            <Select
              {...register("state", { required: "Preencha o campo Estado" })}
              onValueChange={(value) => {
                setValue("state", value);
                setSelectedState(value);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione um estado" />
              </SelectTrigger>
              <SelectContent>
                {states.map((state) => (
                  <SelectItem key={state.id} value={state.sigla}>
                    {state.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-4">
            <Label htmlFor="city">Cidade*</Label>
            <Select disabled={!selectedState} {...register("city", { required: "Preencha o campo Cidade" })} onValueChange={(value) => setValue("city", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma cidade" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city.id} value={city.nome}>
                    {city.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label htmlFor="website">Site da Empresa</Label>
            <Input id="website" {...register("website")} type="url" placeholder="https://www.empresa.com.br" />
          </div>
          <div>
            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input id="linkedin" {...register("linkedin")} type="url" placeholder="https://www.linkedin.com/in/empresa/" />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Descrição da Empresa*</Label>
          <Textarea id="description" {...register("description", { required: "Preencha o campo de Descrição" })} placeholder="Uma breve descrição sobre a empresa"></Textarea>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="relative">
            <Label htmlFor="password">Senha*</Label>
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
                className="absolute right-3"
                onClick={() => setShowPassword(prev => !prev)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          <div className="relative">
            <Label htmlFor="confirm-password">Confirmar Senha*</Label>
            <div className="flex items-center">
              <Input
                id="confirm-password"
                {...register("confirmPassword", {
                  required: "Preencha o campo de Confirmar Senha",
                  validate: (value) => value === watch("password") || "As senhas não coincidem"
                })}

                type={showPassword ? "text" : "password"}
                placeholder="Confirme a senha"
                className="flex-1 pr-9"
              />
              <button
                type="button"
                className="absolute right-3"
                onClick={() => setShowPassword(prev => !prev)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
        </div>
        <Button size="lg" className="mt-5 font-semibold bg-cyan-500 hover:bg-cyan-700 text-xl w-fit ml-auto">Cadastrar</Button>
      </form>
    </section>
  )
}
