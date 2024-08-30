import questaoRepository from "../repositories/questaoRepository.js";
import messages from "../utils/messages.js";
import { z } from 'zod'
import { prisma } from "../configs/prismaClient.js";

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
      try {
          const questaoSchema = z.object({
              id: z.number().optional(),  // Não é necessário para inserção, mas pode ser incluído se necessário
              posicao: z.string().nullable().optional(),
              titulo: z.string().min(1, "Título é obrigatório."),
              pdf: z.string().nullable().optional(),
              link_video: z.string().nullable().optional()
          });
  
          // Validação dos dados com o schema
          const questaoValidated = questaoSchema.parse(data);
  
          // Inserção dos dados no repositório
          const response = await questaoRepository.create(questaoValidated);
  
          if (!response) throw {
              error: true,
              code: 400,
              message: "Não foi possível inserir as Questões no banco de dados.",
          };
  
          return response;
      } catch (error) {
          if (error instanceof z.ZodError) {
              const errorMessages = error.issues.map((issue) => ({
                  path: issue.path[0],
                  message: issue.message,
              }));
              throw {
                  error: true,
                  code: 400,
                  message: errorMessages,
              };
          } else {
              throw {
                error: true,
                code: 500,
                message: error.message || 'Erro interno do servidor'
              }
          }
      }
  }  
  }


export default new questaoService();
