import env from "dotenv";
import { prisma } from "../configs/prismaClient.js";
import questaoService from "../services/AulaService.js";
import CommonResponse from "../utils/commonResponse.js";
import path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import questaoRepository from "../repositories/AulaRepository.js";
import { sendError, sendResponse } from "../utils/messages.js";
import { ZodError } from 'zod';

env.config();

class questaoController {
  static listar = async (req, res) => {
    try {
      const response = await prisma.questao.findMany();
      res.status(200).json({ response: response });

      // você retornar utilizando esse metodo
      return sendResponse(res,201, {data:"seu retorno"});

    } catch (err) {

      if(err instanceof ZodError){
        return sendError(res,400,err.errors[0].message);

      }else if(err.message == "Aqui vai a mensagem de Erro que vc gerou lá no service." ){
        return sendError(res,404,["Aqui vai a mensagem de Erro que vc gerou lá no service."]);

      }else{
        return sendError(res,500,"Ocorreu um erro interno no servidor!");
      }
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

      // você retornar utilizando esse metodo
      return sendResponse(res,201, {data:"seu retorno"});
    
    } catch (err) {

      if(err instanceof ZodError){
        return sendError(res,400,err.errors[0].message);

      }else if(err.message == "Aqui vai a mensagem de Erro que vc gerou lá no service." ){
        return sendError(res,404,["Aqui vai a mensagem de Erro que vc gerou lá no service."]);

      }else{
        return sendError(res,500,"Ocorreu um erro interno no servidor!");
      }
     }
  };

  static buscar_pdf = async (req, res) => {
    try {
      const fileName = req.params.fileName;
      const filePath = path.join(__dirname, '../../uploads/pdf', fileName);

      res.sendFile(filePath, (err) => {
          if (err) {
              return sendError(res,404,['Arquivo não foi encontrado']);
          }
      });

    } catch (err) {
      console.error(err)
        return sendError(res,500,"Ocorreu um erro interno no servidor!");
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

      // você retornar utilizando esse metodo
      return sendResponse(res,201, {data:"seu retorno"});

    } catch (err) {

      if(err instanceof ZodError){
        return sendError(res,400,err.errors[0].message);

      }else if(err.message == "Aqui vai a mensagem de Erro que vc gerou lá no service." ){
        return sendError(res,404,["Aqui vai a mensagem de Erro que vc gerou lá no service."]);

      }else{
        return sendError(res,500,"Ocorreu um erro interno no servidor!");
      }
     }
  }

  static inserir = async(req, res) => {
    try{
        const parametros = {
          posicao: req.body.posicao,
          titulo: req.body.titulo,
          pdf: req.body.pdf,
          link_video: req.body.link_video
        }

        const perguntas = req.file.perguntas
        const gabarito = req.file.gabarito

        const questaoCreate = await questaoService.create(perguntas, gabarito, parametros)

        console.log("resposta")
        return sendResponse(res,201,{data: questaoCreate})

      // você retornar utilizando esse metodo
      return sendResponse(res,201, {data:"seu retorno"});

    } catch (err) {

      if(err instanceof ZodError){
        return sendError(res,400,err.errors[0].message);

      }else if(err.message == "Aqui vai a mensagem de Erro que vc gerou lá no service." ){
        return sendError(res,404,["Aqui vai a mensagem de Erro que vc gerou lá no service."]);

      }else{
        return sendError(res,500,"Ocorreu um erro interno no servidor!");
      }
    }
  }

  static aula_status = async (req, res) => {
    try {

      // você retornar utilizando esse metodo
      return sendResponse(res,201, {data:"seu retorno"});

    } catch (err) {

      if(err instanceof ZodError){
        return sendError(res,400,err.errors[0].message);

      }else if(err.message == "Aqui vai a mensagem de Erro que vc gerou lá no service." ){
        return sendError(res,404,["Aqui vai a mensagem de Erro que vc gerou lá no service."]);

      }else{
        return sendError(res,500,"Ocorreu um erro interno no servidor!");
      }
     }
  };

  static deletar = async (req, res) => {
    try {

      // você retornar utilizando esse metodo
      return sendResponse(res,201, {data:"seu retorno"});

    } catch (err) {

      if(err instanceof ZodError){
        return sendError(res,400,err.errors[0].message);

      }else if(err.message == "Aqui vai a mensagem de Erro que vc gerou lá no service." ){
        return sendError(res,404,["Aqui vai a mensagem de Erro que vc gerou lá no service."]);

      }else{
        return sendError(res,500,"Ocorreu um erro interno no servidor!");
      }
     }
  };
}

export default questaoController;
