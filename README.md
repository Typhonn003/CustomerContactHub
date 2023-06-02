# HubLinkup

Este é um projeto desenvolvido para a entrega fullstack da Kenzie Academy Brasil, ele consiste em uma aplicação back end desenvolvido em NestJS e Prisma.

## Instalando as dependências

Se você estiver usando npm, execute o seguinte comando no diretório raiz do projeto:

```bash
npm install
```

Se você estiver usando Yarn, execute o seguinte comando no diretório raiz do projeto:

```bash
yarn
```

## Configurações iniciais

### Crie um database

Antes de tudo, certifique-se de criar um database com PostgreSQL utilizando o nome de sua preferência.

### Configure as variáveis de ambiente

Dentro do diretorio do projeto, renomeie o arquivo ".env.example" para ".env", em seguida abra o arquivo ".env" e configure os campos da "DATABASE_URL" com seus dados do PostgreSQL, por fim escolha uma "SECRET_KEY".

Exemplo de como deve ficar:

```bash
DATABASE_URL="postgresql://MeuUsuario:MinhaSenha@localhost:5432/NomeDoDatabase?schema=public"
SECRET_KEY="HubLinkup"
```

### Faça as migrações para o database

Após as configurações anteriores, execute o seguinte comando no diretório raiz do projeto:

```bash
npx prisma migrate dev
```

## Iniciando servidor

Se você estiver usando npm, execute o seguinte comando no diretório raiz do projeto:

```bash
npm start run:dev
```

Se você estiver usando Yarn, execute o seguinte comando no diretório raiz do projeto:

```bash
yarn start run:dev
```

Caso queira encerrar o servidor, aperte as teclas CTRL+C no terminal.

# Documentação

<a href="https://insomnia.rest/run/?label=HubLinkup_back&uri=https%3A%2F%2Fgithub.com%2FTyphonn003%2FHubLinkup_back%2Fblob%2Fdevelop%2FInsomnia_HubLinkup_back.json" target="_blank"><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"></a>

Para importar o JSON no Insomnia, basta clicar no botão "Run in Insomnia" e seguir os passos fornecidos para importar todos os endpoints para o seu ambiente do Insomnia. Dentro do Insomnia, certifique-se de trocar do modo "Design" para o modo "Debug" no topo da tela.

<h2 align=center>CRUD de Usuário</h2>

## Cadastro de usuário

`POST /customers - CORPO DA REQUISIÇÃO`

```json
{
  "fullName": "User Named One",
  "email": "one@mail.com",
  "password": "12345678",
  "phoneNumber": "(21) 90000-0000"
}
```

Chaves extras não serão validadas pelo sistema.

`POST /customers - FORMATO DA RESPOSTA - STATUS 201 CREATED`

```json
{
  "id": "99761784-5e9f-4762-ab2b-72477705d159",
  "registrationDate": "2023-06-01T03:00:00.000Z",
  "fullName": "User Named One",
  "email": "one@mail.com",
  "phoneNumber": "(21) 90000-0000"
}
```

## Possíveis erros

Email já cadastrado:

`POST /customers - FORMATO DA RESPOSTA - STATUS 409 CONFLICT`

```json
{
  "statusCode": 409,
  "message": "User already exists",
  "error": "Conflict"
}
```

Campo obrigatório faltando (faltando o email no exemplo):

`POST /customers - FORMATO DA RESPOSTA - STATUS 400 BAD REQUEST`

```json
{
  "statusCode": 400,
  "message": ["email should not be empty", "email must be an email"],
  "error": "Bad Request"
}
```

## Login de usuário

`POST /login - CORPO DA REQUISIÇÃO`

```json
{
  "email": "one@mail.com",
  "password": "12345678"
}
```

