# React + Shadcn Blog
Projeto de blog para aprender a usar Shadcn em aplicações React com TanStack Router.

## O que foi aprendido

### Fundamentos
- Setup inicial de um projeto React com Vite e Shadcn
- Estilização com Tailwind CSS
- Componentes UI customizados (Card, Button, Input, etc.)
- Ícones com Lucide React

### Rotas
- **TanStack Router** para navegação entre páginas
- Validação de query/search parameters com Zod
- Rotas com loaders para buscar dados antes de renderizar
- Validação de paginação (redirect se página > total)
- Navegação programática com `useNavigate`

### Dados
- Requisições HTTP para API REST (dummyjson)
- Service layer para organização (`api/posts.ts`)
- Tipagem TypeScript para responses da API
- Fetch de posts com paginação (limit/skip)
- Fetch de posts individuais por ID
- Fetch de comentários por post

### Componentes
- Timeline com paginação de posts
- Cards de posts estilizados com Shadcn
- Componente de comentários
- Botão de voltar com navegação
- Navbar

## Tecnologias

- **React 19** + Vite
- **TypeScript**
- **Tailwind CSS** + Shadcn
- **TanStack Router** - navegação e rotas
- **Zod** - validação de schemas
- **Lucide React** - ícones
- **Dummyjson API** - API REST para testes

## Rotas

| Rota | Descrição |
|------|-----------|
| `/` | Timeline de posts com paginação |
| `/post/$id` | Detalhes do post + comentários |
| `/login` | Página de login |
| `/dashboard` | Dashboard (layout) |
| `/dashboard/` | Dashboard index |
| `/dashboard/posts` | Lista de posts no dashboard |
| `/dashboard/posts/$id/edit` | Editar post |

## Estrutura do Projeto

```
src/
├── api/
│   └── posts.ts          # Funções de API (getPosts, getComments, etc.)
├── components/
│   ├── ui/               # Componentes Shadcn (Card, Button, etc.)
│   ├── Comments.tsx      # Lista de comentários
│   ├── Navbar.tsx        # Barra de navegação
│   ├── Pagination.tsx    # Componente de paginação
│   ├── PostBlog.tsx      # Card de post na timeline
│   └── Timeline.tsx      # Lista de posts com paginação
├── dashboard/            # Páginas do dashboard
├── pages/
│   ├── Home.tsx          # Página principal (timeline)
│   ├── Login.tsx         # Página de login
│   └── PostPage.tsx      # Página de detalhes do post
├── types/
│   └── index.ts          # Definições de tipos (Post, Comment, etc.)
├── App.tsx               # Componente raiz
├── main.tsx              # Entry point
└── router.ts             # Configuração de rotas TanStack
```

## API Endpoints (dummyjson)

| Função | Endpoint | Descrição |
|--------|----------|-----------|
| `getPosts` | `GET /posts?limit&skip` | Lista paginada de posts |
| `getPost` | `GET /posts/{id}` | Post individual |
| `getComments` | `GET /posts/{id}/comments` | Comentários de um post |
| `updatePost` | `PUT /posts/{id}` | Atualizar post |
| `getTotalPosts` | `GET /posts` | Total de posts |
