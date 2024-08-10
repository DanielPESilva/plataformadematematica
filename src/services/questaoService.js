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
}

export default new questaoService();
