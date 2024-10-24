import env from "dotenv";
import { sendError, sendResponse } from "../utils/messages.js";
import moduloService from "../services/moduloService.js";
import { ZodError } from "zod";

env.config()

class ModuloController{
  static listar = async (req, res) => {
    try {
      const { turma_id, titulo, descricao, image } = req.body;
      const filtro = {
        turma_id: turma_id,
        titulo: titulo,
        descricao: descricao,
        image: image
      };
      const response = await moduloService.listar(filtro);

      return sendResponse(res,201, {data: response});

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

    static listarPorId = async (req, res) => {
      try {
        const id = { id: req.params.id };
        console.log(id)
        const response = await moduloService.listarPorId(parseInt(id.id));
       
        return sendResponse(res,201, {data:response});
  
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

  //POST
  static inserir = async (req, res) => {
    try {
      const generateRandomNumber = () => Math.floor(Math.random() * 1000) + 1;
      const file = req.file
      console.log(file)

      if(file){
        file.originalname = `${generateRandomNumber()}_${file.originalname}`
      }

      const { turma_id, titulo, descricao} = req.body;
      const data = {
        turma_id: turma_id,    
        titulo: titulo,      
        descricao: descricao,
        image: file ? file.originalname : null
      };

      const response = await moduloService.inserir(data, file);

      return sendResponse(res,201, {data: response});

    } catch (err) {
      console.log(err)

        if(err instanceof ZodError){
          return sendError(res,400,err.errors[0].message);
  
        }else if(err.message == "file do tipo errado." ){
          return sendError(res,404,[err.message]);
  
        }else if(err.message == 'Erro ao redimensionar a imagem' ){
          return sendError(res,404,[err.message]);
  
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
      let id = req.params.id
     
      const { turma_id, titulo, descricao, image } = req.body;
      const data = {
        turma_id: turma_id,    
        titulo: titulo,      
        descricao: descricao,
        image: image
      }
      const response = await moduloService.atualizar(parseInt(id),data)
    return sendResponse(res,201, {data:response});

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