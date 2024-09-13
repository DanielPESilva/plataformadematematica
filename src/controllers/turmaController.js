import env from "dotenv";
import turmaService from "../services/turmaService.js"
import CommonResponse from '../utils/commonResponse.js';
import {sendError,sendResponse, messages} from '../utils/messages.js';
import { z} from 'zod';
import id from "faker-br/lib/locales/id_ID/index.js";

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
      const { turmasComAlunos } = await turmaService.listar(titulo);
      
      // continua deopis que voltar do service
      if (!turmasComAlunos) {
        return res.status(400).json(CommonResponse.notFound(messages.validationGeneric.resourceNotFound('Turmas')));
      } else {
        return res.status(200).json({
          ...CommonResponse.success(turmasComAlunos, messages.validationGeneric.resourceFound('Turmas')),
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

    console.log("1 - Capturando a requisição"+JSON.stringify(req.body))
    try {
      const turmaCreated = await turmaService.create(req.body);
      
      console.log("Turma criada"+turmaCreated);
      if (turmaCreated) {
        return res.status(201).json(CommonResponse.created(turmaCreated, messages.validationGeneric.resourceCreated('Turma')));
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        // Formatar os erros para exibir apenas `path` e `message`
        const formattedErrors = err.errors.map(error => ({
          path: error.path.join('.'), // Converte o path para uma string (ex: "email")
          message: error.message // A mensagem de erro do Zod
        }));
        return res.status(422).json(CommonResponse.unprocessableEntity(formattedErrors));
      }
      return res.status(500).json(CommonResponse.unprocessableEntity(Error, err.message));
    }
}

    static atualizarTurma = async (req, res) => {
    try{
      let id=req.params.id;
      let updatedTurma = {
        titulo:req.body.titulo
      }
      console.log("1- Controller, coletou o body "+JSON.stringify(updatedTurma));
    

      const turma = await turmaService.atualizarTurma(parseInt(id),updatedTurma)

      //voltar aqui após resposta do server
      return sendResponse(res,201, {data: turma});

    }catch(err){

      console.log(err.message);
      
      if(err instanceof z.ZodError){
        return sendError(res,400,err.errors[0].message);

      }else if(messages.error == "Turma não existe." ){
        return sendError(res,404,["Turma não existe."]);

      }else{
        return sendError(res,500,"Ocorreu um erro interno no servidor!");
      }
    }
  }


/**
 * 
 * NÃO MEXE NA MINHA ROTAAAAAAA
 *
 */





  static inserirUsuario = async (req, res) => {
    try {
      console.log(req.body);
      const turmaCreated = await turmaService.inserirUsuario(req.body);
      
      return res.status(201).json(CommonResponse.created(turmaCreated, messages.validationGeneric.resourceCreated('Turma')));

    } catch (err) {
      if (err instanceof z.ZodError) {
        // Formatar os erros para exibir apenas `path` e `message`
        const formattedErrors = err.errors.map(error => ({
          path: error.path.join('.'), // Converte o path para uma string (ex: "email")
          message: error.message // A mensagem de erro do Zod
        }));
        return res.status(422).json(CommonResponse.unprocessableEntity(formattedErrors));
      }
      // console.error(err);
      return res.status(500).json(CommonResponse.unprocessableEntity(Error, err.message));
    }
}
}
export default TurmaController;
