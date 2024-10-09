import express from "express";
import systemUsuarioController from "../controllers/UsuarioController.js";

const router = express.Router();

router
  .get("/usuario", systemUsuarioController.listar)
  .get("/usuario/:id", systemUsuarioController.listarPorID)
  .post("/usuario", systemUsuarioController.inserir_csv)
  .patch("/usuario/:id", systemUsuarioController.atualizar)
  .delete("/usuario/:id", systemUsuarioController.deletar)
 
  export default router;