import {describe, expect, test} from '@jest/globals';
import turmaService from '../../services/turmaService.js';
import turmaRepository from '../../repositories/turmaRepository.js';


jest.mock('../../repositories/turmaRepository.js', () => ({
    findAll: jest.fn(),
    //findById: jest.fn(),
    //create: jest.fn(),
    //update: jest.fn(),
    //delete: jest.fn(),
    constructFilters: jest.fn(),
}));

describe('turmaService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should return all turmas', async () => {
        // Arrange
        const mockTurmas = [
        {  
            titulo:'1ª Série A',
            total:[1,2,3]
        },
    ];

        const mockResult = {
            turmas: mockTurmas,
        };

        turmaRepository.constructFilters.mockReturnValue({}); 
        turmaRepository.findAll.mockResolvedValue(mockResult);

      // Act
        const turmas = await turmaService.listar('', '', '', 1, 10);

        // Assert
        expect(turmas).toEqual(mockResult);
        expect(turmaRepository.findAll).toHaveBeenCalledWith({}, 1, 10);
    });

    
   /*
it('2-deve retornar status 500 quando o turmaService lançar um erro.', async () => {
    // Mock para a função de enviar erro
    const sendErrorMock = jest.fn();
    
    // Mock da resposta com o método status que retorna um objeto com o método json
    const res = { 
        status: jest.fn(() => ({ json: sendErrorMock })) 
    };

    // Mock da requisição com o corpo e parâmetros
    const req = { body: { sala_id: 1 }, params: { id: 1 } };

    // Chamada do método listarPorID do controller, que deve lançar um erro
    await turmaController.listarPorID(req, res);

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
