import ModuloService from "../services/moduloService.js";
import env from "dotenv";
import { sendError, sendResponse } from "../utils/messages.js";

env.config()

class ModuloController{
    static listar = async (req, res) => {
        try{

          // lista_modulos = await ModuloService.listar(filtro)
        
        return sendResponse(res,201, {data:"seu retorno"});
    } catch (err) {
        console.log(err)

        if(err instanceof ZodError){
            return sendError(res,400,err.errors[0].message);
    
        }else if(err.message == "Nenhum modulo encontrado." ){
            return sendError(res,404,["Nenhum modulo encontrado."]);
    
        }else{
            return sendError(res,500,"Ocorreu um erro interno no servidor!");
        }
    }
    }
    static listarPorID = async (req, res) => {
      try{

        // lista_id = await ModuloService.listarPorID(filtro)

        // você retornar utilizando esse metodo
        return sendResponse(res,201, {data:"seu retorno"});

      }catch (err) {
      console.log(err)

        if(err instanceof ZodError){
          return sendError(res,400,err.errors[0].message);
  
        }else if(err.message == "Nenhum modulo encontrado." ){
          return sendError(res,404,["Nenhum modulo encontrado."]);
  
        }else{
          return sendError(res,500,"Ocorreu um erro interno no servidor!");
        }
       }
    }

  //POST
  static inserir = async (req, res) => {
    try {

      // modulo_criado = await ModuloService.inserir(insert)

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
  };    

    static deletar = async (req, res) => {
        try {
        
          // deletado = await ModuloService.excluir(filtro)

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
    // PUT
  static atualizar = async (req, res) => {
    try {
      // atualizado = await ModuloService.atualizar(filtro)
      
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

export default ModuloController;