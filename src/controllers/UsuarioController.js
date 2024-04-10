import bcrypt from "bcryptjs";
import env from "dotenv";
import { prisma } from ".../configs/prismaClient.js";

env.config();

class usuarioController {
  // GET
  static listar = async (req, res) => {
    try {
      const { nome, tel, email, matricula, cpf } = req.query;

      let filtros = {
        select: {
          usu_id: true,
          usu_nome: true,
          usu_tel: true,
          usu_email: true,
          usu_matricula: true,
          usu_cpf: true,
          usu_senha: false,
        },
      };

      // filtra se houver valor
      if (nome) {
        filtros.where.usu_nome = {
          contains: nome,
        };
      }
      if (tel) {
        filtros.where.usu_tel = {
          contains: tel,
        };
      }
      if (email) {
        filtros.where.usu_email = {
          contains: email,
        };
      }
      if (matricula) {
        filtros.where.usu_matricula = {
          contains: matricula,
        };
      }
      if (cpf) {
        filtros.where.usu_cpf = {
          contains: cpf,
        };
      }

      //chamada no prisma
      const users = await prisma.usuario.findMany(filtros);

      // tratamento da resposta
      if (users.length === 0) {
        return res.status(400).json([
          {
            error: true,
            code: 400,
            message: "Usuário não encontrado.",
          },
        ]);
      } else {
        return res.status(200).json({
          error: false,
          code: 200,
          data: users,
        });
      }
    } catch (error) {
      if (process.env.DEBUG === "true") {
        console.log(err);
      }
      return res.status(500).json([
        {
          error: true,
          code: 500,
          message: "Erro interno.",
          data: [],
        },
      ]);
    }
  };
  // GET by ID
  static listarPorID = async (req, res) => {
    try {
      const useExists = await prisma.usuarios.findFirst({
        where: {
          usu_id: parseInt(req.params.usu_id),
        },
        select: {
          usu_id: true,
          usu_nome: true,
          usu_tel: true,
          usu_email: true,
          usu_matricula: true,
          usu_cpf: true,
          usu_senha: false,
        },
      });
      if (useExists) {
        return res.status(200).json(useExists);
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json([{ error: true, code: 500, message: "Erro interno." }]);
    }
  };

  //POST
  static inserir = async (req, res) => {
    try {
      const { name, tel, email, matricula, cpf, senha } = req.body;

      const senhaCrypt = bcrypt.hashSync(senha, parseInt(process.env.SALT));

      const userCreated = await prisma.usuarios.create({
        data: {
        }
      })
    } catch (error) {}
  };
}

export default usuarioController;
