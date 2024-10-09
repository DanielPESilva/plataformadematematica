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
}

export default  AulaSchema