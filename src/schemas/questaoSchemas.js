import { z } from 'zod'

class QuestaoSchema{
    static createQestaoSchema =
    z.object({
        id: z.number().min(1, 'Obrigatorio').positive(),
        posicao: z.string().min(1, 'Posição é obrigatorio'),
        titulo: z.string().min(1, 'Titulo é Obrigatorio'),
        pdf: z.string(),
        link_video: z.string()
    })
}

export default  QuestaoSchema