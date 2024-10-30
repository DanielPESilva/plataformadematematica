import {prisma} from "../configs/prismaClient.js";
import bcrypt from 'bcrypt';

class usuarioRepository {
  
  static async listarUsuarios(filtros) {
    return await prisma.usuario.findMany({
        where: filtros,
        select: {
            id: true,
            nome: true,
            matricula: true,
            active: true,
        },
    });
}

static async buscarUsuarioPorId(id) {
    return await prisma.usuario.findUnique({
        where: { id },
        select: {
            id: true,
            nome: true,
            matricula: true,
            active: true,
        },
    });
};

static async buscarGrupoPorId(id) {
  return await prisma.grupo.findUnique({
      where: { id },
      select: {
          id: true,
      },
  });
};


  static async criarUsuario(data) {
    data.senha = await bcrypt.hash(data.senha, parseInt(process.env.SALT, 10));

return await prisma.usuario.create({data});

}

  static async listar_csv() {
    return await prisma.usuario.findMany({
      select: {
        nome: true,
        matricula: true,
      },
    });
  }

  static async buscar_turmas() {
    return await prisma.grupo.findMany();
  }

  static async inserir_alunos(insert) {
    return await prisma.aluno.createMany({
      data: insert,
    });
  }

  static async grupo_alunos() {
    return await prisma.grupo.findFirst({
      where: {
        nome: { contains: "alunos" },
      },
    });
  }

  static async inserir_usuarios(insert) {
    return await prisma.usuario.create({
      data: {
        ...insert,
      },
      select: {
        id: true,
        nome: true,
        matricula: true,
        grupo_id: true,
        active: true,
      },
    });
  }

  async findByMatricula(matricula) {
    const filtros = this.constructFilters();
    const user = await prisma.usuario.findUnique({
      where: { matricula },
      select: filtros.select,
    });
    return user;
  }

  async findByEmail(email) {
    const filtros = this.constructFilters();
    const user = await prisma.usuario.findUnique({
      where: { email },
      select: filtros.select,
    });
    return user;
  }

  async findById(id) {
    const filtros = this.constructFilters();
    const user = await prisma.usuario.findUnique({
      where: { id },
      select: filtros.select,
    });
    return user;
  }

  async findAll(filtros, page, perPage) {
    const skip = (page - 1) * perPage;
    const take = perPage;

    const [users, total] = await Promise.all([
      prisma.usuario.findMany({
        ...filtros,
        skip,
        take,
      }),
      prisma.usuario.count({ where: filtros.where }),
    ]);
    return { users, total, page, perPage };
  }
  static createFilterUsuario(parametros) {
    let filtro = {
      where: {
        ...(parametros.nome && { nome: { contains: parametros.nome } }),
        ...(parametros.senha && { senha: { contains: parametros.senha } }),
        ...(parametros.matricula != undefined && {
          matricula: parametros.matricula,
        }),
        ...(parametros.active != undefined && { active: parametros.active }),
      },
      select: {
        id: true,
        nome: true,
        senha: true,
        matricula: true,
        active: true,
      },
    };
    return filtro;
  }
}

export default usuarioRepository;
