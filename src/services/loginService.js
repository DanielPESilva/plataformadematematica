import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import loginRepository from '../repositories/loginRepository.js';
import dotenv from 'dotenv';

dotenv.config();

class loginService {
  async buscarUser(email, senha) {
    try {
      console.log("2 - Recebido dados de usuario e senha no serviço - loginService");

      console.log(email);
      if (!email || !senha) {
        return null;
      }

      
      // console da senha recebida para entender como funciona

      /**
       * Imprimir no console a senha criptografada pelo bcrypt, 
       * O hash gerado não será o mesmo que o hash armazenado no banco de dados,
       * pois o bcrypt gera um hash diferente a cada execução.
       * Mesmo assim a senha será verificada com sucesso será apenas necessário
       * que informe a senha correta. 
      */
      const bcryptHashedsenha = await bcrypt.hash(senha, 10);
      console.log("Senha criptografada com bcrypt: ", bcryptHashedsenha);

      console.log("3 - repassando usuario recebido para o repository - loginService");
      const usuarioEncontrado = await loginRepository.findByEmail(email);

      if (!usuarioEncontrado) {
        return null;
      }

      console.log("6 - Recebendo usuário encontrado no repository para validar senha - loginService");

      if (!usuarioEncontrado.senha) {
        return null;
      }

      // Primeiro tenta comparar a senha usando bcrypt
      let senhaValida = await bcrypt.compare(senha, usuarioEncontrado.senha);

      if (!senhaValida) {
        return null;
      }

      console.log("7 - Retornando usuário encontrado no serviço para o controller - loginService");
      return usuarioEncontrado;
    } catch (err) {
      console.error(err);
      throw new Error(err.message);
    }
  }
}

export default new loginService();
