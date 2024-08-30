import { z } from 'zod'

export const questaoSchema = z.object({
    posicao: z.string().optional(),
    titulo: z.string().min(1, 'Titulo é Obrigatorio'),
    pdf: z.string().optional(),
    link_video: z.string().max(256)
})