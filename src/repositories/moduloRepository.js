import prisma from "../configs/prismaClient.js";

class ModuloRepository {
  async findAll(filtros = {}) {
    return await prisma.modulo.findMany({
      where: filtros,
      include: { turma: true, aula: true },
    });
  }

  async findById(id) {
    return await prisma.modulo.findUnique({
      where: { id },
      include: { turma: true, aula: true },
    });
  }

  async create(data) {
    return await prisma.modulo.create({ data });
  }

  async update(id, data) {
    return await prisma.modulo.update({ where: { id }, data });
  }

  async delete(id) {
    return await prisma.modulo.delete({ where: { id } });
  }

  constructFilters(tema) {
    let filtro = {
      where: {
        active: "Y",
      },
      select: {
        mod_id: true,
        mod_tema: true,
        mod_descricao: true,
        mod_pdf: true,
        mod_linkVideo: true
      }, 
    };

    if (tema) filtro.where.mod_tema = { contains: tema };

    return filtro;

  }
}

export default new ModuloRepository();
