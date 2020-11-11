<h1 align="center">
    <img alt="Launchbase" src="https://storage.googleapis.com/golden-wind/bootcamp-launchbase/logo.png" width="400px" />
</h1>

<h3 align="center">
  Desafios - Persistindo dados da aplicação
</h3>

<p align="center">

  <a href="https://opensource.org/licenses/MIT" >
    <img src="https://img.shields.io/badge/license-MIT-brightgreen" alt="License MIT">
  </a>

</p>

<p align="center">
  <a href="#pushpin-sobre">Sobre</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#">5-1</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#">5-2</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#">5-3</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#">5-4</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#">5-5</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#key-licença">Licença</a>
</p>


<div align="center">
  <img src="https://s8.gifyu.com/images/private_class2147217d926e77b9.gif" alt="Aulas particulares" height="450px">
</div>


## :pushpin: Sobre:

Os desafios desse módulo consistiu na estruturação de um banco de dados, com o PostgreSQL, para a persistência de dados da aplicação. <br>
Toda a funcionalidade da API de criar, atualizar, buscar e deletar professores e estudutantes foi reestruturada para se associar ao BD, nas models. <br>
Foi criada uma lógica de paginação para navegar entre os usuários cadastrados na plataforma.


<h2 align="center">Desafio 5-1: Refatorando aplicação e configurando o BD</h2>

## :rocket: Sobre o desafio

Esse é o primeiro desafio de uma sequência que irá implementar o banco de dados na aplicação desenvolvida no módulo anterior.

Nessa etapa, você deve refatorar o código da sua aplicação e preparar o seu ambiente para trabalhar com banco de dados.

### Criando Banco de dados

Utilizando a ferramenta postbird, crie **através de queries** um banco de dados chamado **my_teacher** e uma tabela com o nome de **teachers** que possua os seguintes campos:

- id: INT e PRIMARY KEY;
- avatar_url: TEXT e NOT NULL;
- name: TEXT e NOT NULL;
- birth_date: TIMESTAMP e NOT NULL;
- education_level: TEXT e NOT NULL;
- class_type: TEXT e NOT NULL;
- subjects_taught: TEXT e NOT NULL;
- created_at: TIMESTAMP e NOT NULL.

_Dicas: Para criar a tabela a partir de uma query, basta selecionar o banco no postbird e na aba **Query** rodar o comando **CREATE TABLE** especificando o nome da tabela e em seguida as colunas, por exemplo:_

```sql
CREATE TABLE TEST(
   ID INT PRIMARY KEY,
   NAME TEXT NOT NULL
);
```

