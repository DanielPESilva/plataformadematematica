import AulaRepository from "../repositories/AulaRepository.js";
import AulaSchema from "../schemas/AulaSchemas.js";
import AulaSchemas from "../schemas/AulaSchemas.js";

class AulaService {

  static async listar(parametros) {
    const schema = new AulaSchemas().listarSchema();
    const parametrosValidados = schema.parse(parametros);
    
    if (parametrosValidados.titulo || parametrosValidados.modulo_id) {
      const filtroRepository = AulaRepository.createFilterAula(parametrosValidados);
      const aulas = await AulaRepository.findAllAulas(filtroRepository);
      return aulas;
    }

    if (parametrosValidados.aluno_id) {
      const filtroRepository = AulaRepository.createFilterFeito(parametrosValidados);
      const aulasFeitasRevisadas = await AulaRepository.findAllFeitos(filtroRepository);
      return aulasFeitasRevisadas;
    }

    if (!parametrosValidados.aluno_id && !parametrosValidados.titulo && !parametrosValidados.modulo_id) {
      const todasAsAulas = await AulaRepository.findAllAulas();
      return todasAsAulas;
    } else {
      throw new Error("Nenhum registro encontrado.");
    }
  }

  static async listarPorID(idDoParam) {
    const schema = new AulaSchema().listarPorIdSchema();
    const IdValidado = schema.parse(idDoParam);
    
    const filtroDoRepository = AulaRepository.createFilterAula({ id: IdValidado.id });
    const aula = await AulaRepository.filtrarPorId(filtroDoRepository);
    
    if (!aula) {
      throw new Error("Nenhuma aula encontrada.");
    }
    return aula;
  }

  static async atualizar(parametros) {
    
    const schema = new AulaSchema().UpdateSchema();
    const parametrosValidados = schema.parse(parametros);
  
    const { id, modulo_id, titulo, video, pdf_questoes, pdf_resolucao, descricao } = parametrosValidados;
    
    const aulaExist = await AulaRepository.buscarPorId(id);

    if (!aulaExist) {
      throw new Error("O recurso solicitado não foi encontrado no servidor.");
    }

    const filtro = {
      where: { id: id },
      data: {
        modulo_id: modulo_id,
        titulo: titulo,
        video: video,
        pdf_questoes: pdf_questoes,
        pdf_resolucao: pdf_resolucao,
        descricao: descricao
      },
      select: {
        id: true,
        modulo_id: true,
        titulo: true,
        video: true,
        pdf_questoes: true,
        pdf_resolucao: true,
        descricao: true
      }
    };

    return await AulaRepository.update(filtro);
  }

  static async create(parametros) {
    const insert = AulaSchemas.schemaInsert.parse(parametros);

    const modulo = await AulaRepository.modulo_exist(insert.modulo_id);
    if (!modulo) {
      throw new Error("O modulo informado não existe.");
    }

    const AulaCriada = await AulaRepository.create(insert);
    return AulaCriada;
  }

  static async deletar(dados) {
    // service de deletar aula
  }
}

export default AulaService;
