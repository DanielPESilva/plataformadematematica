import { z } from 'zod'

class AulaSchema{
    listarSchema(){
        return z.object({
        titulo: z.string("Precisa ser uma String").optional(),
        aluno_id:z.number().int().positive().optional(),
    })}
}

export default  AulaSchema;