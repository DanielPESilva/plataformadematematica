import { z } from 'zod'

class AulaSchema{
    /**
     * enum é um método que compara dois valoresm, normalmente utilizado para booleanos.
     */
    listarSchema(){
        return z.object({
        id: z.number().min(1, 'Obrigatorio').positive(),
        titulo: z.string().min(1, 'Titulo é Obrigatorio'),
        video: z.string().min(1, 'Posição é obrigatorio'),
        image:z.string(),
        pdf_questoes: z.string(),
        pdf_resolucao: z.string(),
        descricao:z.string(),
        feito: z.enum(['true', 'false']).optional(),                    
        revisar: z.enum(['true', 'false']).optional(),
    })}
}

export default  AulaSchema;