import { z } from 'zod';

export const user_turma_Schema = z.object({
    turma_id: z.number().int(), 
    usuario_id: z.number().int(),
});

// Esquema para atualizações, permitindo campos parciais
export const inserirTurmaSchema = user_turma_Schema.partial();