import express from "express";
import ModuloController from "../controllers/moduloController.js";
const router = express.Router();

router
  .get("/modulo", ModuloController.listar)
  .get("/modulo/:id", ModuloController.listarPorID)
  .post("/modulo", ModuloController.inserir)
  .patch("/modulo/:id", ModuloController.atualizar)
  .delete("/modulo/:id", ModuloController.deletar)
 
  export default router;