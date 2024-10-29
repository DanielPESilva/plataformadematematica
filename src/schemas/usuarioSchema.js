import { z } from "zod";

class UsuarioSchema {
    static listarUsuarios = z.object({
        nome: z.string().optional(),
        matricula: z.number().optional(),
        ativo: z.boolean().optional(),
    });

    static buscarUsuarioPorId = z.object({
        id: z.number().int().positive("ID deve ser um número positivo."),
    });
}

export default UsuarioSchema;
