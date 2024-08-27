import express from "express"
import questaoController from "../controllers/questaoController.js"

const router = express.Router();

    router.get("/questao", questaoController.listar)
    router.get("/questao/:id",questaoController.listarPorID)
    router.patch('/questao/:id',questaoController.atualizar);
    export default router;