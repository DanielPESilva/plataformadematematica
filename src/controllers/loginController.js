import jwt from 'jsonwebtoken';
import loginService from '../services/loginService.js';

class LoginController {
  static logar = async (req, res) => {
    try {
      const { matricula, senha } = req.body;

      console.log("1 - Recebendo requisição de login no controller - loginController");

      const userEncontrado = await loginService.buscarUser(matricula, senha);

      // remover a senha do usuário antes de retornar
      if (userEncontrado) {
        delete userEncontrado.senha;
      }

      if (!userEncontrado) {
        return res.status(401).json({ error: true, code: 401, message: "Usuário ou senha inválidos - loginController" });
      }

      const token = jwt.sign(
        {
          ...userEncontrado,
        },
        process.env.SECRET,
        { expiresIn: process.env.EXPIREIN }
      );

      console.log("8 - Retornando token e usuário encontrado no serviço para o controller - loginController");
      return res.status(200).json({
        data: {
          token,
          userEncontrado: {
            ...userEncontrado
          },
          status: 200,
          message: "Usuário logado com sucesso",
          error: false,
        },
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: true, code: 500, message: err.message });
    }
  }
}

export default LoginController;
