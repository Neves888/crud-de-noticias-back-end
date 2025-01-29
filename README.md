# API de Notícias
Este é um projeto de uma API simples para gerenciamento de notícias. A API permite a criação, leitura, atualização e exclusão de notícias, utilizando o MongoDB como banco de dados e Docker para orquestração dos containers.

## Tecnologias Utilizadas
- Node.js: Ambiente de execução para JavaScript e TypeScript.
- Express: Framework para construção de APIs.
- MongoDB: Banco de dados NoSQL para armazenar as notícias.
- Docker: Utilizado para criar containers e facilitar a execução do ambiente.
- Mongoose: ODM (Object Data Modeling) para MongoDB.
- TypeScript: Linguagem que adiciona tipagem estática ao JavaScript, melhorando a qualidade e manutenção do código.

## Estrutura de Pastas do Projeto

```.
├── Dockerfile               # Define a imagem Docker da aplicação.
├── docker-compose.yml       # Orquestração de containers para a aplicação e o MongoDB.
├── src/
│   ├── models/              # Contém os modelos de dados (por exemplo, Noticia.ts).
│   ├── routes/              # Define as rotas da API (por exemplo, noticia.ts).
│   ├── app.ts               # Arquivo principal que configura o Express e conecta ao MongoDB.
├── package.json             # Gerenciador de dependências e scripts do projeto.
└── README.md                # Este arquivo com as instruções do projeto.
```
### Justificativa para a Estrutura de Pastas

- Dockerfile: Arquivo responsável por criar a imagem Docker da aplicação.
- docker-compose.yml: Arquivo de configuração para orquestrar os containers. Aqui, definimos os containers da API e do MongoDB.
- src/: A pasta src contém todos os arquivos fontes do projeto.
    - models/: Contém os modelos Mongoose. Eles são responsáveis por estruturar os dados que serão armazenados no MongoDB.
    - routes/: Contém os arquivos que definem as rotas da API. Cada arquivo de rota é responsável por lidar com uma entidade (ex: noticia.ts).
    - app.ts: Arquivo principal onde o servidor Express é configurado e onde a conexão com o MongoDB é estabelecida.

## Como rodar o projeto

**1. Clone o repositório;**

**2. Abra o projeto e navegue até a pasta api-noticias;**

**3. Instale as dependências do projeto com o comando**
```npm install```;

**4. Inicie o Docker como o comando** ```docker-compose up --build```;

**5. Após subir os containers, a API estará disponível na URL** ```http://localhost:3000/noticias```;

**6. Parar os containers basta usar o comando** ```docker-compose down```. 

**7. Parar rodar os testes use o comando** ```npm run test```. 
