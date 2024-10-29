import env from "dotenv";
import AulaService from "../services/AulaService.js";
import CommonResponse from "../utils/commonResponse.js";
import path from "path";
import { sendError, sendResponse } from "../utils/messages.js";
import { ZodError } from 'zod';

env.config();

class AulaController {

  /**
   * Parâmetros aceitos:
   * - titulo: Filtra pelo título da aula (opcional).
   * - feito: Se a aula foi feita ou não ("true" ou "false").
   * - revisar: Se a aula precisa ser revisada ("true" ou "false").
   */
  static listarAll = async (req, res) => {
    try {
      const { titulo, aluno_id, modulo_id } = req.query;     

      const parametros = {
        titulo: titulo,
        modulo_id: modulo_id ? parseInt(modulo_id) : undefined,
        aluno_id: aluno_id ? parseInt(aluno_id) : undefined 
    }

      const aulaExist = await AulaService.listar(parametros);

      return sendResponse(res,200,{data:aulaExist});

    } catch (err) {
      console.error(err);
      if(err instanceof ZodError){
        return sendError(res,400,err.errors[0].message);

      }else if(err.message == "Nenhuma aula encontrada." ){
        return sendError(res,404,["Nenhuma aula encontrada."]);

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
        const files = req.files;

        const parametros = {
          modulo_id: req.body.modulo_id,
          titulo: req.body.titulo == '' ? undefined : req.body.titulo,
          video: req.body.video,
          descricao: req.body.descricao == '' ? undefined : req.body.descricao,
          pdf_questoes: files.perguntas ? files.perguntas[0].filename : undefined,
          pdf_resolucao: files.gabarito ? files.gabarito[0].filename : undefined
        };
      console.log(parametros)
      
      const questaoCreate = await AulaService.create(parametros)

      return sendResponse(res,201, {data:questaoCreate});

    } catch (err) {

      if(err instanceof ZodError){
        return sendError(res,400,[err.errors[0].message, err.errors[0].path]);

      }else if(err.message == "O modulo informado não existe." ){
        return sendError(res,404,[err.message]);

      }else {
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

  static buscar_arquivo = async (req, res) => {
    try {
      const fileName = req.params.fileName;

      const filePath = path.join(process.cwd(), './uploads/pdf', fileName);

      res.sendFile(filePath, (err) => {
          if (err) {
              return sendError(res,404,['Arquivo não foi encontrado']);
          }
      });

    } catch (err) {
      return sendError(res,500,"Ocorreu um erro interno no servidor!");

     }
  };
}

export default AulaController;
