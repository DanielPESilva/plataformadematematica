import moduloRepository from "../repositories/moduloRepository.js";
import { z } from "zod";
import 'dotenv/config';

class ModuloService {
    static async listar(filtro) { // Adicionei o parâmetro filtro
        return await moduloRepository.findAll(filtro)
    }

    static async listarPorID(id) {
        return await moduloRepository.findById(filtro)
    }

    static async inserir(data) {
        return await moduloRepository.create(data);
    }

    static async atualizar(id, data) {
        return await moduloRepository.update(id, data);
    }

    static async excluir(id) {
        return await moduloRepository.delete(id);
    }

}

export default ModuloService;