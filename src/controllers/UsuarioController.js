import bcrypt from "bcryptjs";
import env from "dotenv";
import { sendError, sendResponse } from '../utils/messages.js';
import UsuarioService from '../services/usuarioService.js';


import { boolean, ZodError } from "zod";


env.config(); 

class systemUsuarioController {

  static listar = async (req, res) => {
    try {
        const filtros = req.query;
        const usuarios = await UsuarioService.listarUsuarios(filtros);
        return sendResponse(res, 200, { data: usuarios });
    } catch (err) {
      console.log(err)
        return sendError(res, 400, err.message);
    }
};

static buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await UsuarioService.buscarUsuarioPorId(parseInt(id));
        return sendResponse(res, 200, { data: usuario });
    } catch (err) {
      console.log(err)
        return sendError(res, 404, err.message);
    }
};

 static criarUsuario = async(req, res) => {
  try {
    const {nome,matricula,senha,active,grupo_id} = req.body

    const parametros = {nome:nome,matricula:parseInt(matricula),senha:senha,active:Boolean(active),grupo_id:parseInt(grupo_id)}
    console.log(parametros)

    const usuario = await UsuarioService.criarUsuario(parametros); // Chama a função de serviço para criar o usuário

    return sendResponse(res, 201, { data: usuario });
    
  } catch (error) {
    if(error instanceof ZodError){
      return sendError(res,400,error.errors[0].message);

    }else if(error.message == "Não foi possivel criar usuario pois grupo não existe" ){
      return sendError(res,404,["Não foi possivel criar usuario pois email já está cadastrado."]);

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
      console.error(err);

      if (err instanceof ZodError) {
        return sendError(res, 400, err.errors[0].message);
      } else if (
        err.message == "Aqui vai a mensagem de Erro que vc gerou lá no service."
      ) {
        return sendError(res, 404, [
          "Aqui vai a mensagem de Erro que vc gerou lá no service.",
        ]);
      } else {
        return sendError(res, 500, "Ocorreu um erro interno no servidor!");
      }
    }
  };

}

export default systemUsuarioController;
