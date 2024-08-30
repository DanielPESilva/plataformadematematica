import { z } from 'zod';

class TurmaSchema{
/**
    listarSchema(){
        return z.object({
            id: z.preprocess((val) => Number(val), z.number({
                invalid_type_error: "ID informado não é do tipo number",
            }).int({
                message: "ID informado não é um número inteiro"
            }).positive({
                message: "ID informado não é positivo"
            })).nullable().optional(),

            usuario_id: z.preprocess((val) => Number(val), z.number({
                invalid_type_error: "usuario_id informado não é do tipo number",
            }).int({
                message: "usuario_id informado não é um número inteiro"
            }).positive({
                message: "usuario_id informado não é positivo"
            })),
            titulo: z.string({invalid_type_error: "nome informado não é do tipo string"}).trim().min(5),
        })
    }

    listarPorIdSchema(){
        return z.object({
            bem_id: z.preprocess((val) => Number(val), z.number({
                invalid_type_error: "ID informado não é do tipo number",
            }).int({
                message: "ID informado não é um número inteiro"
            }).positive({
                message: "ID informado não é positivo"
            }))
        })
    }
*/
   static createTurmasSchema = 
   z.object({
    id: z.number().min(1, 'Obrigatório').positive(),
            titulo: z.string().min(1, 'Obrigatorio')
        })
    

}

// Esquema para atualizações, permitindo campos parciais
export default TurmaSchema;