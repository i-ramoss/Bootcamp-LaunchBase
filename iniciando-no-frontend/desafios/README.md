<h1 align="center">
    <img alt="Launchbase" src="https://storage.googleapis.com/golden-wind/bootcamp-launchbase/logo.png" width="400px" />
</h1>

<h2 align="center">Desafios Módulo 2 - Iniciando no Front-end</h2>

<p align="center">

  <a href="https://opensource.org/licenses/MIT" >
    <img src="https://img.shields.io/badge/license-MIT-brightgreen" alt="License MIT">
  </a>

</p>

<p align="center">
  <a href="#desafio-1-1-primeiros-passos-com-js">2-1</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#desafio-1-2-lidando-com-objetos-e-vetores">2-2</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#desafio-1-3-funções-e-estruturas-de-repetição">2-3</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#desafio-1-4-aplicação-operações-bancárias">2-4</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#key-licença">Licença</a>
</p>


## :rocket: Sobre o desafio

Criar um arquivo html que contenha um [favicon](favicon.ico) e um header com 3 links: Comunidade, Email e Telefone.

### Favicon

O favicon é o ícone que aparece na aba do navegador. O arquivo está disponível com o nome favicon.ico. Para utilizá-lo é necessário importá-lo com a tag link no html. ser dada a dica de utilizar a tag link na head do html.

```html
<link rel="icon" href="favicon.ico" type="image/x-icon" />
```

### Links

- `Comunidade`: Link que deve apontar para o convite da comunidade aberta da rocketseat `(https://discordapp.com/invite/gCRAFhc)`

- `Email`: Link que deve chamar o comando de enviar email para o destinatário `oi@rocketseat.com.br`. Dica: utilize o comando `mailto` dentro do `href`;

- `Telefone`: Link que deve chamar o comando de realizar uma ligação para o número `+5547992078767`. Dica: utilize o comando `tel` dentro do `href`;

### Estilização

Você tem liberdade para escolher a estilização que preferir para esse desafio, mas alguns pontos são obrigatórios:

- Deve ser aplicado um background
- Deve ser utilizada a fonte Roboto
- O header precisa ocupar todo o espaço lateral e superior (body sem margin)
- O header precisa ter um espaçamento interno de 30px em todas as direções
- Os links devem ter um espaçamento de 30px entre si


<h2 align="center">Desafio 2-2: Página de descrição</h2>

## :rocket: Sobre o desafio

A partir do arquivo do desafio 2-1, adicionar um novo link no header chamado Sobre. Essa página deverá mostrar informações referentes a Rocketseat.

### Informações da página

- Uma imagem da logo da empresa
- O nome da empresa
- Uma breve descrição da empresa
- Uma lista com as principais tecnologias utilizadas. Dica: utilize a tag `ul` para lista e `li` para o item da lista.
- Links para as redes sociais da empresa (Github, Instagram e Facebook)

### Estilização

Você tem liberdade para escolher a estilização que preferir para esse desafio, mas alguns pontos são obrigatórios:

- A imagem deve ter uma borda e um formato circular.
- Deve ser utilizada a fonte Roboto
- O nome da empresa e a imagem devem ser destacar do restante
- Os links das redes sociais devem ter alguma alteração visual quando o cursor do mouse passar por cima

<h2 align="center">Desafio 2-3: Página de cursos e iframe</h2>

## :rocket: Sobre o desafio

A partir do arquivo do desafio 2.2, adicionar no header um link chamado Conteúdos. Essa página deve conter um grid onde devem ser mostrados os 3 principais cursos da Rocketseat: Starter, Launchbase e GoStack. Ao clicar em um dos cursos, deve ser aberta uma modal onde um iframe irá carregar as informações do curso selecionado.

### Informações da página

- Título da página
- Grid com 3 colunas e 1 linha onde serão apresentados os cards dos cursos

## Informações do card

- Logo do curso ([Starter](https://skylab.rocketseat.com.br/static/64c237ccff807c054339a62d53b4b402.svg), [Launchbase](https://skylab.rocketseat.com.br/static/0828532024cb46921a6b5e941f8d788d.svg) e [GoStack](https://skylab.rocketseat.com.br/static/83a178a0653dab1d55e2ed7946465975.svg))
- Título do curso
- Quantidade de módulos dos cursos
- Informação se o curso é gratuito ou pago

## Modal

O modal deve conter um iframe que busca a página do curso (dica: basta adicionar `starter`, `launchbase` ou `gostack` ao final de `https://rocketseat.com.br/`). Além do botão de fechar o modal, é preciso implementar a funcionalidade de maximizar o modal (dica: utilize a mesma lógica implementada para fechar o `modalOverlay`, mas trabalhe com a classe `modal` e utilize o método `contains` do `classList` para verificar se o elemento está ou não com a classe `maximize`).

### Estilização

Você tem liberdade para escolher a estilização que preferir para esse desafio, mas alguns pontos são obrigatórios:

- Deve ser utilizado o grid para organizar os cursos
- O modal nunca deve abrir maximizado

<h2 align="center">Desafio: Construindo Foodfy</h2>

## :rocket: Sobre o desafio

Nesse desafio você vai construir um site completo para uma empresa de receitas chamada Foodfy.

<div align="center">
  <img src="https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/mockup.png" />
</div>

### Materiais

**Download dos arquivos:** https://github.com/Rocketseat/bootcamp-launchbase-desafios-02/archive/master.zip
**Apresentação do desafio:** https://vimeo.com/372742889/63b926d7e0

### Abrindo specs do layout

Acesse o arquivo `layouts/specs/index.html` para ver todas especificações do layout da aplicação.

### Imagens do layout

Acesse a pasta `layouts/assets` para obter todas imagens utilizadas no layout.

### Dicas e regras

1. Dê uma boa olhada no material extra de CSS & HTML, esse material pode conter dicas importantes para você construir o layout desse website;
2. Na página de receitas, quando o usuário clica em uma receita, um modal deve aparecer em tela contendo as mesmas informações da receita que ele clicou;


## :key: Licença:

Este projeto está sob licença MIT, para mais detalhes verifique em [LICENSE](https://github.com/i-ramoss/Bootcamp-LaunchBase/blob/master/LICENSE).

---

Feito com :green_heart: por **Ian Ramos** :fire: [Entre em contato!](https://www.linkedin.com/in/ian-ramos/)
