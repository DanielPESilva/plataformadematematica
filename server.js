import express from 'express' // importando express
import * as dotenv from 'dotenv'; // necessário para leitura do arquivo de variáveis

import swaggerUI from 'swagger-ui-express'; // para documentação com o swagger
import swaggerJsDoc from 'swagger-jsdoc';  // para documentação com o swagger
import swaggerOptions from './src/docs/head.js'; 



dotenv.config()

// definição de porta condicional do proxy ou na 3030
const port = process.env.PORT || 3060;

const swaggerDocs = swaggerJsDoc(swaggerOptions);
