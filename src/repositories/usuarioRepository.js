import {prisma} from "../configs/prismaClient.js";

class usuarioRepository {
  async create(data) {
    return await prisma.usuario.create({ data });
  }

  async update(id, data) {
    return await prisma.usuario.update({ where: { id }, data });
  }

  async delete(id) {
    return await prisma.usuario.delete({ where: { id } });
  }

  static async listar_csv() {
    return await prisma.usuario.findMany({
      select: {
        nome:true,
        matricula:true
      }
    });
  }

  static async buscar_turmas(){
    return await prisma.grupo.findMany()
  }

  static async inserir_alunos(insert){
    return await prisma.aluno.createMany({
      data: insert
    })
  }

  static async grupo_alunos(){
    return await prisma.grupo.findFirst({
      where:{
        nome: { contains: "alunos" }
      }
    })
  }

  static async inserir_usuarios(insert){
    return await prisma.usuario.create({
      data:{
        ...insert
      },
      select:{
        id:true,
        nome: true,
        matricula:true,
        grupo_id:true,
        active:true
      }
    })
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
    const skip = (page -1) * perPage;
    const take = perPage;

    const [users, total] = await Promise.all([
        prisma.usuario.findMany({
            ...filtros,
            skip,
            take,
        }),
        prisma.usuario.count({ where: filtros.where })
    ])
    return { users, total, page, perPage };
  }

  constructFilters(nome, matricula) {
    let filtros = {
      where: {
        active: "Y",
      },
      select: {
        usu_id: true,
        usu_nome: true,
        usu_tel: true,
        usu_email: true,
        usu_matricula: true,
        usu_cpf: true,
        usu_senha: false,
      },
    };

    if (nome) filtros.where.usu_nome = { contains: nome };
    if (matricula) filtros.where.usu_matricula = { contains: matricula };

    return filtros;
  }
}

export default usuarioRepository;
