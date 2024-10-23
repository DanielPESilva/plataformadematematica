import moduloRepository from "../repositories/moduloRepository.js";
import { z } from "zod";
import 'dotenv/config';

class ModuloService {
    static async listar(filtro) { 

        const filtroSchema = z.object({
            turma_id: z.preprocess((val) => Number(val), z.number({
                invalid_type_error: "Id informado não é do tipo number.",
            }).int({
                message: "Id informado não é um número inteiro."
            }).positive({
                message: "Id informado não é positivo."
            })).optional(),
            titulo: z.string({
                invalid_type_error:'O titulo informado não é do tipo string.'
            }).optional(),
            descricao: z.string({
                invalid_type_error: "A descrição informada deve ser do tipo string."
            }).optional(),
            image: z.string({
                invalid_type_error: "A imagem informada deve ser do tipo string."
            }).optional()
            });

        const filtroValidated = filtroSchema.parse(filtro);
        const consulta = moduloRepository.constructFilters(filtroValidated)
        const busca = moduloRepository.listar(consulta)
        return busca

        };

        static  async listarPorId(id) {
            const idSchema = z.object({
                id: z.preprocess((val) => Number(val), z.number({
                    invalid_type_error: "Id informado não é do tipo number.",
                }).int({
                    message: "Id informado não é um número inteiro."
                }).positive({
                    message: "Id informado não é positivo."
                }))
            });
            const parsedIdSchema = idSchema.parse({id:id});
            const consulta = moduloRepository.constructFilters(parsedIdSchema)
            const response = await moduloRepository.listarPorId(consulta);
          return response
      };


  

      static async inserir(data) {
        const filtroSchema = z.object({
            turma_id: z.preprocess((val) => Number(val), z.number({
                invalid_type_error: "Id informado não é do tipo number.",
            }).int({
                message: "Id informado não é um número inteiro."
            }).positive({
                message: "Id informado não é positivo."
            })),
            titulo: z.string({
                invalid_type_error:'O titulo informado não é do tipo string.'
            }),
            descricao: z.string({
                invalid_type_error: "A descrição informada deve ser do tipo string."
            }),
            image: z.string({
                invalid_type_error: "A imagem informada deve ser do tipo string."
            })
            });

        const filtroValidated = filtroSchema.parse(data);
        const moduloResponse={         
            turma_id: filtroValidated.turma_id,   
            titulo: filtroValidated.titulo,      
            descricao: filtroValidated.descricao,   
            image: filtroValidated.image
        
        }
        const response = moduloRepository.inserir(moduloResponse)

        return response
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

export default ModuloService;