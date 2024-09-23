"use client";

import { useEffect, useState } from "react";
import Menu from "@/components/Menu/Menu";
import { NotebookPen } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { ServiceFormData } from "../../new/types";
import { db } from "@/services/firebase.config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useParams } from 'next/navigation';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useToast } from "@/hooks/use-toast";

export default function EditService() {

    const { toast } = useToast();
    const params = useParams();
    const id = typeof params.id === 'string' ? params.id : '';

    const [initialData, setInitialData] = useState<ServiceFormData | null>(null);

    const { handleSubmit, register, formState: { errors }, setValue, reset } = useForm<ServiceFormData>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const auth = getAuth();
                onAuthStateChanged(auth, async (user) => {
                    if (user) {
                        const uid = user.uid;

                        // Obtém o serviço do Firestore
                        const docRef = doc(db, "services", id);
                        const docSnap = await getDoc(docRef);

                        if (docSnap.exists()) {
                            const data = docSnap.data() as ServiceFormData;

                            // Verifica se o serviço pertence ao usuário autenticado
                            if (data.userId === uid) {
                                setInitialData(data);

                                // Preenche o formulário com os dados obtidos
                                Object.keys(data).forEach((key) => {
                                    if (key === 'tags' && Array.isArray(data.tags)) {
                                        // Converte o array de tags para uma string separada por vírgulas
                                        setValue('tags', data.tags.join(', '));
                                    } else {
                                        setValue(key as keyof ServiceFormData, data[key as keyof ServiceFormData] || '');
                                    }
                                });
                            } else {
                                // Se o serviço não pertencer ao usuário, limpa o formulário
                                reset();
                                toast({
                                    variant: "destructive",
                                    title: "Acesso negado!",
                                    description: "Você não tem permissão para editar este serviço.",
                                });
                            }
                        } else {
                            // Se o documento não existir, limpa o formulário
                            reset();
                            toast({
                                variant: "destructive",
                                title: "Serviço não encontrado!",
                                description: "O serviço solicitado não existe.",
                            });
                        }
                    } else {
                        toast({
                            variant: "destructive",
                            title: "Acesso negado!",
                            description: "Faça login e tente novamente.",
                        });
                    }
                });
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
                toast({
                    variant: "destructive",
                    title: "Erro ao buscar dados do serviço!",
                    description: "Verifique as informações e tente novamente.",
                });
            }
        };

        if (id) {
            fetchData();
        }
    }, [id, setValue, reset, toast]);

    const onSubmit: SubmitHandler<ServiceFormData> = async (data: ServiceFormData) => {
        try {
            // Garantir que o campo de tags seja um array
            const tagsValue = data.tags;
            const transformedData = {
                ...data,
                tags: typeof tagsValue === 'string' ? tagsValue.split(',').map(tag => tag.trim()) : []
            };

            const docRef = doc(db, "services", id);
            await updateDoc(docRef, transformedData);
            toast({
                title: "Serviço editado com sucesso!",
            })

        } catch (error) {
            toast({
                variant: "destructive",
                title: "Erro ao editar o serviço!",
                description: "Verifique as informações e tente novamente.",
            })
            console.error("Erro ao atualizar dados:", error);
        }
    };

    const onError: SubmitErrorHandler<ServiceFormData> = (errors) => {
        console.log(errors); // Para depuração de erros no formulário
    };

    return (
        <>
            <Menu />

            <div className="pt-28 md:pt-6 md:ml-56 md:mt-0 p-6 bg-[#082F49] min-h-screen overflow-x-hidden">
                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-col items-center mb-6 md:mt-8">
                        <div className="flex items-center mb-2">
                            <NotebookPen className="text-white mr-2" size={26} />
                            <h1 className="text-3xl font-bold text-white">
                                Editar Serviço
                            </h1>
                        </div>
                        <div className="w-1/2 md:w-60 border-b-2 border-white"></div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit, onError)} className="flex flex-col md:grid md:grid-cols-2 gap-5 gap-x-12 mb-4 mt-14 md:ml-4">
                        <div>
                            <Label htmlFor="serviceTitle" className="block text-sm font-medium text-white">Título do Serviço</Label>
                            <Input id="serviceTitle" {...register("serviceTitle")} type="text" placeholder="Digite o título do serviço" className="mt-1 p-2 rounded w-full" />
                            <p className="error--message mt-1">
                                {errors.serviceTitle && errors.serviceTitle.message}
                            </p>
                        </div>
                        <div>
                            <Label htmlFor="companySector" className="block text-sm font-medium text-white">Setor da sua empresa</Label>
                            <Input id="companySector" {...register("companySector")} type="text" placeholder="Tecnologia, saúde, financeiro..." className="mt-1 p-2 rounded w-full" />
                            <p className="error--message mt-1">
                                {errors.companySector && errors.companySector.message}
                            </p>
                        </div>
                        <div>
                            <Label htmlFor="model" className="block text-sm font-medium text-white">Modelo (presencial ou remoto)</Label>
                            <Input id="model" {...register("model")} type="text" placeholder="Presencial ou remoto" className="mt-1 p-2 rounded w-full" />
                            <p className="error--message mt-1">
                                {errors.model && errors.model.message}
                            </p>
                        </div>
                        <div>
                            <Label htmlFor="city" className="block text-sm font-medium text-white">Cidade</Label>
                            <Input id="city" {...register("city")} type="text" placeholder="Cidade da sua empresa" className="mt-1 p-2 rounded w-full" />
                            <p className="error--message mt-1">
                                {errors.city && errors.city.message}
                            </p>
                        </div>
                        <div>
                            <Label htmlFor="state" className="block text-sm font-medium text-white">Estado</Label>
                            <Input id="state" {...register("state")} type="text" placeholder="Estado da sua empresa" className="mt-1 p-2 rounded w-full" />
                            <p className="error--message mt-1">
                                {errors.state && errors.state.message}
                            </p>
                        </div>
                        <div>
                            <Label htmlFor="contact" className="block text-sm font-medium text-white">Contato</Label>
                            <Input id="contact" {...register("contact")} type="text" placeholder="Forma de contato" className="mt-1 p-2 rounded w-full" />
                            <p className="error--message mt-1">
                                {errors.contact && errors.contact.message}
                            </p>
                        </div>
                        <div className="col-span-2">
                            <Label htmlFor="tags" className="block text-sm font-medium text-white">Tags</Label>
                            <Input id="tags" {...register("tags")} type="text" placeholder="Palavras relacionadas ao serviço (palavra1, palavra2, palavra3)" className="mt-1 p-2 rounded w-full" />
                            <p className="error--message mt-1">
                                {errors.tags && errors.tags.message}
                            </p>
                        </div>
                        <div className="col-span-2">
                            <Label htmlFor="description" className="block text-sm font-medium text-white">Descrição do serviço</Label>
                            <textarea id="description" {...register("description")} placeholder="Descrição detalhada do serviço" className="mt-1 p-2 border rounded w-full" rows={4}></textarea>
                            <p className="error--message mt-1">
                                {errors.description && errors.description.message}
                            </p>
                        </div>
                        <div className="col-span-2 flex justify-center mt-8">
                            <Button type="submit" className="bg-cyan-500 text-white w-full max-w-md py-3 text-lg md:text-2xl font-semibold hover:bg-cyan-700 transition duration-200">
                                Editar Serviço
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
