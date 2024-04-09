const { PrismaClient } = require('@prisma/client');
const express = require('express');
const router = express.Router();

const prisma = new PrismaClient();


router.post('/questoes', async (req, res) => {
    const { posicao, titulo, pdf, link_video } = req.body;
    try {
        const novaQuestao = await prisma.questao.create({
            data: {
                posicao,
                titulo,
                pdf,
                link_video
            }
        });
        res.status(201).json(novaQuestao);
    } catch (error) {
        console.error('Erro ao criar questão:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});


router.get('/questoes', async (req, res) => {
    try {
        const questoes = await prisma.questao.findMany();
        res.json(questoes);
    } catch (error) {
        console.error('Erro ao obter questões:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});


router.get('/questoes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const questao = await prisma.questao.findUnique({
            where: {
                id: parseInt(id)
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