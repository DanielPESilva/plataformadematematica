import turmaRepository from "../repositores/turmaRepository.js";
import { z } from "zod";

class turmaService{
    static async listar(filtro){

        //Regras de negócios
        return await turmaRepository.findMany(filtro);
    }
}

export default turmaService;