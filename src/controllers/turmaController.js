import bcrypt from "bcryptjs";
import env from "dotenv";
import { prisma } from "../configs/prismaClient.js";

env.config();

class TurmaController{
    static listar = async (req, res) => {
        try {
          const turmaExists = await prisma.turma.findMany({
            where: {
              tur_titulo:notnull,
            },
            select: {
              tur_id: true,
              tur_titulo: true,
              tur_descricao: true,
              turma: {
                select: {
                  usuario: {
                    select: {
                      usu_id: true,
                    }
                  }
                }
              },
            }
            }
          );
    
          if (!turmaExists) {
            return res.status(400).json([{
               error: true, 
               code: 400, 
               message: "Nenhuma turma encontrada" }])
          } else {
            return res.status(200).json(
              {
                error: false,
                code: 200,
                message: "Turma encontrada",
                data: turmaExists
          });
          }
    
        } catch (err) {
          if (process.env.DEBUG === 'true'){
            console.log(err);
          };
          return res.status(500).json([{ 
            error: true, 
            code: 500, 
            message: "Erro interno do Servidor",
            data: [] }])
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

  static inserir = async (req,res)=>{
    try {
        const { titulo, descricao} = req.body;
        const usu_id = parseInt(req.body.usu_id);
    } catch (error) {
        
    }
  }
}
export default TurmaController;