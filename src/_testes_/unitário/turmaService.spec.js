import { describe, expect, jest, beforeEach } from '@jest/globals';
import turmaRepository from '../../repositories/turmaRepository.js';
import turmaService from '../../services/turmaService.js';

jest.mock('../../repositories/turmaRepository.js', () => ({
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn()
}));

describe('Teste unitário de turma', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Deve retornar todas as turmas', async () => {
        const mockTurma = [
            { id: 1, titulo: 'Turma 1', usuario_id: 'nome' },
            { id: 2, titulo: 'Turma 2', usuario_id: 'nome' },
        ];

        turmaRepository.findAll.mockResolvedValue(mockTurma);
        const turma = await turmaService.listar()

        expect(turma).toEqual(mockTurma);
        expect(turmaRepository.findAll).toHaveBeenCalled();
    });

    test('should return user by ID', async () => {
        // Arrange
        const mockTurma = { id: 1, name: 'User 1' };
        turmaRepository.findById.mockResolvedValue(mockTurma);

        // Act
        const turma = await turmaService.listarPorID(1);

        // Assert
        expect(turma).toEqual(mockTurma);
        expect(turmaRepository.findById).toHaveBeenCalledWith(1);
    });
});