import {describe, expect, test} from '@jest/globals';
import turmaService from '../../services/turmaService.js';
import turmaRepository from '../../repositores/turmaRepository.js';


jest.mock('../../repositories/turmaRepository.js', () => ({
    findAll: jest.fn(),
    findById: jest.fn(),
    constructFilters: jest.fn(),
}));

describe('turmaService', () => {
    
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should return all users', async () => {
        // Arrange
        const mockTurmas = [
            { id: 1, titulo: 'Turma 1', usuario_id: 'nome' },
            { id: 2, titulo: 'Turma 2', usuario_id: 'nome' },
        ];

        const mockResult = {
            turmas: mockTurmas,
            total: 2,
            page: 1,
            perPage: 10,
        };

        turmaRepository.constructFilters.mockReturnValue({}); 
        turmaRepository.findAll.mockResolvedValue(mockResult);

      // Act
        const turmas = await turmaService.listar('', '', '', 1, 10);

        // Assert
        expect(turmas).toEqual(mockResult);
        expect(turmaRepository.findAll).toHaveBeenCalledWith({}, 1, 10);
    });


    //voltar aqui quando terminar o listar
    test('should return user by ID', async () => {
        // Arrange
        const mockUser = { id: 1, name: 'User 1' };
        userRepository.findById.mockResolvedValue(mockUser);

        // Act
        const user = await userService.listarPorID(1);

        // Assert
        expect(user).toEqual(mockUser);
        expect(userRepository.findById).toHaveBeenCalledWith(1);
    });
});
