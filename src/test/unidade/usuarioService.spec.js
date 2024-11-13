import UsuarioService from '../../services/usuarioService.js';
import usuarioRepository from '../../repositories/usuarioRepository.js';
import UsuarioSchema from '../../schemas/usuarioSchema.js';
import bcrypt from 'bcryptjs';
import CSVFileValidator from 'csv-file-validator';
import Stream from 'stream';

jest.mock('../../repositories/usuarioRepository.js');
jest.mock('../../schemas/usuarioSchema.js', () => ({
    listarUsuarios: {
        parse: jest.fn()
    },
    atualizarSenha: {
        parse: jest.fn()
    },
    buscarUsuarioPorId: {
        parse: jest.fn()
    },
    criarUsuario: {
        parse: jest.fn()
    },
    atualizarUsuario: {
        parse: jest.fn()
    }
}));
jest.mock('bcryptjs');
jest.mock('csv-file-validator');
describe('UsuarioService', () => {
    describe('listarUsuarios', () => {
        it('should list users with valid filters', async () => {
            const filtros = { nome: 'test' };
            const validFiltros = { nome: 'test' };
            const usuarios = [{ id: 1, nome: 'test' }];

            UsuarioSchema.listarUsuarios.parse.mockReturnValue(validFiltros);
            usuarioRepository.listarUsuarios.mockResolvedValue(usuarios);

            const result = await UsuarioService.listarUsuarios(filtros);

            expect(UsuarioSchema.listarUsuarios.parse).toHaveBeenCalledWith(filtros);
            expect(usuarioRepository.listarUsuarios).toHaveBeenCalledWith(validFiltros);
            expect(result).toEqual(usuarios);
        });
    });

    describe('buscarUsuarioPorId', () => {
        it('should return user by id', async () => {
            const filtro = { id: 1 };
            const validFiltro = { id: 1 };
            const usuario = { id: 1, nome: 'test' };

            UsuarioSchema.buscarUsuarioPorId.parse.mockReturnValue(validFiltro);
            usuarioRepository.buscarUsuarioPorId.mockResolvedValue(usuario);

            const result = await UsuarioService.buscarUsuarioPorId(filtro);

            expect(UsuarioSchema.buscarUsuarioPorId.parse).toHaveBeenCalledWith(filtro);
            expect(usuarioRepository.buscarUsuarioPorId).toHaveBeenCalledWith(validFiltro.id);
            expect(result).toEqual(usuario);
        });

        it('should throw error if user not found', async () => {
            const filtro = { id: 1 };
            const validFiltro = { id: 1 };

            UsuarioSchema.buscarUsuarioPorId.parse.mockReturnValue(validFiltro);
            usuarioRepository.buscarUsuarioPorId.mockResolvedValue(null);

            await expect(UsuarioService.buscarUsuarioPorId(filtro)).rejects.toThrow('Usuário não encontrado.');
        });
    });

    describe('criarUsuario', () => {
        it('should create a new user', async () => {
            const data = { nome: 'test', matricula: '123', grupo_id: 1 };
            const validatedData = { nome: 'test', matricula: '123', grupo_id: 1 };
            const grupoExiste = true;
            const matriculaExist = null;
            const createdUser = { id: 1, nome: 'test' };

            UsuarioSchema.criarUsuario.parse.mockReturnValue(validatedData);
            usuarioRepository.buscarGrupoPorId.mockResolvedValue(grupoExiste);
            usuarioRepository.buscarUsuarioPorMatricula.mockResolvedValue(matriculaExist);
            usuarioRepository.criarUsuario.mockResolvedValue(createdUser);

            const result = await UsuarioService.criarUsuario(data);

            expect(UsuarioSchema.criarUsuario.parse).toHaveBeenCalledWith(data);
            expect(usuarioRepository.buscarGrupoPorId).toHaveBeenCalledWith(validatedData.grupo_id);
            expect(usuarioRepository.buscarUsuarioPorMatricula).toHaveBeenCalledWith(validatedData.matricula);
            expect(usuarioRepository.criarUsuario).toHaveBeenCalledWith(validatedData);
            expect(result).toEqual(createdUser);
        });

        it('should throw error if group not found', async () => {
            const data = { nome: 'test', matricula: '123', grupo_id: 1 };
            const validatedData = { nome: 'test', matricula: '123', grupo_id: 1 };
            const grupoExiste = null;

            UsuarioSchema.criarUsuario.parse.mockReturnValue(validatedData);
            usuarioRepository.buscarGrupoPorId.mockResolvedValue(grupoExiste);

            await expect(UsuarioService.criarUsuario(data)).rejects.toThrow('grupo não encontrado.');
        });

        it('should throw error if matricula already exists', async () => {
            const data = { nome: 'test', matricula: '123', grupo_id: 1 };
            const validatedData = { nome: 'test', matricula: '123', grupo_id: 1 };
            const grupoExiste = true;
            const matriculaExist = { id: 1, matricula: '123' };

            UsuarioSchema.criarUsuario.parse.mockReturnValue(validatedData);
            usuarioRepository.buscarGrupoPorId.mockResolvedValue(grupoExiste);
            usuarioRepository.buscarUsuarioPorMatricula.mockResolvedValue(matriculaExist);

            await expect(UsuarioService.criarUsuario(data)).rejects.toThrow('A matrícula já está em uso');
        });
    });

    describe('atualizar', () => {
        it('should update user', async () => {
            const parametros = { id: 1, nome: 'test', matricula: '123', active: true, senha: 'password', grupo_id: 1 };
            const parametrosValidos = { id: 1, nome: 'test', matricula: '123', active: true, senha: 'password', grupo_id: 1 };
            const usuarioExist = { id: 1, nome: 'test' };
            const usuarioComMesmaMatricula = null;
            const updatedUser = { id: 1, nome: 'test' };

            UsuarioSchema.atualizarUsuario.parse.mockReturnValue(parametrosValidos);
            usuarioRepository.buscarId.mockResolvedValue(usuarioExist);
            usuarioRepository.buscarUsuarioPorMatricula.mockResolvedValue(usuarioComMesmaMatricula);
            usuarioRepository.atualizarUsuario.mockResolvedValue(updatedUser);

            const result = await UsuarioService.atualizar(parametros);

            expect(UsuarioSchema.atualizarUsuario.parse).toHaveBeenCalledWith(parametros);
            expect(usuarioRepository.buscarId).toHaveBeenCalledWith(parametrosValidos.id);
            expect(usuarioRepository.buscarUsuarioPorMatricula).toHaveBeenCalledWith(parametrosValidos.matricula);
            expect(usuarioRepository.atualizarUsuario).toHaveBeenCalledWith(expect.any(Object));
            expect(result).toEqual(updatedUser);
        });

        it('should throw error if user not found', async () => {
            const parametros = { id: 1, nome: 'test', matricula: '123', active: true, senha: 'password', grupo_id: 1 };
            const parametrosValidos = { id: 1, nome: 'test', matricula: '123', active: true, senha: 'password', grupo_id: 1 };
            const usuarioExist = null;

            UsuarioSchema.atualizarUsuario.parse.mockReturnValue(parametrosValidos);
            usuarioRepository.buscarId.mockResolvedValue(usuarioExist);

            await expect(UsuarioService.atualizar(parametros)).rejects.toThrow('O recurso solicitado não foi encontrado no servidor.');
        });

        it('should throw error if matricula already exists for another user', async () => {
            const parametros = { id: 1, nome: 'test', matricula: '123', active: true, senha: 'password', grupo_id: 1 };
            const parametrosValidos = { id: 1, nome: 'test', matricula: '123', active: true, senha: 'password', grupo_id: 1 };
            const usuarioExist = { id: 1, nome: 'test' };
            const usuarioComMesmaMatricula = { id: 2, matricula: '123' };

            UsuarioSchema.atualizarUsuario.parse.mockReturnValue(parametrosValidos);
            usuarioRepository.buscarId.mockResolvedValue(usuarioExist);
            usuarioRepository.buscarUsuarioPorMatricula.mockResolvedValue(usuarioComMesmaMatricula);

            await expect(UsuarioService.atualizar(parametros)).rejects.toThrow('já existe um usuário com essa matrícula');
        });
    });

    describe('atualizarSenha', () => {
        it('should update user password', async () => {
            const parametros = { id: 1, senhaAntiga: 'oldPassword', senhaNova: 'newPassword' };
            const parametrosValidos = { id: 1, senhaAntiga: 'oldPassword', senhaNova: 'newPassword' };
            const usuarioExist = { id: 1, nome: 'test' };
            const usuario = { id: 1, senha: 'hashedOldPassword' };
            const senhaValida = true;
            const senhaHashed = 'hashedNewPassword';

            UsuarioSchema.atualizarSenha.parse.mockReturnValue(parametrosValidos);
            usuarioRepository.buscarId.mockResolvedValue(usuarioExist);
            usuarioRepository.buscarSenha.mockResolvedValue(usuario);
            bcrypt.compare.mockResolvedValue(senhaValida);
            bcrypt.hash.mockResolvedValue(senhaHashed);

            const result = await UsuarioService.atualizarSenha(parametros);

            expect(UsuarioSchema.atualizarSenha.parse).toHaveBeenCalledWith(parametros);
            expect(usuarioRepository.buscarId).toHaveBeenCalledWith(parametrosValidos.id);
            expect(usuarioRepository.buscarSenha).toHaveBeenCalledWith(parametrosValidos.id);
            expect(bcrypt.compare).toHaveBeenCalledWith(parametrosValidos.senhaAntiga, usuario.senha);
            expect(bcrypt.hash).toHaveBeenCalledWith(parametrosValidos.senhaNova, parseInt(process.env.SALT));
            expect(usuarioRepository.atualizarUsuario).toHaveBeenCalledWith(expect.any(Object));
            expect(result).toEqual(expect.any(Object));
        });

        it('should throw error if user not found', async () => {
            const parametros = { id: 1, senhaAntiga: 'oldPassword', senhaNova: 'newPassword' };
            const parametrosValidos = { id: 1, senhaAntiga: 'oldPassword', senhaNova: 'newPassword' };
            const usuarioExist = null;

            UsuarioSchema.atualizarSenha.parse.mockReturnValue(parametrosValidos);
            usuarioRepository.buscarId.mockResolvedValue(usuarioExist);

            await expect(UsuarioService.atualizarSenha(parametros)).rejects.toThrow('Usuário não existe.');
        });

        it('should throw error if old password is incorrect', async () => {
            const parametros = { id: 1, senhaAntiga: 'oldPassword', senhaNova: 'newPassword' };
            const parametrosValidos = { id: 1, senhaAntiga: 'oldPassword', senhaNova: 'newPassword' };
            const usuarioExist = { id: 1, nome: 'test' };
            const usuario = { id: 1, senha: 'hashedOldPassword' };
            const senhaValida = false;

            UsuarioSchema.atualizarSenha.parse.mockReturnValue(parametrosValidos);
            usuarioRepository.buscarId.mockResolvedValue(usuarioExist);
            usuarioRepository.buscarSenha.mockResolvedValue(usuario);
            bcrypt.compare.mockResolvedValue(senhaValida);

            await expect(UsuarioService.atualizarSenha(parametros)).rejects.toThrow('Senha Antiga informada está incorreta.');
        });
    });

    describe('inserir_csv', () => {
        it('should insert users from CSV', async () => {
            const arquivo = { mimetype: 'text/csv', buffer: Buffer.from('nome;matricula;senha\nJohn Doe;123;password') };
            const csvData = { inValidData: [] };
            const usuario_existentes = [];
            const grupo = { id: 1 };
            const turmas_ids = [{ id: 1 }, { id: 2 }];
            const usuario_criados = [{ id: 1, nome: 'John Doe' }];

            CSVFileValidator.mockResolvedValue(csvData);
            usuarioRepository.listar_csv.mockResolvedValue(usuario_existentes);
            usuarioRepository.grupo_alunos.mockResolvedValue(grupo);
            usuarioRepository.buscar_turmas.mockResolvedValue(turmas_ids);
            bcrypt.hash.mockResolvedValue('hashedPassword');
            usuarioRepository.inserir_usuarios.mockResolvedValue({ id: 1, nome: 'John Doe' });
            usuarioRepository.inserir_alunos.mockResolvedValue();

            const result = await UsuarioService.inserir_csv(arquivo);

            expect(CSVFileValidator).toHaveBeenCalledWith(expect.any(Stream.PassThrough), expect.any(Object));
            expect(usuarioRepository.listar_csv).toHaveBeenCalled();
            expect(usuarioRepository.grupo_alunos).toHaveBeenCalled();
            expect(usuarioRepository.buscar_turmas).toHaveBeenCalled();
            expect(bcrypt.hash).toHaveBeenCalledWith('password', parseInt(process.env.SALT));
            expect(usuarioRepository.inserir_usuarios).toHaveBeenCalledWith(expect.any(Object));
            expect(usuarioRepository.inserir_alunos).toHaveBeenCalledWith(expect.any(Array));
            expect(result).toEqual(usuario_criados);
        });

        it('should throw error if file type is incorrect', async () => {
            const arquivo = { mimetype: 'application/json', buffer: Buffer.from('{"nome": "John Doe"}') };

            await expect(UsuarioService.inserir_csv(arquivo)).rejects.toThrow('Arquivo do tipo errado.');
        });

        it('should throw error if CSV structure is incorrect', async () => {
            const arquivo = { mimetype: 'text/csv', buffer: Buffer.from('nome;matricula;senha\nJohn Doe;123;password') };
            const csvData = { inValidData: [{ nome: 'John Doe' }] };

            CSVFileValidator.mockResolvedValue(csvData);

            await expect(UsuarioService.inserir_csv(arquivo)).rejects.toThrow('Estrutura do CSV está incorreta.');
        });
    });
});