import express from "express";
import TurmaController from "../controllers/TurmaController.js";

const routerTurma = express.Router();

routerTurma
  .get("/turma" )
  .get("/turma/:id" )
  .post("/turma")
  .patch("/turma/:id")
  .delete("/turma/:id")
 
  export default routerTurma;