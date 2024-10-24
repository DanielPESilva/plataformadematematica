import moduloRepository from "../repositories/moduloRepository.js";
import 'dotenv/config';
import sharp from "sharp";
import fs from "fs";
import path from "path";
import moduloSchema from "../schemas/moduloSchema.js";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


class ModuloService {
    static async listar(filtro) { 

        const filtroValidated = moduloSchema.listarSchema.parse(filtro)
        const consulta = moduloRepository.constructFilters(filtroValidated)
        const busca = await moduloRepository.listar(consulta)

        if (!busca) {
            throw new Error("nem um modulo foi encontrado.");
        }

        const imagePromises = [];

        for (const modulo of busca) {
            const imagePath = path.join(__dirname, `../../uploads/imagens/${modulo.image}`);
            const imagePromise = fs.promises.readFile(imagePath)
            .then( async data => data.toString('base64'))
            .catch(err => {
                throw new Error("Ocorreu um erro ao enviar as imagens.");
            });
            imagePromises.push( modulo.image = await imagePromise);
        }
        return busca
    };

        static  async listarPorId(id) {
            const parsedIdSchema = moduloSchema.listarPoIdSchema.parse({id:id});
            const consulta = moduloRepository.constructFilters(parsedIdSchema)
            const response = await moduloRepository.listarPorId(consulta);
            return response
        };

        static async inserir(data, file) {

            const tipo = file.mimetype
            if (!tipo.includes('image')) {
                throw new Error("file do tipo errado.");
            }

            const filtroValidated = moduloSchema.inserirSchema.parse(data);
            const moduloResponse={         
                turma_id: filtroValidated.turma_id,   
                titulo: filtroValidated.titulo,      
                descricao: filtroValidated.descricao,   
                image: filtroValidated.image
            }
            const outputPath = path.join(__dirname, `../../uploads/imagens/${moduloResponse.image}`);
            const formato = moduloResponse.image.split('.')

            sharp(file.buffer)
            .resize(480, 280) 
            .toFormat(formato[formato.length - 1], { quality: 10 }) 
            .toFile(outputPath, (err, info) => {
                if (err) {
                    throw new Error('Erro ao redimensionar a imagem');
                }
            });

            const response = moduloRepository.inserir(moduloResponse)

            return response
        }

    static async atualizar(id, data) {
        const parametro = moduloSchema.atualizarSchema.parse(data);
    
        const {turma_id, titulo, descricao, image } = parametro;
    
        const parsedIdSchema = moduloSchema.listarPoIdSchema.parse({id:id});
        const consulta = moduloRepository.constructFilters(parsedIdSchema)
        const moduloExist = await moduloRepository.listarPorId(consulta);
    
        if (moduloExist== null) {
            throw new Error("O recurso solicitado não foi encontrado no servidor.");
        }
    
        let atualizacao = {
            where: { id: id },
            data: {
                turma_id: turma_id,    
                titulo: titulo,      
                descricao: descricao ,   
                image: image
            },
            select: {
            id: true,          
            turma_id: true,    
            titulo: true,      
            descricao: true,   
            image: true
            }
        };

        return await moduloRepository.atualizar(atualizacao);
    }

    static async excluir() {
        const modulo = await moduloRepository.findById(id);
        if (!modulo) {
            throw new Error('Modulo not found')
        }

        return await moduloRepository.delete(id);
    }

}

export default ModuloService;