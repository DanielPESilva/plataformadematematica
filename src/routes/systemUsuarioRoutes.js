import express from "express";
import systemUsuarioController from "../controllers/systemUsuarioController.js";

const router = express.Router();

router
  .get("/usuario", TurmaController.listar)
  .get("/usuario/:id", TurmaController.listarPorID)
  .post("/usuario", TurmaController.inserir)
  .patch("/usuario/:id", TurmaController.atualizar)
  .delete("/usuario/:id", TurmaController.excluir)
 
  export default router;