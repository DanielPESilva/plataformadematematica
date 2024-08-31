import {turmaController} from '../../controllers/turmaController.js';
import { describe, expect, it} from '@jest/globals';

jest.mock('../../repositories/turmaRepository', () => ({
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    findByTitulo: jest.fn(),
    turmaExist: jest.fn(),
    userExist: jest.fn(),
    constructFilters: jest.fn()
}));

jest.mock('../../services/TurmaService.js', () => ({
    listar: jest.fn().mockRejectedValue(new Error('Erro interno do serviço')),
    listarPorID: jest.fn().mockRejectedValue(new Error('Erro interno do serviço')),
    create: jest.fn().mockRejectedValue(new Error('Erro interno do serviço')),
    //adicionarUsuario: jest.fn().mockRejectedValue(new Error('Erro interno do serviço')),
    //updateTurma: jest.fn().mockRejectedValue(new Error('Erro interno do serviço'))
}));

beforeEach(() => {
    jest.clearAllMocks();
});

describe('Controller listarTurmas', () => {
    
    it('1-deve retornar status 500 quando turmaService lançar um erro.', async () => {
        const sendErrorMock = jest.fn();
        const res = { status: jest.fn(() => ({ json: sendErrorMock })) };

        const req = { body: { id: 1 } };

        await turmaController.listarturmas(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(sendErrorMock).toHaveBeenCalledWith(
            expect.objectContaining({
                code: 500,
                data:[],
                error: true,
                errors: ["OCORREU UM ERRO INTERNO"],
                message: "Servidor encontrou um erro interno."
            })
        );
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
