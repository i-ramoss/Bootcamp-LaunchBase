<h1 align="center">
    <img alt="Launchbase" src="https://storage.googleapis.com/golden-wind/bootcamp-launchbase/logo.png" width="400px" />
</h1>

<h3 align="center">
  Desafios Módulos 9 e 10 - Cadastro e controle da sessão de usuários
</h3>

<p align="center">
  <a href="https://opensource.org/licenses/MIT" >
    <img src="https://img.shields.io/badge/license-MIT-brightgreen" alt="License MIT">
  </a>
</p>

<p align="center">
  <a href="#pushpin-sobre">Sobre</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#rocket-desafios">Desafios</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#key-licença">Licença</a>
</p>


## :pushpin: Sobre:

Estes módulos sem dúvidas foram um dos mais interessantes e envolveu um dos assuntos que eu mais gosto: segurança, criptografia, validações... <br>
Além da validação de email, cpf e cnpj, desenvolvi respostas visuais ao usuário para as requisições que ele fazia, principalmente as que envolviam o CRUD do usuário.<br>
Utilizei a lib [Nodemailer](https://github.com/nodemailer/nodemailer) para envio de emails ao usuário. Esse envio acontece quando um usuário é cadastrado na plataforma, onde ele recebe uma senha criptografada pela lib [Bcrypt.js](https://github.com/dcodeIO/bcrypt.js/) ou para a solicitação de recuperação de senha, através de um token gerado pela lib [crypto.js](https://github.com/nodejs/node/blob/master/doc/api/crypto.md). <br>
As validações ocorreram também nas rotas da aplicação, onde somente usuários poderiam acessar certas páginas e funcionalidades da Launchstore. <br>
No banco de dados utilizei a ideia do SQL Cascade para remoção em cascata de produtos e respectivas imagens quando o usuário responsável era excluído da plataforma.


## :rocket: Desafios:

- [Sistema de Login Foodfy](https://github.com/rocketseat-education/bootcamp-launchbase-desafios-10/blob/master/desafios/10-sistema-login-foodfy.md)



## :key: Licença:

Este projeto está sob licença MIT, para mais detalhes verifique em [LICENSE](https://github.com/i-ramoss/Bootcamp-LaunchBase/blob/master/LICENSE).

---

Feito com :green_heart: por **Ian Ramos** :fire: [Entre em contato!](https://www.linkedin.com/in/ian-ramos/)