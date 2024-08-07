import { prisma } from "../configs/prismaClient.js";

class turmaRepository {
    static async findMany(filtros) {
        return await prisma.turma.findMany(filtros);
    }
}

export default turmaRepository;