import {z} from 'zod';

class  LoginSchema{

    static login = z.object({
        matricula: z.number().int().positive(), 
        senha: z.string().trim().min(1).max(200),
    });
}

export default LoginSchema;