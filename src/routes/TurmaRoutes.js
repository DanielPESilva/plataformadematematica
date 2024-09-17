import express from "express";
import TurmaController from "../controllers/turmaController.js";

const router = express.Router();
  router.get("/turma", TurmaController.listar)
  router.get("/turma/:id",TurmaController.listarPorID)
  router.post("/turma", TurmaController.createTurma)
  router.patch("/turma/:id",TurmaController.atualizarTurma)  
  router.post("/turma/matricular",TurmaController.inserirUsuario)
  router.delete("/turma", TurmaController.removerUsuario)
  router.delete('/turma/:id',TurmaController.excluirTurma);
  export default router;
