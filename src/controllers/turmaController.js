import bcrypt from "bcryptjs";
import env from "dotenv";
import { prisma } from "../configs/prismaClient.js";

env.config();

class TurmaController{
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

  static inserir = async (req,res)=>{
    try {
        const { titulo, descricao} = req.body;
        const usu_id = parseInt(req.body.usu_id);
    } catch (error) {
        
    }
  }
}
export default TurmaController;