`POST /login - FORMATO DA RESPOSTA - STATUS 200 OK`

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im9uZUBtYWlsLmNvbSIsImlhdCI6MTY4NTY1NDI5MywiZXhwIjoxNjg1NjU3ODkzLCJzdWIiOiI5OTc2MTc4NC01ZTlmLTQ3NjItYWIyYi03MjQ3NzcwNWQxNTkifQ.ccG3Qsg_q4o1nVOt5BMGkln0yrf--XehO8_WwSM80uc"
}
```

## Possíveis erros

Email ou senha inválida:

`POST /login - FORMATO DA RESPOSTA - STATUS 401 UNAUTHORIZED`

```json
{
  "statusCode": 401,
  "message": "Invalid email or password",
  "error": "Unauthorized"
}
```

## Buscar todos os usuários

`GET /customers - FORMATO DA RESPOSTA - STATUS 200 OK`

```json
[
	{
		"id": "99761784-5e9f-4762-ab2b-72477705d159",
		"registrationDate": "2023-06-01T03:00:00.000Z",
		"fullName": "User Named One",
		"email": "one@mail.com",
		"phoneNumber": "(21) 90000-0000"
	},
	{
		"id": "646aa685-0ef5-477a-aca7-e2f0cbe764f5",
		"registrationDate": "2023-06-01T03:00:00.000Z",
		"fullName": "User Named Three",
		"email": "three@mail.com",
		"phoneNumber": "(21) 90000-0000"
	},
	...
]
```

## Buscar um único usuário

`GET /customers/ID - PARÂMETRO DA REQUISIÇÃO`

```json
É necessario enviar um ID de usuário válido como parâmetro da requisição.
Exemplo: "/customers/99761784-5e9f-4762-ab2b-72477705d159"
```

`GET /customers/ID - FORMATO DA RESPOSTA - STATUS 200 OK`

```json
{
  "id": "99761784-5e9f-4762-ab2b-72477705d159",
  "registrationDate": "2023-06-01T03:00:00.000Z",
  "fullName": "User Named One",
  "email": "one@mail.com",
  "phoneNumber": "(21) 90000-0000"
}
```

## Possíveis erros

ID inválido:

`POST /customers/ID - FORMATO DA RESPOSTA - STATUS 404 NOT FOUND`

```json
{
  "statusCode": 404,
  "message": "User not found",
  "error": "Not Found"
}
```

## Rotas autênticadas e dono do conteúdo

Rotas que requerem autenticação devem incluir o campo "Authorization" no cabeçalho da requisição, como demonstrado no seguinte exemplo:

```json
Authorization: Bearer {token}
```

Caso seja feita alguma requisição nessa rota sem estar autênticado, terá o seguinte erro:

`FORMATO DA RESPOSTA - STATUS 401 UNAUTHORIZED`

```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

## Buscar perfil do usuário logado

`GET /customers/profile - FORMATO DA RESPOSTA - STATUS 200 OK`

```json
{
  "id": "be2da69c-4ce2-42d0-b8b3-8b374dd304d8",
  "registrationDate": "2023-06-01T03:00:00.000Z",
  "fullName": "User Named One",
  "email": "one@mail.com",
  "phoneNumber": "(21) 90000-0000",
  "contacts": []
}
```

## Editar usuário

`PATCH /customers/ID - PARÂMETRO DA REQUISIÇÃO E CORPO DA REQUISIÇÃO`

```json
É necessario enviar um ID de usuário válido como parâmetro da requisição.
Exemplo: "/customers/99761784-5e9f-4762-ab2b-72477705d159"
```

```json
{
  "fullName": "Just One"
  // Você pode enviar quantos campos quiser
  // Tem que ser enviado ao menos um dos campos
}
```

`PATCH /customers/ID - FORMATO DA RESPOSTA - STATUS 200 OK`

```json
{
  "id": "99761784-5e9f-4762-ab2b-72477705d159",
  "registrationDate": "2023-06-01T03:00:00.000Z",
  "fullName": "Just One",
  "email": "one@mail.com",
  "phoneNumber": "(21) 90000-0000"
}
```

## Possíveis erros

ID inválido:

`PATCH /customers/ID - FORMATO DA RESPOSTA - STATUS 404 NOT FOUND`

```json
{
  "statusCode": 404,
  "message": "User not found",
  "error": "Not Found"
}
```

Conteúdo de outro usuário:

`PATCH /customers/ID - FORMATO DA RESPOSTA - STATUS 401 UNAUTHORIZED`

