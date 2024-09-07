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

    const [turmas, total] = await Promise.all([
      prisma.turma.findMany({
        ...filtros
      }),
      prisma.turma.count({ where: filtros.where }),
    ]);

    return {turmas, total};
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
    return await prisma.turma.create(data);
  }

  static async atualizar(updatedTurma){
    return await prisma.turma.update(updatedTurma);
  }



  async findByTitulo(titulo) {
    return await prisma.turma.findFirst({ where: { titulo } });
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

  async userExist(usuario_id) {
    return await prisma.usuario_has_turma.findFirst({
      where: {
        usuario_id: usuario_id,
      },
      select: {
        usuario_has_turma: {
          usuario_id: true,
        },
      },
    });
  }
}
export default new turmaRepository();
