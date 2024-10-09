import loginRepository from '../repositories/loginRepository.js';
import bcrypt from 'bcryptjs';
import LoginSchema from "../schemas/LoginShema.js"
import {z} from "zod";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import 'dotenv/config'


dotenv.config();

class loginService {

  static async login(login){
   
    const {matricula, senha} = LoginSchema.login.parse(login);
    console.log(typeof(matricula))
    const JWT = process.env.PRIVATE_KEY;

    const flitros = {
        where: {
            matricula: matricula,
        }
    }
    const usuario = await loginRepository.login(flitros);

    if(!usuario){ 
        throw new z.ZodError([{
            path: ["usuario"],
            message:"Usuario não exite na base de dados verifique se a matricula esta correto!",
            code: z.ZodIssueCode.custom,
            params: {
                status: 401, // Adicionando um detalhe personalizado
              },
        }]);  
    };
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if(!senhaValida){
        throw new z.ZodError([{
            path: ["usuario"],
            message:"Senha informada esta incorreta!",
            code: z.ZodIssueCode.custom,
            params: {
                status: 401, // Adicionando um detalhe personalizado
              },
        }]);  
    }

    const jwtConfig = {  expiresIn: '4d',    algorithm: 'HS256', };

    const token = jwt.sign({ data: {'_id': usuario.id} }, JWT, jwtConfig);
    delete usuario.senha
    return { 
        data:{
            token: token,
            usuario: usuario, 
        }
    }
  }
}

export default loginService;
