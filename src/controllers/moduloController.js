import env from "dotenv";
import { sendError, sendResponse } from "../utils/messages.js";
import moduloService from "../services/moduloService.js";

env.config()

class ModuloController{
  static listar = async (req, res) => {
    try {
      const { mod_id, mod_tema, mod_descricao,mod_pdf, mod_linkVideo } = req.query;
      const filtro = {
        mod_id: mod_id,
        mod_tema: mod_tema,
        mod_descricao: mod_descricao,
        mod_pdf:mod_pdf,
        mod_linkVideo:mod_linkVideo
      };
      const response = await moduloService.listar(filtro);
      return res.status(201).json({
        data: response,
        error: false,
        code: 201,
        message: response.length > 1 ? "Modulo encontrado" : "Modulo encontrado",
      });
    } catch (error) {
      return res.status(error.code || 500).json(error);
    };
  };

    static listarPorID = async (req, res) => {
      try {
        const id = { mod_id: req.params.mod_id };
        const response = await moduloService.listarPorID(id);
        res.status(200).json({
          data: response,
          error: false,
          code: 200,
          message: "modulo encontrado ",
        });
      } catch (error) {
        return res.status(error.code || 500).json(error);
      };
    };

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