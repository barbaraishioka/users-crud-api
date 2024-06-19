# Projeto de API REST com Node.js, Express, Prisma e MongoDB

Este projeto é uma API REST simples para gerenciar usuários em um banco de dados MongoDB. A API oferece endpoints para obter a lista de usuários, criar um novo usuário, atualizar um usuário existente e deletar um usuário.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript
- **Express**: Framework para desenvolvimento de APIs RESTful
- **Prisma Client**: ORM (Object-Relational Mapper) para interagir com bancos de dados
- **MongoDB**: Banco de dados NoSQL

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/barbaraishioka/users-crud-api.git

cd users-crud-api/
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:

- Crie um arquivo .env na raiz do projeto e adicione a URL de conexão do MongoDB:

```env
DATABASE_URL="mongodb+srv://<username>:<password>@cluster.mongodb.net/Users?retryWrites=true&w=majority&appName=Users"
```

4. Configure o Prisma:

- Gere o client do Prisma:

```bash
npx prisma db push
```

5. Inicie o Prisma Studio para visualizar e manipular os dados:

```bash
npx prisma studio
```

## Execução

- Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O servidor estará disponível em http://localhost:3000.

## Endpoints

### Obter lista de usuários

- GET /users
- Retorna uma lista de todos os usuários.

### Obter usuário por ID

- GET /users/
- Parâmetros: id (ID do usuário)
- Retorna os dados de um usuário específico.

### Criar novo usuário

- POST /users
- Corpo da requisição:

```json
{
  "name": "Nome do Usuário",
  "email": "email@exemplo.com",
  "age": 25
}
```

- Cria um novo usuário com os dados fornecidos.

### Atualizar usuário por ID

- PUT /users/
- Parâmetros: id (ID do usuário)
- Corpo da requisição

```json
{
  "name": "Nome Atualizado",
  "email": "email@exemplo.com",
  "age": 26
}
```

- Atualiza os dados de um usuário específico.

### Deletar usuário por ID

- DELETE /users/
- Parâmetros: id (ID do usuário)
- Deleta um usuário específico.

## Middlewares

- Validação de campos obrigatórios: Verifica se os campos name, email e age estão presentes no corpo da requisição.

- Verificação de existência do usuário: Verifica se o usuário existe no banco de dados antes de operações de busca, atualização ou deleção por ID.

## Estrutura do Projeto

[Visualizar estrutura](./directory_structure.md)

- `index.js`: Arquivo principal da aplicação onde as rotas e middlewares são definidos.

- `prisma/`: Pasta onde fica o arquivo de configuração do Prisma.

  - `schema.prisma`: Arquivo de configuração do Prisma onde são definidas as estruturas das tabelas do banco de dados.

- `.env`: Arquivo de variáveis de ambiente.

- `package.json`: Arquivo de configuração do projeto, contendo informações sobre dependências e scripts.

- `package-lock.json`: Arquivo de bloqueio de versões das dependências.

- `.gitignore`: Arquivo que lista os arquivos e diretórios que devem ser ignorados pelo Git.

- `README.md`: Arquivo README.md do projeto.

- `info/`: Pasta onde detalhei meus aprendizados.

  - `conceitos.txt`: Arquivo com conceitos importantes sobre o projeto.

  - `passo-a-passo.txt`: Arquivo com o passo a passo para configuração e execução do projeto.

  - `sobre-projeto.txt`: Arquivo com informações detalhadas sobre o projeto e sua finalidade.

## Comandos Úteis

- Inicializar projeto:

```bash
npm init -y
```

- Instalar dependências:

```bash
npm install express dotenv @prisma/client

npm install prisma --save-dev
```

- Executar servidor em modo de desenvolvimento:

```bash
npm run dev
```

- Executar Prisma Studio:

```bash
npx prisma studio
```

- Gerar client do Prisma:

```bash
npx prisma db push
```

## Autora

Bárbara Ishioka

## Licença

Este projeto está licenciado sob a licença ISC.

## Observações

- Certifique-se de substituir `<username>` e `<password>` nas variáveis de ambiente pelo seu nome de usuário e senha do MongoDB.

- Para fins de segurança, nunca compartilhe seu arquivo `.env` ou outras credenciais sensíveis publicamente.

- Use o Thunder Client, Prisma e Prisma Insider para facilitar o desenvolvimento e testes da API.
