import { prisma } from "../configs/prismaClient.js";

class turmaRepository {

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

    if (titulo) filtros.where.titulo = { contains: titulo };
    if (usuario_id) filtros.where.usuario_has_turma = { some: { usuario_id: { name: usuario_id } } };    

    return filtros
}

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
      const turmas = await prisma.turma.findUnique({
        where: { id },
        select: filtros.select,
      });
      return turmas;
    }

    static async create(turma) {
      return await prisma.turma.create(turma);
    }
  

}
export default new turmaRepository();