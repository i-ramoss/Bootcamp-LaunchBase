<h1 align="center">
    <img alt="Launchbase" src="https://storage.googleapis.com/golden-wind/bootcamp-launchbase/logo.png" width="400px" />
</h1>

<h3 align="center">
  Desafios - Controle de Academia
</h3>

<p align="center">

  <a href="https://opensource.org/licenses/MIT" >
    <img src="https://img.shields.io/badge/license-MIT-brightgreen" alt="License MIT">
  </a>

</p>

<p align="center">
  <a href="#pushpin-sobre">Sobre</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#desafio-4-1-header">4-1</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#desafio-4-2-card-do-professor">4-2</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#desafio-4-3-formulário-e-rota-de-cadastro-do-professor">4-3</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#desafio-4-4-apresentação-edição-e-formatação-dos-dados-de-um-professor">4-4</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#desafio-4-5-http-put-e-delete">4-5</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#desafio-4-6-listagem-de-professores">4-6</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#desafio-4-7-estruturando-estudantes">4-7</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#desafio-administração-do-foodfy">4-8</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#key-licença">Licença</a>
</p>


<div align="center">
  <img src="https://s8.gifyu.com/images/private_class.gif" alt="Aulas particulares" height="450px">
</div>


## :pushpin: Sobre:

Os desafios desse módulo consistiram na criação de um site de aulas particulares, implementando tudo o que foi visto nas aulas e mais um pouco. <br>
A possibilidade de criação/edição/exclusão de novos professores e alunos foi implementada, além da formatação de datas e busca de tipos de dados diferentes através do nunjucks.<br>
Foi utilizado tabelas para a listagem tanto dos professores quanto dos alunos e uma lógica de menu ativo para reconhecimento de url e assim implementar estilizações específicas na aplicação.<br>
Foram desenvolvidas funções para retorno e modificações de dados, com JavaScript.


<h2 align="center">Desafio 4-1: Header</h2>

## :rocket: Sobre o desafio

Esse é o primeiro desafio da sequência de criação de um site de aulas particulares. A ideia é que você aplique, em pequenas doses, os conhecimentos aprendidos nas aulas. Nessa primeira etapa, você deve criar um header com dois links: `Teachers` e `Students` (aproveite a estrutura criada no módulo 03)

### Estilização

Você tem liberdade para escolher a estilização que preferir para esse desafio, mas alguns pontos são obrigatórios:

- Deve ser aplicado um background;
- Deve ser utilizada a fonte Roboto;
- Utilize o conceito de `box-sizing` e o seletor `+` para centralizar os seus links;
- Utilize o `after` e o `transition` para aplicar um efeito visual nos links quando o mouse passar por cima.



<h2 align="center">Desafio 4-2: Card do Professor</h2>

## :rocket: Sobre o desafio

Nessa etapa você deve utilizar o browser-sync e criar um card para apresentação das informações do professor.

### Browser-sync

Utilize as libs `browser-sync` e `npm-run-all` e rode os processos da sua aplicação e do `browser-sync` em paralelo.

### Card

Esse componente deve ser dividido em duas seções: imagem e detalhes. As seguintes informações são obrigatórias:

- Imagem randômica de uma coleção de professores (utilize a api do unsplash);
- Nome completo;
- Idade;
- Grau de escolaridade (ex.: Doutorado);
- Tipo de aula (presencial ou à distância);
- Acompanhamento (ex.: Matemática e Física);
- Desde (data de cadastro na plataforma).

### Estilização

Você tem liberdade para escolher a estilização que preferir para esse desafio, mas alguns pontos são obrigatórios:

- A imagem deve ocupar 40% do card e os detalhes 60%.
- Utilize o seletor `first-child` e `border-top` para estilizar as divisórias entre os items.
- Utilize o seletor `nth-child()` para estilizar o label (ex.: Desde) e valor (ex.: 02/02/2020) do item.
- Utilize o `keyframes` e o `animation` para fazer uma animação do card.
- Utilize o `box-shadow` para aplicar uma sombra no card.



<h2 align="center">Desafio 4-3: Formulário e Rota de cadastro do Professor</h2>

## :rocket: Sobre o desafio

Nessa etapa você deve criar um formulário de cadastro do professor e uma rota do tipo `post` que irá realizar as validações e salvar os dados enviados.

### Formulário

Os seguintes campos são necessários:

