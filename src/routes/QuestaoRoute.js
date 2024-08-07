import express from "express"
import questaoController from "../controllers/questaoController.js"

const router = express.Router();

    router.get("/questao", questaoController.listar)
 
    export default router;