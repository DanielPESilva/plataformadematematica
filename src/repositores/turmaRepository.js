import { prisma } from "../configs/prismaClient.js";

class turmaRepository {
     async findAll(filtros) {
      
        return await prisma.turma.findMany(filtros);
    }

    async findById(id) {
        const filtros = this.constructFilters();
        const Turma = await prisma.turma.findUnique({
          where: { id },
          select: filtros.select,
        });
        return Turma;
      }

      constructFilters(nome, email, grupo) {
        let filtros = {
          select: {
            id: true,
            titulo: true
          }
        };


        return filtros
    }    
    

}
export default new turmaRepository();