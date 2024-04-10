import PrismaClient from '@prisma/client';
import env from "dotenv"
import express from "express";

env.config();

class QuestaoController{

    static listar = async (req, res) => {
        try{
            const{
                id,
                posicao,
                titulo,
                pdf,
                link_video
            } = req.query;

            let filtros = {
                where: {
                    active: id || 'y',
                },
                select: {
                    posicao: true,
                    titulo: true,
                    pdf: true,
                    link_video: true,
                    active: true,
                    Modulo: {
                        select: {
                            id: true,
                            tema: true,
                            descricao: true,
                            pdf: true,
                            linkVideo: true,
                        }
                    },
                }
            };
            
            if (posicao) {
                filtros.where.posicao = {
                    contains: posicao,
                };
            }
            
            if (titulo) {
                filtros.where.titulo = {
                    contains: titulo,
                };
            }

            const Questao = await prisma.Questao.findMany(filtros);
            if(users.leng === 0){
                return res.status(400).json([{
                    error: true,
                    code: 400,
                    message:"Nenhuma questão escontrado"
                }]);
            }else{
                return res.status(200).json({
                    error: false,
                    code: 200,
                    message:"Questão encontrada"
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
                data: []
            }])
        }
    }

    static listarPorID = async (req, res) => {
        try{
            const
        }
    }


}


router.get('/questoes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const questao = await prisma.questao.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        });
        if (!questao) {
            return res.status(404).json({ error: 'Questão não encontrada' });
        }
        res.json(questao);
    } catch (error) {
        console.error('Erro ao obter questão por ID:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});


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