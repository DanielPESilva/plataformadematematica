import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import loginRepository from '../repositories/loginRepository.js';
import dotenv from 'dotenv';

dotenv.config();

class LoginService {
  async buscarUser(email, password) {
    try {
      console.log("2 - Recebido dados de email e senha no serviço - loginService");

      if (!email || !password) {
        return null;
      }

      // Imprimir no console a senha criptografada pelo bcrypt para entender como funciona
      const bcryptHashedPassword = await bcrypt.hash(password, 10);
      console.log("Senha criptografada com bcrypt: ", bcryptHashedPassword);

      // Imprimir no console a senha criptografada pelo MD5 para entender como funciona
      const md5HashedPassword = crypto.createHash('md5').update(password).digest('hex');
      console.log("Senha criptografada com MD5: ", md5HashedPassword);

      console.log("3 - repassando email recebido para o repository - loginService");
      const userEncontrado = await loginRepository.findByEmail(email);

      if (!userEncontrado) {
        return null;
      }

      console.log("6 - Recebendo usuário encontrado no repository para validar senha - loginService");

      if (!userEncontrado.password) {
        return null;
      }

      // Primeiro tenta comparar a senha usando bcrypt
      let passwordValida = await bcrypt.compare(bcryptHashedPassword, userEncontrado.password);

      // Se a senha não for válida com bcrypt, tenta com MD5
      if (!passwordValida) {
        const hash = crypto.createHash('md5').update(password).digest('hex');
        passwordValida = (hash === userEncontrado.password);
      }

      if (!passwordValida) {
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
