import { prisma } from "../configs/prismaClient.js";

class AulaRepository {
  async findAll(filtros) {
    return await prisma.aula.findMany(filtros);
  }
  // async findById(id) {
  //   const filtros = this.constructFilters();
  //   const aula = await prisma.aula.findUnique({
  //     where: { id },
  //     select: filtros.select,
  //   });
  //   return aula;
  // }

  // async update(id, posicao, titulo, pdf, link_video) {
  //   return await prisma.questao.update({
  //     where: { id },
  //     data: { posicao, titulo, pdf, link_video }
  //   });
  // }
  // async create(data) {
  //   return await prisma.questao.create({data})
  // }
  // async deletar(dados) {
  //   //repository de deletar aula
  // } 

 createFilterAula(parametros) {
    let filtro = {
        where: {
          ...(parametros.modulo_id != undefined && { modulo_id: parametros.modulo_id }), // Inclui filtro para modulo_id
          ...(parametros.titulo && { titulo: { contains: parametros.titulo } }),         // Filtro para título
          ...(parametros.video && { video: { contains: parametros.video } }),             // Filtro para vídeo
          ...(parametros.pdf_questoes && { pdf_questoes: { contains: parametros.pdf_questoes } }), // Filtro para PDF de questões
          ...(parametros.pdf_resolucao && { pdf_resolucao: { contains: parametros.pdf_resolucao } }), // Filtro para PDF de resolução
          ...(parametros.descricao && { descricao: { contains: parametros.descricao } }),  // Filtro para descrição
          ...(parametros.aluno_id != NaN && {aluno_id: parametros.aluno_id})
        },
        select: {
          aluno_id:true,
          feito:true,
          revisar:true,
            aula:{
              select:{
                id: true,                // Incluir o ID na consulta
                modulo_id: true,         // Incluir o modulo_id na consulta
                titulo: true,            // Incluir o título na consulta
                video: true,             // Incluir o vídeo na consulta
                pdf_questoes: true,      // Incluir o PDF de questões na consulta
                pdf_resolucao: true,     // Incluir o PDF de resolução na consulta
                descricao: true,
              }
            }
        }
    }
    if (parametros.titulo) filtro.where.titulo = { contains: parametros.titulo };
    if (parametros.aluno_id) filtro.where.aluno_id = { contains: parametros.aluno_id };

    return filtro;
}

}
  

export default new AulaRepository();
