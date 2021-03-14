## Como utilizar?

Inicialmente clone este repositório e, na pasta raiz do projeto, abra o terminal e digite o seguinte comando:

```bash
npm run dev
# or
yarn dev
```

Depois disso, abra [http://localhost:3000](http://localhost:3000) com o seu browser para ver o resultado.
Alternativamente, podes visualizar a versão atual do app em [https://facebookson-tnicacio.vercel.app/](https://facebookson-tnicacio.vercel.app/). 

## Rotas da API

### [GET] `/api/users` <br/>
Retorna todos os usuários.

### [POST] `/api/users` <br/>
Insere o usuário no banco. Deve ser passado o usuário em formato json no corpo da requisição. Exemplo:
```
{
  "name": "Michael Jordan",
  "email": "mj12@spacejam.com",
  "password": "SpaceJam123"
}
```
### [GET] `/api/users/{id}` <br/>
Retorna o usuário que possui o respectivo id.

### [PUT] `/api/users/{id}` <br/>
Atualiza o usuário identificado pelo id. Os campos a serem atualizados devem ser passados em formato json no corpo da requisição. Exemplo:
```
{
  "level": 7,
  "currentExperience": 1352,
  "challengesCompleted": 18
}
```
### [POST] `/api/signIn` <br/>
Deve ser passado email e password no formato json `{ "email": "email@mail.com", "password": "MoonWaves123" }` no corpo da requisição.
Caso já exista um usuário com o email informado, não será criado um novo registro no banco de dados.


## Tecnologias e Bibliotecas Utilizadas

- [React.js](https://pt-br.reactjs.org/)
- [Next.js](https://nextjs.org/docs)
- [Typescript](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Node.js](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/)
- [Vercel](https://vercel.com/)
- [axios](https://github.com/axios/axios)
- [anonymous Animals](https://github.com/wayou/anonymous-animals)
- [js-cookie](https://github.com/js-cookie/js-cookie)
- [react-aria](https://react-spectrum.adobe.com/react-aria/)

Optou-se pelo Next pois ele possibilita a indexação mais fácil do conteúdo do site (criado em react), por motores de busca. E também para poder começar a apreder a utilizá-lo.<br/>
Também comecei a aprender Typescript há poucas semanas e quis utilizá-lo devido a sua grande utilidade em definir e identificar tipos e atributos obrigatórios ou opcionais em funções ou objetos "tipados".<br/>
Utilizou-se o banco de dados não-relacional MongoDB pois estava-se interessado apenas nos dados do usuário, sem interações com outras entidades.<br/>
Os avatares dos usuários foram criados aleatoriamente no momento de seus cadastros, utilizando-se as imagens encontradas no repositório [github.com/wayou/anonymous-animals](https://github.com/wayou/anonymous-animals). <br/>
Para trabalhar com a definição dos cookies e persistência dos dados do usuário logado mesmo quando a página for fechada ou recarregada, utilizou-se a biblioteca js-cookie.
Por fim, utilizou-se a fantástica biblioteca react-aria para trabalhar com a acessibilidade dos modais, trabalhando-se a fixação do foco e definição de aria-hidden. 
O deploy do projeto foi feito através da plataforma Vercel.
