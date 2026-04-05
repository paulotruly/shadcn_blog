# Shadcn Blog

Blog moderno desenvolvido com React, utilizando Shadcn UI para componentes estilizados e TanStack Router para navegação. O projeto consome a API REST do [Dummyjson](https://dummyjson.com) para demonstrar funcionalidades completas de um blog funcional.

**Demo:** https://shadcn-blog-ten.vercel.app/

### Funcionalidades

- **Autenticação**: Login/logout com persistência em cookies e contexto de autenticação
- **Timeline pública**: Lista de posts com paginação e visualização de detalhes
- **Dashboard administrativo**: Gerenciamento de posts (editar, excluir)
- **Comentários**: Sistema de visualização de comentários por post
- **Feedback visual**: Estados de loading, confirmações de ação e tratamento de erros

## Tecnologias

- **React 19** + Vite
- **TypeScript**
- **Tailwind CSS** + Shadcn UI
- **TanStack Router** - navegação com loaders e validação
- **Zod** - validação de schemas
- **Lucide React** - ícones
- **Dummyjson API** - API REST para dados de teste

## Rotas

| Rota | Descrição |
|------|-----------|
| `/` | Timeline de posts com paginação |
| `/post/$id` | Detalhes do post + comentários |
| `/login` | Página de login |
| `/dashboard` | Dashboard (protegido) |
| `/dashboard/` | Dashboard index |
| `/dashboard/posts` | Lista de posts no dashboard |
| `/dashboard/posts/$id/edit` | Editar post |

## Estrutura do Projeto

```
src/
├── api/
│   └── posts.ts          # Funções de API (getPosts, getComments, etc.)
├── components/
│   ├── ui/               # Componentes Shadcn (Card, Button, Table, etc.)
│   ├── Comments.tsx      # Lista de comentários
│   ├── Navbar.tsx        # Barra de navegação
│   ├── Pagination.tsx    # Componente de paginação
│   ├── PostBlog.tsx      # Card de post na timeline
│   ├── Timeline.tsx      # Lista de posts com paginação
│   └── DeleteConfirmationDialog.tsx # Dialog de confirmação
├── context/
│   └── AuthContext.tsx   # Contexto de autenticação
├── dashboard/            # Páginas do dashboard
├── hooks/
│   └── use-mobile.ts     # Hook para detectar mobile
├── lib/
│   ├── cookies.ts        # Utilitários de cookie
│   └── utils.ts          # Funções utilitárias
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
| `deletePost` | `DELETE /posts/{id}` | Deletar post |
| `getPostsByUserId` | `GET /posts/user/{id}` | Posts por usuário |
| Login | `POST /auth/login` | Autenticação |

## Melhorias Futuras

- [ ] **Feedback visual de login falho**: Exibir mensagem de erro animada na tela de login quando as credenciais forem inválidas
- [ ] **Formulário de cadastro**: Permitir registro de novos usuários
- [ ] **CRUD de posts no dashboard**: Adicionar funcionalidade de criar novos posts
- [ ] **Busca de posts**: Adicionar barra de pesquisa na timeline
- [ ] **Filtros por tags**: Filtrar posts por categoria/tag
- [ ] **Toast notifications**: Feedback não-bloqueante para ações do usuário

## Credenciais de teste

Para testar o login, utilize:
- **Usuário:** `emilys`
- **Senha:** `emilyspass`