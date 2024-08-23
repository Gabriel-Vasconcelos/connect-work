import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Connect Work",
  description: "Na Connect Work, facilitamos conexões entre empresas e simplificamos a busca por serviços especializados. Nosso objetivo é criar um ecossistema eficiente e confiável que impulsiona parcerias empresariais valiosas e duradouras. Descubra como podemos ajudar sua empresa a encontrar os serviços certos para crescer e prosperar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" >
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          raleway.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