```json
{
  "statusCode": 401,
  "message": "You are not the owner of this content",
  "error": "Unauthorized"
}
```

Email já cadastrado:

`PATCH /customers/ID - FORMATO DA RESPOSTA - STATUS 409 CONFLICT`

```json
{
  "statusCode": 409,
  "message": "User already exists",
  "error": "Conflict"
}
```

## Excluir usuário

`DELETE /customers/ID - PARÂMETRO DA REQUISIÇÃO`

```json
É necessario enviar um ID de usuário válido como parâmetro da requisição.
Exemplo: "/customers/99761784-5e9f-4762-ab2b-72477705d159"
```

`DELETE /customers/ID - FORMATO DA RESPOSTA - STATUS 204`

```json
Não retornará nada na resposta.
```

## Possíveis erros

ID inválido:

`DELETE /customers/ID - FORMATO DA RESPOSTA - STATUS 404 NOT FOUND`

```json
{
  "statusCode": 404,
  "message": "User not found",
  "error": "Not Found"
}
```

Conteúdo de outro usuário:

`DELETE /customers/ID - FORMATO DA RESPOSTA - STATUS 401 UNAUTHORIZED`

```json
{
  "statusCode": 401,
  "message": "You are not the owner of this content",
  "error": "Unauthorized"
}
```

<h2 align=center>CRUD de Contato</h2>

## Rotas autênticadas e dono do conteúdo

Rotas que requerem autenticação devem incluir o campo "Authorization" no cabeçalho da requisição, como demonstrado no seguinte exemplo:

```json
Authorization: Bearer {token}
```

Caso seja feita alguma requisição nessa rota sem estar autênticado, terá o seguinte erro:

`FORMATO DA RESPOSTA - STATUS 401 UNAUTHORIZED`

