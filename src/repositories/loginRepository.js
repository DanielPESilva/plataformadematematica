import {prisma} from '../configs/prismaClient.js';

class LoginRepository {
  static async login(filtro){
    return await prisma.usuario.findUnique(filtro)
  }
}

export default LoginRepository;
