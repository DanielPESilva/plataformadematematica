import moduloRepository from "../repositories/moduloRepository.js";

class ModuloService {
    async listar() {
        const filtros = moduloRepository.constructFilters(tema);
        return await moduloRepository.findAll(filtros);
    }

    async listarPorID(id) {
        try {
            return moduloRepository.findById(id);  
        } catch (error) {
            throw new Error(error);   
        }
    }

    async inserir(data) {
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