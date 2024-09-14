import { json } from "stream/consumers";
import turmaRepository from "../repositories/turmaRepository.js";
import {TurmaSchema, updateTurmaSchema} from "../schemas/turmaSchemas.js";
import {user_turma_Schema, inserirTurmaSchema} from "../schemas/user_turma_Schema.js";
import { messages} from '../utils/messages.js';
import { error } from "console";

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
    
    console.log("2 - (SERVICE) Recebe as informações do controller: "+ JSON.stringify(validatedData));

    const tituloExists = await turmaRepository.findById(id);

    console.log("3 -(SERVICE) Verifica se o titulo: "+ JSON.stringify(tituloExists))
    if (tituloExists===null) {
      throw new Error(messages.error.resourceNotFound("Título não existe."));
    }


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

  async inserirUsuario(req) {
    // Validação com Zod


    console.log("2- (SERVICE)Dados do body"+JSON.stringify  (req.body));
    
    const validatedData = inserirTurmaSchema.parse(req.body);

    console.log("3 - (SERVICE)VALIDAÇÃODOSDADOS"+JSON.stringify(validatedData));

    const usuExistsInTurma = await turmaRepository.userExist(validatedData); 

    console.log("4 - (SERVICE)Usuário na turma "+usuExistsInTurma); 

    if (usuExistsInTurma) {   
      throw new error(messages.validationGeneric.resourceAlreadyExists('Usuário'));
    }

    const userCadastrado = await turmaRepository.turmaMatricular(validatedData);

    return userCadastrado
  }

}
export default new turmaService();
