const { PrismaClient } = require('@prisma/client');
const express = require('express');
const router = express.Router();

const prisma = new PrismaClient();


router.post('/turmas', async (req, res) => {
    const { titulo, descricao } = req.body;
    try {
        const novaTurma = await prisma.turma.create({
            data: {
                titulo,
                descricao
            }
        });
        res.status(201).json(novaTurma);
    } catch (error) {
        console.error('Erro ao criar turma:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

router.get('/turmas', async (req, res) => {
    try {
        const turmas = await prisma.turma.findMany();
        res.json(turmas);
    } catch (error) {
        console.error('Erro ao obter turmas:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});


router.get('/turmas/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const turma = await prisma.turma.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        if (!turma) {
            return res.status(404).json({ error: 'Turma não encontrada' });
        }
        res.json(turma);
    } catch (error) {
        console.error('Erro ao obter turma por ID:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});


router.put('/turmas/:id', async (req, res) => {
    const { id } = req.params;
    const { titulo, descricao } = req.body;
    try {
        const turma = await prisma.turma.update({
            where: {
                id: parseInt(id)
            },
            data: {
                titulo,
                descricao
            }
        });
        res.json(turma);
    } catch (error) {
        console.error('Erro ao atualizar turma por ID:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});


router.delete('/turmas/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.turma.delete({
            where: {
                id: parseInt(id)
            }
        });
        res.json({ message: 'Turma excluída com sucesso' });
    } catch (error) {
        console.error('Erro ao excluir turma por ID:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

module.exports = router;