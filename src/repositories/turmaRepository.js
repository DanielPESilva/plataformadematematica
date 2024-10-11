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

  static async findAll(filtros) {

    const [turmas] = await Promise.all([
      prisma.turma.findMany({
        ...filtros
      }),
      prisma.turma.count({ where: filtros.where }),
    ]);

    return {turmas};
  }

  static async findById(id) {
    const filtros = this.constructFilters();
    const turmas = await prisma.turma.findFirst({
      where: { id:id },
      select: filtros.select,
    });
    console.log("3 -(service) Verifica se o titulo está no repository: "+ JSON.stringify(id))
    return turmas;
  }

  static async create(data) {
    return await prisma.turma.create({data});
  }

  static async turmaMatricular(data) {
    return await prisma.usuario_has_turma.create({data});
  }

   static async atualizar(id, data){
    return await prisma.turma.update({ where: { id }, data});
  }

  static async findByTitulo(titulo) {
    return await prisma.turma.findFirst({ where: { titulo } });
  }

  static async turmaExist(titulo) {
    return await prisma.turma.findFirst({
      where: {
        titulo: titulo,
      },
      select: {
        titulo: true,
      },
    });
  }
  
  static async findByTituloExceptId(titulo, id) {
    return await prisma.turma.findFirst({
      where: {
        titulo:titulo,
        id: {
          not: id,
        },
      },
    });
  }
  static async userExist(data) {
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

  static async removerUsuarioDaTurma(data) {
  const usuarioRemovido = await prisma.usuario_has_turma.deleteMany({
    where: {
      usuario_id: data.usuario_id,
      turma_id: data.turma_id
    }
  });
  return usuarioRemovido;
  }
  
  static async delete(id) {
  return await prisma.turma.delete({ where: { id } });
}

}
export default turmaRepository;
