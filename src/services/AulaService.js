import AulaRepository from "../repositories/AulaRepository.js";
import AulaSchemas from "../schemas/AulaSchemas.js";
class AulaService {

  /**
   * Há validação do zod, falta padronizare organizar...
   */
    async listar(filtro) {
        // Regra de negócio e validações
        const schema = new AulaSchemas().listarSchema()
        filtro = schema.parse(filtro)

        const { feito, revisar, titulo } = filtro;
        const filtrado = {
          titulo,
          feito: feito === "true" ? true : feito === "false" ? false : undefined,
          revisar: revisar === "true" ? true : revisar === "false" ? false : undefined,
        };

        const filtroRepository = AulaRepository.createFilterAula(filtrado);
        const aulas = await AulaRepository.findAll(filtroRepository)

        return await AulaRepositoryRepository.findMany(aulas);
    }
    async listarPorID(id) {
        // teste se o id é um número
        if (isNaN(id)) {
          throw new Error('ID deve ser um número inteiro)');
        }
        return AulaRepository.findById(id);
      }

    static async atualizar(id, titulo, posicao, pdf, link_video) {
      // Regra de negócio e validações
      return await AulaRepository.update(id, titulo, posicao, pdf, link_video);
    }

    async create(perguntas, gabarito, parametros) {
    

  }
  async deletar(dados) {
    //service de deletar aula
  } 
  }


export default new AulaService();
