# Nota Solidária Portal

## Installation

### Required

 - [Heroku Toolbelt](https://devcenter.heroku.com/articles/heroku-command#installing-the-heroku-cli)
 - [MongoDB](https://docs.mongodb.com/manual/installation/)
 - node 
 - npm 
 - bower

### Local install

 1. `git clone https://github.com/CodeForCuritiba/nota_solidaria_portal.git`
 2. `npm install`
 3. Start MongoDB server: `mongod`
 4. `node server.js`
 5. It should be running!!

### Deploy

#### On Heroku

 - `heroku create myapp`
 - `git push heroku master`

#### On production
 
 Make sure you have access to heroku notasolidaria project. If not, create an account and provide your email to a project member that can add you in the developper's list.

 1. Add heroku as a git remote server: `git remote add heroku https://git.heroku.com/notasolidaria.git`
 2. `git push heroku master`

