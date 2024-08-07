import env from "dotenv";
import { prisma } from "../configs/prismaClient.js";

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

    static listarPorID = async(req,res)=>{        
       try {
        const tituloExists = await prisma.turma.findFirst({
            where:{
                tur_id: parseInt(req.params.id),                
            },
            select:{
                id:true,
                titulo:true,
                descricao:true,
                turma:{
                    select: {
                        usuario:{
                            select:{
                                usu_id:true,
                            }
                        }
                    }
                }
            }
        });
        if (tituloExists) {
            return res.status(200).json (tituloExists);

        }
       } catch (err){
        console.error(err);
        return res.status(500).json([{
        error: true, code: 500, message: "Erro interno do Servidor"
        }])
       }
  }
}
export default TurmaController;