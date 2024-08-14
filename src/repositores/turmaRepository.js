import { prisma } from "../configs/prismaClient.js";

class turmaRepository {
     async findAll(filtros, page, perPage){
       const skip = (page - 1) * perPage;
       const take = perPage;

       const [turmas, total] = await Promise.all([
        prisma.turma.findMany({
          ...filtros,
          skip,
          take,
        }),
        prisma.turma.count({ where: filtros.where })
      ]);
        return { turmas, total, page, perPage };
    }


    async findById(id) {
        const filtros = this.constructFilters();
        const Turma = await prisma.turma.findUnique({
          where: { id },
          select: filtros.select,
        });
        return Turma;
      }

      constructFilters(usuario_id, titulo) {
        let filtros = {
          select: {
            id: true,
            titulo: true,
            usuario_has_turma: {
              select: {
                usuario: {
                  select: {
                    nome: true,
                  }
                }
              }
            },
          }
        };

        return filtros
    }    
    

}
export default new turmaRepository();