import { prisma } from "../configs/prismaClient.js";

class ModuloRepository {
  static async findMany(filtros) {
    return await prisma.modulo.findMany({
        where: filtros,
        select: {
          mod_id: true,
          mod_tema: true,
          mod_descricao: true,
          mod_pdf:true,
          mod_linkVideo:true,
          turma: true,
          aula: true 
        }
    });
};


  async findById(mod_id) {
    return await prisma.modulo.findUnique({
      where: { mod_id:mod_id },
      select: {
        mod_id: true,
        mod_tema: true,
        mod_descricao: true,
        mod_pdf:true,
        mod_linkVideo:true,
        turma: true,
        aula: true 
      }
    });
  }

  static async create(data_criar) {
    return await prisma.modulo.create({ data: data_criar });
  }

  static async update(id_atualizar, data) {
    return await prisma.modulo.update({ where: { id: id_atualizar }, data });
  }

  static async delete(id_excluir) {
    return await prisma.modulo.delete({ where: { id: id_excluir } });
  }


  static constructFilters(parametros) {
    let filtro = {
        where: {
            ...(parametros.turma_id != undefined && { turma_id: parametros.turma_id }), // Filtro para turma_id
            ...(parametros.titulo && { titulo: { contains: parametros.titulo } }),     // Filtro para título do módulo
            ...(parametros.descricao && { descricao: { contains: parametros.descricao } }) // Filtro para descrição do módulo
        },
        select: {
            id: true,          // Incluir o ID do módulo na consulta
            turma_id: true,    // Incluir o ID da turma na consulta
            titulo: true,      // Incluir o título do módulo na consulta
            descricao: true,   // Incluir a descrição do módulo na consulta
        }
    };
    return filtro;
}

}

export default ModuloRepository;
