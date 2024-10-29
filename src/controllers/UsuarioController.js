import bcrypt from "bcryptjs";
import env from "dotenv";
import { prisma } from "../configs/prismaClient.js";
import { sendError, sendResponse } from '../utils/messages.js';
import UsuarioService from '../services/usuarioService.js';

import { ZodError } from "zod";


env.config(); // inicializar as variáveis de ambiente

class systemUsuarioController {
  // GET - listar usuario por name com paginação 
  static listar = async (req, res) => {
    try {
      // fazer uma busca no banco de dados por todos os registros em system_usuario
      const userExists = await prisma.system_usuario.findMany({
        where: {
          active: 'Y',
          email: {
            contains: '@gmail.com' //like
          }
        },
      
        select: {
          usu_id: true,
          usu_nome: true,
          usu_tel: true,
          password: false,
          active: true,
          system_user_group: {
            select: {
              system_group: {
                select: {
                  name: true,
                }
              }
            }
          },
        }
        }
      );

      if (!userExists) {
        return res.status(400).json([{
           error: true, 
           code: 400, 
           message: "Nenhum usuário encontrado" }])
      } else {
        return res.status(200).json(
          {
            error: false,
            code: 200,
            message: "Usuário encontrado",
            data: userExists
      });
      }

    } catch (err) {

      if(err instanceof ZodError){
        return sendError(res,400,err.errors[0].message);

      }else if(err.message == "Aqui vai a mensagem de Erro que vc gerou lá no service." ){
        return sendError(res,404,["Aqui vai a mensagem de Erro que vc gerou lá no service."]);

      }else{
        return sendError(res,500,"Ocorreu um erro interno no servidor!");
      }
     }
  }

  // GET por ID - listar Usuario por ID 
  static listarPorID = async (req, res) => {
    try {

      console.log(req.params.id);


      const userExists = await prisma.system_usuario.findFirst({
        //filtro
        where: {
          id: parseInt(req.params.id),
        },
        select: {
          id: true,
          name: true,
          email: true,
          password: false, // `password` não é incluído aqui
          active: true,
          system_user_group: {
            select: {
              system_group: {
                select: {
                  name: true,
                }
              }
            }
          },
        }
        }
      );
      
      console.log(userExists);

      if (userExists) {
        return res.status(200).json(userExists);
      }
    } catch (err) {

      if(err instanceof ZodError){
        return sendError(res,400,err.errors[0].message);

      }else if(err.message == "Aqui vai a mensagem de Erro que vc gerou lá no service." ){
        return sendError(res,404,["Aqui vai a mensagem de Erro que vc gerou lá no service."]);

      }else{
        return sendError(res,500,"Ocorreu um erro interno no servidor!");
      }
     }
  }

  // POST - cadastrar Usuario
  static inserir = async (req, res) => {
    try {

      const { name, email, senha, ativo } = req.body;

      const erros = [];

      // validar os dados
      if (!name) {
        erros.push({ error: true, code: 400, message: "name é obrigatório" })
      }
      if (!email) {
        erros.push({ error: true, code: 400, message: "Email é obrigatório" })
      }
      if (!senha) {
        erros.push({ error: true, code: 400, message: "Senha é obrigatório" })
      }
      if (!ativo) {
        erros.push({ error: true, code: 400, message: "Ativo é obrigatório" })
      }

      // verificar se o email já está cadastrado
      const userExists = await prisma.usuario.findFirst({
        where: {
          email: {
            equals: req.body.email,
          }
        },
      });

      // se o email já estiver cadastrado, retornar erro
      if (!userExists) {
      } else {
        erros.push({ error: true, code: 400, message: "Email já cadastrado" })
      }

      if (erros.length > 0) {
        return res.status(400).json(erros)
      }

      // criptografar a senha
      const senhaCrypt = bcrypt.hashSync(senha, parseInt(process.env.SALT));

      // criar o usuario
      const userCreated = await prisma.usuario.create({
        data: {
          name,
          email,
          senha: senhaCrypt,
          ativo,
        },
      });

      // retornar o usuario criado sem o campo senha
      delete userCreated.senha;
      return res.status(201).json(userCreated);

    } catch (err) {

      if(err instanceof ZodError){
        return sendError(res,400,err.errors[0].message);

      }else if(err.message == "Aqui vai a mensagem de Erro que vc gerou lá no service." ){
        return sendError(res,404,["Aqui vai a mensagem de Erro que vc gerou lá no service."]);

      }else{
        return sendError(res,500,"Ocorreu um erro interno no servidor!");
      }
     }
  }

