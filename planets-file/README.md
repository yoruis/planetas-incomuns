Esta é uma tela simples de site utilizando Next.js (https://nextjs.org). O objetivo desse mini projeto é exibir planetas com características incomuns (que estão armazenados no banco de dados da vercel) através de cards e permitir que o usuário encontre a sua imagem do espaço tirada no dia do seu aniversário, onde também constará uma breve descrição. Por fim, o usuário também vai poder visualizar imagens e/ou vídeos astronômicos que, ao clicar, vai gerar um modal com a imagem ampliada e uma descrição. A ideia é que futuramente, seja um site voltado a astronomia no geral, para os amantes do espaço, onde terá informações científicas sobre diversos corpos celestes.

## Para instalar:

Primeiro, no terminal do VSCODE, digite, na ordem:

```bash
1. npx create-next-app@latest
2. [nome da pasta e do projeto]
3. npm run dev
```

Depois, após instalar todas as dependências, abra[http://localhost:3000], seu projeto em NEXT.JS estará criado. Aplique os códigos.

## Design do projeto

### Layout principal:
![alt text](image.png)
### Primeira seção:
Aqui contém os cards com os dados sobre os planetas registrados em uma das tabelas do banco de dados. As informações são: Nome, anos-luz, tipo, imagem e uma descrição.

![alt text](image-1.png)
### Segunda seção:
Um pequeno espaço para digitar uma data, ao apertar em "Buscar", uma imagem + texto será exibido.

![alt text](image-5.png)
### Terceira seção:
Ao clicar no botão de triângulo, vai exibir imagens referente ao espço, astronomia e afins.

![alt text](image-3.png)

Ao clicar na imagem, vai abrir um modal. Exemplo:

![alt text](image-4.png)

## Funcionalidades
- [ x ] Cards contendo dados sobre planetas
- [ x ] Input que recebe data e retorna imagem + texto
- [ x ] Botão que exibe imagens + dados científicos
- [   ] Abrir modal/página ao clicar no card do planeta
- [   ] Responsividade 
- [   ] Permitir pesquisa de planetas
- [   ] Permitir favoritar e ter histórico

## SQL Tabelas:

``` bash
CREATE TABLE planets (
id serial primary key,
id_planet integer,
image_url varchar (100)
name VARCHAR(100),
light_years double precision,
description text, 
type varchar(100)
);

INSERT INTO planets (id_planet, name, light_years, description, type, image_url)
VALUES (1, 'GJ 504b (O planeta rosa)', 57, 'O GJ 504b é um exoplaneta gigante gasoso, apelidado de "planeta rosa" por sua cor magenta, descoberto orbitando a estrela GJ 504, a 57 anos-luz de distância, na constelação de Virgem. Com cerca de 4 vezes a massa de Júpiter e 160 milhões de anos, ele é notável por sua cor devido ao calor residual da formação e por desafiar teorias de formação planetária por estar muito longe de sua estrela, sendo fotografado diretamente com o Telescópio Subaru. ', 'gasoso', '../pink.png');

CREATE TABLE planet_details (
  id SERIAL PRIMARY KEY,
  planet_id INTEGER NOT NULL,
  image_url VARCHAR(255),
  descrip TEXT

  CONSTRAINT fk_planet
    FOREIGN KEY (planet_id)
    REFERENCES planets(id)
    ON DELETE CASCADE
);

INSERT INTO planet_details (planet_id, image_url, descrip) 
VALUES (1, '/pink.png', 'é um planeta...');

```

## Tecnologias:
``` bash
VERCEL: Banco de dados + deploy
NEXT.JS: Framework REACT para a aplicação.
VSCODE STUDIO: Editar/criar código, rodar a aplicação.
FRONT-END: Para layout da página.
CSS5: Estilização.
BACK-END: Toda a lógica.
```

## Deploy on Vercel
Está página tem deploy na Vercel, para saber mais, acesse a documentação: Next.js deployment documentation. Você pode utilizar a chave: POSTGRES_URL= "postgresql://neondb_owner:npg_nuPawkIDb4V2@ep-dawn-fire-aciv7i9v-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require" para acessar o banco.

## Observações: 

 > [!NOTE]
 > Projeto feito na disciplina de Programação WEB II do curso de ADS do IFCE de Jaguaruana.

 > [!IMPORTANT]
 > Não indicado para dispositivos mobile ou achatamento de tela no desktop. 
 > Alguns botões não funcionam.
## Contatos
Email: laisccastroc2023@gmail.com