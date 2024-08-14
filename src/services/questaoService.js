import questaoRepository from "../repositores/questaoRepository.js";

class questaoService {
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

    static async atualizar(id, titulo, posicao) {
      // Regra de negócio e validações
      return await questaoRepository.update(id, titulo, posicao, link_video,pdf);
    }

}

export default new questaoService();
