import express from "express"
import path from "path";
import fs from 'fs'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { v4 as uuidv4 } from 'uuid';
import AulaController from "../controllers/AulaController.js"
const router = express.Router();


import multer from "multer";

const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        'application/pdf', // PDF
        'application/msword', // DOC
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // DOCX
    ];
    
    // Verifica se o tipo do arquivo está na lista de tipos permitidos
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true); // Aceita o arquivo
    } else {
        cb(new Error('Tipo de arquivo não permitido.')); // Rejeita o arquivo
    }
};

// Configuração do armazenamento do Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../../uploads/pdf');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath); // Cria o diretório se não existir
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueFilename = `${uuidv4()}_${file.originalname}`; // Adiciona UUID ao nome do arquivo
        cb(null, uniqueFilename);
    }
});

// Inicializa o middleware do Multer com validação
const upload = multer({ 
    storage, 
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // Limite de 5MB por arquivo
});


/**
 * post, patch e delete é padrão, normal igual já fizeram.
 * 
 * O get normal ele tem que receber na requisição o id do usuario
 * para que? junto com os dados da sala, vc tem que buscar na tabela feito
 * se o usuario já marcou aquela aula com assistida ou para revisar, isso você faz
 * utilizando o id do usuario e da sala.
 * 
 * também deve ser possivel filtrar as aulas pelo titulo
 * 
 * e a rota /aula/status é insersão nessa tabela feito, ela vai receber o id do usuario e da sala 
 * e o boolean do atributo feito ou revisar. vc pega isso e insere na tabela feito.
 * 
 * Isso serve para marcar que uma aula já foi assistida pelo usuario.
*/

router
    router.get("/aula", AulaController.listar)
    router.get("/aula/:id",AulaController.listarPorID)
    router.post('/aula', upload.fields([{ name: 'perguntas' }, { name: 'gabarito' }]), AulaController.inserir);
    router.post('/aula/status', AulaController.aula_status)
    router.patch('/aula/:id',AulaController.atualizar);
    router.delete('/aula', AulaController.deletar)
    router.get('/aula/arquivo/:fileName', AulaController.buscar_pdf);

    export default router;