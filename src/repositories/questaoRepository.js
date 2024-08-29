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

  constructFilters(posicao, titulo,pdf,link_video) {
    let filtros = { 
      select: {
        id: true,
        posicao: true,
        titulo: true,
        pdf: true,
        link_video:true,
      },
    };
    if (titulo) filtros.where.titulo = { contains: titulo };
    if (pdf) filtros.where.pdf = { contains: pdf };
    if (link_video) filtros.where.link_video = { contains:link_video };
    if (posicao) filtros.where.posicao = {contains:posicao}
   
   return filtros;
  }

    async update(id, posicao, titulo, pdf, link_video) {
      return await prisma.questao.update({
        where: { id },
        data: { posicao, titulo, pdf, link_video }
      });
    }
    async create(data) {
      // Validações adicionais
      if (!data.titulo || !data.pdf || !data.link_video) {
        throw new Error('Título, PDF e link de vídeo são obrigatórios.');
      }
    
      // Verificar se o título ou a posição já existem
      const tituloExists = await this.findByTitulo(data.titulo);
      if (tituloExists) {
        throw new Error('Já existe uma questão com este título.');
      }
    
      const posicaoExists = await this.findByPosicao(data.posicao);
      if (posicaoExists) {
        throw new Error('Já existe uma questão com esta posição.');
      }
    
      // Criar o registro no banco de dados
      return await prisma.questao.create({
        data: {
          posicao: data.posicao,
          titulo: data.titulo,
          pdf: data.pdf,
          link_video: data.link_video
        }
      });  
  }
}
  

export default new questaoRepository();
