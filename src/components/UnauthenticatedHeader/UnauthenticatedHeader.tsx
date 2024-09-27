"use client";

import { useState } from 'react';

import Link from 'next/link';
import { Button } from '../ui/button';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTrigger } from '../ui/drawer';
import { XIcon } from 'lucide-react';
import { unauthenticatedPaths } from '@/constants/routes';
import { usePathname } from 'next/navigation';

export const UnauthenticatedHeader = () => {
  const pathname = usePathname();

  const isUnauthenticatedPath = unauthenticatedPaths.some(path =>
    pathname.startsWith(path)
  );

  if (!isUnauthenticatedPath && pathname !== "/") return null;

  return (
    <header className="w-full bg-sky-600 py-7 text-white">
      <div className="site--container flex justify-between items-center w-full">
        <Link title="Homepage" href="/" className="text-5xl font-bold lg:text-5xl">Connect Work</Link>
        <nav className="max-lg:hidden flex text-lg items-center gap-x-4">
          <Link href="#question" title="Dúvidas">Dúvidas</Link>
          <Link href="#contact" title="Contato">Contato</Link>
          <Link className="ml-5 w-full" href="/login" title="Clique para logar">
            <Button size="lg" className="w-full text-lg font-bold max-w-40 py-5 bg-cyan-500 hover:bg-cyan-700 transition duration-200">Entrar</Button>
          </Link>
        </nav>
        <div className="lg:hidden">
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon">
                <GiHamburgerMenu className="text-white" size={24} />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="h-screen">
              <DrawerHeader>
                <DrawerClose className="ml-auto">
                  <Button variant="outline"><XIcon /></Button>
                </DrawerClose>
              </DrawerHeader>
              <div className="flex flex-col p-4 h-full">
                <DrawerClose asChild>
                  <Link href="#" className="text-xl py-4 border-b">Dúvidas</Link>
                </DrawerClose>
                <DrawerClose asChild>
                  <Link href="#" className="text-xl py-4 border-b">Contato</Link>
                </DrawerClose>
                <DrawerClose asChild>
                  <Link href="/login" className="mt-auto">
                    <Button size="lg" className="w-full text-lg font-bold py-5 bg-cyan-500 hover:bg-cyan-700 transition duration-200">Entrar</Button>
                  </Link>
                </DrawerClose>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </header>
  );
};
