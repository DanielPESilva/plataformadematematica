import bcrypt from "bcryptjs";
import env from "dotenv";
import { prisma } from "../configs/prismaClient.js";
import { sendError, sendResponse } from '../utils/messages.js';
import UsuarioService from '../services/usuarioService.js';


import { ZodError } from "zod";


env.config(); 

class systemUsuarioController {

  static listar = async (req, res) => {
    try {
        const filtros = req.query;
        const usuarios = await UsuarioService.listarUsuarios(filtros);
        return sendResponse(res, 200, { data: usuarios });
    } catch (err) {
        return sendError(res, 400, err.message);
    }
};

static buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await UsuarioService.buscarUsuarioPorId(parseInt(id));
        return sendResponse(res, 200, { data: usuario });
    } catch (err) {
      console.log(err)
        return sendError(res, 404, err.message);
    }
};



  static inserir_csv = async (req, res) => {
    try {
      if (!req.file) {
        return sendError(res, 400, ["Nenhum arquivo enviado."]);
      }

      const retorno = await UsuarioService.inserir_csv(req.file);

      return sendResponse(res, 201, { data: retorno });
    } catch (err) {
      console.error(err);

      if (err instanceof ZodError) {
        return sendError(res, 400, err.errors[0].message);
      } else if (
        err.message == "Aqui vai a mensagem de Erro que vc gerou lá no service."
      ) {
        return sendError(res, 404, [
          "Aqui vai a mensagem de Erro que vc gerou lá no service.",
        ]);
      } else {
        return sendError(res, 500, "Ocorreu um erro interno no servidor!");
      }
    }
  };

  // atualizar Usuario
  static atualizar = async (req, res) => {
    try {
      // testar se o id do usuario foi informado
      if (!req.params.id) {
        return res
          .status(400)
          .json([
            { error: true, code: 400, message: "ID do usuário é obrigatório" },
          ]);
      }

      const id = req.params.id;
      const { name, email, senha, ativo } = req.body;

      // validar os dados
      if (name || email || senha || (ativo && id)) {
      } else {
        return res
          .status(400)
          .json([
            {
              error: true,
              code: 400,
              message: "Algum dado deve ser informado para atualizar o usuário",
            },
          ]);
      }

      // buscar email do usuario no banco de dados
      const emailExists = await prisma.usuario.findFirst({
        where: {
          id: id,
        },
      });

      console.log(email);
      console.log(typeof email);

      // verificar se o email informado é diferente do email do usuario no cadastro
      if (email !== undefined) {
        if (emailExists.email !== email) {
          // verificar se o email já está cadastrado para outro usuario
          const emailExistsOutherUser = await prisma.usuario.findFirst({
            where: {
              email: {
                equals: email,
              },
              id: {
                not: {
                  equals: id,
                },
              },
            },
          });
          if (emailExistsOutherUser) {
            return res
              .status(400)
              .json([
                { error: true, code: 400, message: "Email já cadastrado" },
              ]);
          }
        }
      }

      // criptografar a senha
      if (senha) {
        const senhaCrypt = bcrypt.hashSync(senha, parseInt(process.env.SALT));
      }

      // atualizar os atributos do usuario que foram informados
      const userUpdated = await prisma.usuario.update({
        where: {
          id: id,
        },
        data: {
          name,
          email,
          senha,
          ativo,
        },
      });

      // retornar o usuario criado sem o campo senha
      delete userUpdated.senha;
      return res.status(201).json(userUpdated);
    } catch (err) {
      if (err instanceof ZodError) {
        return sendError(res, 400, err.errors[0].message);
      } else if (
        err.message == "Aqui vai a mensagem de Erro que vc gerou lá no service."
      ) {
        return sendError(res, 404, [
          "Aqui vai a mensagem de Erro que vc gerou lá no service.",
        ]);
      } else {
        return sendError(res, 500, "Ocorreu um erro interno no servidor!");
      }
    }
  };

  // DELETE - EXCLUIR Usuario
  static deletar = async (req, res) => {
    try {
      const erros = [];

      // testar se o id do usuario foi informado
      if (!req.params.id) {
        return res
          .status(400)
          .json([
            { error: true, code: 400, message: "ID do usuário é obrigatório" },
          ]);
      }

      const id = req.params.id;

      // buscar id do usuario no banco de dados
      const userExists = await prisma.usuario.findFirst({
        where: {
          id: id,
        },
      });

      // verificar se o usuario existe
      if (!userExists) {
        return res
          .status(400)
          .json([
            { error: true, code: 400, message: "Usuário não encontrado" },
          ]);
      }

      // verificar se há informações nas tabelas de relacionamento: UsuariosRotas e UsuariosGrupos
      const userExistsRotas = await prisma.usuariosRotas.findMany({
        where: {
          usuario_id: id,
        },
      });

      const userExistsGrupos = await prisma.usuariosGrupos.findMany({
        where: {
          usuario_id: id,
        },
      });

      if (userExistsRotas) {
        erros.push({
          error: true,
          code: 400,
          message:
            "Usuário possui rotas vinculadas, a exclusão só é permitida se o usuário não possuir rotas vinculadas",
        });
      }

      if (userExistsGrupos) {
        erros.push({
          error: true,
          code: 400,
          message:
            "Usuário possui grupos vinculados, a exclusão só é permitida se o usuário não possuir grupos vinculados",
        });
      }

      if (erros.length > 0) {
        return res.status(400).json(erros);
      }

      // excluir o usuario
      const userDeleted = await prisma.usuario.delete({
        where: {
          id: id,
        },
      });

      // retornar o usuario criado
      return res.status(200).json(userDeleted);
    } catch (err) {
      if (err instanceof ZodError) {
        return sendError(res, 400, err.errors[0].message);
      } else if (
        err.message == "Aqui vai a mensagem de Erro que vc gerou lá no service."
      ) {
        return sendError(res, 404, [
          "Aqui vai a mensagem de Erro que vc gerou lá no service.",
        ]);
      } else {
        return sendError(res, 500, "Ocorreu um erro interno no servidor!");
      }
    }
  };
}

export default systemUsuarioController;
