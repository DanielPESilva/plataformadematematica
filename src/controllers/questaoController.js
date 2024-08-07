import bcrypt from "bcryptjs";
import env from "dotenv";
import { prisma } from "../configs/prismaClient.js"

env.config();

class QuestaoController{
    static listar = async (req, res) => {
        try {
          const response = await prisma.questao.findMany()
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
}

export default QuestaoController