"use client"

import Cookies from 'js-cookie';

import { RegisterForm } from "@/components/RegisterForm";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { auth, db } from "@/services/firebase.config";
import Image from "next/image";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { FaApple, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';


const handleGoogleSignIn = async () => {
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const { toast } = useToast();
  const router = useRouter();

  try {
    const result = await signInWithGoogle();
    if (result?.user) {
      const idToken = await result.user.getIdToken();
      Cookies.set("auth-token", idToken, { expires: 7 });

      // Verificar se o usuário já tem os dados completos no Firestore
      const userDocRef = doc(db, "companies", result.user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.isProfileComplete) {
          // Usuário já tem perfil completo, redirecionar para o feed
          router.push("/feed");
        } else {
          // Usuário precisa completar o cadastro
          router.push("/complete-profile");
        }
      } else {
        // Se o documento do usuário não existe, redirecionar para completar o perfil
        await setDoc(userDocRef, { email: result.user.email, isProfileComplete: false });
        router.push("/complete-profile");
      }

      toast({
        title: "Cadastro Inicial bem-sucedido com o Google!",
      });
    }
  } catch (error) {
    console.error("Google sign-in error:", error);
    toast({
      variant: "destructive",
      title: "Erro ao fazer Cadastro Inicial com Google",
      description: "Tente novamente mais tarde.",
    });
  }
};

const Register = () => {
  return (
    <div className="flex max-h-[90vh] lg:overflow-hidden">
      <div className="max-lg:hidden overflow-hidden relative w-1/5 h-[90vh] flex flex-col items-center justify-center bg-sky-950">
        <Image className="h-full object-cover opacity-90" src="/assets/low-angle-view-businesswoman-standing-front-office-building.jpg" alt="Imagem" width={5000} height={3333} />
        <div className="absolute mx-auto bottom-20 grid grid-flow-col items-center flex-wrap gap-x-4 mt-5">
          {/* <Button size="lg" variant="secondary" className="py-8 group"><FaFacebook color="blue" className="lg:group-hover:size-9" size="28" /></Button> */}
          <Button
            type="button"
            size="lg"
            variant="secondary"
            className="py-8 group"
            onClick={() => handleGoogleSignIn()}
          >
            <FcGoogle size="28" className="lg:group-hover:size-9" />
          </Button>
          {/* <Button size="lg" variant="secondary" className="py-8 group"><FaApple size="28" className="lg:group-hover:size-9" /></Button> */}
        </div>
      </div>
      <RegisterForm />
    </div>
  );
};

export default Register;