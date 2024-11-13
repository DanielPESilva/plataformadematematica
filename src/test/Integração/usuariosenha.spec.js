import request from 'supertest';
import app from '../../app'; // Certifique-se de ajustar o caminho para o seu arquivo de aplicação
import systemUsuarioController from '../../controllers/UsuarioController';
import UsuarioService from '../../services/usuarioService';

jest.mock('../../services/usuarioService');
UsuarioService.atualizarSenha.mockResolvedValue({
  id: 1,
  senha: 'novaSenhaHashed'
});
describe('Usuario Controller - Atualização de Senha', () => {
  
    it('Deve retornar erro 400 quando ocorrer um erro de validação de dados (ZodError)', async () => {

      UsuarioService.atualizarSenha.mockRejectedValue(new Error('Erro de validação'));
      const response = await request(app)
        .patch('/usuario/1/senha') // ID do usuário e rota de senha
        .send({ senhaNova: 'novaSenha123', senhaAntiga: 'senhaErrada' });
  
      console.log(request.body)

      expect(UsuarioService.atualizarSenha).toHaveBeenCalled();
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Erro de validação');
    });
  
  //   // Testando erro 404 - Usuário não encontrado
  //   it('Deve retornar erro 404 quando o usuário não existe', async () => {
  //     // Mock para simular erro de usuário não encontrado
  //     UsuarioService.atualizarSenha.mockRejectedValue(new Error('Usuário não existe.'));
      
  //     const response = await request(app)
  //       .patch('/usuario/1/senha') // ID do usuário e rota de senha
  //       .send({ senhaNova: 'novaSenha123', senhaAntiga: 'senhaErrada' });
  
  //       console.log(request.body)

  //     expect(UsuarioService.atualizarSenha).toHaveBeenCalled();
  //     expect(response.status).toBe(404);
  //     expect(response.body.errors).toEqual(['Usuário não existe.']);
  //   });
  
  //   // Testando erro 403 - Senha Antiga incorreta
  //   it('Deve retornar erro 403 quando a senha antiga estiver incorreta', async () => {
  //     // Mock para simular erro de senha antiga incorreta
  //     UsuarioService.atualizarSenha.mockRejectedValue(new Error('Senha Antiga informada está incorreta.'));
      
  //     const response = await request(app)
  //       .patch('/usuario/1/senha') // ID do usuário e rota de senha
  //       .send({ senhaNova: 'novaSenha123', senhaAntiga: 'senhaErrada' });
  
  //     expect(UsuarioService.atualizarSenha).toHaveBeenCalled();
  //     expect(response.status).toBe(403);
  //     expect(response.body.errors).toEqual(['Senha Antiga informada está incorreta.']);
  //   });
  
  //   // Testando erro 500 - Erro interno do servidor
  //   it('Deve retornar erro 500 para erros desconhecidos', async () => {
  //     // Mock para simular um erro desconhecido
  //     UsuarioService.atualizarSenha.mockRejectedValue(new Error('Erro desconhecido'));
      
  //     const response = await request(app)
  //       .patch('/usuario/1/senha') // ID do usuário e rota de senha
  //       .send({ senhaNova: 'novaSenha123', senhaAntiga: 'senhaErrada' });
  
  //       console.log(request.body)

  //     expect(UsuarioService.atualizarSenha).toHaveBeenCalled();
  //     expect(response.status).toBe(500);
  //     expect(response.body.message).toBe('Ocorreu um erro interno no servidor!');
  //   });
  
  //   test('deve chamar atualizarSenha no UsuarioService', async () => {
  //     const usuarioMock = { id: 1, senha: 'novaSenhaHashed' };
    
  //     // Simula o retorno da função atualizarSenha
  //     UsuarioService.atualizarSenha.mockResolvedValue(usuarioMock);
    
  //     const resposta = await request(app)
  //       .patch('/usuario/1/senha')
  //       .send({ senhaAntiga: 'senhaAntiga', senhaNova: 'novaSenha' });
       
  //       console.log(request.body)
  //     // Verifica se o método atualizarSenha foi chamado com os parâmetros esperados
  //     expect(UsuarioService.atualizarSenha).toHaveBeenCalledWith({
  //       id: '1',
  //       senhaAntiga: 'senhaAntiga',
  //       senhaNova: 'novaSenha',
  //     });
    
  //     // Verifica o status da resposta
  //     expect(resposta.status).toBe(201);
  //   });
    
   });