import { prisma } from "../configs/prismaClient.js";

class turmaRepository {

  async findAll(filtros) {

    const [turmas] = await Promise.all([
      prisma.turma.findMany({
        ...filtros
      }),
      prisma.turma.count({ where: filtros.where }),
    ]);

    return {turmas};
  }

  async findById(id) {
    const filtros = this.constructFilters();
    const turmas = await prisma.turma.findFirst({
      where: { id:id },
      select: filtros.select,
    });
    console.log("3 -(service) Verifica se o titulo está no repository: "+ JSON.stringify(id))
    return turmas;
  }

   async atualizar(id, data){
    return await prisma.turma.update({ where: { id }, data});
  }

static constructFilters(parametros) {
  let filtro = {
      where: {
          ...(parametros.nome && { nome: { contains: parametros.nome } }), // Filtro para o nome da turma
          ...(parametros.aluno_id != undefined && { aluno: { some: { id: parametros.aluno_id } } }), // Filtro para aluno relacionado
          ...(parametros.professor_id != undefined && { professor: { some: { id: parametros.professor_id } } }) // Filtro para professor relacionado
      },
      select: {
          id: true,          // Incluir o ID da turma na consulta
          nome: true,        // Incluir o nome da turma na consulta
          modulo: {
              select: {
                  id: true,    // Incluir o ID do módulo na consulta
                  nome: true   // Incluir o nome do módulo na consulta
              }
          }
      }
  };
  return filtro;
}

}
export default new turmaRepository();
