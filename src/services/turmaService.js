import { json } from "stream/consumers";
import turmaRepository from "../repositories/turmaRepository.js";
import {TurmaSchema, updateTurmaSchema} from "../schemas/turmaSchemas.js";
import {user_turma_Schema, inserirTurmaSchema} from "../schemas/user_turma_Schema.js";
import { messages} from '../utils/messages.js';

class turmaService {
  async listar(titulo) {
    try {
      const filtros = turmaRepository.constructFilters(titulo);
      const { turmas } = await turmaRepository.findAll( filtros );
      
      // Regra de negócio: Filtrar turmas com pelo menos um aluno
      const turmasComAlunos = turmas.filter(
        (turma) => turma.usuario_has_turma.length > 0
      );

      if (turmasComAlunos) {
        // Retornando turmas filtradas 
        return ({ turmasComAlunos});
      }

    } catch (error) {
      console.error("Erro ao listar turmas:", error.message);
      throw new Error("Erro ao listar turmas com alunos");
    }
  }

  async listarPorID(id) {
    if (isNaN(id)) {
      throw new Error(messages.validationGeneric.resourceNotFound("ID deve ser um número inteiro"));
    }
    return turmaRepository.findById(id);
  }

  async create(data){
    console.log(data);
      // Validação com Zod
      const validatedData = TurmaSchema.parse(data);

      console.log(validatedData);
    
      const errors = [];
      const tituloExists = await turmaRepository.findByTitulo(validatedData.titulo);
      if (tituloExists) {
        errors.push(messages.validationGeneric.resourceAlreadyExists('Titulo').message);
      }
      console.log(tituloExists);
      
      if (errors.length > 0) {
        throw new Error(errors.join('\n'));
      }
  
      return await turmaRepository.create(validatedData);
  
}
  async atualizarTurma(id, data) {
    // Validação com Zod para atualização
    const validatedData = updateTurmaSchema.parse(data);
    console.log("2 - (SERVICE) Recebe as informações do controller: "+ JSON.stringify(validatedData))

    const tituloExists = await turmaRepository.findById(id);
    console.log("3 -(SERVICE) Verifica se o titulo as informações do filtro achar por ID: "+ JSON.stringify(tituloExists))

    if (validatedData.titulo && tituloExists.titulo !== validatedData.titulo) {
      const tituloExistsOutherTurma = await turmaRepository.findByTituloExceptId(validatedData.titulo, id);

      console.log("4 -(SERVICE) Verifica se o Tútlo já existe esse título em outra tabela: "+ JSON.stringify(tituloExistsOutherTurma))

      if (tituloExistsOutherTurma) {
        throw new Error('Titulo já cadastrado');
      }if (!tituloExistsOutherTurma) {
       const turmaCriada = await turmaRepository.atualizar(id, validatedData);

       return turmaCriada;
      }
    }
  }

  async inserirUsuario(data) {
    // Validação com Zod
    console.log("Dados do body"+JSON.stringify  (data));
    
    const validatedData = user_turma_Schema.parse(data);

    console.log("VALIDAÇÃODOSDADOS"+JSON.stringify(validatedData));

    const usuExistsInTurma = await turmaRepository.userExist(validatedData.usuario_id); 

    console.log("Usuário na turma"+usuExistsInTurma);
    

    if (usuExistsInTurma) {
      errors.push(messages.validationGeneric.resourceAlreadyExists('Usuário').message);
    }
    if (errors.length > 0) {
      throw new Error(errors.join('\n'));
    }

    return await turmaRepository.create(validatedData);
  }

}
export default new turmaService();