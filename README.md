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

5. **Popule o banco com dados de exemplo:**

```sh
npm run prisma:seed
```

6. **Rode a aplicação:**

```sh
npm run start:dev
```

7. **Acesse a documentação Swagger:**

Acesse [http://localhost:3000/api-docs](http://localhost:3000/api-docs) para visualizar e testar a API documentada automaticamente pelo Swagger.

8. **Rode os testes:**

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
- `prisma/` - Migrations, schema do banco e seeders

## Tecnologias principais
- NestJS
- Prisma ORM
- class-validator / class-transformer
- Jest (testes unitários e e2e)
- Docker (banco de dados)
- NVM (gestão de versão do Node)
- Swagger (documentação automática da API)

## Autor

- Nome: João Neto - Dev-Etto
- Email: contato.devetto@gmail.com
- LinkedIn: https://www.linkedin.com/in/dev-etto/
- GitHub: https://github.com/Dev-Etto

Fique à vontade para entrar em contato! 🚀
