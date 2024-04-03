import express from 'express' // importando express
import app from './src/app.js' // importando apps
import * as dotenv from 'dotenv'; // necessário para leitura do arquivo de variáveis

import swaggerUI from 'swagger-ui-express'; // para documentação com o swagger
import swaggerJsDoc from 'swagger-jsdoc';  // para documentação com o swagger
import swaggerOptions from './src/docs/head.js'; // importando configurações do swagger

dotenv.config()

// definição de porta condicional do proxy ou na 3030
const port = process.env.PORT || 3051;

// cabeçalho da documentação
const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// retorno no terminal com o link
app.listen(port, () => {
  console.log(`Servidor escutando em http://localhost:${port}`)
  // console.log(process.env); // Visualizar as variáveis de ambiente em uso
})

// executar node server.js ou  npm run dev
// executar nodemon server.js
// sudo sysctl fs.inotify.max_user_watches=582222 && sudo sysctl -p (para aumentar o limite de arquivos monitorados pelo nodemon)
// executar usnado o nodemon npm run dev
