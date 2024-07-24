import express from "express"
import QuestaoController from "../controllers/QuestaoController"

const router = express.Router();

routerQuestao
    .get("/turma",QuestaoController.listar)
    .get("/turma",QuestaoController.listarPorID)
    .post("/Questao")
    .patch("/Questao/:id")
    .delete("/Questao/:id")
 
    export default router;