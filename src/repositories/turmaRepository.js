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
    if (usuario_id) filtros.where.usuario_has_turma = { some: { usuario_id: { usuario_id: usuario_id } } };    

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

    async create(data) {
        // validaria constraints - regras de integridade
        
        return await prisma.turma.create(data);
      }
    
      async findByTitulo(titulo) {
        return await prisma.turma.findFirst({ where: { titulo } });
      }
    

}
export default new turmaRepository();