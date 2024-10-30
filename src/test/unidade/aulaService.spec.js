import { describe, expect, jest, test } from '@jest/globals';
import AulaRepository from '../../repositories/AulaRepository.js';
import AulaService from '../../services/AulaService.js';
import faker from 'faker-br';
import AulaSchemas from "../../schemas/AulaSchemas.js";

jest.mock('../../repositories/AulaRepository.js', () => ({
    findAllFeitos: jest.fn(),
    findAllAulas: jest.fn(),
    filtrarPorId: jest.fn(),
    createFilterAula: jest.fn(),
    createFilterFeito: jest.fn(),
    modulo_exist: jest.fn(),
    create_aula: jest.fn(),
    
}));

beforeEach(() => {
    jest.clearAllMocks();
});

describe('(GET) Fazendo teste do método que lista aulas.', () => {
    
    test('1 - Deve listar aulas filtradas por título e módulo.', async () => {
        const mockDeAulas = [
            { titulo: "Aula 1", modulo_id: 1 },
            { titulo: "Aula 2", modulo_id: 1 }
        ];

        const parametros = { titulo: "Aula 1", modulo_id: 1 };
        
        AulaRepository.createFilterAula.mockReturnValue(parametros);
        AulaRepository.findAllAulas.mockResolvedValue(mockDeAulas);

        const data = await AulaService.listar(parametros);

        expect(data).toBeInstanceOf(Array);
        expect(data).toHaveLength(2);
        expect(data).toEqual(mockDeAulas);
    });

    test('2 - Deve listar aulas feitas filtradas por aluno_id.', async () => {
        const mockDeAulasFeitas = [
            { titulo: "Aula Feita", aluno_id: 1 }
        ];

        const parametros = { aluno_id: 1 };
        
        AulaRepository.createFilterFeito.mockReturnValue(parametros);
        AulaRepository.findAllFeitos.mockResolvedValue(mockDeAulasFeitas);

        const data = await AulaService.listar(parametros);

        expect(data).toBeInstanceOf(Array);
        expect(data).toHaveLength(1);
        expect(data).toEqual(mockDeAulasFeitas);
    });

    test('3 - Deve retornar todas as aulas quando nenhum filtro for aplicado.', async () => {
        const mockDeTodasAsAulas = [
            { titulo: "Aula 1" },
            { titulo: "Aula 2" }
        ];

        const parametros = {}; 
        
        AulaRepository.findAllAulas.mockResolvedValue(mockDeTodasAsAulas);

        const data = await AulaService.listar(parametros);

        expect(data).toBeInstanceOf(Array);
        expect(data).toHaveLength(2);
        expect(data).toEqual(mockDeTodasAsAulas);
    });

    test('4 - Deve lançar erro quando nenhum registro for encontrado.', async () => {
        const parametros = { aluno_id: 2 }; 

        AulaRepository.createFilterFeito.mockReturnValue(parametros);
        AulaRepository.findAllFeitos.mockResolvedValue([]);

        await expect(AulaService.listar(parametros)).rejects.toThrow("Nenhum registro encontrado.");
    });

    test('5 - Deve lançar erro se o parâmetro for inválido.', async () => {
        const parametros = { titulo: 123 }; 

        const schema = AulaSchemas.listarSchema;

        await expect(schema.parse(parametros)).rejects.toThrow(); 
    });
});


describe('(POST) Fazendo teste do método que cria uma aula.', () => {
    
    test('1 - Deve criar uma nova aula sem erros.', async () => {
        const mockDeInventarios = [
            {   titulo: faker.commerce.productName(), 
                video: faker.internet.url(), 
                descricao: faker.commerce.productMaterial(), 
                pdf_questoes: "questoes1.pdf", 
                pdf_resolucao:"gabarito1.pdf" }
            ]

        AulaRepository.modulo_exist.mockResolvedValue({id:1});

        AulaRepository.create_aula.mockResolvedValue(mockDeInventarios);

        const data = await AulaService.create_aula({
            titulo: faker.commerce.productName(), 
            modulo_id:1,
            video: faker.internet.url(), 
            descricao: faker.commerce.productMaterial(), 
            pdf_questoes: "questoes1.pdf", 
            pdf_resolucao:"gabarito1.pdf"
        });

        expect(data).toBeInstanceOf(Array);
        expect(data).toHaveLength(1);
        expect(data).toEqual(mockDeInventarios);

    });

    test('2 - Deve retornar um erro quando o modulo não existir.', async () => {
        const mockDeInventarios = 
            {   titulo: faker.commerce.productName(), 
                video: faker.internet.url(), 
                descricao: faker.commerce.productMaterial(), 
                pdf_questoes: "questoes1.pdf", 
                pdf_resolucao:"gabarito1.pdf" }
        ;

        const paramentros = {
            titulo: faker.commerce.productName(), 
            modulo_id:1,
            video: faker.internet.url(), 
            descricao: faker.commerce.productMaterial(), 
            pdf_questoes: "questoes1.pdf", 
            pdf_resolucao:"gabarito1.pdf"
        }

        AulaRepository.modulo_exist.mockResolvedValue(null);
        AulaRepository.create_aula.mockResolvedValue(mockDeInventarios);

        await expect(AulaService.create_aula(paramentros)).rejects.toThrow("O modulo informado não existe.");

        expect(AulaRepository.modulo_exist).toHaveBeenCalledWith(paramentros.modulo_id);

    });

    
});
