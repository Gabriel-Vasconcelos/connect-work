import Image from "next/image";
import Link from "next/link";
import { FileText, NotebookPen, UserRound, CircleArrowOutDownRight } from 'lucide-react';
import { useRouter } from "next/navigation";
import { auth, db } from "@/services/firebase.config";
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function Menu() {
    const [user, setUser] = useState<any>(null);
    const [userData, setUserData] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);

                // Buscar dados do usuário no Firestore
                const userDoc = doc(db, 'companies', currentUser.uid);
                const userSnapshot = await getDoc(userDoc);

                if (userSnapshot.exists()) {
                    setUserData(userSnapshot.data());
                } else {
                    console.log("No such document!");
                }
            } else {
                setUser(null);
                setUserData(null);
            }
        });

        return () => unsubscribe(); // Limpar o listener
    }, []);

    // Função para pegar as iniciais
    const getInitials = (name: string) => {
        const words = name.split(' ');
        if (words.length === 1) {
            return (words[0].charAt(0) + words[0].charAt(1)).toUpperCase();
        } else {
            return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
        }
    };

    return (
        <div className="w-full md:w-56 lg:w-68 bg-white fixed md:h-full h-auto overflow-auto z-50">
            {/* Imagem e informações da empresa com sombra */}
            <a href="/profile" title="Meu Perfil" className="hidden sm:flex items-center p-4 md:p-3 lg:p-4 border-b-2">
                <Avatar className="mt-3 shadow-lg">
                    <AvatarImage width={60} height={60} src={userData && userData.profileImageUrl} alt="Imagem Empresa" />
                    <AvatarFallback className="uppercase">
                        {userData && getInitials(userData.name)}
                    </AvatarFallback>
                </Avatar>
                {/* <Image
                    src="/assets/Saly-10.png"
                    alt="Imagem"
                    width={60}
                    height={60}
                    className="block shadow-lg rounded-full object-cover"
                /> */}
                <div className="ml-4 mt-3">
                    <p className="text-md font-bold text-cyan-800">{userData && userData.name}</p>
                    <p className="text-xs text-gray-500">Connect Work</p>
                </div>
            </a>

            {/* Links do Menu */}
            <div className="flex flex-row md:flex-col md:justify-start">
                <div className="flex md:flex-col w-full md:mt-4 lg:mt-5">
                    <MenuItem href="/feed" icon={FileText} text="Feed de Serviços" />
                    <MenuItem href="/myservices" icon={NotebookPen} text="Meus serviços" />
                    <MenuItem href="/profile" icon={UserRound} text="Meu Perfil" />
                    <MenuItemButton text="Sair" icon={CircleArrowOutDownRight} />
                </div>
            </div>
        </div >
    );
}

// Componente reutilizável para links do menu
function MenuItem({ href, icon: Icon, text }: { href: string, icon: any, text: string }) {
    return (
        <Link href={href} className="group relative flex items-center p-3 md:p-3 lg:p-4 md:pl-4 lg:pl-4 text-cyan-800 font-semibold md:text-base lg:text-base transition transform hover:scale-95 w-full">
            <span className="absolute left-0 h-full w-1 bg-transparent transition"></span>
            <Icon className="mr-3 hidden sm:block md:hidden lg:block" size={24} />
            {text}
        </Link>
    );
}

// Componente para o botão "Sair"
function MenuItemButton({ text, icon: Icon }: { text: string, icon: any }) {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            router.push('/login');
            Cookies.remove('auth-token');
            // Logout do Firebase
            await auth.signOut();


        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    };

    return (
        <button onClick={() => handleLogout()} className="group relative flex items-center p-3 md:p-3 lg:p-4 md:pl-4 lg:pl-4 text-cyan-800 font-semibold md:text-base lg:text-base transition duration-300 transform hover:scale-95 w-full">
            <span className="absolute left-0 h-full w-1 bg-transparent transition-all duration-300"></span>
            <Icon className="mr-3 hidden sm:block md:hidden lg:block" size={24} />
            {text}
        </button>
    );
}
