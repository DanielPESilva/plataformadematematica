import moduloRepository from "../repositories/moduloRepository.js";
import prisma from '../prismaClient';

class ModuloService {
    async listar() {
        const filtros = moduloRepository.constructFilters(tema);
        return await moduloRepository.findAll(filtros);
    }

    async listarPorID(id) {
        return moduloRepository.findById(id);  
    }

    async inserir(data) {
        const inserir = async (req, res) => {
            try {
              const parsedData = moduloSchema.parse(req.body);
        
              const moduloCreated = await prisma.modulos.create({
                data: {
                  mod_id: parsedData.mod_id,
                  mod_tema: parsedData.mod_tema,
                  mod_descricao: parsedData.mod_descricao,
                  mod_pdf: parsedData.mod_pdf,
                  mod_linkVideo: parsedData.mod_linkVideo,
                },
              });
        
              return res.status(201).json({
                error: false,
                code: 201,
                message: 'Módulo criado.',
                data: moduloCreated,
              });
            } catch (error) {
              if (error instanceof z.ZodError) {
                return res.status(400).json({
                  error: true,
                  code: 400,
                  message: 'Erro de validação.',
                  details: error.errors,
                });
              }
              console.error(error);
              return res.status(500).json({
                error: true,
                code: 500,
                message: 'Erro interno.',
              });
            }
          };
                return await moduloRepository.create(data);
            }

    async atualizar(id, data) {
        return await moduloRepository.update(id, data);
    }

    async excluir() {
        const modulo = await moduloRepository.findById(id);
        if (!modulo) {
            throw new Error('Modulo not found')
        }

        return await moduloRepository.delete(id);
    }

}

export default new ModuloService();