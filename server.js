import express from 'express' // importando express
import * as dotenv from 'dotenv'; // necessário para leitura do arquivo de variáveis


dotenv.config()

// definição de porta condicional do proxy ou na 3030
const port = process.env.PORT || 3060;