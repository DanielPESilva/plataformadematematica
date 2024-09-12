import bcrypt from "bcryptjs";
import env from "dotenv";
import { prisma } from ".../configs/prismaClient.js";
import usuarioService from "../services/usuarioService";
import CommonResponse from '../utils/commonResponse.js';
import messages from "../utils/messages.js";

env.config();

class usuarioController {
  // GET
  static listar = async (req, res) => {
    try {
      const { nome, matricula, page = 1, perPage = 10 } = req.query;
      const { usuarios, total } = await usuarioService.listar(nome, matricula, parseInt(page), parseInt(perPage))

      if (usuarios.length === 0) {
        return res.status(400).json(CommonResponse.badRequest(message.validationGeneric.resourceNotFound('Usuário')));
      } else {
        return res.status(200).json({
          ...CommonResponse.success(usuarios, message.validationGeneric.resourceFound('Usuário')),
          pagination: {
            total,
            page: parseInt(perPage),
            perPage: parseInt(perPage),
            totalPages: Math.ceil(total / parseInt(perPage))
          }
        })
      }
    } catch (error) {
      if (process.env.DEBUG === "true") {
        console.log(err);
      }
      return res.status(500).json(CommonResponse.serverError);
    }
  };

  // GET by ID
  static listarPorID = async (req, res) => {
    try {
      const idUsuario = parseInt(req.params.id);

      const usuario = await usuarioService.listarPorID(idUsuario);

      if(usuario) {
        return res.status(200).json(CommonResponse.success(usuario))
      } else {
        return res.status(400).json(CommonResponse.badRequest(messages.validationGeneric.resourceFound('Usuário')))
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json([{ error: true, code: 500, message: "Erro interno." }]);
    }
  };

  //POST
  static inserir = async (req, res) => {
    try {
      const usuario = await usuario.inserir(req.body);
      let camposExcluidos = ['usu_id', 'usu_senha'];

      camposExcluidos.forEach(campo => {
        delete usuario[campo];
      });
      
      return res.status(201).json(CommonResponse.created(usuario, messages.validationGeneric.resourceCreated('Usuário')));
    } catch (error) {
      if (err instanceof ZodError) {
        const formattedErrors = err.errors.map(error => ({
          path: error.path.join('.'),
          message: error.message
        }))
        return res.status(422).json(CommonResponse.unprocessableEntity(formattedErrors));
      }
      return res.status(500).json(CommonResponse.unprocessableEntity(Error, err.message));
      }
  };

  // PUT
  static atualizar = async (req, res) => {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(400).json(CommonResponse.badRequest(messages.validationGeneric.resourceNotFound('Usuário')));
      }
      const { nome, matricula } = req.body;

      if (nome || matricula ) {
        const usuario = await usuarioService.atualizar(parseInt(id), {nome, matricula})
        delete usuario.senha;
        return res.status(200).json(CommonResponse.success(usuario, messages.validationGeneric.resourceUpdated('Usuário')));
      } else {
        return res.status(400).json(CommonResponse.badRequest(messages.validationGeneric.resourceNotFound('Usuário')))
      }

    } catch (error) {
      if (err.message === messages.field.validationGeneric.fieldIsRepeated('Matricula')) {
        return res.status(400).json(CommonResponse.conflict(err.message));
      }
        return res.status(500).json(CommonResponse.unprocessableEntity(Error, ...err.message));  
    }
  }
  // DELETE
  static excluir = async (req, res) => {
    try {
      if (!req.params.id) {
        return req.status(400).json(CommonResponse.badRequest(messages.validationGeneric.resourceNotFound('Usuário')))
      }
      const id = req.params.id
      await usuarioService.excluir(parseInt(id))
      return res.status(200).json(CommonResponse.success([], messages.validationGeneric.resourceDeleted('Usuário')))
    } catch (error) {
      if (error.message === messages.validationGeneric.resourceNotFound('Usuário')) {
        return res.status(400).json(CommonResponse.badRequest(messages.validationGeneric.resourceNotFound('Usuário')))
      }
      console.error();
      return res.status(500).json(CommonResponse.serverError());
    }
  }
}

export default usuarioController;
