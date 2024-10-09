import env from "dotenv";
import turmaService from "../services/turmaService.js"
import CommonResponse from '../utils/commonResponse.js';
import { sendError, sendResponse } from "../utils/messages.js";
import { z } from 'zod';

env.config();


class TurmaController{

  /**
   * @listar Listará todas as turmas, caso não exista uma turma dará erro
   * @error200 Deu certo :)
   * @error400 sintaxe de requisição mal formada ou enquadramento de mensagem de requisição inválida
   * @error500 problema generalizado no servidor interno da api
   *
   */

  static listar = async (req, res) => {
    try {
      
      const { titulo } = req.params;

      const  turmas  = await turmaService.listar(titulo);
      
      // continua deopis que voltar do service
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

      if(err instanceof ZodError){
        return sendError(res,400,err.errors[0].message);

      }else if(err.message == "Aqui vai a mensagem de Erro que vc gerou lá no service." ){
        return sendError(res,404,["Aqui vai a mensagem de Erro que vc gerou lá no service."]);

      }else{
        return sendError(res,500,"Ocorreu um erro interno no servidor!");
      }
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

  static createTurma = async (req, res) => {

    console.log("1 - Capturando a requisição"+JSON.stringify(req.body))
    try {
      const turmaCreated = await turmaService.create(req.body);
      
      console.log("Turma criada"+turmaCreated);
      if (turmaCreated) {
        return res.status(201).json(CommonResponse.created(turmaCreated, messages.validationGeneric.resourceCreated('Turma')));
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

      if(err instanceof ZodError){
        return sendError(res,400,err.errors[0].message);

      }else if(err.message == "Aqui vai a mensagem de Erro que vc gerou lá no service." ){
        return sendError(res,404,["Aqui vai a mensagem de Erro que vc gerou lá no service."]);

      }else{
        return sendError(res,500,"Ocorreu um erro interno no servidor!");
      }
     }
  }


  static inserirUsuario = async (req, res) => {
    try {
      
      const usuarioInserido = await turmaService.inserirUsuario(req);
      return res.status(201).json(CommonResponse.created(usuarioInserido, messages.validationGeneric.alunomatriculado('Aluno')));

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

  static removerUsuario = async (req, res) => {
    try {

      console.log(req.body);
      
      const usuarioRemovido = await turmaService.removerUsuario(req);
      return res.status(200).json(CommonResponse.success(usuarioRemovido, messages.validationGeneric.resourceRemove('Aluno')));

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
  static excluirTurma = async (req, res) => {
    try {
      if (!req.params.id) {
        return res.status(400).json(CommonResponse.badRequest(messages.validationGeneric.resourceNotFound('turma')));
      }
      const id = req.params.id;
      await turmaService.excluirTurma(parseInt(id));
      return res.status(200).json(CommonResponse.success([], messages.validationGeneric.resourceDeleted('turma')));

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
}
export default TurmaController;
