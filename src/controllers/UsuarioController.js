import { PrismaClient } from '@prisma/client';
const express = require('express');
import express from "express";
const router = express.Router();
import

const prisma = new PrismaClient();


router.post('/usuarios', async (req, res) => {
    const { id, nome, telefone, email, matricula, cpf } = req.body;
    try {
        const novoUsuario = await prisma.usuario.create({
            data: {
                id,
                nome,
                telefone,
                email,
                matricula,
                cpf
            }
        });
        res.status(201).json(novoUsuario);
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});


router.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await prisma.usuario.findMany();
        res.json(usuarios);
    } catch (error) {
        console.error('Erro ao obter usuários:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});


router.get('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await prisma.usuario.findUnique({
            where: {
                id
            }
        });
        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        res.json(usuario);
    } catch (error) {
        console.error('Erro ao obter usuário por ID:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});


router.put('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, telefone, email, matricula, cpf } = req.body;
    try {
        const usuario = await prisma.usuario.update({
            where: {
                id
            },
            data: {
                nome,
                telefone,
                email,
                matricula,
                cpf
            }
        });
        res.json(usuario);
    } catch (error) {
        console.error('Erro ao atualizar usuário por ID:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});


router.delete('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.usuario.delete({
            where: {
                id
            }
        });
        res.json({ message: 'Usuário excluído com sucesso' });
    } catch (error) {
        console.error('Erro ao excluir usuário por ID:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

module.exports = router;