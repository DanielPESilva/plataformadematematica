import turmaRepository from "../repositories/turmaRepository.js";
import {TurmaSchema, updateTurmaSchema} from "../schemas/turmaSchemas.js";
import {inserirTurmaSchema} from "../schemas/user_turma_Schema.js";
import { messages} from '../utils/messages.js';
import { error } from "console";

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

  async create(data){
    console.log("2 - Data chegou em service"+JSON.stringify(data))
    // Validação com Zod
      const validatedData = TurmaSchema.parse(data);

      console.log("3 - Foi feito a validação de data"+JSON.stringify(validatedData))
    
      const errors = [];
      const tituloExists = await turmaRepository.findByTitulo(validatedData.titulo);
      console.log("4 - Foi feito a validação de titulo: "+JSON.stringify(tituloExists))

      if (tituloExists) {
        errors.push(messages.error.resourceFound('Titulo'));
      }
      
      if (errors.length > 0) {
        throw new Error(errors.join('\n'));
      }
  
      return await turmaRepository.create(validatedData);
  
}
  async atualizarTurma(id, data) {
    // Validação com Zod para atualização
    const validatedData = updateTurmaSchema.parse(data);
    const tituloExists = await turmaRepository.findById(id);

    if (tituloExists===null) {
      throw new Error(messages.error.resourceNotFound("Título não existe."));
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

  async inserirUsuario(req) {
    // Validação com Zod
    
    const validatedData = inserirTurmaSchema.parse(req.body);

    console.log(validatedData);
  

    const usuExistsInTurma = await turmaRepository.userExist(validatedData); 

    console.log(usuExistsInTurma); 

    if (usuExistsInTurma) {   
      throw new Error('Usuário já existe.');
    }

    const userCadastrado = await turmaRepository.turmaMatricular(validatedData);

    return userCadastrado
  }

  async removerUsuario(req) {
  const validatedData = inserirTurmaSchema.parse(req.body);

  console.log(validatedData);
  
  const usuExistsInTurma = await turmaRepository.userExist(validatedData);

  console.log(usuExistsInTurma);
  

  if (!usuExistsInTurma) {
    throw new Error("Usuário não encontrado(a).");
  }
  const userRemovido = await turmaRepository.removerUsuarioDaTurma(validatedData);

  return userRemovido;
  }

  async excluirTurma(id) {
    const turmaExists = await turmaRepository.findById(id);
    if (!turmaExists) {
      throw new Error('Turma não encontrada');
    }
    return await turmaRepository.delete(id);
  }

}
export default new turmaService();
