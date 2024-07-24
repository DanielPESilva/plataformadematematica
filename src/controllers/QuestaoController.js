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
}


router.put('/questoes/:id', async (req, res) => {
    const { id } = req.params;
    const { posicao, titulo, pdf, link_video } = req.body;
    try {
        const questao = await prisma.questao.update({
            where: {
                id: parseInt(id)
            },
            data: {
                posicao,
                titulo,
                pdf,
                link_video
            }
        });
        res.json(questao);
    } catch (error) {
        console.error('Erro ao atualizar questão por ID:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});


router.delete('/questoes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.questao.delete({
            where: {
                id: parseInt(id)
            }
        });
        res.json({ message: 'Questão excluída com sucesso' });
    } catch (error) {
        console.error('Erro ao excluir questão por ID:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

module.exports = router;