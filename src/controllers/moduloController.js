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
                    id: true,
                    tema: true,
                    descricao: true,
                    pdf: true,
                    link_video: true,
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
    static inserir = async(req,res)=>{
        try{
            const{ tema, descricao} = req.body;
            const tur_id = parseInt(req.body.tur_id);
        } catch (error) {

        }
    }
    static get = async (req, res) => {
        try {
            const modulos = await prisma.modulo.findMany({
                select: {
                    id: true,
                    tema: true,
                    descricao: true,
                    pdf: true,
                    link_video: true,
                    turma: {
                        select: {
                            tur_id: true,
                        }
                    }
                }
            });

            return res.status(200).json(modulos);
        } catch (err) {
            console.error(err);
            return res.status(500).json([{
                error: true, code: 500, message: "Erro interno do Servidor"
            }]);
        }
    }
    static put = async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const { tema, descricao, pdf, link_video } = req.body;

            const moduloAtualizada = await prisma.modulo.update({
                where: { que_id: id },
                data: {
                    tema,
                    descricao,
                    pdf,
                    link_video,
                }
            });
            if (!moduloAtualizada) {
                return res.status(400).json([{
                    error: true,
                    code: 400,
                    massage: "Modulo não foi atualizada"}])
            } else{
                return res.status(200).json({
                    error: false,
                    code: 200,
                    massage: "Modulo atualizada",
                    data: moduloAtualizada
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
}
module.exports = route;