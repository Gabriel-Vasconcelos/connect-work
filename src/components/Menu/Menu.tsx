import Image from "next/image";
import Link from "next/link";
import { FileText, NotebookPen, UserRound, CircleArrowOutDownRight } from 'lucide-react';

export default function Menu() {
    return (
        <div className="w-full md:w-56 lg:w-68 bg-white fixed md:h-full h-auto overflow-auto z-50 shadow-lg">
            {/* Imagem e informações da empresa com sombra */}
            <div className="hidden sm:flex items-center p-4 md:p-3 lg:p-4">
                <Image
                    src="/assets/Saly-10.png"
                    alt="Imagem"
                    width={60}
                    height={60}
                    className="block shadow-lg rounded-full object-cover"
                />
                <div className="ml-4 mt-3">
                    <p className="text-sm md:text-sm lg:text-md font-bold text-cyan-800">Nome da Empresa</p>
                    <p className="text-xs text-gray-500">email@empresa.com</p>
                </div>
            </div>

            {/* Links do Menu */}
            <div className="flex flex-row md:flex-col md:justify-start">
                <div className="flex md:flex-col w-full md:mt-4 lg:mt-5">
                    <MenuItem href="/feed" icon={FileText} text="Feed de Serviços" />
                    <MenuItem href="/" icon={NotebookPen} text="Meus serviços" />
                    <MenuItem href="/profile" icon={UserRound} text="Meu Perfil" />
                    <MenuItemButton text="Sair" icon={CircleArrowOutDownRight} />
                </div>
            </div>
        </div>
    );
}

// Componente reutilizável para links do menu
function MenuItem({ href, icon: Icon, text }: { href: string, icon: any, text: string }) {
    return (
        <Link href={href} className="group relative flex items-center p-3 md:p-3 lg:p-4 md:pl-4 lg:pl-4 text-cyan-800 font-semibold md:text-base lg:text-base transition duration-300 hover:bg-cyan-950 hover:text-white w-full">
            <span className="absolute left-0 h-full w-1 bg-transparent group-hover:bg-cyan-600 transition-all duration-300"></span>
            <Icon className="mr-3 hidden sm:block md:hidden lg:block" size={24} />
            {text}
        </Link>
    );
}

// Componente para o botão "Sair"
function MenuItemButton({ text, icon: Icon }: { text: string, icon: any }) {
    return (
        <button className="group relative flex items-center p-3 md:p-3 lg:p-4 md:pl-4 lg:pl-4 text-cyan-800 font-semibold md:text-base lg:text-base transition duration-300 hover:bg-cyan-950 hover:text-white w-full">
            <span className="absolute left-0 h-full w-1 bg-transparent group-hover:bg-cyan-600 transition-all duration-300"></span>
            <Icon className="mr-3 hidden sm:block md:hidden lg:block" size={24} />
            {text}
        </button>
    );
}
