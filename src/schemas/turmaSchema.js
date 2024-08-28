import {z} from 'zod'

class turmaSchema{

    listarSchema(){
        return z.object({
            id: z.preprocess((val) => Number(val), z.number({
                invalid_type_error: "Id informado não é do tipo number",
            }).int({
                message: "Id informado não é um número inteiro"
            }).positive({
                message: "Id informado não é positivo"
            })).nullable().optional(),
            
            titulo: z.string().min(5, 'Titulo é obrigatório'),
            nome: z.string({invalid_type_error: "Nome informado não é do tipo string"}).trim().optional(),
        })
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

    /**
     * 
     * 
     
    createBensSchema(){
        return z.object({
            id: z.preprocess((val) => Number(val), z.number({
                invalid_type_error: "id informado não é do tipo number",
            }).int({
                message: "id informado não é um número inteiro"
            }).positive({
                message: "id informado não é positivo"
            })),
            titulo: z.preprocess((val) => Number(val), z.number({
                invalid_type_error: "titulo informado não é do tipo number",
            }).int({
                message: "titulo informado não é um número inteiro"
            }).positive({
                message: "titulo informado não é positivo"
            })),
            nome: z.string({invalid_type_error: "nome informado não é do tipo string"}).trim(),
            tombo: z.string({invalid_type_error: "tombo informado não é do tipo string"}).trim().nullable(),
            descricao: z.string({invalid_type_error: "descricao informado não é do tipo string"}).trim(),
            responsavel: z.string({invalid_type_error: "responsavel informado não é do tipo string"}).trim().nullable(),
            valor: z.preprocess((val) => Number(val), z.number({
                invalid_type_error: "valor informado não é do tipo number",
            }).positive({
                message: "valor informado não é positivo"
            })).nullable().optional(),
            auditado: z.boolean().default(false),
        })
    }
        */

}

export default turmaSchema;
