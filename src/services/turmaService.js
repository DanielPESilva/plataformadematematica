import turmaRepository from "../repositories/TurmaRepository.js";
import {TurmaSchema, updateTurmaSchema} from "../schemas/TurmaSchemas.js";

class turmaService {
  async listar(data) {

      const filtros = turmaRepository.constructFilters(data);

      const turmas  = await turmaRepository.findAll( filtros );
      
      if (turmas.length == 0){
        throw new Error("Turmas não encontradas.");
    }
    console.log(turmas);
      return turmas
  }

  async listarPorID(id) {
    if (isNaN(id)) {
      throw new Error("ID deve ser um número inteiro");
    }
    return turmaRepository.findById(id);
  }

  async atualizarTurma(id, data) {
    // Validação com Zod para atualização
    const validatedData = updateTurmaSchema.parse(data);
    const tituloExists = await turmaRepository.findById(id);

    if (tituloExists===null) {
      throw new Error("Título não existe.");
    }


    if (validatedData.titulo && tituloExists.titulo !== validatedData.titulo) {
      const tituloExistsOutherTurma = await turmaRepository.findByTituloExceptId(validatedData.titulo, id);

      if (tituloExistsOutherTurma) {
        throw new Error('Titulo já cadastrado');
      }if (!tituloExistsOutherTurma) {
       const turmaCriada = await turmaRepository.atualizar(id, validatedData);

       return turmaCriada;
      }
    }
  }

}
export default new turmaService();