_Para mais informações, dê uma olhada nesse [link](https://www.postgresqltutorial.com/postgresql-create-table/)_

### Refatorando o Código

Após preparar o banco de dados, é preciso refatorar a sua aplicação para utilizá-lo. Você deve fazer as seguintes alterações:

- Utilizar a nova estrutura de pastas (src, app e lib);
- Corrija nos arquivos os caminhos relativos que precisar;
- Utilize nos arquivos da pasta `controllers` a nova forma de exportar.

### Configurando BD na aplicação

Por fim, instale a biblioteca `pg` e crie o arquivo de configuração do seu banco de dados (em uma pasta **config**) utilizando o `Pool`. Não esqueça de passar os dados necessários (**user, password, host, port e database**) na hora de instanciar (**new**) o Pool.


<h2 align="center">Desafio 5-2: Interagindo com o BD</h2>

## :rocket: Sobre o desafio

Nessa etapa, você deve refatorar os CRUDs dos professores e estudantes para que eles utilizem o banco de dados.

### Inserindo dados

No método `post`, construa uma query usando `INSERT` que crie um novo registro no banco de dados.

### Buscando dados

No método `index`, construa uma query usando `SELECT` que retorne todos os registros do banco de dados. Ordene esses resultados pelo nome de forma crescente.

### Criando Model

As operações com o banco de dados não devem ficar no controller, por isso crie um model que contenha os cinco métodos:

- `all`: Buscar todos os registros;
- `create`: Criar um registro;
- `find`: Buscar apenas um registro a partir do id informado;
- `update`: Atualiza um registro a partir do id informado;
- `delete`: Remove um registro a partir do id informado;

### Atualizando dados

Crie um método `update` no model. Nesse método, construa uma query utilizando `UPDATE`, `SET` e `WHERE` que atualiza um registro do banco de dados a partir do id informado.

### Removendo dados

Crie um método `delete` no model. Nesse método, construa uma query utilizando `DELETE` e `WHERE` que remova um registro do banco de dados a partir do id informado.

### Refatorando students

Refatore o controller de estudantes utilizando as mesmas ideias aplicadas no controller de professores.


<h2 align="center">Desafio 5-3: Relacionamentos e filtros no BD</h2>

## :rocket: Sobre o desafio

Nessa etapa, você deve criar um relacionamento entre o professor e o estudante. Além disso, deve-se implementar filtros na listagem da tabela de professores.

### Relacionamentos

Adicione um campo `teacher_id` na tabela de estudantes. Em seguida, nas páginas de cadastro e edição de estudantes adicione um campo select que lista todos os professores cadastrados. Por fim, na página de detalhe de um estudante, crie um campo que mostre o o nome do professor do aluno.

### Filtros

Na página de listagem de professores, adicione um input de texto para os filtros e um botão para retornar uma nova listagem com os dados filtrados. No método `index` do controller, faça uma verificação para checar se existem filtros passados por `query params`. Se existir, crie um método `findBy` no model que retorna todos os professores que que tiverem o nome ou a área de atuação em comum com o filtro passado (utilize o `ILIKE`).


<h2 align="center">Desafio 5-4: Paginação de resultados no BD</h2>

## :rocket: Sobre o desafio

Nessa etapa, você deve implementar a lógica de paginação dos resultados do BD.

### Backend

Adicione no método `index` do controller de professores o tratamento dos campos `page` e `limit` que serão transmitidos via `query params`. Além disso, faça o cálculo do `offset` a ser passado para a query. Por fim, crie um novo método `paginate` no model que deve implementar toda a query já existente (com filter e order) e também adicionar a paginação (utilize `LIMIT` e `OFFSET`).

### Frontend

Crie um algoritmo que realize a paginação dos resultados da seguinte forma:

- As duas primeiras e últimas páginas sempre devem ser apresentadas (ex: 1, 2, 45 e 46 de um total de 46 pags.);
- Caso existam mais de 7 páginas, as intermediárias selecionadas devem ser apresentadas juntamente com seu sucessor e antecessor (ex.: 1, 2, ..., 12, 13 (selecionada), 14, ..., 23, 24);
- Só apresente as reticências se elas representarem um grupo de 2 páginas ou mais (ex.: 1, 2, 3 (sem reticências), 4, 5 (selecionada), 6, ...(pags 7 e 8), 9, 10).

Em seguida, implemente na query do método `paginate` no model de professor a lógica da paginação:

- realizar o `count` de todos os registros de professores (utilize uma `subquery`);
- aplicar os filtros tanto na `query` de busca dos professores quanto na `subquery` de `count`.

Por fim, utilize o `scripts.js` para renderizar no `html` (não faça no `nunjucks`) a paginação ao final da listagem (não esqueça que as reticências não devem ser links).

### Ajustes finais

Para finalizar, basta:

- Estilizar a paginação;
- Preservar o filter quando a página for alterada;
- Implementar no front dos estudantes a paginação (siga a mesma ideia aplicada nos professores).



<h2 align="center">Desafio 5-4: Paginação de resultados no BD</h2>

## :rocket: Sobre o desafio

Nesse desafio você irá criar um banco de dados para o Foodfy.

A partir desse desafio, os dados que antes você vinha salvando em um arquivo JSON agora serão armazenados em um banco de dados PostgreSQL.

Você irá criar novas páginas de cadastro, listagem e edição de chefs, pois uma receita será atribuída a um chef.

Você irá criar um busca de receitas, onde você poderá filtrar receitas pelo seu nome.

Por fim, você irá adicionar a funcionalidade de paginação na listagem de receitas.

### :file_cabinet: Banco de dados

Usando os conhecimentos adquiridos até aqui, você irá criar um banco de dados pelo Postgres, utilize o nome `foodfy`.

Você irá criar uma tabela de receitas, chame-a de `recipes` e uma tabela de cozinheiros, nomeie-a como `chefs`.

A tabela `recipes` deverá conter os seguintes campos:

- `id integer primary unique` (o postbird cria esse campo por padrão)
- `chef_id integer` (esse campo armazenará o ID do chef que criou essa receita)
- `image text`
- `title text`
- `ingredients text[]`
- `preparation text[]`
- `information text`
- `created_at datetime` (armazena a data de criação da receita no banco de dados)

_Obs.: Você consegue armazenar vetores (`arrays`) no Postgres utilizando o `[]` no fim do campo._

A tabela `chefs` deverá conter os seguinte campos:

- `id integer primary unique` (o postbird cria esse campo por padrão)
- `name text`
- `avatar_url text`
- `created_at datetime` (armazena a data de criação do chef no banco de dados)

### :fork_and_knife: [Admin] Cadastro de chefs

<div align="center">
   <img src="https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/launchbase/mockup-cadastro-chefs.png" />
</div>

Você irá colocar novas páginas administrativas que serão capazes de fazer as operação de cadastro, listagem, atualização e remoção de chefs.

**Download dos arquivos:** https://github.com/Rocketseat/bootcamp-launchbase-desafios-05/archive/master.zip

Acesse o arquivo `layouts/admin/index.html` para ver todas especificações do layout do site.

> Importante: Ao deletar o chef, se o mesmo possuir pelo menos uma receita, retorne um erro informando que chefs que possuem receitas não podem ser deletados.

### :detective: [Site] Busca de receitas

<div align="center">
   <img src="https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/launchbase/mockup-busca.png" />
</div>

Para facilitar a busca de uma receita cadastrada, a pessoa que acessar o site poderá filtrar por nome da receita.

Você criará também uma página de resultado da busca que listará as receitas de acordo com a busca do usuário.

**Download dos arquivos:** https://github.com/Rocketseat/bootcamp-launchbase-desafios-05/archive/master.zip

Acesse o arquivo `layouts/site/index.html` para ver todas especificações do layout do site.

### :woman_cook: [Site] Listagem de chefs

<div align="center">
   <img src="https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/launchbase/mockup-chefs.png" />
</div>

Fazer uma página com nome "Chefs" no site onde irá mostrar os chefs do Foodfy.

Fazer uma contagem de todas a receitas daquele chef, e apresentar nessa página.

**Download dos arquivos:** https://github.com/Rocketseat/bootcamp-launchbase-desafios-05/archive/master.zip

Acesse o arquivo `layouts/site/index.html` para ver todas especificações do layout do site.