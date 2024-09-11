import express from "express";
import TurmaController from "../controllers/turmaController.js";

const router = express.Router();
  router.get("/turma", TurmaController.listar)
  router.get("/turma/:id",TurmaController.listarPorID)
  router.post("/criar", TurmaController.createTurma)
  router.patch("/atualizarTurma/:id",TurmaController.atualizarTurma)
  router.post("/inserirUsuario",TurmaController.inserirUsuario)

  export default router;
