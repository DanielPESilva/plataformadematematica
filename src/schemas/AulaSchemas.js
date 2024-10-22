import { z } from 'zod'

class AulaSchema{
    listarSchema(){
        return z.object({
        titulo: z.string("Precisa ser uma String").optional(),
        feito: z.boolean().optional(),                    
        revisar: z.boolean().optional(),
    })}
}

export default  AulaSchema;