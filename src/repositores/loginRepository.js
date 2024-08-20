import {prisma} from '../configs/prismaClient.js';

class LoginRepository {
  async findByMatricula(matricula) {
    console.log(matricula);
    
    console.log("4 - Recebendo dados de filtro para buscar usuário no repository - loginRepository");

    const userEncontrado = await prisma.system_users.findUnique({
      where: {
        matricula: matricula
      },
      select: {
        id: true,
        nome: true,
        telefone: true,
        email: true,
        matricula: true,
        cpf: true,
        senha: true, // Certifique-se de incluir o campo senha
      }
    });

    console.log("5 - Retornando usuário encontrado no repository para o serviço - loginRepository");
    return userEncontrado;
  }
}

export default new LoginRepository();
