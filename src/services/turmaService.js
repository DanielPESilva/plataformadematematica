import turmaRepository from "../repositories/turmaRepository.js";
import {updateTurmaSchema} from "../schemas/turmaSchemas.js";

class turmaService {
  async listar(titulo) {
    try {
      const filtros = turmaRepository.constructFilters(titulo);
      const { turmas, total } = await turmaRepository.findAll( filtros );

      console.log(turmas);
      
      // Regra de negócio: Filtrar turmas com pelo menos um aluno
      const turmasComAlunos = turmas.filter(
        (turma) => turma.usuario_has_turma.length > 1
      );
      
      // Retornando turmas filtradas e ajustando a paginação
      return ({ turmasComAlunos,total});

    } catch (error) {
      console.error("Erro ao listar turmas:", error.message);
      throw new Error("Erro ao listar turmas com alunos");
    }
  }

  async listarPorID(id) {
    if (isNaN(id)) {
      throw new Error("ID deve ser um número inteiro");
    }
    return turmaRepository.findById(id);
  }

  async create(dados) {
    const {id,titulo} = TurmaSchema.createTurmasSchema.parse(dados);

    console.log(titulo + "pós validação");
    console.log("após validações");

    let data ={data:{id:id,titulo:titulo,}}

    const turma = await turmaRepository.create(data);
    if(!turma){
      throw{
        code: 404,
        message: `Não foi possivel criar turma com o nome: ${titulo}`
        
      }
    }
    console.log(turma)

    return turma;
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

}
export default new turmaService();