import AulaRepository from "../repositories/AulaRepository.js";
import AulaSchema from "../schemas/AulaSchemas.js";
import AulaSchemas from "../schemas/AulaSchemas.js";
class AulaService {

  /**
   * Há validação do zod, falta padronizare organizar...
   */
  async listar(parametros) {
    const schema = new AulaSchemas().listarSchema();
    let parametrosValidados;
        parametrosValidados = schema.parse(parametros);
        
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
      if(!parametrosValidados.aluno_id && !parametrosValidados.titulo && !parametrosValidados.modulo_id){
        const todasAsAulas = await AulaRepository.findAllAulas();
        return todasAsAulas;
      }else{
        throw new Error("Nenhum registro encontrado.");
      }
  }

  async listarPorID(idDoParam) {

    const schema = new AulaSchema().listarPorIdSchema();
    const IdValidado = schema.parse(idDoParam);
    
    const filtroDoRepository = AulaRepository.createFilterAula({ id: IdValidado.id });
    const aula = await AulaRepository.findById(filtroDoRepository);
    

    if (!aula) {
      throw new Error("Nenhuma aula encontrada.");
    }
    return aula;
  }

  static async atualizar(id, titulo, posicao, pdf, link_video) {
      // Regra de negócio e validações
      return await AulaRepository.update(id, titulo, posicao, pdf, link_video);
  }

  static async atualizar(id, titulo, posicao, pdf, link_video) {
    // Regra de negócio e validações
    return await questaoRepository.update(id, titulo, posicao, pdf, link_video);
  }

  async create(parametros) {
    const insert = AulaSchemas.schemaInsert.parse(parametros)


    const modulo = await AulaRepository.modulo_exist(insert.modulo_id)
    if (!modulo) {
      throw new Error("O modulo informado não existe.");
    }

    const AulaCriada = AulaRepository.create(insert)
    return AulaCriada

  }

  async deletar(dados) {
    //service de deletar aula
  }  
}


export default new AulaService();
