import { prisma } from "../configs/prismaClient.js";

class AulaRepository {
  static async findAll(filtros) {
    return await prisma.questao.findMany(filtros);
  }
  static async findById(id) {
    const filtros = this.constructFilters();
    const questao = await prisma.questao.findUnique({
      where: { id },
      select: filtros.select,
    });
    return questao;
  }

  static async update(id, posicao, titulo, pdf, link_video) {
    return await prisma.questao.update({
      where: { id },
      data: { posicao, titulo, pdf, link_video }
    });
  }
  static async create(data_insert) {
    return await prisma.aula.create({
      data :data_insert,
      select: {
        id: true,                
        modulo_id: true,         
        titulo: true,            
        video: true,             
        pdf_questoes: true,       
        pdf_resolucao: true,      
        descricao: true           
      }
    })
  }
  static async deletar(dados) {
    //repository de deletar aula
  } 

  static createFilterAula(parametros) {
    let filtro = {
        where: {
            ...(parametros.modulo_id != undefined && { modulo_id: parametros.modulo_id }), // Inclui filtro para modulo_id
            ...(parametros.titulo && { titulo: { contains: parametros.titulo } }),         // Filtro para título
            ...(parametros.video && { video: { contains: parametros.video } }),             // Filtro para vídeo
            ...(parametros.pdf_questoes && { pdf_questoes: { contains: parametros.pdf_questoes } }), // Filtro para PDF de questões
            ...(parametros.pdf_resolucao && { pdf_resolucao: { contains: parametros.pdf_resolucao } }), // Filtro para PDF de resolução
            ...(parametros.descricao && { descricao: { contains: parametros.descricao } })  // Filtro para descrição
        },
        select: {
            id: true,                // Incluir o ID na consulta
            modulo_id: true,         // Incluir o modulo_id na consulta
            titulo: true,            // Incluir o título na consulta
            video: true,             // Incluir o vídeo na consulta
            pdf_questoes: true,      // Incluir o PDF de questões na consulta
            pdf_resolucao: true,     // Incluir o PDF de resolução na consulta
            descricao: true           // Incluir a descrição na consulta
        }
    }
    return filtro;
  }

  static async modulo_exist(id_modulo){
    return await prisma.modulo.findFirst({
      where:{
        id: id_modulo
      },
      select:{
        id:true
      }
    })
  }

}
  

export default AulaRepository;
