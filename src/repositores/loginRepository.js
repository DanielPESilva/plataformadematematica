import prisma from '../configs/prismaClient.js';

class LoginRepository {
  async findByEmail(email) {
    console.log("4 - Recebendo dados de filtro para buscar usuário no repository - loginRepository");

    const userEncontrado = await prisma.system_users.findUnique({
      where: {
        email: email
      },
      select: {
        id: true,
        name: true,
        email: true,
        site: true,
        active: true,
        phone: true,
        password: true, // Certifique-se de incluir o campo password
        system_user_group: {
          select: {
            system_group: {
              select: {
                id: true,
                name: true,
              }
            }
          }
        },
        system_user_unit: {
          select: {
            system_unit: {
              select: {
                id: true,
                name: true,
              }
            },
          }
        },

      }
    });

    console.log("5 - Retornando usuário encontrado no repository para o serviço - loginRepository");
    return userEncontrado;
  }
}

export default new LoginRepository();
