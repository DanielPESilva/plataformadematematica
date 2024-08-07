import express from 'express'
import * as dotenv from 'dotenv';
import app from "./src/app.js";

dotenv.config()

// definição de porta condicional do proxy ou na 8086
const port = process.env.PORT || 8086;
app.listen(port, ()=>{
    console.log(`Rodando na porta ${port}`);
})
