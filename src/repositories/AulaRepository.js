import { prisma } from "../configs/prismaClient.js";

class AulaRepository {
  async findAllFeitos(filtros) {
    return await prisma.feito.findMany(filtros);
  }
  async findAllAulas(filtros) {
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
  
  createFilterAula(parametros) {
    let filtro = {
        where: {
          ...(parametros.modulo_id != undefined && { modulo_id: parametros.modulo_id }), // Inclui filtro para modulo_id
          ...(parametros.titulo && { titulo: { contains: parametros.titulo } }),         
          // ...(parametros.aluno_id != NaN && {aluno_id: parametros.aluno_id})
        },
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
