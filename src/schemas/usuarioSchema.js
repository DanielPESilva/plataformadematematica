import id from 'faker-br/lib/locales/id_ID';
import { z } from 'zod';

class UsuarioSchema{
  
  static listarUsuarios = z.object({
    nome: z.string().trim().min(1).max(100).optional(),
    senha:z.string().trim().min(6).max(240).optional(),
    matricula: z.number().int().min(1).positive().optional(),
    active: z.coerce.boolean().optional(),

  });

}
  
export default UsuarioSchema;