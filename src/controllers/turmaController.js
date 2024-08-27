import env from "dotenv";
import turmaService from "../services/turmaService.js"
import CommonResponse from '../utils/commonResponse.js';
import messages from '../utils/messages.js';
import { ZodError } from 'zod';
import { turmaSchema } from "../schemas/turmaSchemas.js";

env.config();


class TurmaController{

  /**
   * @listar Listará todas as turmas, caso não exista turma dará erro
   * @page O primeiro é quantidade de tabelas que aparecerão e o segundo é a quantidade de colunas que cada tabela terá...
   * @error200 Deu certo :)
   * @error400 sintaxe de requisição mal formada ou enquadramento de mensagem de requisição inválida
   * @error500 problema generalizado no servidor interno da api
   * @pagination Como o page irá operar
   *
   */

  static listar = async (req, res) => {
    try {
      const { titulo, usuario_id, page = 1, perPage = 10 } = req.query;
      const { turmas, total } = await turmaService.listar(titulo, usuario_id, parseInt(page), parseInt(perPage));
      console.log(turmas);
      
      // continua deopis que voltar do service
      if (turmas.length === 0) {
        return res.status(400).json(CommonResponse.notFound(messages.validationGeneric.resourceNotFound('Turmas')));
      } else {
        return res.status(200).json({
          ...CommonResponse.success(turmas, messages.validationGeneric.resourceFound('Turmas')),
          pagination: {
            total,
            page: parseInt(page),
            perPage: parseInt(perPage),
            totalPages: Math.ceil(total / parseInt(perPage))
          }
        });
      }
    } catch (err) {
      if (process.env.DEBUGLOG === 'true') {
        console.log(err);
      }
      return res.status(500).json(CommonResponse.serverError());
    }
  }

  /**
   * @listarPorId Listará as turma cujo o id foi especificado
   * @page O primeiro é quantidade de tabelas que aparecerão e o segundo é a quantidade de colunas que cada tabela terá...
   * @error200 Deu certo :)
   * @error400 sintaxe de requisição mal formada ou enquadramento de mensagem de requisição inválida
   * @error500 problema generalizado no servidor interno da api
   * @pagination Como o page irá operar
   *
   */
  static listarPorID = async (req, res) => {
    try {
      const idTurma = parseInt(req.params.id);
      const turmaExiste = await turmaService.listarPorID(idTurma);
    
      //voltar aqui após o service
      if (turmaExiste) {
        return res.status(200).json(CommonResponse.success(turmaExiste));
      } else {
        return res.status(400).json(CommonResponse.notFound(messages.validationGeneric.resourceNotFound('Turma')));
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json(CommonResponse.serverError());
    }
  }

  static inserirTurma = async(req, res) => {
    try {
        const {titulo,usuario_id} = req.body;

        const { error } = turmaSchema.validate({titulo,usuario_id });

        if (error) {
            return res.status(400).json({ error: true, code: 400, message: error.details[0].message });
        }

        const siapeExistente = await docenteServices.findBySiape(n_siape);
        if (siapeExistente) {
            return res.status(400).json({ error: true, code: 400, message: 'Número SIAPE já existe' });
        }

        const emailExistente = await docenteServices.findByEmail(email_docente);
        if (emailExistente) {
            console.log('Email recebido:', email_docente);
            return res.status(400).json({ error: true, code: 400, message: 'Email já existe' });
        }

        const senhaCrypt = bcrypt.hashSync(senha_docente, parseInt(process.env.SALT));

        const docenteCreate = await docenteServices.inserir({
            data: {
                n_siape,
                nome_docente,
                email_docente,
                senha_docente: senhaCrypt,
                turma_docente,
                curso_docente,
                tipo_usuario

            },
        });
        return res.status(201).json(docenteCreate);

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: true, message: 'Erro interno do servidor' });
    }
}


}
export default TurmaController;