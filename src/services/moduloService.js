import moduloRepository from "../repositories/moduloRepository.js";
import { z } from "zod";
import 'dotenv/config';
import moduloSchema from "../schemas/moduloSchema.js";

class ModuloService {
    static async listar(filtro) { 

        const filtroValidated = moduloSchema.listarSchema.parse(filtro);
        const consulta = moduloRepository.constructFilters(filtroValidated)
        const busca = moduloRepository.listar(consulta)
        return busca

        };

        static  async listarPorId(id) {
    
            const parsedIdSchema = moduloSchema.listarPoIdSchema.parse({id:id});
            const consulta = moduloRepository.constructFilters(parsedIdSchema)
            const response = await moduloRepository.listarPorId(consulta);
          return response
      };

      static async inserir(data) {

        const filtroValidated = moduloSchema.inserirSchema.parse(data);
        const moduloResponse={         
            turma_id: filtroValidated.turma_id,   
            titulo: filtroValidated.titulo,      
            descricao: filtroValidated.descricao,   
            image: filtroValidated.image
        
        }
        const response = moduloRepository.inserir(moduloResponse)

        return response
    }

    static async atualizar(id, data) {
        const parametro = moduloSchema.atualizarSchema.parse(data);
    
        const {turma_id, titulo, descricao, image } = parametro;
    
        const parsedIdSchema = moduloSchema.listarPoIdSchema.parse({id:id});
        const consulta = moduloRepository.constructFilters(parsedIdSchema)
        const moduloExist = await moduloRepository.listarPorId(consulta);
    
        if (moduloExist== null) {
            throw new Error("O recurso solicitado não foi encontrado no servidor.");
        }
    
        let atualizacao = {
            where: { id: id },
            data: {
                turma_id: turma_id,    
                titulo: titulo,      
                descricao: descricao ,   
                image: image
            },
            select: {
            id: true,          
            turma_id: true,    
            titulo: true,      
            descricao: true,   
            image: true
            }
        };

        return await moduloRepository.atualizar(atualizacao);
    }

    static async excluir() {
        const modulo = await moduloRepository.findById(id);
        if (!modulo) {
            throw new Error('Modulo not found')
        }

        return await moduloRepository.delete(id);
    }

}

export default ModuloService;