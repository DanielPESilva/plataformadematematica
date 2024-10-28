import questaoRepository from "../repositories/AulaRepository.js";
import AulaRepository from "../repositories/AulaRepository.js";
import AulaSchema from "../schemas/AulaSchemas.js";

class AulaService {
  async listar(filtro) {
      // Regra de negócio e validações
      

      return await questaoRepositoryRepository.findMany(filtro);
  }
  async listarPorID(id) {
      // teste se o id é um número
      if (isNaN(id)) {
        throw new Error('ID deve ser um número inteiro)');
      }
      return questaoRepository.findById(id);
    }

  static async atualizar(id, titulo, posicao, pdf, link_video) {
    // Regra de negócio e validações
    return await questaoRepository.update(id, titulo, posicao, pdf, link_video);
  }

  async create(parametros) {
    const insert = AulaSchema.schemaInsert.parse(parametros)

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
