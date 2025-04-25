# DomusTrack - Frontend

Este é o frontend do projeto **DomusTrack**, uma aplicação web para gerenciamento de propriedades e manutenções.

## 🔧 Tecnologias Utilizadas

- [Next.js 15](https://nextjs.org/)
- [React 19](https://reactjs.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Next Auth](https://next-auth.js.org/)
- [Shadcn/UI](https://ui.shadcn.dev/)
- [Lucide Icons](https://lucide.dev/)
- [Axios](https://axios-http.com/)
- TypeScript

## 📁 Estrutura de Pastas

```
DomusTrack/front/
├── public/                    # Imagens e arquivos estáticos
├── src/
│   ├── components/            # Componentes reutilizáveis (UI e lógica)
│   ├── contexts/              # Contextos de estado global (ex: autenticação)
│   ├── hooks/                 # Hooks personalizados
│   ├── lib/                   # Integração com API
│   ├── pages/                 # Rotas do Next.js
│   ├── services/              # Serviços de integração com o backend
│   ├── styles/                # Estilos com Tailwind CSS
│   ├── utils/                 # Funções utilitárias (formatadores, helpers)
│   └── types/                 # Tipagens do TypeScript
├── .env.local                 # Variáveis de ambiente
├── next.config.js             # Configurações do Next.js
├── package.json               # Dependências e scripts
├── tailwind.config.js         # Configuração do Tailwind
└── tsconfig.json              # Configuração do TypeScript
```

## ▶️ Scripts

- `npm run dev`: Inicia o servidor de desenvolvimento
- `npm run build`: Cria uma build de produção
- `npm run start`: Inicia a aplicação em produção
- `npm run lint`: Executa a verificação de lint

## 🌐 Funcionalidades

- Autenticação com NextAuth
- Alternância de tema (claro/escuro)
- Cadastro e visualização de propriedades
- Controle de manutenções
- Notificações (com badge dinâmico)
- Integração com backend via serviços Axios
- UI responsiva com Tailwind e animações

## 🚀 Como Rodar Localmente

1. **Clone o repositório**

```bash
git clone https://github.com/Gaabriel22/DomusTrack.git
cd domustrack/frontend
```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:

   ```bash
   cp .env.local.example .env.local
   # Edite o arquivo com suas chaves e URLs
   ```

4. Inicie a aplicação:

   ```bash
   npm run dev
   ```

5. Acesse em: [http://localhost:3000](http://localhost:3000)

---

Feito com 💻 por Gabriel Amaral.
