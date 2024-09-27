"use client";

import { Card, CardContent, CardFooter } from "../ui/card";


export const OurPlans = () => {
  const plans = [
    {
      title: "Conexão Essencial",
      subtitle: "plano básico",
      points: [
        "Acesso ilimitado a pesquisas de prestadores de serviços.",
        "Publicação de até 3 solicitações de serviços por mês.",
        "Feedback e avaliações dos serviços recebidos.",
        "Suporte ao cliente por e-mail."
      ],
      price: "R$29,90/mês",
      message: "*Teste Grátis por 7 dias!"
    },
    {
      title: "Conexão Avançada",
      subtitle: "plano profissional",
      points: [
        "Todos os recursos do Plano Básico.",
        "Publicação de até 10 solicitações de serviços por mês.",
        "Maior visibilidade dos pedidos de serviço",
        "Acesso a relatórios detalhados de desempenho e eficiência dos prestadores."
      ],
      price: "R$49,90/mês"
    },
    {
      title: "Conexão Ilimitada",
      subtitle: "plano empresarial",
      points: [
        "Todos os recursos do Plano Profissional.",
        "Publicação ilimitada de solicitações de serviços.",
        "Acesso prioritário a prestadores de serviços altamente avaliados.",
        "Relatórios personalizados de desempenho e eficiência."
      ],
      price: "R$249,90/mês"
    }
  ]

  return (
    <section className="site--container pb-20 flex flex-col justify-center items-center">
      <h2 className="text-center text-5xl font-bold mb-10 lg:text-6xl lg:mb-20">Nossos Planos</h2>
      <div className="grid items-center justify-center gap-y-5 md:gap-x-10 md:grid-cols-2 xl:grid-cols-3">
        {plans?.map((plan: any) => {
          return (
            <Card className="h-full bg-sky-900 text-white py-10">
              <CardContent className="flex flex-col">
                <h3 className="text-3xl font-semibold mb-0.5">{plan.title}</h3>
                <p className="text-gray-300 mb-8 text-lg flex gap-x-2">
                  <span>{plan.subtitle}</span>
                  <span className="text-white">{plan.price}</span>
                </p>
                <div className="text-lg">
                  {plan?.points.map((point: any) => {
                    return (
                      <p className="flex gap-x-2">
                        <span>{`>`}</span>
                        {point}
                      </p>
                    )
                  })}
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                {plan.message && (
                  <p className="flex items-center justify-center text-center text-lg font-semibold">{plan.message}</p>
                )}
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </section>
  );
};
