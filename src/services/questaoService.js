import questaoRepository from "../repositores/questaoRepository.js";

class questaoService {
    async listar(filtro) {
        // Regra de negócio e validações
        

        return await questaoRepository.findMany(filtro);
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

}

export default new questaoService();
