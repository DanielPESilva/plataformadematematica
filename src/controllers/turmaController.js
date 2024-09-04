import env from "dotenv";
import turmaService from "../services/turmaService.js"
import CommonResponse from '../utils/commonResponse.js';
import {sendError,sendResponse, messages} from '../utils/messages.js';
import { z } from 'zod';

env.config();


class TurmaController{

  /**
   * @listar Listará todas as turmas, caso não exista turmaCreated dará erro
   * @page O primeiro é quantidade de tabelas que aparecerão e o segundo é a quantidade de colunas que cada tabela terá...
   * @error200 Deu certo :)
   * @error400 sintaxe de requisição mal formada ou enquadramento de mensagem de requisição inválida
   * @error500 problema generalizado no servidor interno da api
   * @pagination Como o page irá operar
   *
   */

  static listar = async (req, res) => {
    try {
      const { titulo } = req.query;
      const { turmasComAlunos, total } = await turmaService.listar(titulo);
      
      // continua deopis que voltar do service
      if (!turmasComAlunos) {
        return res.status(400).json(CommonResponse.notFound(messages.validationGeneric.resourceNotFound('Turmas')));
      } else {
        return res.status(200).json({
          ...CommonResponse.success(turmasComAlunos, messages.validationGeneric.resourceFound('Turmas')),
          pagination: {
            total,
          }
        });
      }
    } catch (err) {
      if (process.env.DEBUGLOG === 'true') {
        console.log(err);
      }
      return res.status(500).json(CommonResponse.serverError());
    }
  }

  /**
   * @listarPorId Listará as turmaCreated cujo o id foi especificado
   * @page O primeiro é quantidade de tabelas que aparecerão e o segundo é a quantidade de colunas que cada tabela terá...
   * @error200 Deu certo :)
   * @error400 sintaxe de requisição mal formada ou enquadramento de mensagem de requisição inválida
   * @error500 problema generalizado no servidor interno da api
   * @pagination Como o page irá operar
   *
   */
  static listarPorID = async (req, res) => {
    try {
      const idTurma = parseInt(req.params.id);
      const turmaExiste = await turmaService.listarPorID(idTurma);
    
      //voltar aqui após o service
      if (turmaExiste) {
        return res.status(200).json(CommonResponse.success(turmaExiste));
      } else {
        return res.status(400).json(CommonResponse.notFound(messages.validationGeneric.resourceNotFound('Turma')));
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json(CommonResponse.serverError());
    }
  }

  static createTurma = async (req, res) => {
    try {
        const parametros = {
          id:req.body.id,
          titulo: req.body.titulo,
          //usuario_id: parseInt(req.body.usuario_id),
        };
        const turmaCreate = await turmaService.create(parametros)
        
        console.log("resposta")
        return sendResponse(res,201,{data: turmaCreate})

    }catch(err){
      console.log(err)
        if (err.message === "Turma informada não existe.") {
            return sendError(res, 404, ["Turma informada não existe."])

        }else if (err instanceof z.ZodError) {
            const errorMessages = err.issues.map((issue) => issue.message);
            return sendError(res, 400, errorMessages)

        }else{
            return sendError(res, 500, ["OCORREU UM ERRO INTERNO"])
        }
    } 
}



}
export default TurmaController;