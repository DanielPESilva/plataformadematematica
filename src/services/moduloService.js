import moduloRepository from "../repositories/moduloRepository.js";
import { z } from "zod";
import 'dotenv/config';

class ModuloService {
    static async listar(filtro) { 
              try {
                const filtroSchema = z.object({
                  mod_id: z.preprocess((val) => Number(val), z.number({
                      invalid_type_error: "Id informado não é do tipo number.",
                  }).int({
                      message: "Id informado não é um número inteiro."
                  }).positive({
                      message: "Id informado não é positivo."
                  })).optional({
                      invalid_type_error:'O ID do módulo é obrigatório.'
                  }),mod_tema: z.string({
                      invalid_type_error:'O Tema informado não é do tipo string.'
                  }).optional({
                      invalid_type_error:'O tema do módulo é obrigatório.'
                  }),mod_descricao: z.string({
                      invalid_type_error: "A descrição informada deve ser do tipo string."
                  }).optional(),
                     mod_pdf: z.object({
                          nome: z.string({
                          invalid_type_error:'O nome do pdf informado nao é do tipo string.'
                      }).optional({
                          message:'O nome do PDF é obrigatório.'
                      }),size: z.number().max(5 * 1024 * 1024, 'O tamanho máximo do PDF é de 5MB.'),
                  mimetype: z.string().regex(/application\/pdf/, 'O arquivo deve ser um PDF válido.')
                }).optional(),
                mod_linkVideo: z.string().url('O link do vídeo deve ser uma URL válida.').optional()
                });
            const filtroValidated = filtroSchema.parse(filtro);
            const response = await moduloRepository.findMany(filtroValidated)
                const modulos = await prisma.modulos.findMany();
                if (response.length === 0) throw {
                  error: true,
                  code: 400,
                  message: "Nenhum modulo encontrado",
              }; 
                return response
              }  catch (error) {
                if (error instanceof z.ZodError) {
                    const errorMessages = error.issues.map((issue) => {
                        return {
                            path: issue.path[0],
                            message: issue.message
                        };
                    });
                    throw {
                        error: true,
                        code: 400,
                        message: errorMessages,
                    };
                } else {
                    throw error;
                };
            };
        };

        static  async listarPorID(mod_id) {
          try {
            const idSchema = z.object({
                mod_id: z.preprocess((val) => Number(val), z.number({
                    invalid_type_error: "Id informado não é do tipo number.",
                }).int({
                    message: "Id informado não é um número inteiro."
                }).positive({
                    message: "Id informado não é positivo."
                }))
            });
            const parsedIdSchema = idSchema.parse(mod_id);
            const response = await moduloRepository.findById(parsedIdSchema.mod_id);
            if (!response) {
                throw {
                    error: true,
                    code: 400,
                    message: "modulo não encontrado.",
                };
            };
            return response;
        } catch (error) {
            if (error instanceof z.ZodError) {
                const errorMessages = error.issues.map((issue) => {
                    return {
                        path: issue.path[0],
                        message: issue.message
                    };
                });
                throw {
                    error: true,
                    code: 400,
                    message: errorMessages,
                };
            } else {
                throw error;
            };
        };
      };


  

      static async inserir(data) {
        return await moduloRepository.create(data);
    }

    static async atualizar(id, data) {
        return await moduloRepository.update(id, data);
    }

    static async excluir() {
        const modulo = await moduloRepository.findById(id);
        if (!modulo) {
            throw new Error('Modulo not found')
        }

        return await moduloRepository.delete(id);
    }

}

export default new ModuloService();