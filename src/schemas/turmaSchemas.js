import { z } from 'zod';

class TurmaSchema{
    
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

   static createTurmasSchema = 
   z.object({
    id: z.number().min(1, 'Obrigatório').positive(),
            titulo: z.string().min(1, 'Obrigatorio')
        })
    

}

// Esquema para atualizações, permitindo campos parciais
export default TurmaSchema;