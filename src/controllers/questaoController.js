import env from "dotenv";
import { prisma } from "../configs/prismaClient.js";
import questaoService from "../services/questaoService.js";
import CommonResponse from "../utils/commonResponse.js";
import questaoRepository from "../repositories/questaoRepository.js";
import {sendError,sendResponse} from '../utils/messages.js';
import { z, ZodError } from 'zod';

env.config();

class questaoController {
  static listar = async (req, res) => {
    try {
      const response = await prisma.questao.findMany();
      res.status(200).json({ response: response });
    } catch (error) {
      res.status(400).json({
        error: true,
        code: 400,
        message: error.message,
      });
    }
  };
  static listarPorID = async (req, res) => {
    try {
      const id_questao = parseInt(req.params.id);

      const questaoExists = await questaoService.listarPorID(id_questao);

      if (questaoExists) {
        return res.status(200).json(CommonResponse.success(questaoExists));
      } else {
        return res
          .status(400)
          .json(
            CommonResponse.notFound(
              messages.validationGeneric.resourceNotFound("questao")
            )
          );
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json(CommonResponse.serverError());
    }
  };

  static atualizar = async (req, res) => {
    try {
      console.log(req.body);
  
      if (!req.params.id) {
        return res.status(400).json(CommonResponse.notFound("ID da questão é obrigatório"));
      }
  
      const id = parseInt(req.params.id);
      const { data } = req.body;
  
      
      if (!data || Object.keys(data).length === 0) {
        return res.status(400).json(CommonResponse.notFound("Nenhum campo fornecido para atualização"));
      }
  
      const { titulo, posicao, pdf, link_video } = data;
  
      
      if (titulo || posicao || pdf || link_video) {
        
        const questaoAtualizada = await questaoRepository.update(id, posicao, titulo, pdf, link_video);
  
        return res.status(200).json(CommonResponse.success(questaoAtualizada, "Questão atualizada com sucesso"));
      } else {
        return res.status(400).json(CommonResponse.notFound("Nenhum campo válido fornecido para atualização"));
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json(CommonResponse.serverError());
    }
  }

  static createQuestao = async(req, res) => {
    try{
        const parametros = {
          id: req.body.id,
          posicao: req.body.posicao,
          titulo: req.body.titulo,
          pdf: req.body.pdf,
          link_video: req.body.link_video
        }

        const questaoCreate = await questaoService.create(parametros)

        console.log("resposta")
        return sendResponse(res,201,{data: questaoCreate})

    }catch(err){
        console.log(err)
      if (err.message === "Questão informada não existe."){
        return sendError(res, 404, ["Questão informda não existe"])
      }else if (err instanceof z.ZodError){
        const errorMessages = err.issues.map((issue) => issue.message)
        return sendError(res, 400, errorMessages) 
      }else{
        return sendError( res, 500, ["OCORREU UM ERRO INTERNO"])
      }
    }
  }



}

export default questaoController;
