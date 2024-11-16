import express from "express";
import moduloController from "../controllers/moduloController.js";
const router = express.Router();
import multer from "multer";

import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import PermissaoMiddleware from "../middlewares/permissaoMiddleware.js";

/**
 * o modulo é padrão igual qualquer outra rota, so lembre de no get normal
 * ter a possibilidade de filtrar pelo titulo.
 * Importante, tem que ser possivel filtrar os modulos de apenas um turma.
*/

const multerConfig = multer()

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router
  .get("/modulo", moduloController.listar)
  .get("/modulo/:id", moduloController.listarPorId)
  .post("/modulo", AuthMiddleware, PermissaoMiddleware, upload.single('imagem'), moduloController.inserir)
  .patch("/modulo/:id", upload.single('imagem'), moduloController.atualizar)
  .delete("/modulo/:id", moduloController.deletar)
 
  export default router;