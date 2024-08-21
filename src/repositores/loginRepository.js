import { prisma } from '../configs/prismaClient.js';

class LoginRepository {
  async findByMatricula(matricula) {
    console.log("Matricula recebida no repository: " + matricula);

    console.log("4 - Recebendo dados de filtro para buscar usuário no repository - loginRepository");

    const userEncontrado = await prisma.usuario.findFirst({
      where: {
        email: matricula,
      },
      select: {
        id: true,
        nome: true,
        telefone: true,
        matricula: true,
        email: true,
        cpf: true,
        senha: true, // Certifique-se de incluir o campo senha
      }
    });
    console.log("Usuário encontrado no repository: " + userEncontrado);

    console.log("5 - Retornando usuário encontrado no repository para o serviço - loginRepository");

    // return userEncontrado;
  }
}

export default new LoginRepository();
