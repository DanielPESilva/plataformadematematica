import { prisma } from "../configs/prismaClient.js";

class AulaRepository {
  async findAllFeitos(parametros) {
    return await prisma.feito.findMany(parametros);
  }
  async findAllAulas(parametros) {
    return await prisma.aula.findMany(parametros);
  }

  async findById(parametro){
    return await prisma.aula.findUnique(parametro);
}
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

 createFilterFeito(parametros) {
    let filtro = {
        where: {
          // ...(parametros.modulo_id != undefined && { modulo_id: parametros.modulo_id }), // Inclui filtro para modulo_id
          // // ...(parametros.titulo && { titulo: { contains: parametros.titulo } }),         
          ...(parametros.aluno_id != NaN && {aluno_id: parametros.aluno_id})
        },
        select: {
          aluno_id:true,
          feito:true,
          revisar:true,
          aula_id:true,
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

    return filtro;
}

}
  

export default new AulaRepository();
