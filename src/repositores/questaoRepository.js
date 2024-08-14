import { prisma } from "../configs/prismaClient.js";

class questaoRepository {
  async findAll(filtros) {
    return await prisma.questao.findMany(filtros);
  }
  async findById(id) {
    const filtros = this.constructFilters();
    const questao = await prisma.questao.findUnique({
      where: { id },
      select: filtros.select,
    });
    return questao;
  }

  constructFilters(titulo,pdf,link_video) {
    let filtros = { 
      select: {
        id: true,
        titulo: true,
        pdf: true,
        link_video:true,
      },
    };
    if (titulo) filtros.where.titulo = { contains: titulo };
    if (pdf) filtros.where.pdf = { contains: pdf };
    if (link_video) filtros.where.link_video = { contains:link_video };
   
   return filtros;
  }

  static async update(id, titulo, posicao) {
    return await prisma.questao.update({ where: { id }, titulo, posicao, link_video, pdf});
}

}
export default new questaoRepository();
