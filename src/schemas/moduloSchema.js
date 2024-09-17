import { z } from 'zod';

export const moduloSchema = z.object({
  id: z.number().int().optional(), // Campo auto-incremento, será opcional ao criar um novo usuário
  tema: z.string().min(1, 'Tema é obrigatório'), // Campo obrigatório, não permite valor vazio
  descricao: z.string().min(1, 'Descricao é obrigatório'), // Campo obrigatório, não permite valor vazio
  pdf: z.string().optional().nullable(), // Campo opcional e pode ser nulo
  link_video: z.string().optional().nullable(), // Campo opcional e pode ser nulo
});

// Esquema para atualizações, permitindo campos parciais
export const updateModuloSchema = moduloSchema.partial();
