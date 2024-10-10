import usuarioRepository from "../repositories/usuarioRepository.js";
import Stream from "stream";
import csvParser from "csv-parser";
import bcrypt from "bcryptjs";
import dotenv from 'dotenv';
import CSVFileValidator from 'csv-file-validator'
import 'dotenv/config'

dotenv.config();


class UsuarioService {
    async listar(nome,matricula, page = 1, perPage = 10) {
        const filtros = usuarioRepository.constructFilters(nome, matricula);
        return await usuarioRepository.findAll(filtros, page, perPage);
    }

    async listarPorID(id) {
        return usuarioRepository.findById(id);  

    }

    async listarPorMatricula(matricula) {
        return usuarioRepository.findByMatricula(matricula);
    }

    async inserir(data) {
        return await usuarioRepository.create(data);
    }

    static async inserir_csv(arquivo) {
        if (arquivo.mimetype != 'text/csv') {
            throw new Error("Arquivo do tipo errado.");
        }
    
        const csvStreamUsuarios = new Stream.PassThrough();
        csvStreamUsuarios.end(arquivo.buffer);
    
        const config = {
            headers: [
                { name: 'nome', inputName: 'nome', required: true },
                { name: 'matricula', inputName: 'matricula', required: true },
                { name: 'senha', inputName: 'senha', required: true }
            ]
        };
    
        const csvData = await CSVFileValidator(csvStreamUsuarios, config);
        if (csvData.inValidData.length > 0) {
            throw new Error("Estrutura do CSV está incorreta.");
        }
    
        const csvStream = new Stream.PassThrough();
        csvStream.end(arquivo.buffer);
    
        let usuario_existentes = await usuarioRepository.listar_csv();
        const grupo = await usuarioRepository.grupo_alunos()
        console.log(grupo);
    
        let usuario_csv = [];
        const header = ['nome', 'matricula', 'senha'];
    
        await new Promise((resolve, reject) => {
            csvStream
                .pipe(csvParser({ headers: header, separator: ';', skipLines: 1 }))
                .on('data', (row) => {
                    const tupula = {
                        nome: row['nome'],
                        matricula: parseInt(row['matricula']),
                        senha: row['senha']
                    };
                    usuario_csv.push(tupula);
                })
                .on('end', () => {
                    resolve();
                })
        });

        const novosUsuarios = usuario_csv.filter((usuario) => {
            return !usuario_existentes.some((existente) => existente.matricula === usuario.matricula);
        });

        const usuariosParaInserir = await Promise.all(
            novosUsuarios.map(async (usuario) => {
                return {
                    nome: usuario.nome,
                    matricula: usuario.matricula,
                    senha: await bcrypt.hash(usuario.senha, parseInt(process.env.SALT)),
                    active: true,
                    grupo_id: grupo.id
                };
            })
        );
        let ids = []
        await Promise.all(
            usuariosParaInserir.map(async (usuario) => {
                const usuario_criado = await usuarioRepository.inserir_alunos(usuario);
                ids.push(usuario_criado.id)
            })
        );

        
        console.log(ids)
        return usuariosParaInserir;
    }
    

    static async atualizar(id, data) {
        const user = await usuarioRepository.findById(id);

        if (data.email && user.email !== data.email) {
            const emailExists = await usuarioRepository.findByEmail(data.email);
            if (emailExists) {
                throw new Error ('Email exists');
            }
        }
        return await usuarioRepository.update(id, data);
    }

    static async excluir() {
        const user = await usuarioRepository.findById(id);
        if (!user) {
            throw new Error('User not found')
        }

        return await usuarioRepository.delete(id);
    }

}

export default UsuarioService;