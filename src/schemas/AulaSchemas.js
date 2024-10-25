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
    listarPorIdSchema(){
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
}

export default  AulaSchema;