import { z } from 'zod';

export const turmaSchema = z.object({
  id: z.number().int().optional(), // Campo auto-incremento, será opcional ao criar um novo usuário
  titulo: z.string().min(1, 'Titulo é obrigatório'), // Campo obrigatório, não permite valor vazior nulo
});

// Esquema para atualizações, permitindo campos parciais
export const updateTurmaSchema = turmaSchema.partial();
