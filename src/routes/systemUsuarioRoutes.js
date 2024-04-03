import express from "express";
import systemUsuarioController from "../controllers/systemUsuarioController.js";

const router = express.Router();

router
  .get("/usuario", systemUsuarioController.listar)
  .get("/usuario/:id", systemUsuarioController.listarPorID)
  .post("/usuario", systemUsuarioController.inserir)
  .patch("/usuario/:id", systemUsuarioController.atualizar)
  .delete("/usuario/:id", systemUsuarioController.excluir)

  export default router;