- Avatar url: campo do tipo `url` para cadastrar o caminho da imagem do professor;
- Nome completo: campo do tipo `text`;
- Data de nascimento: campo do tipo `date`;
- Grau de escolaridade: campo do tipo `select` ([documentação do select](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/select)) que deve conter as opções **Ensino Médio Completo, Ensino Superior Completo, Mestrado e Doutorado**;
- Tipo de aula: campo do tipo `radio` que deve conter as opções **Presencial e À distância**;
- Área de atuação: campo do tipo `text` que deve conter as informações das matérias que o professor pode lecionar.

### Rota

Crie um arquivo `teachers.js` na raiz do seu projeto e faça a validação de todos os campos utilizando `keys` e o constructor `Object`. Além disso, utilize o método `writeFile` da lib `fs` para gerar um arquivo json que irá conter um array de todos os professores cadastrados. Ao final desses dois processos (validação e salvamento), faça o redirecionamento para a página de listagem de professores.

### Estilização

Você tem liberdade para escolher a estilização que preferir para esse desafio.



<h2 align="center">Desafio 4-4: Apresentação, edição e formatação dos dados de um professor</h2>

## :rocket: Sobre o desafio

Nessa etapa você deve criar duas rotas: uma para apresentar os dados do professor (show) e outra para a edição dos dados cadastrados (edit). Além disso, realize a formatação dos dados cadastrados para a correta exibição no HTML

### Show

Crie uma rota para lidar com a apresentação dos dados cadastrados de um professor. Dentro do arquivo `teachers.js`, crie um método `show` para buscar e retornar o professor a partir do `id` fornecido na rota. Os seguintes dados precisam ser formatados:

- Idade: Crie um arquivo `utils.js` que exporta uma função chamada `age`. Essa função deve retornar a idade a partir do parâmetro (data de nascimento) informado;
- Grau de escolaridade: crie uma função `graduation` no arquivo `utils.js`. Essa função deve retornar o grau de escolaridade formatado a partir do valor do select informado (ex.: **Ensino Médio Completo** para o valor **medio** do `select`);
- Acompanhamento: Utilize o método `split` da string para gerar um array com as matérias que o professor leciona;
- Desde: Utilize o constructor `Intl` e seus métodos para gerar uma data no formato `dia/mes/ano`.

Ao fim da apresentação dos dados, crie um link que irá redirecionar para a rota de edição dos dados cadastrados.

### Edição

Crie uma rota para lidar com a edição dos dados cadastrados de um professor. Dentro do arquivo `teachers.js`, crie um método `edit` para buscar e retornar o professor a partir do `id` fornecido na rota. Utilize a mesma interface da rota de apresentação dos dados do professor (lembrando de fazer o reaproveitamento do form com um arquivo `fields.njk`). Por fim, crie uma função chamada `date` no arquivo `utils.js`. Essa função deve retornar a data no formato `yyyy-mm-dd` para a correta exibição no input do tipo `date` no HTML (lembre de tratar os dias e meses menores que 10 utilizando o método `splice` da string).

### Estilização

Você tem liberdade para escolher a estilização que preferir para esse desafio.



<h2 align="center">Desafio 4-5: HTTP: PUT e DELETE</h2>

## :rocket: Sobre o desafio

Nessa etapa você irá implementar duas rotas: PUT e DELETE para a atualização e remoção, respectivamente, dos dados cadastrados de um professor.

### PUT

Crie uma rota para receber os dados do formulário de edição e propagar no arquivo `json`. Lembre de sobrescrever o método POST do form para PUT (utilize a lib `method-override`). Dentro do arquivo `teachers.js`, crie um método `update` para buscar e retornar o professor a partir do `id` fornecido na rota. Faça a busca pelo professor a partir do `id` e atualize no arquivo `json` os dados que foram alterados (utilize o constructor `Number` para formatar o id como número). Por fim, redirecione para a página de apresentação dos dados de um professor (show).

### DELETE

Crie um botão na página de apresentação dos dados do professor. Esse botão irá chamar uma rota para deletar o professor do arquivo `json`. Lembre de sobrescrever o método POST do form para DELETE (utilize a lib `method-override`). Dentro do arquivo `teachers.js`, crie um método `delete` e gere um array com todos os professores, exceto o que deve ser removido (`filter`). Por fim, redirecione para a página de listagem dos professores.

### Estilização

