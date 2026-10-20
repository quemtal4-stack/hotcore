# Hotcore

Projeto **Hotcore** desenvolvido com **Next.js**, **TypeScript**, **Tailwind CSS**, **Prisma** e **PostgreSQL/Supabase**.

O sistema gerencia eventos, ingressos, lotes, camisas, tamanhos, kits de alimentação, livros, planos de clube, usuários, pedidos, pagamentos e vendas.

---

## Tecnologias

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Supabase](https://supabase.com/)

---

## Pré-requisitos

Antes de iniciar, instale:

- Node.js
- npm
- Git

Também é necessário ter um banco PostgreSQL configurado, por exemplo no Supabase.

---

## Instalação

Clone o projeto:

```bash
git clone <url-do-repositorio>
```

Acesse a pasta do projeto:

```bash
cd hotcore
```

Instale as dependências:

```bash
npm install
```

---

## Variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto.

Exemplo:

```env
DATABASE_URL="postgresql://usuario:senha@host:5432/postgres?schema=public"
DIRECT_URL="postgresql://usuario:senha@host:5432/postgres?schema=public"
```

> Não envie arquivos `.env.local` para o repositório.

---

## Prisma

Gerar o Prisma Client:

```bash
npx prisma generate
```

Executar as migrations:

```bash
npx prisma migrate dev
```

Executar o seed:

```bash
npx prisma db seed
```

Abrir o Prisma Studio:

```bash
npx prisma studio
```

---

## Seed

O seed inicial cria dados principais do sistema, incluindo:

- Evento
- Lotes
- Camisas
- Tamanhos de camisa
- Planos do clube
- Kits de alimentação
- Livros

Para executar:

```bash
npx prisma db seed
```

---

## Desenvolvimento

Execute o servidor local:

```bash
npm run dev
```

Depois acesse:

```bash
http://localhost:3000
```

---

## Build

Gerar build de produção:

```bash
npm run build
```

Executar em modo produção:

```bash
npm run start
```

---

## Estrutura principal

```bash
hotcore/
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   └── seed.ts
├── src/
│   ├── app/
│   ├── components/
│   ├── generated/
│   └── lib/
├── public/
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## Banco de dados

Tabelas atuais do projeto:

- `_prisma_migrations`
- `camisa_tamanhos`
- `camisas`
- `clube_membros`
- `colecao_usuario`
- `compras`
- `compras_ingressos`
- `eventos`
- `ingressos`
- `kits_alimentacao`
- `livros`
- `lotes`
- `membros_clube`
- `modelos_ingresso`
- `notificacoes`
- `pagamentos`
- `pedidos`
- `pedidos_camisa`
- `pedidos_kit_alimentacao`
- `pedidos_livro`
- `pessoas`
- `planos_clube`
- `users`
- `usuario_colecao`
- `usuarios`
- `usuarios_colecao`
- `vendas`

---

## Observação sobre UUID no PostgreSQL

Caso alguma migration use:

```sql
uuid_generate_v4()
```

é necessário garantir que a extensão esteja ativa no banco:

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

Em bancos Supabase/PostgreSQL, isso pode ser feito pelo SQL Editor.

---

## Comandos úteis

```bash
npx prisma generate
npx prisma migrate dev
npx prisma db seed
npx prisma studio
npm run dev
npm run build
npm run start
```

---

## Deploy

O projeto pode ser publicado na [Vercel](https://vercel.com/).

Antes do deploy, configure as variáveis de ambiente no painel da Vercel.

