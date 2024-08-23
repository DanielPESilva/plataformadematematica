import { z } from 'zod';

export const turmaSchema = z.object({
  id: z.number().int().optional(), // Campo auto-incremento, será opcional ao criar um novo usuário
  titulo: z.string().min(1, 'Título é obrigatório'), // Campo obrigatório, não permite valor vazio
  usuario_id: z.number().int().optional().nullable().default(1), // Campo opcional com valor padrão 1
});

// Esquema para atualizações, permitindo campos parciais
export const updateTurmaSchema = turmaSchema.partial();
