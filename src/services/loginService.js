import loginRepository from '../repositories/loginRepository.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

class loginService {
  async buscarUser(email, senha) {
  }

  static criarToken = async (data) => {
    try {
      const camposValidados = await this.validarCampos(data)

      const usuario = await this.VerificarUsuario(camposValidos)

      await this.validarHash(camposValidos.senha, usuario[0].senha)
      const { email, senha } = usuario
      const token = jwt.sign({ email, senha }, pro)
    } catch (error) {
      
    }
  }
}

export default new loginService();
