import { z } from "zod";

class UsuarioSchema {
    static listarUsuarios = z.object({
        nome: z.string().optional(),
        matricula: z.number().optional(),
        active: z.boolean().optional(),
    });

    static buscarUsuarioPorId = z.object({
        id: z.number().int().positive("ID deve ser um número positivo."),
    });



    static criarUsuario = z.object({
        nome: z.string().min(1, "O nome é obrigatório"),
        matricula: z.number().min(9, "A matrícula deve ter pelo menos 9 dígitos"),
        active: z.boolean(),
        senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
        grupo_id: z.number().int().positive("ID deve ser um numero positivo")
    });

}

export default UsuarioSchema;
