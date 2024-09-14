import bcrypt from "bcryptjs";
import env from "dotenv";
import { prisma } from "../configs/prismaClient.js"

env.config()

app.use(express.json());

class ModuloController{
    static listar = async (req, res) => {
        try{
            const moduloExists = await prisma.modulo.findMany({
                where: {
                    mod_tema:notnull
                },
                select: {
                    mod_id: true,
                    mod_tema: true,
                    mod_descricao: true,
                    mod_pdf: true,
                    mod_linkVideo: true,
                    modulo: {
                        select:{
                            turma: {
                                select: {
                                    tur_id:true
                            }
                        }
                    }
                },
            }
            }
        );
            if (!moduloExists) {
            return res.status(400).json([{
                error: true,
                code: 400,
                massage: "Nenhuma modulo encontrado"}])
            } else{
            return res.status(200).json({
                error: false,
                code: 200,
                massage: "Modulo encontrado",
                data: moduloExists
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
    static listarPorID = async (req, res) => {
        try{
            const moduloExists = await prisma.modulo.findFirst({
                where:{
                    que_id: parseInt(req.params.id),
                },
                select:{
                    mod_id: true,
                    mod_tema: true,
                    mod_descricao: true,
                    mod_pdf: true,
                    mod_linkVideo: true,
                    modulo: {
                        select:{
                            turma: {
                                select: {
                                    tur_id: true,
                            }
                        }
                    }
                }
            }
        });
        if(moduloExists){
            return res.status(200).json (moduloExists);
        }
    } catch (err){
        console.error(err);
        return res.status(500).json ([{
            error: true, code: 500, message: "Erro interno do Servidor"
        }])
    }
    }

  //POST
  static inserir = async (req, res) => {
    try {
        const { mod_id, mod_tema, mod_descricao, mod_pdf, mod_linkVideo } = req.body

      const moduloCreated = await prisma.usuarios.create({
        data: {
            mod_id,
            mod_tema,
            mod_descricao,
            mod_pdf,
            mod_linkVideo
        }
      })

      return res.status(201).json({
        error: false,
        code: 201,
        message: "Modulo criado.",
        data: moduloCreated
      })
    } catch (error) {
      console.error(error);
      return res.status(500).json([{ error: true, code: 500, mesasge: "Erro interno."}])
      }
  };    

    static deletar = async (req, res) => {
        try {
            const id = parseInt(req.params.id);

            const moduloDeletada = await prisma.modulo.delete({
                where: { que_id: id }
            });

            if (!moduloDeletada) {
                return res.status(400).json([{
                    error: true,
                    code: 400,
                    massage: "Modulo não foi deletada"}])
            } else{
                return res.status(200).json({
                    error: false,
                    code: 200,
                    massage: "Modulo deletada",
                    data: ModuloDeletada
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
    // PUT
  static atualizar = async (req, res) => {
    try {
      if (!req.params.id) {
        return res.status(400).json([{ error: true, code: 400, message: "ID obrigatório."}])
      }

      const id = req.params.id
      const { tema, descricao, pdf, link_video } = req.body

      if (!tema|| !descricao || !pdf || !link_video && !id) {
        return res.status(400).json([{error: true, code: 400, message: "Deve haver alguma alteração."}])
      }

      const moduloUpdate = await prisma.users.update({
        where: {
          mod_id: id
        },
        data: {
            mod_id: true,
            mod_tema: true,
            mod_descricao: true,
            mod_pdf: true,
            mod_linkVideo: true
        }
      })

      return res.status(201).json(moduloUpdate)

    } catch (error) {
      console.error(error)
      return res.status(500).json([{ error: true, code: 500, message: "Erro interno."}])
    }
  }
}

export default ModuloController;