# Desafio Técnico - Desenvolvedor(a) Backend

Este projeto é uma API REST desenvolvida em Node.js com NestJS para gerenciar um CRUD de produtos. Ele utiliza MariaDB como banco de dados e é containerizado com Docker para facilitar a execução e o gerenciamento do ambiente de desenvolvimento.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **NestJS**: Framework para construção de aplicações server-side.
- **MariaDB**: Banco de dados relacional.
- **Docker**: Containerização da aplicação e do banco de dados.
- **Swagger/OpenAPI**: Documentação da API.
- **Zod**: Biblioteca para validação de dados.

## Instalação e Execução

### Pré-requisitos

Docker e Docker Compose instalados.

### Passos para Execução
#### Clone o repositório:

git clone https://github.com/oliveiratullio/agsistemas-backend.git
cd desafio-backend

#### Instale as dependências do projeto:

```bash
npm install --legacy-peer-deps
```
#### Gere o build do projeto:

```bash
npm run build
```
#### Execute o Docker Compose:

```bash
docker-compose up -build
```

#### Acesse a API:

A aplicação estará disponível em http://localhost:3000.
A documentação da API (Swagger UI) estará disponível em http://localhost:3000/api.

#### Para parar os contêineres:

docker-compose down

## Exemplos de requisições e Respostas

### Autenticação com JWT

Alguns endpoints exigem autenticação via token JWT. Para obter o token, faça login na API.

#### 1. Login (POST /auth/login ):

```json
curl -X POST http://localhost:3000/auth/login \
-H "Content-Type: application/json" \
-d '{
  "username": "admin",
  "password": "admin123"
}'
```
##### Resposta:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```
##### Usar o token para acessar recursos protegidos:
Para acessar endpoints protegidos, inclua o token no cabeçalho Authorization das requisições:
```json
curl -X [METHOD] http://localhost:3000/[ENDPOINT] \
-H "Authorization: Bearer [TOKEN]" \
-H "Content-Type: application/json" \
-d '[BODY]'
```

#### 2. Criar Produto (POST /produtos ):
Requisição:
```json
curl -X POST http://localhost:3000/produtos \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
-H "Content-Type: application/json" \
-d '{
  "codigo": "PROD001",
  "nome": "Notebook Dell",
  "codigo_barras": "1234567890123",
  "quantidade": 10,
  "preco": 2999.99
}'
```
Resposta:
```json
{
  "codigo": "PROD001",
  "nome": "Notebook Dell",
  "codigo_barras": "1234567890123",
  "quantidade": 10,
  "preco": 2999.99
}
```
#### 3. Listar Produtos (GET /produtos ):
Requisição:
```json
curl -X GET http://localhost:3000/produtos \
```
Resposta:
```json
[
  {
    "codigo": "PROD001",
    "nome": "Notebook Dell",
    "codigo_barras": "1234567890123",
    "quantidade": 10,
    "preco": 2999.99
  }
]
```
#### 4. Buscar Produto por Código (GET /produtos/:codigo ):
Requisição:
```json
curl -X GET http://localhost:3000/produtos/PROD001 \  
```
Resposta:
```json
{
  "codigo": "PROD001",
  "nome": "Notebook Dell",
  "codigo_barras": "1234567890123",
  "quantidade": 10,
  "preco": 2999.99
}
```
#### 5. Atualizar Produto (PUT /produtos/:codigo ):
Requisição:
```json
  curl -X PUT http://localhost:3000/produtos/PROD001 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Notebook Dell XPS",
    "preco": 3499.99
}'
```
Resposta:
```json


{
  "codigo": "PROD001",
  "nome": "Notebook Dell XPS",
  "codigo_barras": "1234567890123",
  "quantidade": 10,
  "preco": 3499.99
}
```
#### 6. Remover Produto (DELETE /produtos/:codigo ):
Requisição:
```json
  curl -X DELETE http://localhost:3000/produtos/PROD001 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

Resposta:
```json
{
  "message": "Produto removido com sucesso."
}
```

## Requisitos do Projeto

### 1. Entidade Produto
A entidade `Produto` possui os seguintes campos:
- `codigo` (string, único): Identificador único do produto.
- `nome` (string): Nome do produto.
- `codigo_barras` (string): Código de barras do produto (opcional).
- `quantidade` (decimal): Quantidade disponível em estoque.
- `preco` (decimal): Preço do produto.


### 2. Endpoints da API
A API oferece os seguintes endpoints:
- **POST /produtos**: Criar um novo produto.
- **GET /produtos**: Listar todos os produtos.
- **GET /produtos/:codigo**: Buscar um produto pelo código.
- **PUT /produtos/:codigo**: Atualizar um produto existente.
- **DELETE /produtos/:codigo**: Remover um produto.

### 3. Banco de Dados
O banco de dados utilizado é o MariaDB. O script de criação do banco de dados está localizado no diretório './scripts/init.sql'.

Optei por utilizar decimal para quantidade e preco porque esses campos representam valores monetários e quantidades que podem exigir precisão decimal. O tipo decimal é mais adequado para evitar problemas de arredondamento comuns em tipos como float.

### 4. Containerização
O projeto utiliza Docker para facilitar a execução e o gerenciamento do ambiente de desenvolvimento. O arquivo docker-compose.yml define dois serviços:

app: Aplicação NestJS.

db: Banco de dados MariaDB.

### 5. Boas Práticas

Estruturação adequada do projeto.

Uso de padrões de design (como DTOs e Pipes).

Documentação clara e concisa.

Validação de dados com Zod.

### Diferenciais (Plus)

Autenticação: Implementação de autenticação com JWT.

Middleware de Autenticação: Proteção dos endpoints de escrita (POST, PUT, DELETE).

Validação de Dados: Uso da biblioteca Zod para validação de dados.

## Auto-declaração 

Este projeto foi desenvolvido com auxílio de inteligência artificial.
Utilizei ferramentas de IA para auxiliar no que chamo de "serviço braçal" para a criação do projeto. Serviço braçal são tarefas repetitivas que são necessárias para a criação de um projeto, como a criação de um README, configuração do Docker e do Swagger, geração de queries SQL, entre outros.
O funcionamento das rotas, regras de negócio, autenticação e validação de dados foram feitas de forma manual.
Também devo ressaltar que todo o código gerado por IA foi revisado, corrigido e adaptado por mim para atender aos requisitos do desafio.

