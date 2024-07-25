import bcrypt from "bcryptjs";
import env from "dotenv";
import { prisma } from "../configs/prismaClient.js"

env.config();

class QuestaoController{
    static listar = async (req, res) => {
        try{
            const questaoExists = await prisma.questao.findMany({
                where: {
                    que_titulo:notnull
                },
                select: {
                    que_id: true,
                    que_posicao: true,
                    que_titulo: true,
                    que_pdf: true,
                    que_link_video: true,
                    questao: {
                        select:{
                            turma: {
                                select: {
                                    tur_id: true,
                            }
                        }
                    }
                },
            }
            }
        );

            
            if (!questaoExists) {
                return res.status(400).json([{
                    error: true,
                    code: 400,
                    massage: "Nenhuma questão encontrada"}])
            } else{
                return res.status(200).json({
                    error: false,
                    code: 200,
                    massage: "Questão encontrada",
                    data: questaoExists
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
            const questaoExists = await prisma.questao.findFirst({
                where:{
                    que_id: parseInt(req.params.id),
                },
                select:{
                    id: true,
                    posicao: true,
                    titulo: true,
                    pdf: true,
                    link_video: true,
                    questao: {
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
        if(questaoExists){
            return res.status(200).json (questaoExists);
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
            const{ titulo, posicao} = req.body;
            const tur_id = parseInt(req.body.tur_id);
        } catch (error) {

        }
    }
    static get = async (req, res) => {
        try {
            const questoes = await prisma.questao.findMany({
                select: {
                    id: true,
                    posicao: true,
                    titulo: true,
                    pdf: true,
                    link_video: true,
                    turma: {
                        select: {
                            tur_id: true,
                        }
                    }
                }
            });

            return res.status(200).json(questoes);
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
            const { titulo, posicao, pdf, link_video } = req.body;

            const questaoAtualizada = await prisma.questao.update({
                where: { que_id: id },
                data: {
                    titulo,
                    posicao,
                    pdf,
                    link_video,
                }
            });
            if (!questaoAtualizada) {
                return res.status(400).json([{
                    error: true,
                    code: 400,
                    massage: "Questão não foi atualizada"}])
            } else{
                return res.status(200).json({
                    error: false,
                    code: 200,
                    massage: "Questão atualizada",
                    data: questaoAtualizada
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

            const questaoDeletada = await prisma.questao.delete({
                where: { que_id: id }
            });

            if (!questaoDeletada) {
                return res.status(400).json([{
                    error: true,
                    code: 400,
                    massage: "Questão não foi deletada"}])
            } else{
                return res.status(200).json({
                    error: false,
                    code: 200,
                    massage: "Questão deletada",
                    data: questaoDeletada
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
module.exports = router;
