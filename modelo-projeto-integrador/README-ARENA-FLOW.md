# Arena Flow — Projeto Integrador

Projeto acadêmico de gerenciamento de campeonatos esportivos, adaptado diretamente do modelo disponibilizado pelo professor.

## Tecnologias e estrutura

- Angular 20 e Angular Material 20.
- NgModules e componentes com `standalone: false`.
- Angular Router com carregamento lazy das páginas.
- Menu lateral e cabeçalho compartilhados pelo layout.
- `router-outlet` utilizado somente para trocar o conteúdo das páginas.
- Menu responsivo: abaixo de 768 px, abre como sobreposição e fecha após selecionar uma página.
- Tema local Azure/Blue do Angular Material, sem Google Fonts ou fontes externas de ícones.

## Executar

Requer Node.js 20.19+, 22.12+ ou 24+. Na pasta do projeto, execute:

```bash
npm ci
npm start
```

Acesse http://localhost:4200.

## Páginas desta primeira versão

- **Início** (`/inicio`): apresentação do Arena Flow e acesso ao cadastro.
- **Campeonatos** (`/projetos`): formulário de cadastro com Angular Material e lista dos campeonatos cadastrados. Permite cadastrar, editar e excluir registros durante a sessão atual.

> Nesta primeira versão, os registros ficam somente em memória e são perdidos ao atualizar ou fechar a aplicação. A integração com API e banco de dados será desenvolvida em uma etapa posterior.

## Organização

- `src/app/app.module.ts`: módulo principal.
- `src/app/app-routing.module.ts`: rotas e lazy loading.
- `src/app/layout/`: menu, cabeçalho e `router-outlet`.
- `src/app/pages/inicio/`: página inicial.
- `src/app/pages/projetos/`: cadastro e listagem de campeonatos.
- `src/styles.css`: estilos compartilhados.
- `angular.json`: configuração e tema do Angular Material.

## Verificação

```bash
npm run build
```

Teste também os links do menu, o recolhimento do menu, o acesso direto a `/projetos`, a atualização do navegador nessa rota e o comportamento em telas menores que 768 px.
