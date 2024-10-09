import express from "express";
import TurmaController from "../controllers/TurmaController.js";
const router = express.Router();

router
  router.get("/turma", TurmaController.listar)
  router.get("/turma/:id",TurmaController.listarPorID)
  router.patch("/turma/:id",TurmaController.atualizar)  
  export default router;
