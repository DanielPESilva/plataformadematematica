import { z } from 'zod'

class AulaSchema{
    static createQestaoSchema =
    z.object({
        id: z.number().min(1, 'Obrigatorio').positive(),
        posicao: z.string().min(1, 'Posição é obrigatorio'),
        titulo: z.string().min(1, 'Titulo é Obrigatorio'),
        pdf: z.string(),
        link_video: z.string()
    })

    static schemaInsert = z.object({
        modulo_id: z.coerce.number().int(),
        titulo: z.string().max(100).nullish(),
        video: z.string().url().max(240),
        pdf_questoes: z.string().max(200).optional(),
        pdf_resolucao: z.string().max(200).optional(),
        descricao: z.string()
      });
}

export default  AulaSchema