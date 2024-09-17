import prisma from "../configs/prismaClient.js";

class moduloRepository {
  async create(data) {
    return await prisma.modulo.create({ data });
  }

  async findById(id) {
    const filtros = this.constructFilters();
    const modulo = await prisma.modulo.findUnique({
      where: { id },
      select: filtros.select,
    });
    return modulo;
  }

  async findAll(filtros) {
    return await prisma.modulo.findMany(filtros);
  }

  async update(id, data) {
    return await prisma.modulo.update({ where: { id }, data });
  }

  async delete(id) {
    return await prisma.modulo.delete({ where: { id } });
  }

  constructFilters(tema) {
    let filtros = {
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

    if (tema) filtros.where.mod_tema = { contains: tema };

    return filtros;

  }
}

export default new moduloRepository();
