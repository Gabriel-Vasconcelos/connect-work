"use client";

import Menu from "@/components/Menu/Menu";
import Image from "next/image";
import { UserRound, Upload, CameraIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { db, auth, storage } from "@/services/firebase.config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { RegisterFormData } from "@/components/RegisterForm/types";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function EditProfile() {
    const { handleSubmit, register, setValue, formState: { errors } } = useForm<RegisterFormData>();
    const [userId, setUserId] = useState<string | null>(null);
    const [states, setStates] = useState<{ id: number, nome: string, sigla: string }[]>([]);
    const [cities, setCities] = useState<{ id: number, nome: string }[]>([]);

    const [selectedState, setSelectedState] = useState<string | null>(null);
    const [selectedCity, setSelectedCity] = useState<string | null>(null);
    const [profileImage, setProfileImage] = useState<File | null>(null);

    // Carregar estados ao montar o componente
    useEffect(() => {
        const fetchStates = async () => {
            const res = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados");
            const data = await res.json();
            setStates(data);
        };
        fetchStates();
    }, []);

    // Carregar dados do usuário ao montar o componente
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser: any) => {
            if (currentUser) {
                setUserId(currentUser.uid);
                const userDoc = doc(db, "companies", currentUser.uid);
                const userSnapshot = await getDoc(userDoc);

                if (userSnapshot.exists()) {
                    const userData = userSnapshot.data();
                    setValue("name", userData.name);
                    setValue("phone", userData.phone);
                    setValue("state", userData.state);
                    setValue("city", userData.city);
                    setValue("website", userData.website || "");
                    setValue("linkedin", userData.linkedin || "");
                    setValue("description", userData.description || "");
                    setValue("email", currentUser.email);

                    setProfileImage(userData.profileImageUrl);

                    setSelectedState(userData.state); // Definindo o estado selecionado
                    setSelectedCity(userData.city); // Definindo o estado selecionado
                }
            } else {
                setUserId(null);
            }
        });

        return () => unsubscribe(); // Limpar o listener
    }, [setValue]);

    const fetchCities = async (stateId: string) => {
        const res = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateId}/municipios`);
        const data = await res.json();
        setCities(data);
    };

    useEffect(() => {
        if (selectedState) {
            fetchCities(selectedState);
        }
    }, [selectedState]);


    const handleProfileImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setProfileImage(file);
    };

    const onSubmit: SubmitHandler<RegisterFormData> = async (data: RegisterFormData) => {
        if (!userId) return;

        try {
            let profileImageUrl = "";
            if (profileImage) {
                const imageRef = ref(storage, `profiles/${userId}/${profileImage.name}`);
                await uploadBytes(imageRef, profileImage);
                profileImageUrl = await getDownloadURL(imageRef);
            }

            const userRef = doc(db, "companies", userId);
            await updateDoc(userRef, {
                name: data.name,
                phone: data.phone,
                state: data.state,
                city: data.city,
                website: data.website || "",
                linkedin: data.linkedin || "",
                description: data.description,
                profileImageUrl
            });

            // Aqui você pode adicionar a lógica para fazer o upload da nova imagem de perfil

            window.location.reload();
            console.log("Perfil atualizado com sucesso!");
        } catch (error) {
            console.error("Erro ao atualizar o perfil:", error);
        }
    };

    return (
        <>
            <Menu />
            <div className="pt-28 md:pt-6 md:ml-64 md:mt-0 p-6 bg-[#082F49] min-h-screen overflow-x-hidden">
                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-col items-center mb-12 md:mt-8">
                        <div className="flex items-center mb-2">
                            <UserRound className="text-white mr-2" size={26} />
                            <h1 className="text-3xl font-bold text-white">Editar Perfil</h1>
                        </div>
                        <div className="w-1/2 md:w-1/4 border-b-2 border-white"></div>
                    </div>

                    <label htmlFor="profileImage" className="mx-auto group cursor-pointer relative flex items-center justify-center w-36 h-36 rounded-full border-2 border-gray-300 bg-gray-100 text-gray-500">
                        <Input
                            id="profileImage"
                            type="file"
                            accept="image/*"
                            onChange={handleProfileImageChange}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        {profileImage && (
                            <Image
                                src={typeof profileImage === "object" ? URL.createObjectURL(profileImage) : profileImage}
                                alt="Profile"
                                layout="fill"
                                objectFit="cover" 
                                className="w-full h-full object-cover rounded-full border-2 border-gray-300 transition-all duration-300 group-hover:opacity-80"
                            />
                        )}
                        <div className={`${profileImage ? 'hidden' : 'flex'} absolute w-full h-full items-center justify-center transition-all duration-300 group-hover:flex`}>
                            <CameraIcon />
                        </div>
                    </label>

                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:grid md:grid-cols-2 gap-5 gap-x-12 mb-4 mt-14">
                        <div>
                            <Label htmlFor="name" className="block text-sm font-medium text-white">Nome da Empresa</Label>
                            <Input id="name" {...register("name", { required: "Nome da empresa é obrigatório" })} placeholder="Digite o nome da empresa" className="mt-1 p-2 rounded w-full" />
                            <p className="error--message mt-1">{errors.name && errors.name.message}</p>
                        </div>
                        <div>
                            <Label htmlFor="email" className="block text-sm font-medium text-white">Email*</Label>
                            <Input id="email" {...register("email")} type="email" placeholder="Digite seu E-mail" disabled className="mt-1 p-2 rounded w-full" />
                        </div>
                        <div>
                            <Label htmlFor="phone" className="block text-sm font-medium text-white">Telefone*</Label>
                            <Input id="phone" {...register("phone", { required: "Telefone é obrigatório" })} placeholder="Digite seu Telefone" className="mt-1 p-2 rounded w-full" />
                            <p className="error--message mt-1">{errors.phone && errors.phone.message}</p>
                        </div>
                        <div>
                            <Label htmlFor="state" className="block text-sm font-medium text-white">Estado*</Label>
                            <Select
                                {...register("state", { required: "Preencha o campo Estado" })}
                                onValueChange={(value) => {
                                    setValue("state", value);
                                    setSelectedState(value);
                                }}
                                value={selectedState || ""}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione o Estado" />
                                </SelectTrigger>
                                <SelectContent>
                                    {states.map(state => (
                                        <SelectItem key={state.sigla} value={state.sigla}>{state.nome}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <p className="error--message mt-1">{errors.state && errors.state.message}</p>
                        </div>
                        <div>
                            <Label htmlFor="city" className="block text-sm font-medium text-white">Cidade*</Label>
                            <Select
                                disabled={!selectedState}
                                {...register("city", { required: "Preencha o campo Cidade" })}
                                onValueChange={(value) => {
                                    if (selectedState) {
                                        setValue("city", value)
                                        setSelectedCity(value);
                                    }
                                }}
                                value={selectedCity || ""}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione a Cidade" />
                                </SelectTrigger>
                                <SelectContent>
                                    {cities.map(city => (
                                        <SelectItem key={city.id} value={city.nome}>{city.nome}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <p className="error--message mt-1">{errors.city && errors.city.message}</p>
                        </div>
                        <div>
                            <Label htmlFor="website" className="block text-sm font-medium text-white">Site da Empresa</Label>
                            <Input id="website" {...register("website")} type="url" placeholder="https://www.empresa.com.br" className="mt-1 p-2 rounded w-full" />
                        </div>
                        <div>
                            <Label htmlFor="linkedin" className="block text-sm font-medium text-white">LinkedIn</Label>
                            <Input id="linkedin" {...register("linkedin")} type="url" placeholder="https://www.linkedin.com/in/empresa/" className="mt-1 p-2 rounded w-full" />
                        </div>
                        <div>
                            <Label htmlFor="description" className="block text-sm font-medium text-white">Descrição da Empresa*</Label>
                            <Input id="description" {...register("description", { required: "Descrição é obrigatória" })} placeholder="Digite uma breve descrição" className="mt-1 p-2 rounded w-full" />
                            <p className="error--message mt-1">{errors.description && errors.description.message}</p>
                        </div>
                        <Button size="lg" className="col-span-2 mt-5 font-semibold bg-cyan-500 hover:bg-cyan-700 text-xl w-full max-w-96 mx-auto">Atualizar Perfil</Button>
                    </form>
                </div>
            </div>
        </>
    );
}
