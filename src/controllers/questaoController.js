import env from "dotenv";
import { prisma } from "../configs/prismaClient.js";
import questaoService from "../services/questaoService.js";
import CommonResponse from "../utils/commonResponse.js";
import questaoRepository from "../repositores/questaoRepository.js";
import {zod} from "zod"

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
      console.log(req.body)
      
      const { data } = req.body;

      if (!data || Object.keys(data).length === 0) {
        return res.status(400).json(CommonResponse.notFound("Nenhum campo fornecido para criação"));
      }

      const { titulo, posicao, pdf, link_video } = data;

      if (!titulo || !posicao || !pdf || !link_video) {
        return res.status(400).json(CommonResponse.notFound("Todos os campos obrigatórios devem ser fornecidos"));
      }

      const novaQuestao = await questaoRepository.create({ titulo, posicao, pdf, link_video });

      let camposExcluidos = [];

      camposExcluidos.forEach(campo => {
        delete novaQuestao[campo];
      });

      return res.status(201).json(CommonResponse.created(novaQuestao, "Questão criada com sucesso"));
    } catch (err) {
      if (err instanceof ZodError) {
        const formattedErrors = err.errors.map(error => ({
          path: error.path.join('.'),
          message: error.message
        }));
        return res.status(422).json(CommonResponse.unprocessableEntity(formattedErrors));
      }
      return res.status(500).json(CommonResponse.serverError(err.message));
    }
  };
  
  
  
  
}
export default questaoController;
