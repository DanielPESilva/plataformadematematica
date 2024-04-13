import express from "express";
import TurmaController from "../controllers/turmaController.js";

const router = express.Router();

routerTurma
  .get("/turma",TurmaController.listarPorID)
  .post("/turma")
  .patch("/turma/:id")
  .delete("/turma/:id")
 
  export default router;