```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

## Cadastro de contato

`POST /contacts - CORPO DA REQUISIÇÃO`

```json
{
  "fullName": "Contact Named One",
  "email": "contactone@mail.com",
  "phoneNumber": "(21) 90000-0000"
}
```

Chaves extras não serão validadas pelo sistema.

`POST /contacts - FORMATO DA RESPOSTA - STATUS 201 CREATED`

```json
{
  "id": "bb8b8ba5-119c-4176-a33e-b6d7ff30c7b5",
  "fullName": "Contact Named One",
  "email": "contactone@mail.com",
  "phoneNumber": "(21) 90000-0000",
  "registrationDate": "2023-06-01T03:00:00.000Z",
  "customerId": "99761784-5e9f-4762-ab2b-72477705d159"
}
```

## Possíveis erros

Email já cadastrado:

`POST /contacts - FORMATO DA RESPOSTA - STATUS 409 CONFLICT`

```json
{
  "statusCode": 409,
  "message": "User already exists",
  "error": "Conflict"
}
```

Campo obrigatório faltando (faltando o email no exemplo):

`POST /contacts - FORMATO DA RESPOSTA - STATUS 400 BAD REQUEST`

```json
{
  "statusCode": 400,
  "message": ["email should not be empty", "email must be an email"],
  "error": "Bad Request"
}
```

## Buscar todos os contatos

`GET /contacts - FORMATO DA RESPOSTA - STATUS 200 OK`

```json
[
	{
		"id": "bb8b8ba5-119c-4176-a33e-b6d7ff30c7b5",
		"fullName": "Contact Named One",
		"email": "contactone@mail.com",
		"phoneNumber": "(21) 90000-0000",
		"registrationDate": "2023-06-01T03:00:00.000Z",
		"customerId": "99761784-5e9f-4762-ab2b-72477705d159"
	},
	{
		"id": "491796ec-717c-4abd-bbf4-65bae6bf3fdc",
		"fullName": "Contact Named Two",
		"email": "contacttwo@mail.com",
		"phoneNumber": "(21) 90000-0000",
		"registrationDate": "2023-06-01T03:00:00.000Z",
		"customerId": "99761784-5e9f-4762-ab2b-72477705d159"
	},
	...
]
```

## Buscar um único contato

`GET /contacts/ID - PARÂMETRO DA REQUISIÇÃO`

```json
É necessario enviar um ID de contato válido como parâmetro da requisição.
Exemplo: "/contacts/bb8b8ba5-119c-4176-a33e-b6d7ff30c7b5"
```

`GET /contacts/ID - FORMATO DA RESPOSTA - STATUS 200 OK`

```json
{
  "id": "bb8b8ba5-119c-4176-a33e-b6d7ff30c7b5",
  "fullName": "Contact Named One",
  "email": "contactone@mail.com",
  "phoneNumber": "(21) 90000-0000",
  "registrationDate": "2023-06-01T03:00:00.000Z",
  "customerId": "99761784-5e9f-4762-ab2b-72477705d159"
}
```

## Possíveis erros

ID inválido:

`POST /contacts/ID - FORMATO DA RESPOSTA - STATUS 404 NOT FOUND`

```json
{
  "statusCode": 404,
  "message": "User not found",
  "error": "Not Found"
}
```

Contato de outro usuário:

`PATCH /contacts/ID - FORMATO DA RESPOSTA - STATUS 401 UNAUTHORIZED`

```json
{
  "statusCode": 401,
  "message": "You are not the owner of this contact",
  "error": "Unauthorized"
}
```

## Editar contato

`PATCH /contacts/ID - PARÂMETRO DA REQUISIÇÃO E CORPO DA REQUISIÇÃO`

```json
É necessario enviar um ID de contato válido como parâmetro da requisição.
Exemplo: "/contacts/bb8b8ba5-119c-4176-a33e-b6d7ff30c7b5"
```

```json
{
  "email": "contactnewone@mail.com"
  // Você pode enviar quantos campos quiser
  // Tem que ser enviado ao menos um dos campos
}
```

`PATCH /contacts/ID - FORMATO DA RESPOSTA - STATUS 200 OK`

```json
{
  "id": "bb8b8ba5-119c-4176-a33e-b6d7ff30c7b5",
  "fullName": "Contact Named One",
  "email": "contactnewone@mail.com",
  "phoneNumber": "(21) 90000-0000",
  "registrationDate": "2023-06-01T03:00:00.000Z",
  "customerId": "99761784-5e9f-4762-ab2b-72477705d159"
}
```

## Possíveis erros

ID inválido:

`PATCH /contacts/ID - FORMATO DA RESPOSTA - STATUS 404 NOT FOUND`

```json
{
  "statusCode": 404,
  "message": "User not found",
  "error": "Not Found"
}
```

Contato de outro usuário:

`PATCH /contacts/ID - FORMATO DA RESPOSTA - STATUS 401 UNAUTHORIZED`

```json
{
  "statusCode": 401,
  "message": "You are not the owner of this contact",
  "error": "Unauthorized"
}
```

Email já cadastrado:

`PATCH /contacts/ID - FORMATO DA RESPOSTA - STATUS 409 CONFLICT`

```json
{
  "statusCode": 409,
  "message": "User already exists",
  "error": "Conflict"
}
```

## Excluir contato

`DELETE /contacts/ID - PARÂMETRO DA REQUISIÇÃO`

```json
É necessario enviar um ID de contato válido como parâmetro da requisição.
Exemplo: "/contacts/bb8b8ba5-119c-4176-a33e-b6d7ff30c7b5"
```

`DELETE /contacts/ID - FORMATO DA RESPOSTA - STATUS 204`

```json
Não retornará nada na resposta.
```

## Possíveis erros

ID inválido:

`DELETE /contacts/ID - FORMATO DA RESPOSTA - STATUS 404 NOT FOUND`

```json
{
  "statusCode": 404,
  "message": "User not found",
  "error": "Not Found"
}
```

Contato de outro usuário:

`DELETE /contacts/ID - FORMATO DA RESPOSTA - STATUS 401 UNAUTHORIZED`

```json
{
  "statusCode": 401,
  "message": "You are not the owner of this contact",
  "error": "Unauthorized"
}
```

Feito com amor por Diego de Lima Almeida, aluno da T14 da Kenzie Academy Brasil. :)
