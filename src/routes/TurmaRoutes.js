import express from "express";
import TurmaController from "../controllers/turmaController.js";

const router = express.Router();

router
  .get("/usuario", TurmaController.listar)
  .get("/turma",TurmaController.listarPorID)
 
  export default router;