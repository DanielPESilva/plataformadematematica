import {describe, expect, test} from '@jest/globals';
import turmaService from '../../services/turmaService.js';
import turmaRepository from '../../repositories/turmaRepository.js';


jest.mock('../../repositories/turmaRepository.js', () => ({
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    findByTitulo: jest.fn(),
    atualizar:jest.fn(),
    findByTituloExceptId:jest.fn(),
    //update: jest.fn(),
    //delete: jest.fn(),
    constructFilters: jest.fn(),
}));

describe('turmaService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    
    describe('Método listar', () => {

        const mockTurma = [
            { titulo: '1ª Série A', usuario_has_turma: ['João', 'Maria', 'José'] },
            { titulo: '1ª Série B', usuario_has_turma: ['João'] },
        ];

        beforeEach(() => {
            jest.clearAllMocks();
        });
    
        test('1 - Deve retornar todas as turmas com pelo menos um aluno', async () => {

            turmaRepository.findAll.mockResolvedValue({ turmas: mockTurma })

            const mockResult = await turmaService.listar();
        
            expect(mockResult).toEqual({ turmas: mockTurma });
        });

        test('2 - Deve lançar um erro quando ocorrer turma(s) sem aluno(s)', async () => {

            const mockTurmasVazias = []; 
    
            turmaRepository.findAll.mockResolvedValue(mockTurmasVazias);
    
            await expect(turmaService.listar()).rejects.toThrow(
                new Error("Turmas não encontradas.")
            );
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
        test('2 - Deve retornar um erro quando o ID não for um número', async () => {

                // Arrange
                const invalidID = 'abc'; // Simulando um ID inválido (string)
            
                // Act & Assert
                await expect(turmaService.listarPorID(invalidID)).rejects.toThrow(
                    new Error("ID deve ser um número inteiro")
                );
            
                expect(turmaRepository.findById).not.toHaveBeenCalled();
            
        });        
    });

    describe('Método createTurma', () => {
        test('1 - Deve criar uma turma', async () => {
            // Arrange
            const mockData = { 
                titulo: '2º Série A',
                usuario_has_turma: 3
            };

            const mockTurmaCriada = { 
                id: 1, 
                titulo: '2º Série A',
                usuario_has_turma: 3 
            };

            turmaRepository.findByTitulo.mockResolvedValue(null);
            turmaRepository.create.mockResolvedValue(mockTurmaCriada);

            // Act
            const turmaCriada = await turmaService.create(mockData);

            // Assert
            expect(turmaCriada).toEqual(mockTurmaCriada);
            expect(turmaRepository.findByTitulo).toHaveBeenCalledWith(mockData.titulo);
            expect(turmaRepository.create).toHaveBeenCalledWith(mockData);
        });

        test('2 - Deve lançar um erro quando o título já existir', async () => {
            // Arrange
            const mockData = { 
                titulo: '2º Série A',
                usuario_has_turma: 3
            };
            turmaRepository.findByTitulo.mockResolvedValue(true);
        
            // Act 
            await expect(turmaService.create(mockData)).rejects.toThrow(
                new Error('O campo Titulo já existe.') 
            );
            
            //Assert
            expect(turmaRepository.findByTitulo).toHaveBeenCalledWith(mockData.titulo);
        });
        
    });

    describe('Método atualizarTurma', () => {
        beforeEach(() => {
            jest.clearAllMocks(); // Limpa os mocks antes de cada teste
        });
    
        test('1 - Deve atualizar uma turma', async () => {
            // Arrange
            const id = 1; // ID da turma que está sendo atualizada
            const mockData = { 
                titulo: '2º Série A',
            };
            const existingTurma = { 
                id: id,
                titulo: '1ª Série B',
            };
            const mockTurmaAtualizada = { 
                id: id,
                titulo: '2º Série A',
            };
    
            // Mock dos métodos do repositório
            turmaRepository.findById.mockResolvedValue(existingTurma);
            turmaRepository.findByTituloExceptId.mockResolvedValue(null);
            turmaRepository.atualizar.mockResolvedValue(mockTurmaAtualizada);
    
            // Act
            const turmaAtualizada = await turmaService.atualizarTurma(id, mockData);
    
            // Assert
            expect(turmaAtualizada).toEqual(mockTurmaAtualizada);
            expect(turmaRepository.findById).toHaveBeenCalledWith(id);
            expect(turmaRepository.findByTituloExceptId).toHaveBeenCalledWith(mockData.titulo, id);
            expect(turmaRepository.atualizar).toHaveBeenCalledWith(id, mockData);
        });
    
        test('2 - Deve lançar um erro se a turma não for encontrada', async () => {
            // Arrange
            const id = 1; 
            const mockData = { 
                titulo: '2º Série A',
            };
    
            turmaRepository.findById.mockResolvedValue(null);
    
            // Act & Assert
            await expect(turmaService.atualizarTurma(id, mockData)).rejects.toThrow('Título não existe.');
            expect(turmaRepository.findById).toHaveBeenCalledWith(id);
            expect(turmaRepository.findByTituloExceptId).not.toHaveBeenCalled();
            expect(turmaRepository.atualizar).not.toHaveBeenCalled();
        });
    
        test('3 - Deve lançar um erro se o título já estiver cadastrado', async () => {
            // Arrange
            const id = 1; 
            const mockData = { 
                titulo: '2º Série A',
            };
            const existingTurma = { 
                id: id,
                titulo: '1ª Série B',
            };
            const tituloExistente = { 
                id: 2,
                titulo: '2º Série A',
            };
    
            turmaRepository.findById.mockResolvedValue(existingTurma);
            turmaRepository.findByTituloExceptId.mockResolvedValue(tituloExistente);
    
            // Act & Assert
            await expect(turmaService.atualizarTurma(id, mockData)).rejects.toThrow('Titulo já cadastrado');
            expect(turmaRepository.findById).toHaveBeenCalledWith(id);
            expect(turmaRepository.findByTituloExceptId).toHaveBeenCalledWith(mockData.titulo, id);
            expect(turmaRepository.atualizar).not.toHaveBeenCalled();
        });
    });
    
});
