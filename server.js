import express from 'express' // importando express
import * as dotenv from 'dotenv';
import app from "./src/app.js";

dotenv.config()

// definição de porta condicional do proxy ou na 3030
const port = process.env.PORT || 3060;

app.listen(port, ()=>{
    console.log(`Rodando na porta ${port}`);
})
