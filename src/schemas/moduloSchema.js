import { z } from 'zod';

const moduloSchema = z.object({
  mod_id: z.preprocess((val) => Number(val), z.number({
      invalid_type_error: "Id informado não é do tipo number.",
  }).int({
      message: "Id informado não é um número inteiro."
  }).positive({
      message: "Id informado não é positivo."
  })).nonempty({
      invalid_type_error:'O ID do módulo é obrigatório.'
  }),mod_tema: z.string({
      invalid_type_error:'O Tema informado não é do tipo string.'
  }).nonempty({
      invalid_type_error:'O tema do módulo é obrigatório.'
  }),mod_descricao: z.string({
      invalid_type_error: "A descrição informada deve ser do tipo string."
  }).optional(),
     mod_pdf: z.object({
          nome: z.string({
          invalid_type_error:'O nome do pdf informado nao é do tipo string.'
      }).nonempty({
          message:'O nome do PDF é obrigatório.'
      }),size: z.number().max(5 * 1024 * 1024, 'O tamanho máximo do PDF é de 5MB.'),
  mimetype: z.string().regex(/application\/pdf/, 'O arquivo deve ser um PDF válido.')
}).optional(),
mod_linkVideo: z.string().url('O link do vídeo deve ser uma URL válida.').optional()
});

  // Campo auto-incremento, será opcional ao criar um novo usuário
  // Campo obrigatório, não permite valor vazio
   // Campo obrigatório, não permite valor vazio
  // Campo opcional e pode ser nulo
  // Campo opcional e pode ser nulo

// Esquema para atualizações, permitindo campos parciais
export const updateModuloSchema = moduloSchema.partial();

