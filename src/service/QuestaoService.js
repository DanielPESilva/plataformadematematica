import questaoRepository from "../repositories/Repository.js";
import { z } from "zod";

class questaoService {
    static async listar(filtro) {
        // Regra de negócio e validações
        return await questaoRepository.findAll(filtro);
    }
}

export default questaoService
