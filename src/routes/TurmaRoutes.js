import express from "express";
import TurmaController from "../controllers/turmaController.js";

const router = express.Router();
  router.get("/turma", TurmaController.listar)
  
  /** 
  router.get("/turma/:id",TurmaController.listarPorID)
 */
  export default router;
