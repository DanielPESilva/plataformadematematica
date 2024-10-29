import { z } from 'zod'

class AulaSchema{
    listarSchema(){
        return z.object({
            titulo: z.string({
                message: "Precisa ser uma String"
            }).optional(),
            aluno_id: z.number({
                invalid_type_error: "ID do aluno deve ser um número",
            }).positive({
                message: "ID do aluno deve ser um número positivo"
            }).optional().nullable(),
            modulo_id: z.number({
                invalid_type_error: "ID do módulo deve ser um número",
            }).positive({
                message: "ID do módulo deve ser um número positivo"
            }).optional().nullable(),
        });
    }
    listarPorIdSchema() {
        return z.object({
            id: z.preprocess((val) => Number(val), z.number({
                invalid_type_error: "ID informado não é do tipo number",
            }).int({
                message: "ID informado não é um número inteiro"
            }).positive({
                message: "ID informado não é positivo"
            }))
        })
} 
    createQestaoSchema(){
    z.object({
        id: z.number().min(1, 'Obrigatorio').positive(),
        posicao: z.string().min(1, 'Posição é obrigatorio'),
        titulo: z.string().min(1, 'Titulo é Obrigatorio'),
        pdf: z.string(),
        link_video: z.string()
    })}

    schemaInsert(){ z.object({
        modulo_id: z.coerce.number().int(),
        titulo: z.string().max(100).nullish(),
        video: z.string().url().max(240),
        pdf_questoes: z.string().max(200).optional(),
        pdf_resolucao: z.string().max(200).optional(),
        descricao: z.string()
      })}

    UpdateSchema(){ z.object({
        id: z.number().int().positive(),
        modulo_id: z.coerce.number().int().min(1).optional(),
        titulo: z.string().max(100).nullish().min(1).max(100).optional(),
        video: z.string().url().max(240).optional(),
        pdf_questoes: z.string().max(200).optional(),
        pdf_resolucao: z.string().max(200).optional(),
        descricao: z.string().optional()
      })}
}

export default  AulaSchema;