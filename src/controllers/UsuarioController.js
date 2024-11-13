import bcrypt from "bcryptjs";
import env from "dotenv";
import messages, { sendError, sendResponse } from "../utils/messages.js";
import UsuarioService from '../services/usuarioService.js';

import { boolean, ZodError } from "zod";
import UsuarioSchema from "../schemas/usuarioSchema.js";


env.config(); 

class systemUsuarioController {

  static listar = async (req, res) => {
    try {
        const filtros = req.query;

        const usuarios = await UsuarioService.listarUsuarios(filtros);
        return sendResponse(res, 200, { data: usuarios });
    } catch (err) {
        if (err instanceof ZodError) {

            return sendError(res, 400, err.errors[0].message);
        } else {
            return sendError(res, 500, "Ocorreu um erro interno no servidor!");
        }
    }
};


static buscarPorId = async (req, res) => {
  try {

      const usuario = await UsuarioService.buscarUsuarioPorId(req.params);

      return sendResponse(res, 200, { data: usuario });

  } catch (err) {
      if (err instanceof ZodError) {
          return sendError(res, 400, err.errors[0].message);
      } else if (err.message === "Usuário não encontrado.") {
          return sendError(res, 404, err.message);
      } else {
          return sendError(res, 500, "Ocorreu um erro interno no servidor!");
      }
  }
};


static criarUsuario = async (req, res) => {
  try {
    const usuarioData = {
      ...req.body,
      matricula: String(req.body.matricula),
    };

    const { nome, matricula, senha, active, grupo_id } = UsuarioSchema.criarUsuario.parse(usuarioData);

    const parametros = {
      nome: nome,
      matricula: matricula,
      senha: senha,
      active: Boolean(active),
      grupo_id: parseInt(grupo_id),
    };

    const usuario = await UsuarioService.criarUsuario(parametros);

    return sendResponse(res, 201, {
      error: false,
      message: "Requisição bem sucedida",
      data: usuario,
    });
  } catch (error) {
    
    if (error.message === "A matrícula já está em uso") {
      return sendError(res, 400, "A matrícula já está em uso");
    }

    if (error.message === "grupo não encontrado.") {
      return sendError(res, 404, "O grupo informado não foi encontrado.");
    } else if (error instanceof ZodError) {
      return sendError(res, 400, error.errors[0].message);
    } else {
      return sendError(res, 500, "Ocorreu um erro interno no servidor!");
    }
  }
};

static atualizar = async (req, res) => {
  try {
    let id = req.params.id
    let parametros = {
      id: parseInt(id),
      ...req.body
    }
    
    const usuario = await UsuarioService.atualizar(parametros)

      return sendResponse(res,200, {data:usuario});

    } catch (err) {
      if(err instanceof ZodError){
        return sendError(res,400,err.errors[0].message);

      }else if(err.message == "O recurso solicitado não foi encontrado no servidor."){
        return sendError(res,404,["O recurso solicitado não foi encontrado no servidor."]);

      }else if(err.message == "ja existe um usuario com essa matricula"){
        return sendError(res,404,["ja existe um usuario com essa matricula"]);
      }else{
        return sendError(res,500,"Ocorreu um erro interno no servidor!");
      }
    }
}


static atualizarSenha = async (req, res) => {
  try {
    let id = req.params.id
    const {senhaNova, senhaAntiga} = req.body
    
    const usuario = await UsuarioService.atualizarSenha({id, senhaAntiga, senhaNova })

      return sendResponse(res,201, {data:usuario});

    } catch (err) {
      if(err instanceof ZodError){
        return sendError(res,400,err.errors[0].message);

      }else if(err.message == "Usuário não existe."){
        return sendError(res,404,[err.message]);

      }else if(err.message == "Senha Antiga informada está incorreta."){
        return sendError(res,403,[err.message]);
      }else{
        return sendError(res,500,"Ocorreu um erro interno no servidor!");
      }
    }
}


  static inserir_csv = async (req, res) => {
    try {
      if (!req.file) {
        return sendError(res, 400, ["Nenhum arquivo enviado."]);
      }

      const retorno = await UsuarioService.inserir_csv(req.file);

      return sendResponse(res, 201, { data: retorno });
    } catch (err) {

      if(err.message == "Arquivo do tipo errado." ){
        return sendError(res,404,[err.message]);

      }else if(err.message == "Estrutura do CSV está incorreta." ){
        return sendError(res,404,[err.message]);

      }else{
        return sendError(res,500,"Ocorreu um erro interno no servidor!");
      }
    }
  };
  
}

export default systemUsuarioController;
