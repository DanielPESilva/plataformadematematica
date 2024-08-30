import env from "dotenv";
import { prisma } from "../configs/prismaClient.js";
import questaoService from "../services/questaoService.js";
import CommonResponse from "../utils/commonResponse.js";
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

  static async inserir(req, res) {
    console.log('Chamando questaoService.inserir...');
    try {
        const {  posicao, titulo, pdf, link_video } = req.body;
        const data = {
            posicao: posicao,
            titulo: titulo,
            pdf: pdf,
            link_video: link_video
        };

        console.log('questaoService:', questaoService);
        
        // Chamada ao serviço para inserir os dados no banco
        const response = await questaoService.inserir(data);

        //Volta do service depois que fizer as regras de negócios
        return res.status(201).json({
            data: response,
            error: false,
            code: 201,
            message: 'Questões inseridos com sucesso.',
        });
        
        
    } catch (error) {
        return res.status(error.code || 500).json({
            error: true,
            message: error.message || 'Erro interno do servidor.',
        });
    }
}


    
}
export default questaoController;
