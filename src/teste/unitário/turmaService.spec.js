import {describe, expect, test} from '@jest/globals';
import turmaService from '../../services/turmaService.js';
import turmaRepository from '../../repositories/turmaRepository.js';


jest.mock('../../repositories/turmaRepository.js', () => ({
    findAll: jest.fn(),
    findById: jest.fn(),
    //create: jest.fn(),
    //update: jest.fn(),
    //delete: jest.fn(),
    constructFilters: jest.fn(),
}));

describe('turmaService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    
    describe('Método listar', () => {
        test('1 - Deve retornar todas as turmas com pelo menos um aluno', async () => {
            const mockTurma = [
                { titulo: '1ª Série A', usuario_has_turma: ['João', 'Maria', 'José'] },
                { titulo: '1ª Série B', usuario_has_turma: ['João'] },
            ];
            // Mockando o retorno do método findAll no turmaRepository
            turmaRepository.findAll.mockResolvedValue({ turmas: mockTurma });

            // Executa o método listar do turmaService
            const mockResult = await turmaService.listar();
        
            expect(mockResult).toEqual({ turmasComAlunos: mockTurma });
        });

        test('2 - Deve lançar um erro quando ocorrer uma exceção no repositório', async () => {
            // Simular a exceção ao chamar findAll
            turmaRepository.findAll.mockRejectedValue(new Error('Erro ao listar as turmas'));

            try {
                await turmaService.listar();
            } catch (error) {
                // Verificar se o erro lançado é o esperado
                expect(error.message).toBe('Erro ao listar turmas com alunos');
            }

            // Verificar se o método findAll foi chamado
            expect(turmaRepository.findAll).toHaveBeenCalled();
        });
    });

    describe('Método listarPorID', () => {
        test('1 - Deve retornar uma certa turma através do ID dela', async () => {
            // Arrange
            const mockTurma = { 
                id: 1, 
                titulo: '2º Série A',
                usuario_has_turma: ['João', 'Maria', 'Rosilda'], 
            };
            turmaRepository.findById.mockResolvedValue(mockTurma);

            // Act
            const turma = await turmaService.listarPorID(1);

            // Assert
            expect(turma).toEqual(mockTurma);
            expect(turmaRepository.findById).toHaveBeenCalledWith(1);
        });
        
        test('3 - Deve retornar null se a turma não for encontrada', async () => {
            turmaRepository.findById.mockResolvedValue(null);
        
            const turma = await turmaService.listarPorID(999); 
        
            expect(turma).toBeNull(); 
            expect(turmaRepository.findById).toHaveBeenCalledWith(999);
        });
    });

    describe('Método createTurma', () => {
        
        

    });

});
