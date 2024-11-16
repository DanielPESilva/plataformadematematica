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
        matricula: z.string().trim().min(1).optional(),
        active: z.boolean().optional(),
        senha: z.string().trim().min(6).optional(),
        grupo_id: z.number().int().positive("ID deve ser um número positivo").optional(),
    });

    static atualizarSenha = z.object({
        id:z.preprocess((val) => Number(val), z.number({
            invalid_type_error: "Id do usuário informado não é do tipo number."
        }).int({
            message: "Id do usuário informado não é um número inteiro."
        }).positive({
            message: "Id do usuário informado não é um inteiro positivo."
        })).optional(),
        senhaAntiga: z.string().min(6, "Senha antiga deve ter no mínimo 6 caracteres."),
        senhaNova: z.string().min(6, "Senha nova deve ter no mínimo 6 caracteres.")
    });

}

export default UsuarioSchema;
