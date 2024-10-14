import express from "express";
import moduloController from "../controllers/moduloController.js";
const router = express.Router();

/**
 * o modulo é padrão igual qualquer outra rota, so lembre de no get normal
 * ter a possibilidade de filtrar pelo titulo.
*/

router
  .get("/modulo", moduloController.listar)
  .get("/modulo/:id", moduloController.listarPorID)
  .post("/modulo", moduloController.inserir)
  .patch("/modulo/:id", moduloController.atualizar)
  .delete("/modulo/:id", moduloController.deletar)
 
  export default router;