import { z } from "zod";
import questaoRepository from "../repository/QuestaoRepository.js";

class questaoService {
    static async listar(filtro) {
        // Regra de negócio e validações
        return await questaoRepositoryRepository.findAll(filtro);
    }
}

export default questaoService;
