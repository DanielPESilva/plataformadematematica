import express from "express";
import systemUsuarioController from "../controllers/UsuarioController.js";

/**
 * usuario é padrão não tem nada de especial, so lembre de ser possivel filtar no get por
 * nome, matricula e active, grupo_id. o inserir_csv o lucas vai fazer.
*/

const router = express.Router();

router
  .get("/usuario", systemUsuarioController.listar)
  .get("/usuario/:id", systemUsuarioController.listarPorID)
  .post("/usuario", systemUsuarioController.inserir)
  .post("/usuario", systemUsuarioController.inserir_csv)
  .patch("/usuario/:id", systemUsuarioController.atualizar)
  .delete("/usuario/:id", systemUsuarioController.deletar)
 
  export default router;