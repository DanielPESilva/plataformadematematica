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
          id: true,
          nome: true,
          tel: true,
          email: true,
          matricula: true,
          cpf: true,
          senha: false,
        },
      };

      // filtra se houver valor
      if (nome) {
        filtros.where.nome = {
          contains: nome,
        };
      }
      if (tel) {
        filtros.where.tel = {
          contains: tel,
        };
      }
      if (email) {
        filtros.where.email = {
          contains: email,
        };
      }
      if (matricula) {
        filtros.where.matricula = {
          contains: matricula,
        };
      }
      if (cpf) {
        filtros.where.cpf = {
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
          id: parseInt(req.params.id),
        },
        select: {
          id: true,
          nome: true,
          tel: true,
          email: true,
          matricula: true,
          cpf: true,
          senha: false,
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
      const { nome, tel, email, matricula, cpf, senha } = req.body;

      const senhaCrypt = bcrypt.hashSync(senha, parseInt(process.env.SALT));

      const userCreated = await prisma.usuarios.create({
        data: {
          id,
          nome,
          tel,
          email,
          matricula,
          cpf,
          senha
        }
      })

      delete userCreated.senha;
      return res.status(201).json({
        error: false,
        code: 201,
        message: "Usuário cadastrado.",
        data: userCreated
      })
    } catch (error) {
      console.error(error);
      return res.status(500).json([{ error: true, code: 500, mesasge: "Erro interno."}])
      }
  };

  // PUT
  static atualizar = async (req, res) => {
    try {
      if (!req.params.id) {
        return res.status(400).json([{ error: true, code: 400, message: "ID obrigatório."}])
      }

      const id = req.params.id
      const { nome, tel, email, matricula, cpf, senha } = req.body

      if (!nome || !tel || !email || !matricula || !cpf || !senha && !id) {
        return res.status(400).json([{error: true, code: 400, message: "Deve haver alguma alteração."}])
      }

      const emailExist = await prisma.users.findFirst({
        where: {
          id: id
        }
      })

      console.log(email)
      console.log(typeof email)

      if (email !== undefined) {
        if (emailExist.email !== email) {
          const emailExistOutherUser = await prisma.users.findFirst({
            where: {
              email: {
                equals: email
              },
              id: {
                not: {
                  equals: id
                }
              }
            }
          })
          if (emailExistOutherUser) {
            return res.status(400).json([{error: true, code: 400, message: "Email já cadastrado."}])
          }
        }
      }

      if (senha) {
        const senhaCrypt = bcrypt.hashSync(senha, parseInt(process.env.SALT));
      }

      const userUpdated = await prisma.users.update({
        where: {
          id: id
        },
        data: {
          nome,
          tel,
          email,
          matricula,
          cpf,
          senha
        }
      })

      delete userUpdated.senha
      return res.status(201).json(userUpdated)

    } catch (error) {
      console.error(error)
      return res.status(500).json([{ error: true, code: 500, message: "Erro interno."}])
    }
  }
  // DELETE
  static excluir = async (req, res) => {
    try {
      const errors = []

      if(!req.params.id) {
        return res.status(400).json([{error: true, code: 400, message: "ID obrigatorio."}])
      }

      const id = req.params.id

      const userExists = await prisma.users.findFirst({
        where: {
          id: id
        }
      })

      if (!userExists) {
        return res.status(400).json([{ error: true, code: 400, message: "Usuário não encontrado."}])
      }

      const userExistsRotas = await prisma.usuariosRotas.findMany({
        where: {
          id: id
        }
      })

      if (userExistsRotas) {
        errors.push({ error: true, code: 400, message: "Rotas vinculadas."})
      }

      if (errors.length > 0) {
        return res.status(400).json(errors)
      }

      const userDeleted = await prisma.users.delete({
        where: {
          id: id
        }
      })

      return res.status(200).json(userDeleted)

    } catch (error) {
      console.error(error)
      return res.status(500).json([{ error: true, code: 500, message: "Erro interno."}])
    }
  }
}

export default usuarioController;
