import { z } from 'zod';

export const usuarioSchema = z.object({
    id: z.number().int().optional(), // Campo auto-incremento, será opcional ao criar um novo usuário
    name: z.string().min(1, 'Nome é obrigatório'), // Campo obrigatório, não permite valor vazio
    tel: z.string().max(256, 'Telefone muito longo').optional().nullable(), // Campo opcional e pode ser nulo
    email: z.string().email('Email inválido').optional().nullable(), // Campo único, opcional e pode ser nulo
    matricula: z.string().max(100, 'Login muito longo').optional().nullable(), // Campo único, opcional e pode ser nulo
    senha: z.string().max(100, 'Senha muito longa').optional().nullable(), // Campo opcional e pode ser nulo
    cpf: z.string().max(11, 'CPF invalido').optional().nullable(), // Campo opcional e pode ser nulo
  });
  
  // Esquema para atualizações, permitindo campos parciais
  export const updateUserSchema = userSchema.partial();
  