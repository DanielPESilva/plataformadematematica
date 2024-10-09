import express from "express"
import AulaController from "../controllers/AulaController.js"
const router = express.Router();

router
    router.get("/aula", AulaController.listar)
    router.get("/aula/:id",AulaController.listarPorID)
    router.post('/aula', AulaController.inserir);
    router.patch('/aula/:id',AulaController.atualizar);
    router.delete('/aula', AulaController.deletar)

    export default router;