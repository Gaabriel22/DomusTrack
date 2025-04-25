# DomusTrack - Backend

Backend da aplicação **DomusTrack**, uma plataforma simples e eficaz para gestão de manutenções de imóveis alugados.

---

## 🚀 Visão Geral

Este backend foi desenvolvido com **Node.js**, **Express**, **TypeScript** e **Prisma ORM**, utilizando PostgreSQL como banco de dados. Ele fornece uma API RESTful para gerenciar autenticação, propriedades, manutenções, prestadores de serviço e notificações.

---

## 🔧 Tecnologias Utilizadas

- Node.js + Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT (autenticação)
- dotenv (variáveis de ambiente)
- ts-node / ts-node-dev

---

## 📁 Estrutura de Pastas

```
backend/
├── src/
│   ├── config/          # Configurações gerais (ex: banco de dados, app)
│   ├── controllers/     # Controladores das rotas
│   ├── middleware/      # Middlewares (autenticação, erros, etc)
│   ├── models/          # Interfaces e modelos de dados
│   ├── routes/          # Rotas da aplicação
│   ├── services/        # Lógica de negócio
│   ├── utils/           # Funções auxiliares
│   ├── prisma/          # Instância e seeds do Prisma
│   ├── app.ts           # Configuração do app
│   └── server.ts        # Inicialização do servidor
├── .env                 # Variáveis de ambiente
├── package.json         # Scripts e dependências
├── tsconfig.json        # Configuração do TypeScript
└── prisma/
    ├── schema.prisma    # Schema do Prisma
    └── seed.ts        # Script de seed do banco
```

---

## 🚧 Instalação e Setup

1. **Clone o repositório**

```bash
git clone https://github.com/Gaabriel22/DomusTrack.git
cd domustrack/backend
```

2. **Instale as dependências**

```bash
yarn install
# ou
npm install
```

3. **Configure o arquivo `.env`**
   Crie um arquivo `.env` com base no modelo abaixo:

```
DATABASE_URL=postgresql://usuario:senha@localhost:5432/domustrack
JWT_SECRET=sua_chave_secreta
PORT=3001
```

4. **Configure o banco de dados**

```bash
yarn prisma:generate
npx prisma migrate dev --name init
```

5. **(Opcional) Popule o banco com dados iniciais**

```bash
npx prisma:seed
```

6. **Inicie o servidor em modo dev**

```bash
npm run dev
```

---

## ⚖️ Scripts Disponíveis

- `dev` - Inicia o servidor em modo desenvolvimento com `ts-node-dev`
- `start` - Inicia o servidor em produção com `ts-node`
- `build` - Compila o TypeScript para JS
- `prisma:generate` - Gera o cliente Prisma
- `prisma:seed` - Executa o script de seed do banco

---

## 🔐 Autenticação

- JWT é utilizado para autenticar os usuários.
- O middleware `authMiddleware.ts` verifica e valida o token em rotas protegidas.

---

## 📈 Endpoints Principais

| Recurso      | Caminho Base         |
| ------------ | -------------------- |
| Autenticação | `/api/auth`          |
| Propriedades | `/api/properties`    |
| Manutenções  | `/api/maintenances`  |
| Prestadores  | `/api/providers`     |
| Notificações | `/api/notifications` |

---

## 🛠️ Testes

Ainda não foram definidos testes automatizados para este projeto.

---

## 📄 Licença

Projeto licenciado sob **ISC**.

---

## 👤 Autor

Gabriel Amaral
