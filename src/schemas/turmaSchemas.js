import { z } from 'zod';

export const TurmaSchema = z.object({
  id: z.number().int().optional(), // Campo auto-incremento, será opcional ao criar uma nova turma
  titulo: z.string().min(1, 'Título é obrigatório'), // Campo obrigatório, não permite valor vazio
  usuario_has_turma:z.number().int().optional()
});

// Esquema para atualizações, permitindo campos parciais
export const updateTurmaSchema = TurmaSchema.partial();
