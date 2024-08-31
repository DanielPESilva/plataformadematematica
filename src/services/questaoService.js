import questaoRepository from "../repositories/questaoRepository.js";
import messages from "../utils/messages.js";
import { z } from 'zod'
import { prisma } from "../configs/prismaClient.js";
import QuestaoSchema from "../schemas/questaoSchemas.js";

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

    static async atualizar(id, titulo, posicao, pdf, link_video) {
      // Regra de negócio e validações
      return await questaoRepository.update(id, titulo, posicao, pdf, link_video);
    }

    async create(dados) {
     const {id, posicao, titulo, pdf, link_video} = QuestaoSchema.createQestaoSchema.parse(dados)

     console.log(titulo + " pós validação")

     let data = {id:id,posicao:posicao,titulo:titulo,pdf:pdf,link_video:link_video}

     const questao = await questaoRepository.create(data)
     if(!questao){
        throw{
            code:404,
            menssage: `Não foi possivel criar questão com o nome: ${titulo}`
        }
     }
     console.log(questao)
  }  
  }


export default new questaoService();
