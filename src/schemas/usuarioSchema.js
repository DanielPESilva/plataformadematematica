import { z } from "zod";

class UsuarioSchema {
    static listarUsuarios = z.object({
        nome: z.string().optional(),
        matricula: z.string().optional(),
        active: z.boolean().optional(),
    });

    static buscarUsuarioPorId = z.object({
        id: z.number().int().positive("ID deve ser um número positivo."),
        id: z.preprocess((val)=>{
            if(parseInt(val)){
                return parseInt(val)
            }
            return null
        }, z.number().positive())
    });
// Ajuste o schema se necessário
static deletarUsuario = z.object({
    id: z.preprocess((val) => {
      if (parseInt(val)) {
        return parseInt(val);
      }
      return null;
    }, z.number().positive()),
    active: z.boolean(), // Certifique-se de que o active é aceito como booleano
  });
  
  


    static criarUsuario = z.object({
        nome: z.string().min(1),
        matricula: z.string().min(13),
        active: z.boolean(),
        senha: z.string().min(6),
        grupo_id: z.number().int().positive("ID deve ser um numero positivo")
    });

    static atualizarUsuario = z.object({
        id: z.number().int().positive(),
        nome: z.string().trim().min(1).max(80).optional(),
        matricula: z.string().trim().min(13).optional(),
        active: z.boolean().optional(),
        senha: z.string().trim().min(6).optional(),
        grupo_id: z.number().int().positive("ID deve ser um número positivo").optional(),
    });



}

export default UsuarioSchema;
