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

    test('1 - Deve retornar todas as turmas com pelo menos um aluno', async () => {
        const mockTurma = [
            { titulo: '1ª Série A', usuario_has_turma: ['João', 'Maria', 'José'] },
            { titulo: '1ª Série B', usuario_has_turma: ['João', 'Daira', 'Pedro'] },
        ];
        // Mockando o retorno do método findAll no turmaRepository
        turmaRepository.findAll.mockResolvedValue({turmas: mockTurma});

        // Executa o método listar do turmaService
        const mockResult = await turmaService.listar();
    
        expect(mockResult).toEqual({turmasComAlunos: mockTurma});
    });

    test('2 - Deve retornar array vazio se nenhuma turma tiver mais de um aluno', async () => {
        const mockTurma = [
            { titulo: '1ª Série A', usuario_has_turma: ['João'] },  
            { titulo: '1ª Série B', usuario_has_turma: [] }        
        ];
    
        turmaRepository.findAll.mockResolvedValue({
            turmas: mockTurma
        });
    
        const result = await turmaService.listar();
    
        expect(result).toEqual({turmasComAlunos: []});
    });
    
    test('3 - Deve retornar uma certa turma através do ID dela', async () => {
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

    test('4 - Deve lançar um erro se o ID não for um número', async () => {
        // Arrange
        const mockIDinvalido = 'abc'; // Valor inválido para ID
    
        // Act & Assert
        try {
            await turmaService.listarPorID(mockIDinvalido);
        } catch (error) {
            expect(error).toBeInstanceOf(Error); // Verifica se é um erro
            expect(error.message).toBe('ID deve ser um número inteiro'); // Verifica a mensagem do erro
            expect(turmaRepository.findById).not.toHaveBeenCalled(); // Verifica se findById não foi chamado
            return;
        }
        // Falhou se não entrou no catch
        throw new Error('Ocorreu um erro externo');
    });
    
    

    test('5 - Deve retornar null se a turma não for encontrada', async () => {
        turmaRepository.findById.mockResolvedValue(null);
    
        const turma = await turmaService.listarPorID(999); // ID de uma turma inexistente
    
        expect(turma).toBeNull(); // Verifica se retorna null
        expect(turmaRepository.findById).toHaveBeenCalledWith(999);
    });
    
    

   /*


it('3-deve retornar status 500 quando o turmaService lançar um erro.', async () => {
    // Mock para a função de enviar erro
    const sendErrorMock = jest.fn();
    
    // Mock da resposta com o método status que retorna um objeto com o método json
    const res = { 
        status: jest.fn(() => ({ json: sendErrorMock })) 
    };

    // Mock do objeto de criar turma
    const mockCreateTurma = {
        id: 1,
        titulo: "test"
    };

    // Mock da requisição com o corpo contendo mockCreateTurma
    const req = { body: mockCreateTurma };

    // Chamada do método createTurma do controller, que deve lançar um erro
    await turmaController.createTurma(req, res);

    // Verifica se o método status foi chamado com o código 500
    expect(res.status).toHaveBeenCalledWith(500);
    
    // Verifica se sendErrorMock foi chamado com o objeto de erro esperado
    expect(sendErrorMock).toHaveBeenCalledWith(
        expect.objectContaining({
            code: 500,
            data: [],
            error: true,
            errors: ["OCORREU UM ERRO INTERNO"],
            message: "Servidor encontrou um erro interno."
        })
    );
});
*/

    /*
it('4-deve retornar status 500 quando o turmaService lançar um erro.', async () => {
    // Mock para a função de enviar erro
    const sendErrorMock = jest.fn();
    
    // Mock da resposta com o método status que retorna um objeto com o método json
    const res = { 
        status: jest.fn(() => ({ json: sendErrorMock })) 
    };

    // Mock do objeto de adicionar usuário
    const mockAdicionarUsuario = {
        usu_id: 1,
        usuario_id: 1
    };

    // Mock da requisição com o corpo contendo o mockAdicionarUsuario
    const req = { body: mockAdicionarUsuario };

    // Chamada do método adicionarUsuario do controller, que deve lançar um erro
    await turmaController.adicionarUsuario(req, res);

    // Verifica se o método status foi chamado com o código 500
    expect(res.status).toHaveBeenCalledWith(500);
    
    // Verifica se sendErrorMock foi chamado com o objeto de erro esperado
    expect(sendErrorMock).toHaveBeenCalledWith(
        expect.objectContaining({
            code: 500,
            data: [],
            error: true,
            errors: ["OCORREU UM ERRO INTERNO"],
            message: "Servidor encontrou um erro interno."
        })
    );
});
*/

});
