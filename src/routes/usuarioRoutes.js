import express from "express";
import usuarioController from "../controllers/usuarioController";
import AuthMiddleware from "../middlewares/AuthMiddleware";

const router = express.Router();

router
  .get("/usuario", AuthMiddleware, usuarioController.listar)
  .get("/usuario/:id", AuthMiddleware, usuarioController.listarPorID)
  .post("/usuario", AuthMiddleware, usuarioController.inserir)
  .patch("/usuario/:id", AuthMiddleware, usuarioController.atualizar)
  .delete("/usuario/:id", AuthMiddleware, usuarioController.excluir)

  export default router;