import env from "dotenv";
import { prisma } from "../configs/prismaClient.js";
import turmaService from "../services/turmaService.js"
import CommonResponse from '../utils/commonResponse.js';

env.config();

class TurmaController{
  
  static listar = async (req, res) => {
    try {
      const response = await prisma.turma.findMany()
      res.status(200).json({ response: response })
    } catch (error) {
      res.status(400).json({
        error: true,
        code: 400,
        message: error.message
      }
      )
    }
  }

  static listarPorID = async (req, res) => {
    try {
      
      const id_turma = parseInt(req.params.id);


      const turmaExists = await turmaService.listarPorID(id_turma);
    
      if (turmaExists) {
        return res.status(200).json(CommonResponse.success(turmaExists));
      } else {
        return res.status(400).json(CommonResponse.notFound(messages.validationGeneric.resourceNotFound('turma')));
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json(CommonResponse.serverError());
    }
  }

}
export default TurmaController;