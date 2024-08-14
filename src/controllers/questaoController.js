import env from "dotenv";
import { prisma } from "../configs/prismaClient.js";
import questaoService from "../services/questaoService.js";
import CommonResponse from "../utils/commonResponse.js";

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
      const { id } = req.params;
      const intId = parseInt(id);
      
      if (isNaN(intId)) {
        return res.status(400).json({
          message: "ID inválido.",
          code: 400,
          error: true,
        });
      }
      
      const questaoById = await prisma.questao.findUnique({
        where: {
          id: intId
        }
      });
      
      if (!questaoById) {
        return res.status(404).json({
          message: "Questão não encontrada.",
          code: 404,
          error: true,
        });
      }
      
      // Defina apenas os campos necessários para atualização
      const camposObrigatorios = ['posicao', 'titulo']; // Ajuste conforme necessário
      for (const campo of camposObrigatorios) {
        if (!(campo in req.body)) {
          return res.status(400).json({
            message: `Campo ${campo} não especificado.`,
            code: 400,
            error: true,
          });
        }
      }
      
      // Atualize os campos fornecidos
      const questaoAtualizada = await prisma.questao.update({
        where: {
          id: intId
        },
        data: {
        posicao: req.body.posicao || questaoById.posicao, // Mantém o valor atual se não for fornecido
        titulo: req.body.titulo || questaoById.titulo,
        pdf: req.body.pdf || questaoById.pdf,
        link_video: req.body.link_video || questaoById.link_video
        }
      });
      
      res.status(200).json({
        message: "Questão atualizada com sucesso.",
        error: false,
        code: 200,
        data: questaoAtualizada,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
        code: 500,
        error: true,
      });
    }
  };
  
}

export default questaoController;
