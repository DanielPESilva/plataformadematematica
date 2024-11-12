import { number } from "zod";
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
        where: { id:id },
        select: {
            id: true,
            nome: true,
            matricula: true,
            active: true,
        },
    });
};

static async deletarUsuarioPorId(id) {
  return await prisma.usuario.update({
    where: { id: id },
    data: {
      active: false, // Atualiza o status para false (inativo)
    },
  });
}


static async buscarId(id) {
  return await prisma.usuario.findUnique({
      where: { id:id }
  });
};

static async atualizarUsuario(filtro) {
  return await prisma.usuario.update(filtro);
};


static async buscarGrupoPorId(id) {
  return await prisma.grupo.findUnique({
      where: { id },
      select: {
          id: true,
      },
  });
};


static async buscarUsuarioPorMatricula(matricula) {
  return await prisma.usuario.findFirst({
    where: {
      matricula: matricula
    },
    select: {
      id: true,
      nome: true,
      senha: true,
      matricula: true,
      active: true
    }
  });
}




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
    return await prisma.turma.findMany();
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

  static createFilterUsuario(parametros) {
    let filtro = {
      where: {
        ...(parametros.nome && { nome: { contains: parametros.nome } }),
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
