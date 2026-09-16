# Rotas — Rota Milagres

Este diretório contém as páginas da aplicação Rota Milagres, um marketplace de turismo da Rota Ecológica de Alagoas. O projeto usa **TanStack Start**, **React**, **TypeScript** e roteamento baseado em arquivos.

Cada arquivo `.tsx` nesta pasta gera uma rota. O arquivo `src/routeTree.gen.ts` é criado automaticamente pelo plugin do TanStack Router; não o edite manualmente.

## Estrutura e layouts

| Arquivo                   | Responsabilidade                                                                               |
| ------------------------- | ---------------------------------------------------------------------------------------------- |
| `__root.tsx`              | Shell global: metadados, estilos, React Query, autenticação, rodapé, tratamento de erro e 404. |
| `index.tsx`               | Página inicial da vitrine.                                                                     |
| `clientes/route.tsx`      | Layout e proteção da área autenticada do cliente.                                              |
| `admin/route.tsx`         | Layout do painel administrativo.                                                               |
| `admin/clients/route.tsx` | Layout das páginas de gestão de clientes.                                                      |

Os layouts renderizam as rotas filhas por meio de `<Outlet />`.

## Rotas públicas

| URL                 | Arquivo                | Descrição                                           |
| ------------------- | ---------------------- | --------------------------------------------------- |
| `/`                 | `index.tsx`            | Home com destaques, categorias e promoções.         |
| `/categorias`       | `categorias.tsx`       | Catálogo de categorias.                             |
| `/categoria/:slug`  | `categoria.$slug.tsx`  | Lista de parceiros de uma categoria.                |
| `/parceiro/:slug`   | `parceiro.$slug.tsx`   | Detalhes do parceiro, galeria, contatos e reservas. |
| `/buscar`           | `buscar.tsx`           | Busca de parceiros.                                 |
| `/planos`           | `planos.tsx`           | Planos da plataforma.                               |
| `/entrar`           | `entrar.tsx`           | Entrada de administrador ou parceiro.               |
| `/entrar-admin`     | `entrar-admin.tsx`     | Entrada do administrador.                           |
| `/cliente-login`    | `cliente-login.tsx`    | Entrada do cliente.                                 |
| `/cadastro-cliente` | `cadastro-cliente.tsx` | Cadastro de cliente.                                |
| `/definir-senha`    | `definir-senha.tsx`    | Definição ou recuperação de senha.                  |
| `/painel`           | `painel.tsx`           | Área de painel legada/compartilhada.                |

### Dados da vitrine

As páginas de categorias e parceiros obtêm dados por `src/lib/catalog.ts`. O catálogo local em `src/data/catalog.json` serve como fallback; algumas funções também consomem a API configurada em `VITE_API_URL`.

Não inclua valores de exemplo de WhatsApp, chaves ou URLs privadas nas rotas. Use os dados cadastrados do parceiro e as variáveis de ambiente.

## Área do cliente

As rotas em `clientes/` são envolvidas por `clientes/route.tsx`. O layout valida a sessão com `useClienteAuth`; sem sessão válida, apresenta o acesso restrito e direciona para `/entrar`.

| URL                        | Arquivo                       | Descrição                   |
| -------------------------- | ----------------------------- | --------------------------- |
| `/clientes`                | `clientes/index.tsx`          | Início da área do cliente.  |
| `/clientes/painel-cliente` | `clientes/painel-cliente.tsx` | Painel resumido do cliente. |
| `/clientes/favoritos`      | `clientes/favoritos.tsx`      | Parceiros favoritados.      |
| `/clientes/contatos`       | `clientes/contatos.tsx`       | Histórico de contatos.      |
| `/clientes/vouchers`       | `clientes/vouchers.tsx`       | Vouchers emitidos.          |
| `/clientes/avaliacoes`     | `clientes/avaliacoes.tsx`     | Avaliações do cliente.      |
| `/clientes/perfil`         | `clientes/perfil.tsx`         | Dados do perfil.            |

Os serviços desse domínio ficam em `src/services/api-cliente.ts` e o estado de sessão é centralizado em `src/hooks/use-cliente-auth.tsx`.

## Administração

As rotas em `admin/` compartilham o menu lateral de `admin/route.tsx`. Elas utilizam os serviços `src/services/api.ts` e `src/services/api-cliente-admin.ts`.

| URL                        | Arquivo                       | Descrição                               |
| -------------------------- | ----------------------------- | --------------------------------------- |
| `/admin`                   | `admin/index.tsx`             | Dashboard administrativo.               |
| `/admin/partners`          | `admin/partners/index.tsx`    | Lista de parceiros.                     |
| `/admin/partners/create`   | `admin/partners/create.tsx`   | Cadastro de parceiro.                   |
| `/admin/partners/:id/edit` | `admin/partners/$id/edit.tsx` | Edição de parceiro.                     |
| `/admin/clients`           | `admin/clients/index.tsx`     | Lista de clientes.                      |
| `/admin/clients/create`    | `admin/clients/create.tsx`    | Cadastro de cliente pelo administrador. |
| `/admin/clients/:id`       | `admin/clients/$id.tsx`       | Visualização de cliente.                |
| `/admin/clients/:id/edit`  | `admin/clients/$id.edit.tsx`  | Edição de cliente.                      |

## Convenções de arquivos

| Padrão               | Exemplo                 | Resultado                 |
| -------------------- | ----------------------- | ------------------------- |
| Arquivo simples      | `planos.tsx`            | `/planos`                 |
| Segmento dinâmico    | `parceiro.$slug.tsx`    | `/parceiro/:slug`         |
| Rota índice em pasta | `clientes/index.tsx`    | `/clientes`               |
| Layout de pasta      | `clientes/route.tsx`    | Layout para `/clientes/*` |
| Rota filha dinâmica  | `admin/clients/$id.tsx` | `/admin/clients/:id`      |

Ao criar uma página, exporte a rota usando `createFileRoute` com o caminho correspondente:

tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/minha-rota")({
  component: MinhaRota,
});


Use `Link` do `@tanstack/react-router` para navegação interna. Para parâmetros dinâmicos, use `params`, por exemplo: `to="/parceiro/$slug"` e `params={{ slug: partner.slug }}`.

## Ambiente e execução

A integração com o backend depende de `VITE_API_URL`. A autenticação Supabase também pode utilizar `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` conforme `src/lib/supabase.ts`.

bash
npm install
npm run dev
npm run lint
npm run build


Mantenha a rota, seus metadados (`head`) e os estados de carregamento/erro alinhados aos dados que ela consome. Antes de alterar nomes ou mover arquivos de rota, confira a árvore gerada e os links que apontam para a URL afetada.
