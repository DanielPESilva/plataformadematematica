import moduloRepository from "../repositories/moduloRepository.js";
import { z } from "zod";
import 'dotenv/config';

class ModuloService {
    async listar(filtro) { // Adicionei o parâmetro filtro
        try {
            const moduloSchema = z.object({
                id: z.preprocess((val) => Number(val), z.number({
                    invalid_type_error: "Id informado não é do tipo number.",
                }).int({
                    message: "Id informado não é um número inteiro."
                }).positive({
                    message: "Id informado não é positivo."
                })).optional(),
                turma_id: z.preprocess((val) => Number(val), z.number({
                    invalid_type_error: "Id informado não é do tipo number.",
                }).int({
                    message: "Id informado não é um número inteiro."
                }).positive({
                    message: "Id informado não é positivo."
                })).optional(),
                titulo: z.string({
                    invalid_type_error: "Título informado não é do tipo string."
                }).trim().optional(),
                descricao: z.string({
                    invalid_type_error: "A descrição informada deve ser do tipo string."
                }).optional(),
            });
            const filtroValidated = moduloSchema.parse(filtro);
            const response = await moduloRepository.findMany(filtroValidated);
            response.forEach((e) => delete e.id);
            if (response.length === 0) throw {
                error: true,
                code: 400,
                message: "Nenhum módulo encontrado.",
            };
            return response;
        } catch (error) {
            if (error instanceof z.ZodError) {
                const errorMessages = error.issues.map((issue) => {
                    return {
                        path: issue.path[0],
                        message: issue.message
                    };
                });
                throw {
                    error: true,
                    code: 400,
                    message: errorMessages,
                };
            } else {
                throw error;
            }
        }
    }

    async listarPorID(id) {
        try {
            const moduloSchema = z.object({
                id: z.preprocess((val) => Number(val), z.number({
                    invalid_type_error: "Id informado não é do tipo number.",
                }).int({
                    message: "Id informado não é um número inteiro."
                }).positive({
                    message: "Id informado não é positivo."
                })).optional(),
                turma_id: z.preprocess((val) => Number(val), z.number({
                    invalid_type_error: "Id informado não é do tipo number.",
                }).int({
                    message: "Id informado não é um número inteiro."
                }).positive({
                    message: "Id informado não é positivo."
                })).optional(),
                titulo: z.string({
                    invalid_type_error: "Título informado não é do tipo string."
                }).trim().optional(),
                descricao: z.string({
                    invalid_type_error: "A descrição informada deve ser do tipo string."
                }).optional(),
            });
            const parsedIdSchema = moduloSchema.pick({ id }).parse({ id }); // Validando apenas o id
            const response = await moduloRepository.findById(parsedIdSchema.id);
            if (!response) {
                throw {
                    error: true,
                    code: 400,
                    message: "Nenhum módulo encontrado.",
                };
            }
            return response;
        } catch (error) {
            if (error instanceof z.ZodError) {
                const errorMessages = error.issues.map((issue) => {
                    return {
                        path: issue.path[0],
                        message: issue.message
                    };
                });
                throw {
                    error: true,
                    code: 400,
                    message: errorMessages,
                };
            } else {
                throw error;
            }
        }
    }

    async inserir(data) {
        return await moduloRepository.create(data);
    }

    async atualizar(id, data) {
        return await moduloRepository.update(id, data);
    }

    async excluir() {
        const modulo = await moduloRepository.findById(id);
        if (!modulo) {
            throw new Error('Modulo not found')
        }

        return await moduloRepository.delete(id);
    }

}

export default new ModuloService();