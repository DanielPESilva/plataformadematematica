import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import loginRepository from '../repositories/loginRepository.js';
import dotenv from 'dotenv';

dotenv.config();

class LoginService {
  async buscarUser(matricula, senha) {
    try {
      console.log("2 - Recebido dados da matrícula e senha no serviço - loginService");

      if (!matricula || !senha) {
        return null;
      }

      // Imprimir no console a senha criptografada pelo bcrypt para entender como funciona
      const bcryptHashedsenha = await bcrypt.hash(senha, 10);
      console.log("Senha criptografada com bcrypt: ", bcryptHashedsenha);

      // Imprimir no console a senha criptografada pelo MD5 para entender como funciona
      const md5Hashedsenha = crypto.createHash('md5').update(senha).digest('hex');
      console.log("Senha criptografada com MD5: ", md5Hashedsenha);

      console.log("3 - repassando a matrícula recebida para o repository - loginService");
      const userEncontrado = await loginRepository.findByMatricula(matricula);

      if (!userEncontrado) {
        return null;
      }

      console.log("6 - Recebendo usuário encontrado no repository para validar senha - loginService");

      if (!userEncontrado.senha) {
        return null;
      }

      // Primeiro tenta comparar a senha usando bcrypt
      let senhaValida = await bcrypt.compare(bcryptHashedsenha, userEncontrado.senha);

      // Se a senha não for válida com bcrypt, tenta com MD5
      if (!senhaValida) {
        const hash = crypto.createHash('md5').update(senha).digest('hex');
        senhaValida = (hash === userEncontrado.senha);
      }

      if (!senhaValida) {
        return null;
      }

      console.log("7 - Retornando usuário encontrado no serviço para o controller - loginService");
      return userEncontrado;
    } catch (err) {
      console.error(err);
      throw new Error(err.message);
    }
  }
}

export default new LoginService();
