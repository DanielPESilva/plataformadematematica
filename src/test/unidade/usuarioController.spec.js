import request from 'supertest';
import app from '../../app'; // Certifique-se de ajustar o caminho para o seu arquivo de aplicação
import UsuarioService from '../../services/usuarioService';
jest.mock('../../services/usuarioService');

jest.mock

describe('Usuario Controller',  () => {
    describe('GET /usuarios',  () => {
        describe("500",()=>{
            it("Dever retornar o erro 500 ao listar usuarios",async ()=> {
                UsuarioService.listarUsuarios.mockRejectedValue(new Error('Erro desconhecido'));

                const response = await request(app).get('/usuario')

                expect(UsuarioService.listarUsuarios).toHaveBeenCalled();
                expect(response.status).toBe(500);
                expect(response.body.data).toBeDefined();
                expect(response.body.message).toBeDefined();
                expect(response.body.error).toEqual(true);

            });
        });
    });
    describe('GET ID /usuarios',  () => {
        describe("500",()=>{
            it("Dever retornar o erro 500 ao listar usuarios por id",async ()=> {
                UsuarioService.buscarUsuarioPorId.mockRejectedValue(new Error('Erro desconhecido'));
    
                const response = await request(app).get('/usuario/10')
    
                expect(UsuarioService.buscarUsuarioPorId).toHaveBeenCalled();
                expect(response.status).toBe(500);
                expect(response.body.data).toBeDefined();
                expect(response.body.message).toBeDefined();
                expect(response.body.error).toEqual(true);
    
            });
        });
    });
    describe('POST /usuarios', () => {
        it('Deve retornar erro 500 para erros desconhecidos', async () => {
            UsuarioService.criarUsuario.mockRejectedValue(new Error('Ocorreu um erro interno no servidor!'));
    
            const response = await request(app)
                .post('/usuario')
                .send({ nome: "Daniel", matricula: "1234561231231", grupo_id: 1, active: true, senha: "senha super forte" });
            console.log(response.body);
            
            expect(UsuarioService.criarUsuario).toHaveBeenCalled();
            expect(response.body.data).toBeDefined();
            expect(response.body.error).toBeDefined();
            expect(response.body.code).toBeDefined();
            expect(response.body.message).toBeDefined();
            expect(response.body.errors).toBeDefined();
            expect(response.body.errors[0].message).toBeDefined();
        });
    });

    describe('PATCH /usuarios', () => {
        it('Deve retornar erro 500 para erros desconhecidos', async () => {
            UsuarioService.atualizar.mockRejectedValue(new Error('Ocorreu um erro interno no servidor!'));
    
            const response = await request(app)
                .patch('/usuario/1')
                .send({ nome: "Daniel", matricula: "1234561231231", grupo_id: 1, active: true, senha: "senha super forte" });
    
            expect(UsuarioService.atualizar).toHaveBeenCalled();
            expect(response.body.data).toBeDefined();
            expect(response.body.error).toBeDefined();
            expect(response.body.code).toBeDefined();
            expect(response.body.message).toBeDefined();
            expect(response.body.errors).toBeDefined();
            expect(response.body.errors[0].message).toBeDefined();
        });
    });
});


