import env from "dotenv";
import { prisma } from "../configs/prismaClient.js";
import questaoService from "../services/questaoService.js";
import CommonResponse from "../utils/commonResponse.js";
import {ZodError} from "zod"
import questaoRepository from "../repositories/questaoRepository.js";

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

  static inserir = async (req, res) => {
    try {
        // Inserir nova questão usando o service
        const questaoCreated = await questaoService.inserir(req.body);
        
        // Campos que você pode querer excluir do retorno
        const camposExcluidos = ['pdf', 'link_video']; // Ajuste conforme necessário
        
        // Excluindo campos do retorno
        camposExcluidos.forEach(campo => {
            delete questaoCreated[campo];
        });
        
        // Retornar a resposta formatada
        return res.status(201).json(CommonResponse.created(questaoCreated, messages.validationGeneric.resourceCreated('Questão')));
    } catch (err) {
      console.log(err)
        if (err instanceof ZodError) {
            // Formatar os erros para exibir apenas `path` e `message`
            const formattedErrors = err.errors.map(error => ({
                path: error.path.join('.'), // Converte o path para uma string (ex: "titulo")
                message: error.message // A mensagem de erro do Zod
            }));
            return res.status(422).json(CommonResponse.unprocessableEntity(formattedErrors));
        }
        // Caso não seja erro de validação
        return res.status(500).json(CommonResponse.unprocessableEntity(Error, err.message));
    }
}

    
}
export default questaoController;