  static inserir_csv = async (req, res) => {
    try {

      if (!req.file) {
        return sendError(res, 400, ['Nenhum arquivo enviado.'])
      }

      const retorno = await UsuarioService.inserir_csv(req.file)
        
      return sendResponse(res,201, {data: retorno});  

    } catch (err) {
      console.error(err)

      if(err instanceof ZodError){
        return sendError(res,400,err.errors[0].message);

      }else if(err.message == "Arquivo do tipo errado." ){
        return sendError(res,404,[err.message]);

      }else if(err.message == "Estrutura do CSV está incorreta." ){
        return sendError(res,404,[err.message]);

      }else{
        return sendError(res,500,"Ocorreu um erro interno no servidor!");
      }
     }
  };

  // atualizar Usuario
  static atualizar = async (req, res) => {
    try {
      // testar se o id do usuario foi informado
      if (!req.params.id) {
        return res.status(400).json([{ error: true, code: 400, message: "ID do usuário é obrigatório" }])
      }

      const id = req.params.id
      const { name, email, senha, ativo } = req.body;

      // validar os dados
      if (name || email || senha || ativo && id) {
      } else {
        return res.status(400).json([{ error: true, code: 400, message: "Algum dado deve ser informado para atualizar o usuário" }])
      }

      // buscar email do usuario no banco de dados
      const emailExists = await prisma.usuario.findFirst({
        where: {
          id: id
        },
      });

      console.log(email)
      console.log(typeof email)

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
                }
              }
            },
          });
          if (emailExistsOutherUser) {
            return res.status(400).json([{ error: true, code: 400, message: "Email já cadastrado" }])
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

      if(err instanceof ZodError){
        return sendError(res,400,err.errors[0].message);

      }else if(err.message == "Aqui vai a mensagem de Erro que vc gerou lá no service." ){
        return sendError(res,404,["Aqui vai a mensagem de Erro que vc gerou lá no service."]);

      }else{
        return sendError(res,500,"Ocorreu um erro interno no servidor!");
      }
     }
  }

  // DELETE - EXCLUIR Usuario
  static deletar = async (req, res) => {
    try {
      const erros = [];

      // testar se o id do usuario foi informado
      if (!req.params.id) {
        return res.status(400).json([{ error: true, code: 400, message: "ID do usuário é obrigatório" }])
      }

      const id = req.params.id

      // buscar id do usuario no banco de dados
      const userExists = await prisma.usuario.findFirst({
        where: {
          id: id,
        },
      });

      // verificar se o usuario existe
      if (!userExists) {
        return res.status(400).json([{ error: true, code: 400, message: "Usuário não encontrado" }])
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
        erros.push({ error: true, code: 400, message: "Usuário possui rotas vinculadas, a exclusão só é permitida se o usuário não possuir rotas vinculadas" })
      }

      if (userExistsGrupos) {
        erros.push({ error: true, code: 400, message: "Usuário possui grupos vinculados, a exclusão só é permitida se o usuário não possuir grupos vinculados" })
      }

      if (erros.length > 0) {
        return res.status(400).json(erros)
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

      if(err instanceof ZodError){
        return sendError(res,400,err.errors[0].message);

      }else if(err.message == "Aqui vai a mensagem de Erro que vc gerou lá no service." ){
        return sendError(res,404,["Aqui vai a mensagem de Erro que vc gerou lá no service."]);

      }else{
        return sendError(res,500,"Ocorreu um erro interno no servidor!");
      }
     }
  }
}

export default systemUsuarioController;
