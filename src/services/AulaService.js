import AulaRepository from "../repositories/AulaRepository.js";
import AulaSchemas from "../schemas/AulaSchemas.js";
class AulaService {

  /**
   * Há validação do zod, falta padronizare organizar...
   */
    async listar(filtro) {
        // Regra de negócio e validações
        filtro = AulaSchemas.listarSchema.parse(filtro)


        if(filtro.titulo || filtro.modulo_id){
          const filtroRepository = AulaRepository.createFilterAula(filtro);
          const aulas = await AulaRepository.findAllAulas(filtroRepository)
  
          return aulas;
        }
        if(filtro.aluno_id){
          const filtroRepository = AulaRepository.createFilterFeito(filtro);
          const aulas = await AulaRepository.findAllFeitos(filtroRepository)
  
          return aulas;
        }
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

  static async atualizar(id, titulo, posicao, pdf, link_video) {
    // Regra de negócio e validações
    return await questaoRepository.update(id, titulo, posicao, pdf, link_video);
  }

  async create(parametros) {
    const insert = AulaSchemas.schemaInsert.parse(parametros)


    const modulo = await AulaRepository.modulo_exist(insert.modulo_id)
    if (!modulo) {
      throw new Error("O modulo informado não existe.");
    }

    const AulaCriada = AulaRepository.create(insert)
    return AulaCriada

  }

  async deletar(dados) {
    //service de deletar aula
  } 
}


export default new AulaService();
