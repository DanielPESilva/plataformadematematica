import express from "express";
import usuarioController from "../controllers/usuarioController";

const router = express.Router();

router
  .get("/usuario", usuarioController.listar)
  .get("/usuario/:id", usuarioController.listarPorID)
  .post("/usuario", usuarioController.inserir)
  .patch("/usuario/:id", usuarioController.atualizar)
  .delete("/usuario/:id", usuarioController.excluir)

  export default router;