Você tem liberdade para escolher a estilização que preferir para esse desafio. Porém algumas coisas são obrigatórias:



<h2 align="center">Desafio 4-6: Listagem de professores</h2>

## :rocket: Sobre o desafio

Nessa etapa você deve listar todos os professores salvos no arquivo `json` e apresentá-los em formato de tabela.

### Listagem

Crie uma rota para repassar para o arquivo de listagem os dados dos professores salvos no arquivo `json`.

### Tabela

Crie um arquivo que irá mostrar os dados dos professores em formato de tabela. Utilize `Nome completo`, `Acompanhamento` e `Ação` como cabeçalhos.

### Estilização

Você tem liberdade para escolher a estilização que preferir para esse desafio, mas alguns pontos são obrigatórios:

- A tabela deve ocupar todo o espaçamento do cartão;
- Os cabeçalhos e os valores devem estar centralizados;
- A imagem deve ser apresentada antes do nome. Deve ter formato circular e tamanho de 40px;
- O campo `Acompanhamento` deve apresentar as matérias lecionadas de forma separada (array, assim como na página de apresentação de dados de um professor).



<h2 align="center">Desafio 4-7: Estruturando estudantes</h2>

## :rocket: Sobre o desafio

Nessa etapa você deve reaproveitar para os estudantes toda a estrutura já criada para os professores. Além disso, deve implementar a lógica do menu ativo.

### Estrutura

Reaproveite o código obedecendo os seguintes padrões:

- Crie um arquivo `students.js` com a mesma estrutura que o `teachers.js`. Insira ambos os arquivos dentro uma pasta `controllers`;
- Crie um array `students` vazio dentro do arquivo `json`;
- Crie uma pasta `students` com a mesma estrutura de views que os professores;
- Crie as rotas dos estudantes seguindo a mesma estrutura dos professores.

### Menu Ativo

Crie um arquivo `scripts.js` e implemente a lógica do menu ativo utilizando o `location` e o `includes` da string. Além disso, implemente um botão de cadastro nas páginas de listagem de professores e estudantes.

### Formulário

Faça os ajustes de professores para estudantes no formulário de criação. Além disso, remova os campos:

- Grau de escolaridade;
- Tipo de aula;
- Acompanhamento;
- Desde.

e adicione os campos:

- Email: campo do tipo `email`;
- Ano escolar: campo do tipo `select` com todas as opções de anos escolares entre 5º ano do ensino fundamental e 3º ano do ensino médio;
- Carga horária semanal: campo do tipo `number` que indica a quantidade de horas de aulas particulares que o aluno irá ter por semana.

### Salvando os dados

Faça os ajustes de professores para estudantes no método `post` do arquivo `students.js`. Além disso, implemente a nova estratégia de `id` (evitar repetição).

### Apresentação

Faça os ajustes de professores para estudantes na página de apresentação dos dados de um estudante. Além disso, faça duas alterações no arquivo `utils.js`:

- Altere o retorno da função `date` para `day`, `month`, `year`, `iso` e `birthDay` (lembre de fazer o ajuste no método `edit` para buscar o `.iso`).
- Crie uma função chamada `grade` que retorna os dados formatados a partir do valor selecionado no select (ex.: o valor 1EF representa **1º Ano do Ensino Fundamental**).

### Edição

Faça os ajustes de professores para estudantes na página de edição dos dados de um estudante. Implemente o campo `Aniverśario` onde é apresentado o dia e o mês do aniversário do estudante. Além disso, altere tanto no `edit.njk` dos professores quanto no dos alunos a `url` da seção de avatar. Utilize o campo `avatar_url` cadastrado em vez da api do unsplash.

### Remoção

Crie um arquivo `confirm.njk` e importe ele no seu arquivo `edit.njk`. Esse arquivo deve ser responsável por escutar o evento (`addEventListener`) de submit do form de remoção e solicitar pela confirmação do usuário (`confirm`). Caso o usuário cancele a remoção, deve-se cancelar o form (método `preventDefault`).

### Listagem

Faça os ajustes de professores para estudantes na página de listagem dos dados de um estudante. Remova a coluna de `Acompanhamento` e adicione as de `Email` e `Ano escolar`.

### Estilização

Você tem liberdade para escolher a estilização que preferir para esse desafio.



<h2 align="center">Desafio: Administração do Foodfy</h2>

## :rocket: Sobre o desafio

