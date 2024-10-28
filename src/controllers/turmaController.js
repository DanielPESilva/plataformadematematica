import env from "dotenv";
import turmaService from "../services/turmaService.js"
import CommonResponse from '../utils/commonResponse.js';
import { sendError, sendResponse } from "../utils/messages.js";

env.config();


class TurmaController{

  static listar = async (req, res) => {
    try {
      
      const { titulo } = req.params;

      const  turmas  = await turmaService.listar(titulo);
      
     
      if (!turmas) {
        return res.status(400).json(CommonResponse.notFound(messages.validationGeneric.resourceNotFound('Turmas')));
      } else {
        return res.status(200).json({
          ...CommonResponse.success(turmas, messages.validationGeneric.resourceFound('Turmas')),
        });
      }

    // você retornar utilizando esse metodo
    return sendResponse(res,201, {data:"seu retorno"});

    } catch (err) {
      console.log(err)
      if(err instanceof ZodError){
        return sendError(res,400,err.errors[0].message);

      }else if(err.message == "Aqui vai a mensagem de Erro que vc gerou lá no service." ){
        return sendError(res,404,["Aqui vai a mensagem de Erro que vc gerou lá no service."]);

      }else{
        return sendError(res,500,"Ocorreu um erro interno no servidor!");
      }
     }
  }

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

    // você retornar utilizando esse metodo
    return sendResponse(res,201, {data:"seu retorno"});

    } catch (err) {
      console.log(err)
      if(err instanceof ZodError){
        return sendError(res,400,err.errors[0].message);

      }else if(err.message == "Aqui vai a mensagem de Erro que vc gerou lá no service." ){
        return sendError(res,404,["Aqui vai a mensagem de Erro que vc gerou lá no service."]);

      }else{
        return sendError(res,500,"Ocorreu um erro interno no servidor!");
      }
     }
  }

  static atualizar = async (req, res) => {
    try{
      let id=req.params.id;
      let updatedTurma = {
        titulo:req.body.titulo
      }
      console.log("1- Controller, coletou o body "+JSON.stringify(updatedTurma));
    

      const turma = await turmaService.atualizarTurma(parseInt(id),updatedTurma)

      //voltar aqui após resposta do server
      return sendResponse(res,201, {data: turma});

      // você retornar utilizando esse metodo
      return sendResponse(res,201, {data:"seu retorno"});

    } catch (err) {
      console.log(err)
      if(err instanceof ZodError){
        return sendError(res,400,err.errors[0].message);

      }else if(err.message == "Aqui vai a mensagem de Erro que vc gerou lá no service." ){
        return sendError(res,404,["Aqui vai a mensagem de Erro que vc gerou lá no service."]);

      }else{
        return sendError(res,500,"Ocorreu um erro interno no servidor!");
      }
     }
  }
}
export default TurmaController;
