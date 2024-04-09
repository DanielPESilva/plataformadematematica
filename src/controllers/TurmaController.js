import bcrypt from "bcryptjs";
import env from "dotenv";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class TurmaController {
    // Função para listar todas as turmas
  static  listar = async (req, res) => {
        try {
            const {
                serie_tur,
                periodo_tur,
                curso_tur,
                ativo
            } = req.query;

            let filtros = {
                where: {
                    ativo: ativo || 'Y', // Se não especificado, assume que busca apenas turmas ativas
                },
                select: {
                    id_tur: true,
                    serie_tur: true,
                    periodo_tur: true,
                    curso_tur: true,
                    ativo: true
                }
            };

            // Adicionar filtros condicionalmente
            if (serie_tur) {
                filtros.where.serie_tur = {
                    equals: parseInt(serie_tur), // Convertendo para inteiro, assumindo que é um número
                };
            }

            if (periodo_tur) {
                filtros.where.periodo_tur = {
                    equals: parseInt(periodo_tur), // Convertendo para inteiro, assumindo que é um número
                };
            }

            if (curso_tur) {
                filtros.where.curso_tur = {
                    contains: curso_tur,
                };
            }

            const turmas = await prisma.turma.findMany(filtros);

            if (turmas.length === 0) {
                return res.status(400).json([{
                    error: true,
                    code: 400,
                    message: "Nenhuma turma encontrada"
                }]);
            } else {
                return res.status(200).json({
                    error: false,
                    code: 200,
                    message: "Turmas encontradas",
                    data: turmas
                });
            }

        } catch (err) {
            console.error(err);
            return res.status(500).json([{
                error: true,
                code: 500,
                message: "Erro interno do Servidor",
                data: []
            }]);
        }
    }

    // Função para listar uma turma pelo ID
 static listarPorID = async (req, res) => {
        try {
            const turma = await prisma.turma.findFirst({
                where: {
                    id_tur: parseInt(req.params.id),
                }
            });
            if (turma) {
                return res.status(200).json(turma);
            } else {
                return res.status(404).json({ error: true, code: 404, message: "Turma não encontrada" });
            }
        } catch (err) {
            console.error(err);
            return res.status(500).json([{ error: true, code: 500, message: "Erro interno do Servidor" }]);
        }
    }
}

export default TurmaController;