Nesse desafio você irá criar uma área administrativa para o Foodfy, aplicação que desenvolvemos nos desafios anteriores.

Você utilizará o mesmo projeto do Foodfy desenvolvido no desafio anterior e somente adicionar essa área administrativa, que será responsável por cadastrar, editar e deletar os dados que estão no seu arquivo: `data.js`

### Rotas do administrador

Usando os conhecimentos adquiridos até aqui, você deve criar rotas para uma área administrativa, onde o usuário poderá cadastrar novas receitas, apresentá-las, além de atualizar e deletar também.

Use a seguinte ideia para criar suas rotas.

```js
routes.get("/admin/recipes", recipes.index); // Mostrar a lista de receitas
routes.get("/admin/recipes/create", recipes.create); // Mostrar formulário de nova receita
routes.get("/admin/recipes/:id", recipes.show); // Exibir detalhes de uma receita
routes.get("/admin/recipes/:id/edit", recipes.edit); // Mostrar formulário de edição de receita

routes.post("/admin/recipes", recipes.post); // Cadastrar nova receita
routes.put("/admin/recipes", recipes.put); // Editar uma receita
routes.delete("/admin/recipes", recipes.delete); // Deletar uma receita
```

Dica: Você pode criar pasta(s) para organizar os arquivos do seu projeto.

### Detalhes da Receita

Para facilitar a busca de uma receita cadastrada, você pode usar a mesma forma de busca pelo index do `array` de `recipes` que foi apresentada no desafio anterior e desconsiderar o uso de um `id` único para cada receita, como apresentado nas aulas deste módulo.

Mais pra frente entenderemos o uso dos ID's de forma mais profunda :wink:

### Layout do painel de administração

<div align="center">
   <img src="https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/launchbase/mockup-desafio-04.png" />
</div>

**Download dos arquivos:** https://github.com/Rocketseat/bootcamp-launchbase-desafios-04/archive/master.zip

Acesse o arquivo `layouts/specs/index.html` para ver todas especificações do layout da página.

### Dados do projeto

No desafio passado você criou um arquivo de dados chamado `data.js` para servir de dados da sua aplicação.

Utilize agora, um arquivo que levará o nome `data.json` seguindo o que você aprendeu nesse módulo, porém, mantenha a estrutura de dados que você tinha no seu arquivo: `data.js`.

Exemplo:

```json
{
  "recipes": []
}
```

Nesse `array` de `recipes` irão as receitas cadastradas pelo seu sistema.

A fim de testar as funcionalidades da sua área administrativa, cadastre, pela área administrativa, os dados que você tinha anteriormente no seu `data.js`

### Adicionar Campo Dinâmico

Os campos de "Ingredientes" e "Modo de preparo", serão campos dinâmicos, onde você irá adicionar quantos campos forem necessários, usando JavaScript para isso.

#### GIF Exemplo

<p align="center">
  <img alt="Gif Campo Dinâmico" src="https://i.imgur.com/EOYWaJW.gif"/>
</p>

#### Código de exemplo

```html
<div id="ingredients">
  <div class="ingredient">
    <input type="text" name="ingredients[]" value="" placeholder="Ingredient" />
  </div>
</div>
<button type="button" class="add-ingredient">Add Ingredient</button>
```

Veja que o nome do nosso input contém `[]` no fim, isso significa que ele será um vetor, ou seja, quando o usuário enviar o formulário teremos algo assim:

```js
{
  "ingredients": [
    "Batata",
    "Queijo",
    "Bacon"
  ]
}
```

#### Exemplo de JavaScript

```js
function addIngredient() {
  const ingredients = document.querySelector("#ingredients");
  const fieldContainer = document.querySelectorAll(".ingredient");

  // Realiza um clone do último ingrediente adicionado
  const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);

  // Não adiciona um novo input se o último tem um valor vazio
  if (newField.children[0].value == "") return false;

  // Deixa o valor do input vazio
  newField.children[0].value = "";
  ingredients.appendChild(newField);
}

document
  .querySelector(".add-ingredient")
  .addEventListener("click", addIngredient);
```

### Apresentação no site

Altere as rotas desenvolvidas no desafio anterior para exibir as receitas do novo arquivo `data.json` para o nosso site do Foodfy, no fim do desafio você deve ter então tanto a área administrativa do projeto quando o website consumindo os mesmos dados :smile:

