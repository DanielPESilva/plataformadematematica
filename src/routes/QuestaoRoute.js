import express from "express"
import questaoController from "../controllers/questaoController"

const router = express.Router();

    router.get("/questao",questaoController.listar)
 
    export default router;