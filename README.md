# Boilerplate NestJS CRUD

Este projeto é um boilerplate para um CRUD completo usando NestJS, Prisma e validação robusta com class-validator. Ele cobre as entidades Company, Product e Responsible, com testes unitários e e2e seguindo boas práticas de mercado.

## Como rodar o projeto

1. **Padronize a versão do Node com NVM:**

```sh
nvm install
nvm use
```

2. **Suba o banco de dados com Docker:**

```sh
docker-compose up -d
```

3. **Instale as dependências:**

```sh
npm install
```

4. **Execute as migrations do Prisma:**

```sh
npx prisma migrate dev
```

5. **Rode a aplicação:**

```sh
npm run start:dev
```

6. **Rode os testes:**

```sh
npm run test
```

## Estrutura do projeto

- `src/`
  - `company/` - Módulo de empresas (controller, service, DTOs, repositórios)
  - `product/` - Módulo de produtos (controller, service, DTOs, repositórios)
  - `responsible/` - Módulo de responsáveis (controller, service, DTOs, repositórios)
  - `common/` - Utilitários e DTOs compartilhados
- `test/` - Testes e2e e helpers de setup
- `prisma/` - Migrations e schema do banco

## Tecnologias principais
- NestJS
- Prisma ORM
- class-validator / class-transformer
- Jest (testes unitários e e2e)
- Docker
- MSQL
- NVM (gestão de versão do Node)

## Autor

- Nome: João Neto - Dev-Etto
- Email: contato.devetto@gmail.com
- LinkedIn: https://www.linkedin.com/in/dev-etto/
- GitHub: https://github.com/Dev-Etto

Fique à vontade para entrar em contato! 🚀
