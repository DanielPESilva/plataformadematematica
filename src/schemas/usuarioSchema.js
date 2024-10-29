import { z } from "zod";

class UsuarioSchema {
  static listarUsuarios = z.object({
    nome: z.string().trim().min(1).max(100).optional(),
    matricula: z.number().int().positive().optional(),
    active: z.coerce.boolean().optional(),
    grupo_id: z.string().optional(),
    page: z.number().int().min(1).default(1).optional(),
    perPage: z.number().int().min(1).default(10).optional(),
  });
}

export default UsuarioSchema;
