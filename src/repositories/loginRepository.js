import {prisma} from '../configs/prismaClient.js';

class LoginRepository {
  async findByEmail(email) {
    console.log("4 - Recebendo dados de filtro para buscar usuário no repository - loginRepository");

    const usuarioEncontrado = await prisma.usuario.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        nome: true,
        telefone: true,
        email: true,
        matricula: true,
        cpf: true,
        senha: true, // O campo senha está incluído aqui
        usuario_has_turma: {
          select: {
            turma:{
              select: {
                titulo: true,
              }
            }
          }
        },
      }
    });

    console.log("5 - Retornando usuário encontrado no repository para o serviço - loginRepository");
    return usuarioEncontrado;
  }
}

export default new LoginRepository();
