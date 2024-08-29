import questaoRepository from "../repositories/questaoRepository.js";
import messages from "../utils/messages.js";

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

    async inserir(data) {
      const ValidarData = questaoSchama.parse(data);
      const errors = [];
    
      const tituloExists = await questaoRepository.findByTitulo(ValidarData.titulo);
      if (tituloExists) {
        errors.push(messages.validationGeneric.resourceAlreadyExists('Título').message);
      }
    
      const posicaoExists = await questaoRepository.findByPosicao(ValidarData.posicao); // Supondo que haja um método findByPosicao
      if (posicaoExists) {
        errors.push(messages.validationGeneric.resourceAlreadyExists('Posição').message);
      }
    
      if (errors.length > 0) {
        throw new Error(errors.join('\n'));
      }
    
      return await questaoRepository.create(ValidarData);
    }
  }    


export default new questaoService();
