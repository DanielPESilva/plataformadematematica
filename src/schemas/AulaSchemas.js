import { z } from 'zod'

class AulaSchema{
    listarSchema(){
        return z.object({
        titulo: z.string("Precisa ser uma String").optional(),
        aluno_id:z.number().positive().optional().nullable(),
        modulo_id:z.number().positive().optional().nullable(),
    })}
}

export default  AulaSchema;