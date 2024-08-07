import { prisma } from "../configs/prismaClient.js"

class questaoRepository {
    static async findMany(filtros) {
        return await prisma.questao.findMany(filtros);
    }
}
export default questaoRepository;