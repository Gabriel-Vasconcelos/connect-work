# 🌐 Plataforma de Conexão de Empresas
Este projeto é uma plataforma digital que conecta empresas por meio de solicitações e ofertas de serviços. Foi desenvolvido como parte da disciplina **Projeto Integrado 2** do curso de **Sistemas e Mídias Digitais** da **Universidade Federal do Ceará (UFC)**. O objetivo da disciplina é criar um produto digital que resolva algum problema real. No nosso caso, criamos uma plataforma que facilita a comunicação entre empresas que necessitam de serviços e aquelas que podem fornecê-los.

## 🛠 Tecnologias Utilizadas
- **Next.js 14**: Framework React para desenvolvimento web.
- **React Hook Form**: Gerenciamento de formulários e validação.
- **Shadcn/ui**: Biblioteca de componentes de UI.
- **TailwindCSS**: Framework CSS para estilização.
- **Firebase**: Backend as a Service (BaaS) com:
  - Firestore (banco de dados NoSQL).
  - Authentication (autenticação com email/senha e Google OAuth).
  - Storage (armazenamento de arquivos).
- **Vercel**: Hospedagem da aplicação.

## 🚀 Funcionalidades Principais

- **Cadastro e Login**:
  - Cadastro tradicional com email e senha, ou via conta Google.
  - Login pelo fluxo tradicional ou pelo Google OAuth.

- **Feed de Serviços**:
  - Exibição de serviços solicitados por outras empresas.
-   Pesquisa por nome de serviço e uso de filtros (tags, modelo presencial/remoto).

- **Detalhes do Serviço**:
  - Visualização de informações detalhadas sobre os serviços e a empresa solicitante.
  - Contato direto com a empresa via WhatsApp.

- **Cadastro de Serviços**:
  - Cadastrar solicitações de serviço.
  - Gerenciar serviços (visualizar, editar e excluir serviços cadastrados).

- **Perfil de Empresa**:
  - Editar informações do perfil da empresa (nome, descrição, imagem de perfil, etc).

- **Middleware de Autenticação**:
  - Controle de acesso para rotas protegidas com middleware de autenticação do Next.js.

 ## 📹 Demonstração em Vídeo

 ## 🚀 Deploy
A aplicação está hospedada na Vercel e você pode acessá-la diretamente [aqui](https://connect-work.vercel.app/).

## 🚧 Como Rodar o Projeto Localmente
Siga os passos abaixo para rodar o projeto localmente:

1. Clone o repositório:

```
git clone git@github.com:Gabriel-Vasconcelos/connect-work.git
```

2. Instale as dependências:
```
npm install
# ou
yarn install
# ou
pnpm install
```

3. Configure as variáveis de ambiente no arquivo ```.env.local``` com as credenciais do Firebase (Exemplo em ```.env.example```).

4. Execute o servidor de desenvolvimento:

```
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

Acesse http://localhost:3000 para visualizar a aplicação.

## 👥 Desenvolvedores
- Gabriel Vasconcelos - [GitHub](https://github.com/Gabriel-Vasconcelos)
- Gabriel Vieira - [GitHub](https://github.com/iAmBiel)
