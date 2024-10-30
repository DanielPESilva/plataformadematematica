import { describe, expect, test } from '@jest/globals';
import AulaRepository from '../../repositories/AulaRepository.js';
import AulaService from '../../services/AulaService.js';
import faker from 'faker-br';

jest.mock('../../repositories/AulaRepository.js', () => ({
    modulo_exist: jest.fn(),
    create: jest.fn(),
}));

beforeEach(() => {
    jest.clearAllMocks();
});
const { z } = require('zod');
const listarSchema = z.object({
    turma_id: z.preprocess((val) => Number(val), z.number({
        invalid_type_error: "Id informado não é do tipo number."
    }).int({
        message: "Id informado não é um número inteiro."
    }).positive({
        message: "Id informado não é positivo."
    })).optional(),
    titulo: z.string({
        invalid_type_error:'O titulo informado não é do tipo string.'
    }).optional(),
    descricao: z.string({
        invalid_type_error: "A descrição informada deve ser do tipo string."
    }).optional(),
    image: z.string({
        invalid_type_error: "A imagem informada deve ser do tipo string."
    }).optional()
});

describe("listarSchema validation", () => {
    test("Deve validar com dados válidos", () => {
        const validData = {
            turma_id: 1,
            titulo: "Título do Módulo",
            descricao: "Descrição do Módulo",
            image: "https://exemplo.com/imagem.jpg"
        };

        const result = listarSchema.safeParse(validData);
        expect(result.success).toBe(true);
    });

    test("Deve retornar erro se turma_id não for número", () => {
        const invalidData = {
            turma_id: "texto",
        };

        const result = listarSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        expect(result.error.issues[0].message).toBe("Id informado não é do tipo number.");
    });

    test("Deve retornar erro se turma_id não for um número inteiro", () => {
        const invalidData = {
            turma_id: 1.5, 
        };

        const result = listarSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        expect(result.error.issues[0].message).toBe("Id informado não é um número inteiro.");
    });

    test("Deve retornar erro se turma_id não for positivo", () => {
        const invalidData = {
            turma_id: -5, 
        };

        const result = listarSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        expect(result.error.issues[0].message).toBe("Id informado não é positivo.");
    });

    test("Deve retornar erro se titulo não for string", () => {
        const invalidData = {
            titulo: 123 
        };

        const result = listarSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        expect(result.error.issues[0].message).toBe("O titulo informado não é do tipo string.");
    });

    test("Deve retornar erro se descricao não for string", () => {
        const invalidData = {
            descricao: true 
        };

        const result = listarSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        expect(result.error.issues[0].message).toBe("A descrição informada deve ser do tipo string.");
    });

    test("Deve retornar erro se image não for string", () => {
        const invalidData = {
            image: 12345 
        };

        const result = listarSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        expect(result.error.issues[0].message).toBe("A imagem informada deve ser do tipo string.");
    });

    test("Deve validar com dados opcionais ausentes", () => {
        const validData = {}; 

        const result = listarSchema.safeParse(validData);
        expect(result.success).toBe(true);
    });
});