// Importando as dependências e mockando o moduloRepository
import moduloService from "../../services/moduloService.js";
import moduloRepository from '../../repositories/moduloRepository.js';

// Mock dos métodos do moduloRepository
jest.mock('../../repositories/moduloRepository.js', () => ({
    listar: jest.fn(),
    listarPorId: jest.fn(),
    inserir: jest.fn(),
    atualizar: jest.fn(),
    deletar: jest.fn(),
    moduloExist: jest.fn(),
    constructFilters: jest.fn(),
}));
jest.mock('sharp');

describe('ModuloService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('listar', () => {
        it('deve retornar busca quando encontrar módulos', async () => {
            const filtro = { titulo: 'Teste' };
            const busca = [{ id: 1, turma_id: 1, titulo: 'Teste', descricao: 'Descrição de Teste', image: 'imagem.png' }];

            moduloRepository.constructFilters.mockReturnValue(filtro);
            moduloRepository.listar.mockResolvedValue(busca);

            const result = await moduloService.listar(filtro);

            expect(moduloRepository.constructFilters).toHaveBeenCalledWith(filtro);
            expect(moduloRepository.listar).toHaveBeenCalledWith(filtro);
            expect(result).toEqual(busca);
        });

        it('deve lançar erro se não encontrar nenhum módulo', async () => {
            const filtro = { titulo: 'Inexistente' };

            moduloRepository.constructFilters.mockReturnValue(filtro);
            moduloRepository.listar.mockResolvedValue([]);

            await expect(moduloService.listar(filtro)).rejects.toThrow("nem um modulo foi encontrado.");
        });
    });

    describe('listarPorId', () => {
        it('deve retornar o módulo quando encontrar por ID', async () => {
            const id = 1;
            const modulo = { id: 1, turma_id: 1, titulo: 'Teste', descricao: 'Descrição de Teste', image: 'imagem.png' };

            moduloRepository.constructFilters.mockReturnValue({ id });
            moduloRepository.listarPorId.mockResolvedValue(modulo);

            const result = await moduloService.listarPorId(id);

            expect(moduloRepository.constructFilters).toHaveBeenCalledWith({ id });
            expect(moduloRepository.listarPorId).toHaveBeenCalledWith({ id });
            expect(result).toEqual(modulo);
        });

        it('deve lançar erro se não encontrar o módulo por ID', async () => {
            const id = 999;

            moduloRepository.constructFilters.mockReturnValue({ id });
            moduloRepository.listarPorId.mockResolvedValue(null);

            await expect(moduloService.listarPorId(id)).rejects.toThrow("nem um modulo foi encontrado.");
        });
    });

    describe('inserir', () => {

        it('deve lançar erro se o arquivo não for uma imagem', async () => {
            const data = { turma_id: 1, titulo: 'Teste', descricao: 'Descrição', image: 'imagem.png' };
            const file = { mimetype: 'application/pdf' }; // Arquivo não é uma imagem
            const imageUrl = 'http://example.com/imagem.png';

            await expect(moduloService.inserir(data, file, imageUrl)).rejects.toThrow("Arquivo não é uma imagem.");
        });
    });

    describe('deletar', () => {
        it('deve deletar o módulo se ele existir', async () => {
            const id = 1;
            const modulo = { id };

            moduloRepository.constructFilters.mockReturnValue({ id });
            moduloRepository.listarPorId.mockResolvedValue(modulo);
            moduloRepository.deletar.mockResolvedValue(true);

            const result = await moduloService.deletar(id);

            expect(moduloRepository.listarPorId).toHaveBeenCalledWith({ id });
            expect(moduloRepository.deletar).toHaveBeenCalledWith(id);
            expect(result).toBe(true);
        });

        it('deve lançar erro se o módulo não existir', async () => {
            const id = 999;

            moduloRepository.constructFilters.mockReturnValue({ id });
            moduloRepository.listarPorId.mockResolvedValue(null);

            await expect(moduloService.deletar(id)).rejects.toThrow("Modulo não existe.");
        });
    });
});
