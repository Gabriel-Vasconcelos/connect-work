import Image from "next/image";
import Link from "next/link";
import { FileText, NotebookPen, UserRound, CircleArrowOutDownRight } from 'lucide-react';

export default function Menu() {

    return (
        <div className="w-full md:w-auto bg-white fixed md:h-full h-auto overflow-auto z-50">

            <div className="hidden sm:flex">

                <Image src="/assets/Saly-10.png" alt="Imagem" width={60} height={60} className="block mx-auto shadow-[2px_3px_6px_#121212] rounded-full object-cover mt-5 ml-5" />

                <div className="ml-4 mr-4 mt-8 text-black">
                    <p className="text-base font-bold text-cyan-800">Nome da Empresa</p>
                    <p className="text-sm text-gray-500">email@empresa.com</p>
                </div>

            </div>

            <div className="flex flex-row md:flex-col md:justify-start">

                <div className="flex flex-row sm:flex-col flex-wrap sm:flex-nowrap w-full md:mt-7">

                    <Link href="/feed" className="flex items-center p-4 pl-6 text-cyan-800 text-md md:text-lg font-bold transition duration-100 ease-in-out hover:bg-cyan-950 hover:text-white flex-1 text-center md:text-left">
                        <FileText className="mr-2 hidden sm:block" size={24} />
                        Feed de Serviços
                    </Link>

                    <Link href="/" className="flex items-center p-4 pl-6 text-cyan-800 text-md md:text-lg font-bold transition duration-100 ease-in-out hover:bg-cyan-950 hover:text-white flex-1 text-center md:text-left">
                        <NotebookPen className="mr-2 hidden sm:block" size={24} />
                        Meus serviços
                    </Link>

                    <Link href="/profile" className="flex items-center p-4 pl-6 text-cyan-800 text-md md:text-lg font-bold transition duration-100 ease-in-out hover:bg-cyan-950 hover:text-white flex-1 text-center md:text-left">
                        <UserRound className="mr-2 hidden sm:block" size={24} />
                        Meu Perfil
                    </Link>

                    <button className="flex items-center p-4 pl-6 text-cyan-800 text-md md:text-lg font-bold transition duration-100 ease-in-out hover:bg-cyan-950 hover:text-white flex-1 text-center md:text-left">
                        <CircleArrowOutDownRight className="mr-2 hidden sm:block" size={24} />
                        Sair
                    </button>

                </div>
            </div>

        </div>
    );

}