import { prisma } from "../configs/prismaClient.js";

class turmaRepository {
  constructFilters(titulo) {
    let filtros = {
      select: {
        id: true,
        titulo: true,
        usuario_has_turma: {
          select: {
            usuario: {
              select: {
                nome: true,
              },
            },
          },
        },
      },
    };

    if (titulo) filtros.where.titulo = { contains: titulo };

    return filtros;
  }

  async findAll(filtros) {

    const [turmas] = await Promise.all([
      prisma.turma.findMany({
        ...filtros
      }),
      prisma.turma.count({ where: filtros.where }),
    ]);

    return {turmas};
  }

  async findById(id) {
    const filtros = this.constructFilters();
    const turmas = await prisma.turma.findFirst({
      where: { id:id },
      select: filtros.select,
    });
    console.log("3 -(service) Verifica se o titulo está no repository: "+ JSON.stringify(id))
    return turmas;
  }

  async create(data) {
    return await prisma.turma.create({data});
  }

  async turmaMatricular(data) {
    return await prisma.usuario_has_turma.create({data});
  }

   async atualizar(id, data){
    return await prisma.turma.update({ where: { id }, data});
  }

  async findByTituloExceptId(titulo, id) {
    return await prisma.turma.findFirst({
      where: {
        titulo:titulo,
        id: {
          not: id, 
        },
      },
    });
  }
  async turmaExist(titulo) {
    return await prisma.turma.findFirst({
      where: {
        titulo: titulo,
      },
      select: {
        titulo: true,
      },
    });
  }

  async userExist(data) {
    return await prisma.usuario_has_turma.findFirst({
      where: {
        usuario_id: data.usuario_id,
        turma_id: data.turma_id
      },
      select: {
        usuario_id: true, 
      },
    });
  }
  
}
export default new turmaRepository();
