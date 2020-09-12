<h1 align="center">
    <img alt="Launchbase" src="https://storage.googleapis.com/golden-wind/bootcamp-launchbase/logo.png" width="400px" />
</h1>

<h3 align="center">
  Desafios - Iniciando no Back-end
</h3>

<p align="center">

  <a href="https://opensource.org/licenses/MIT" >
    <img src="https://img.shields.io/badge/license-MIT-brightgreen" alt="License MIT">
  </a>

</p>

<p align="center">
  <a href="#pushpin-sobre">Sobre</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#desafio-3-1-primeiro-servidor">3-1</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#desafio-3-2-arquivos-nunjucks-e-dados-dinâmicos">3-2</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#desafio-3-3-página-de-descrição-do-curso">3-3</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#desafio-refatorando-foodfy">3-4</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#key-licença">Licença</a>
</p>


<div align="center">
  <img src="https://s7.gifyu.com/images/desafios_back.gif" alt="rocketseat" height="450px">
</div>


## :pushpin: Sobre:

Os desafios desse módulo se trataram de uma continuação direta do front, mas o foco foi no servidor da aplicação e armazenamento de dados. <br>
Dessa vez eu tive que, ao invés de mostrar um modal com o site do bootcamp respectivo, criar uma nova página com uma descrição sobre o curso e nela uma opção que redirecione para o site da Rocketseat. <br>
O desafio real desse módulo foi construir todo o servidor, com o Node.js, que hospedaria a aplicação, além de deixar todos os dados dinâmicos utilizando template engines, no caso o Nunjucks, a busca e filtro de requisições no URL e também a exportação e importação de dados.


<h2 align="center">Desafio 3-1: Primeiro servidor</h2>

## :rocket: Sobre o desafio

Nesse desafio você deve criar um servidor que tenha duas rotas que devem retornar o conteúdo dos html gerados no desafio 2-3 (páginas de `Cursos` e `Sobre`). Além disso, deve ser implementando um arquivo padrão (layout.njk) que reaproveite o código em comum entre esses dois e também um arquivo que sirva uma página de erro 404.

_Erro 404 é comum aparecer em páginas da internet, quando não foi encontrado nenhum conteúdo._

### Arquivos HTML

- `courses.njk`: Arquivo referente à pagina de conteúdos, deve ser servido na rota raiz.
- `about.njk`: Arquivo referente à pagina de descrição, deve ser servido na rota /about.
- `layout.njk`: Arquivo referente à base comum entre as páginas.
- `not-found.njk`: Arquivo referente à pagina de erro 404, deve ser servido quando for realizada uma requisição à uma página que não existe. Esse arquivo deve ter:

  - Layout.njk como base
  - Ter um texto infortivo sobre o erro

  Dica: Para capturar essas requisições, basta adicionar esse trecho após **todas** as rotas no seu `server.js`:

```js
server.use(function(req, res) {
  res.status(404).render("not-found");
});
```
### Estilização

Você tem liberdade para escolher a estilização que preferir para esse desafio.



<h2 align="center">Desafio 3-2: Arquivos nunjucks e dados dinâmicos</h2>

## :rocket: Sobre o desafio

Nesse desafio você deve atualizar os arquivos com informações de cursos e descrição de forma dinâmica.

### Estilização

Você tem liberdade para escolher a estilização que preferir para esse desafio.


<h2 align="center">Desafio 3-3: Página de descrição do curso</h2>

## :rocket: Sobre o desafio

Nesse desafio você deve criar uma página de descrição do curso que deve ser chamada no lugar da modal quando o usuário clicar no card do curso.

### Rota

A rota também será a `/courses`, porém o id do curso será passado via route params (ex.: `/courses/id_do_curso`). Dica: utilize o req.params para recuperar o id fornecido na rota.

```js
server.get("/courses/:id", function(req, res) {
  const id = req.params.id;

  return res.send(`O id fornecido na rota é: ${id}`);
});
```

### Informações

- Layout padrão
- Card do curso
- Link que redireciona para a página do curso

### Fórum

Se houver mais dúvida sobre o desafio, essa thread no fórum poderá ser útil para você 💜 
https://skylab.rocketseat.com.br/h/forum/launchbase/07c66e6d-06ff-4cfb-baf2-b5b27be6ac8b

### Estilização

Você tem liberdade para escolher a estilização que preferir para esse desafio.



<h2 align="center">Desafio: Refatorando Foodfy</h2>

## :rocket: Sobre o desafio

Nesse desafio você irá refatorar, ou seja, reescrever algumas partes, do seu código do desafio anterior, o Foodfy.

Até esse módulo não conhecíamos sobre back-end, ou seja, todos dados da nossa página ficavam no próprio front-end (arquivos HTML).

Agora que conhecemos sobre Node.js vamos tornar a exibição dos dados mais dinâmica :rocket:

### Arquivo de dados

Crie um arquivo `data.js` na raiz do seu projeto com o conteúdo de [link](../assets/data.js).

### Alterações no projeto

Use os dados das receitas contidos no arquivo `data.js` para a página de listagem de receitas e para a home.

Na home, liste as 6 primeiras receitas, não é necessário agora sabermos sobre as receitas mais acessadas.

Na listagem, liste todas receitas do arquivo.

_Obs.: Você precisará converter seu projeto em um projeto Node.js usando Nunjucks para mostrar cada página._

### Detalhe da receita

<div align="center">
  <img src="https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/mockup-detalhe-receita.png" />
</div>

- Ao clicar em uma receita agora o usuário deve ser redirecionado para uma nova página contendo todas informações da receita como ingredientes, modo de preparo e informações adicionais (todas essas informações estão contidas no arquivo `data.js`).
- Na página de listagem não é mais necessário abrir o modal como tínhamos no desafio anterior do Foodfy.

**Download dos arquivos:** https://github.com/Rocketseat/bootcamp-launchbase-desafios-03/archive/master.zip

Acesse o arquivo `layouts/specs/index.html` para ver todas especificações do layout da página.

_Obs.: A página do detalhe da receita precisa buscar no arquivo `data.js` apenas a receita desejada pelo usuário, por isso você usará de parâmetros na rota dessa página, por exemplo: `http://localhost:3000/recipes/3`, nesse caso estaríamos acessando os detalhes da receita com índice 3 no array de receitas (recipes[3])._

Para obter um ID da receita através da URL no Node.js você vai usar conforme o exemplo:

```js
server.get("/recipes/:index", function (req, res) {
  const recipes = [...]; // Array de receitas carregadas do data.js
  const recipeIndex = req.params.index;

  console.log(receipts[recipeIndex]);
})
```

### Ação de mostrar/esconder

Dentro da página do detalhe da receita, em cada seção "Ingredientes", "Modo de preparo" e "Informações adicionais" há um botão `Mostrar` ou `Esconder` que ao ser clicado deve mostrar ou esconder o texto abaixo do título baseado em seu estado de visibilidade.


