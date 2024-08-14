import env from "dotenv";
import { prisma } from "../configs/prismaClient.js";
import turmaService from "../services/turmaService.js"
import CommonResponse from '../utils/commonResponse.js';

env.config();


class TurmaController{

  /**
   * @listar Listará todas as turmas, caso não exista turma dará erro
   * @page O primeiro é quantidade de tabelas que aparecerão e o segundo é a quantidade de colunas que cada tabela terá...
   * @error200 Deu certo :)
   * @error400 sintaxe de requisição mal formada ou enquadramento de mensagem de requisição inválida
   * @error500 problema generalizado no servidor interno da api
   * @pagination Como o page irá operar
   *
   */
  static listar = async (req, res) => {
    try {
      const usuarios = await usuarioRepository.findById(id);
  
  if (!usuarios) {
    return res.status(404).json(CommonResponse.notFound('Usuário não encontrado.'));
  }

  const { titulo, page = 1, perPage = 10 } = req.query;
  const { turmas, total } = await turmaService.listar(titulo, usuarios.nome, parseInt(page), parseInt(perPage));

  if (turmas.length === 0) {
    return res.status(400).json(CommonResponse.notFound(messages.validationGeneric.resourceNotFound('Turmas')));
  }

  const resultado = {
    titulo,
    usuarios 
  };
  
    } catch (err) {
      if (process.env.DEBUGLOG === 'true') {
        console.log(err);
      }
      return res.status(500).json(CommonResponse.serverError());
    }

  }

  static listarPorID = async (req, res) => {
    try {
      
      const id_turma = parseInt(req.params.id);


      const turmaExists = await turmaService.listarPorID(id_turma);
    
      if (turmaExists) {
        return res.status(200).json(CommonResponse.success(turmaExists));
      } else {
        return res.status(400).json(CommonResponse.notFound(messages.validationGeneric.resourceNotFound('turma')));
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json(CommonResponse.serverError());
    }
  }

}
export default TurmaController;