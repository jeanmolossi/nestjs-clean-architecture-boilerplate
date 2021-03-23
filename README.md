# Bem vindo ao WX Catarina

Projeto direcionado à Descomplica

## Proposta

Ser um sistema completo de gerenciamento com as tecnologias mais atuais de mercado e os melhores padrões de desenvolvimento.

# :pushpin: Tabela de Conteúdos

- :pushpin: [Início](#:pushpin:-tabela-de-conteúdos)
- :construction_worker: [Início](#:construction_worker:-instalação)
- :footprints: [Primeiros passos](#:footprints:-primeiros-passos)
- :construction: [Estrutura](#:construction:-estrutura)
- - :computer: [Comandos úteis](#:computer:-comandos-úteis)
- - :open_file_folder: [Diretórios](#:open_file_folder:-diretórios)
- :bookmark_tabs: [Branches](#:bookmark_tabs:-branches)

# :bookmark: Outras documentações

Confira documentações de outras partes deste sistema

- [API](./app)
- [Sistema Web](https://bitbucket.org/w2bit/)
- [App TV](https://bitbucket.org/w2bit/)
- [App Mobile](https://bitbucket.org/w2bit/)

# :construction_worker: Instalação

**Você precisa primeiramente ter instalado o [NodeJS](https://nodejs.org/) (>= 10.13.0), o [Nest CLI](https://docs.nestjs.com/cli/overview), o [Yarn](https://yarnpkg.com/), o [Docker](https://docs.docker.com/get-docker/) e [Docker compose](https://docs.docker.com/compose/install/) e então:**

`git clone https://{seu_user}@bitbucket.org/w2bit/desc-backend.git`

Passo 1:

`cd desc-backend/app` - acesso à pasta da api

Passo 2:

`yarn install:env` - para instalação de variaveis de ambiente

Passo 3:

`cd ../` - volte ao diretório raiz

Passo 4:

`docker-compose up` para rodar o ambiente, ou `docker-compose up -d` para rodar o ambiente em background

Passo 5:

`docker exec -it api sh` para abrir o container.

Passo 6:

`yarn typeorm migration:run` para rodar as migrations e montar o banco de dados

## Troubleshoot

Em caso de problemas com as migrations ao tentar rodar novamente ou rodar um `yarn typeorm migration:revert`:

Execute: `docker exec -it api sh` e em seguida:
`yarn migration:revert-all && yarn typeorm migration:run && exit`.

# :footprints: Primeiros passos

Extensões recommendadas VSCode:

- [Eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Prettier-eslint](https://marketplace.visualstudio.com/items?itemName=rvest.vs-code-prettier-eslint)
- [Editor config](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- Bônus
  - [Material Icon Folder Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)

# :book: Considerações importantes

**Migrations com relacionamentos devem sempre possuir as configurações: onUpdate e onDelete**.

**Manter documentação sempre atualizada!**

# :construction: Estrutura

Documentação da estrutura movida para [README.md](./app) dentro da pasta `app`

Comando útil para acessar a máquina virtual de deploy

**EC2 - Instânce 1**
`SEM endereço`

# :bookmark_tabs: Branches e contribuições

Novas features e novas implementações faremos para a branch
develop.

Não faremos push para a branch `staging` nem mesmo para a `master`.

Toda a atualização dessas branches serão feitas por pull request.

Descrição das branches:

- `master` - Ambiente de produção
- `staging` - Ambiente de testes (Ambiente de staging - Roda a pipeline de deploy)
- `develop` - Ambiente de desenvolvimento (Agregador de branch)

A **sugestão** é que para cada contribuição você crie uma nova branch no modelo: `${oq_é? feature,hotfix, refactor}/${nome_da_feature}` e faça o pull request para a branch de `develop`
# nestjs-clean-architecture-boilerplate
