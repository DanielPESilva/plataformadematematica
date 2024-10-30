import { describe, expect, jest, test } from '@jest/globals';
import AulaRepository from '../../repositories/AulaRepository.js';
import AulaService from '../../services/AulaService.js';
import AulaSchemas from '../../schemas/AulaSchemas.js';
import faker from 'faker-br';

jest.mock('../../repositories/AulaRepository.js', () => ({
    findAllFeitos: jest.fn(),
    findAllAulas: jest.fn(),
    filtrarPorId: jest.fn(),
    createFilterAula: jest.fn(),
    createFilterFeito: jest.fn(),
    modulo_exist: jest.fn(),
    create_aula: jest.fn(),
}));

jest.mock('../../schemas/AulaSchemas.js', () => ({
    listarSchema: {
        parse: jest.fn(),
    },
    schemaInsert: {
        parse: jest.fn(),
    },
    listarPorIdSchema: {
        parse: jest.fn(),
    },
}));

beforeEach(() => {
    jest.clearAllMocks();
});

describe('1 - (GET) Fazendo teste do método que lista aulas.', () => {
    
    test('1 - Deve listar aulas filtradas por título e módulo.', async () => {
        const mockDeAulas = [
            { titulo: faker.commerce.productName(), modulo_id: 1 },
            { titulo: faker.commerce.productName(), modulo_id: 2 }
        ];

        const parametros = { titulo: "Aula 1", modulo_id: 1 };
        
        AulaSchemas.listarSchema.parse.mockReturnValue(parametros);
        AulaRepository.createFilterAula.mockReturnValue(parametros);
        AulaRepository.findAllAulas.mockResolvedValue(mockDeAulas);

        const data = await AulaService.listar(parametros);

        expect(data).toEqual(mockDeAulas);
    });

    test('2 - Deve listar aulas feitas filtradas por aluno_id.', async () => {
        const mockDeAulasFeitas = [
            { titulo: faker.commerce.productName(), aluno_id: 1 }
        ];

        const parametros = { aluno_id: 1 };
        
        AulaSchemas.listarSchema.parse.mockReturnValue(parametros);
        AulaRepository.createFilterFeito.mockReturnValue(parametros);
        AulaRepository.findAllFeitos.mockResolvedValue(mockDeAulasFeitas);

        const data = await AulaService.listar(parametros);

        expect(data).toEqual(mockDeAulasFeitas);
    });

    test('3 - Deve retornar todas as aulas quando nenhum filtro for aplicado.', async () => {
        const mockDeTodasAsAulas = [
            { titulo: faker.commerce.productName() },
            { titulo: faker.commerce.productName() }
        ];

        const parametros = {}; 
        
        AulaSchemas.listarSchema.parse.mockReturnValue(parametros);
        AulaRepository.findAllAulas.mockResolvedValue(mockDeTodasAsAulas);

        const data = await AulaService.listar(parametros);

        expect(data).toEqual(mockDeTodasAsAulas);
    });

    test('3 - Deve lançar erro quando nenhum registro for encontrado.', async () => {
        const parametros = {}; 
        
        AulaSchemas.listarSchema.parse.mockReturnValue(parametros);
        AulaRepository.findAllAulas.mockResolvedValue([]);

        await expect(AulaService.listar(parametros)).rejects.toThrow("Nenhuma aula encontrada.");
    });
});

describe('2 - (GET) Testando o método listarPorID.', () => {
    test('1 - Deve retornar a aula correspondente ao ID fornecido.', async () => {
        const idDoParam = 1;
        const aulaMock = { id: 1, titulo: "Aula de Teste" };
        
        AulaSchemas.listarPorIdSchema.parse.mockReturnValue({ id: idDoParam });
        AulaRepository.createFilterAula.mockReturnValue({ id: idDoParam });
        AulaRepository.filtrarPorId.mockResolvedValue(aulaMock);
        
        const data = await AulaService.listarPorID(idDoParam);

        expect(data).toEqual(aulaMock);
        expect(AulaSchemas.listarPorIdSchema.parse).toHaveBeenCalledWith(idDoParam);
        expect(AulaRepository.createFilterAula).toHaveBeenCalledWith({ id: idDoParam });
        expect(AulaRepository.filtrarPorId).toHaveBeenCalledWith({ id: idDoParam });
    });

    test('2 - Deve lançar erro se nenhuma aula for encontrada.', async () => {
        const idDoParam = 2;

        AulaSchemas.listarPorIdSchema.parse.mockReturnValue({ id: idDoParam });
        AulaRepository.createFilterAula.mockReturnValue({ id: idDoParam });
        AulaRepository.filtrarPorId.mockResolvedValue(null);
        
        await expect(AulaService.listarPorID(idDoParam)).rejects.toThrow("Nenhuma aula encontrada.");
        
        expect(AulaSchemas.listarPorIdSchema.parse).toHaveBeenCalledWith(idDoParam);
        expect(AulaRepository.createFilterAula).toHaveBeenCalledWith({ id: idDoParam });
        expect(AulaRepository.filtrarPorId).toHaveBeenCalledWith({ id: idDoParam });
    });
});

test('1 - Deve criar uma nova aula sem erros.', async () => {
    const mockDeInventarios = [
        {   
            titulo: faker.commerce.productName(), 
            video: faker.internet.url(), 
            descricao: faker.commerce.productMaterial(), 
            pdf_questoes: "questoes1.pdf", 
            pdf_resolucao: "gabarito1.pdf" 
        }
    ];

    const parametros = {
        titulo: faker.commerce.productName(), 
        modulo_id: 1,
        video: faker.internet.url(), 
        descricao: faker.commerce.productMaterial(), 
        pdf_questoes: "questoes1.pdf", 
        pdf_resolucao: "gabarito1.pdf"
    };

    AulaSchemas.schemaInsert.parse.mockReturnValue(parametros);
    AulaRepository.modulo_exist.mockResolvedValue({ id: 1 });
    AulaRepository.create_aula.mockResolvedValue(mockDeInventarios);

    const data = await AulaService.create_aula(parametros);

    expect(data).toEqual(mockDeInventarios);
});

test('2 - Deve retornar um erro quando o modulo não existir.', async () => {
    const parametros = {
        titulo: faker.commerce.productName(), 
        modulo_id: 1,
        video: faker.internet.url(), 
        descricao: faker.commerce.productMaterial(), 
        pdf_questoes: "questoes1.pdf", 
        pdf_resolucao: "gabarito1.pdf"
    };

    AulaSchemas.schemaInsert.parse.mockReturnValue(parametros);
    AulaRepository.modulo_exist.mockResolvedValue(null);

    await expect(AulaService.create_aula(parametros)).rejects.toThrow("O modulo informado não existe.");
    expect(AulaRepository.modulo_exist).toHaveBeenCalledWith(parametros.modulo_id);
    
});
